import { 
  clients, 
  projects, 
  invoices,
  type Client, 
  type InsertClient,
  type Project,
  type InsertProject,
  type Invoice,
  type InsertInvoice,
  type ProjectWithClient,
  type InvoiceWithClient,
  type InvoiceWithProject
} from "@shared/schema";

export interface IStorage {
  // Clients
  getClients(): Promise<Client[]>;
  getClient(id: number): Promise<Client | undefined>;
  createClient(client: InsertClient): Promise<Client>;
  updateClient(id: number, client: Partial<InsertClient>): Promise<Client | undefined>;
  deleteClient(id: number): Promise<boolean>;
  
  // Projects
  getProjects(): Promise<ProjectWithClient[]>;
  getProject(id: number): Promise<ProjectWithClient | undefined>;
  getProjectsByClient(clientId: number): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: number): Promise<boolean>;
  
  // Invoices
  getInvoices(): Promise<InvoiceWithProject[]>;
  getInvoice(id: number): Promise<InvoiceWithProject | undefined>;
  getInvoicesByClient(clientId: number): Promise<Invoice[]>;
  createInvoice(invoice: InsertInvoice): Promise<Invoice>;
  updateInvoice(id: number, invoice: Partial<InsertInvoice>): Promise<Invoice | undefined>;
  deleteInvoice(id: number): Promise<boolean>;
  
  // Dashboard stats
  getDashboardStats(): Promise<{
    totalEarnings: number;
    activeClients: number;
    pendingInvoices: number;
    thisMonth: number;
  }>;
  
  getTopClientsByRevenue(limit?: number): Promise<Array<Client & { revenue: number; projectCount: number }>>;
  getMonthlyEarnings(): Promise<Array<{ month: string; earnings: number }>>;
}

export class MemStorage implements IStorage {
  private clients: Map<number, Client>;
  private projects: Map<number, Project>;
  private invoices: Map<number, Invoice>;
  private currentClientId: number;
  private currentProjectId: number;
  private currentInvoiceId: number;
  private invoiceCounter: number;

  constructor() {
    this.clients = new Map();
    this.projects = new Map();
    this.invoices = new Map();
    this.currentClientId = 1;
    this.currentProjectId = 1;
    this.currentInvoiceId = 1;
    this.invoiceCounter = 1;
  }

  // Clients
  async getClients(): Promise<Client[]> {
    return Array.from(this.clients.values());
  }

  async getClient(id: number): Promise<Client | undefined> {
    return this.clients.get(id);
  }

  async createClient(insertClient: InsertClient): Promise<Client> {
    const id = this.currentClientId++;
    const client: Client = {
      ...insertClient,
      id,
      createdAt: new Date(),
    };
    this.clients.set(id, client);
    return client;
  }

  async updateClient(id: number, updateData: Partial<InsertClient>): Promise<Client | undefined> {
    const client = this.clients.get(id);
    if (!client) return undefined;
    
    const updatedClient = { ...client, ...updateData };
    this.clients.set(id, updatedClient);
    return updatedClient;
  }

  async deleteClient(id: number): Promise<boolean> {
    return this.clients.delete(id);
  }

  // Projects
  async getProjects(): Promise<ProjectWithClient[]> {
    const projectsArray = Array.from(this.projects.values());
    return projectsArray.map(project => {
      const client = this.clients.get(project.clientId);
      return { ...project, client: client! };
    });
  }

  async getProject(id: number): Promise<ProjectWithClient | undefined> {
    const project = this.projects.get(id);
    if (!project) return undefined;
    
    const client = this.clients.get(project.clientId);
    return { ...project, client: client! };
  }

  async getProjectsByClient(clientId: number): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(p => p.clientId === clientId);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.currentProjectId++;
    const project: Project = {
      ...insertProject,
      id,
      hourlyRate: insertProject.hourlyRate || null,
      totalBudget: insertProject.totalBudget || null,
      startDate: insertProject.startDate || null,
      endDate: insertProject.endDate || null,
      createdAt: new Date(),
    };
    this.projects.set(id, project);
    return project;
  }

  async updateProject(id: number, updateData: Partial<InsertProject>): Promise<Project | undefined> {
    const project = this.projects.get(id);
    if (!project) return undefined;
    
    const updatedProject = { ...project, ...updateData };
    this.projects.set(id, updatedProject);
    return updatedProject;
  }

  async deleteProject(id: number): Promise<boolean> {
    return this.projects.delete(id);
  }

  // Invoices
  async getInvoices(): Promise<InvoiceWithProject[]> {
    const invoicesArray = Array.from(this.invoices.values());
    return invoicesArray.map(invoice => {
      const client = this.clients.get(invoice.clientId);
      const project = invoice.projectId ? this.projects.get(invoice.projectId) : null;
      return { ...invoice, client: client!, project };
    });
  }

  async getInvoice(id: number): Promise<InvoiceWithProject | undefined> {
    const invoice = this.invoices.get(id);
    if (!invoice) return undefined;
    
    const client = this.clients.get(invoice.clientId);
    const project = invoice.projectId ? this.projects.get(invoice.projectId) : null;
    return { ...invoice, client: client!, project };
  }

  async getInvoicesByClient(clientId: number): Promise<Invoice[]> {
    return Array.from(this.invoices.values()).filter(i => i.clientId === clientId);
  }

  async createInvoice(insertInvoice: InsertInvoice): Promise<Invoice> {
    const id = this.currentInvoiceId++;
    const invoiceNumber = `INV-${String(this.invoiceCounter++).padStart(3, '0')}`;
    
    const invoice: Invoice = {
      ...insertInvoice,
      id,
      invoiceNumber,
      amount: insertInvoice.amount,
      paidDate: insertInvoice.status === 'paid' ? new Date() : null,
      createdAt: new Date(),
    };
    this.invoices.set(id, invoice);
    return invoice;
  }

  async updateInvoice(id: number, updateData: Partial<InsertInvoice>): Promise<Invoice | undefined> {
    const invoice = this.invoices.get(id);
    if (!invoice) return undefined;
    
    const updatedInvoice = { 
      ...invoice, 
      ...updateData,
      paidDate: updateData.status === 'paid' ? new Date() : invoice.paidDate
    };
    this.invoices.set(id, updatedInvoice);
    return updatedInvoice;
  }

  async deleteInvoice(id: number): Promise<boolean> {
    return this.invoices.delete(id);
  }

  // Dashboard stats
  async getDashboardStats(): Promise<{
    totalEarnings: number;
    activeClients: number;
    pendingInvoices: number;
    thisMonth: number;
  }> {
    const invoicesArray = Array.from(this.invoices.values());
    const clientsArray = Array.from(this.clients.values());
    
    const totalEarnings = invoicesArray
      .filter(i => i.status === 'paid')
      .reduce((sum, i) => sum + parseFloat(i.amount), 0);
    
    const activeClients = clientsArray.length;
    
    const pendingInvoices = invoicesArray.filter(i => i.status === 'pending').length;
    
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const thisMonth = invoicesArray
      .filter(i => {
        const invoiceDate = new Date(i.issueDate);
        return invoiceDate.getMonth() === currentMonth && 
               invoiceDate.getFullYear() === currentYear &&
               i.status === 'paid';
      })
      .reduce((sum, i) => sum + parseFloat(i.amount), 0);

    return {
      totalEarnings,
      activeClients,
      pendingInvoices,
      thisMonth,
    };
  }

  async getTopClientsByRevenue(limit = 5): Promise<Array<Client & { revenue: number; projectCount: number }>> {
    const clientsArray = Array.from(this.clients.values());
    const invoicesArray = Array.from(this.invoices.values());
    const projectsArray = Array.from(this.projects.values());
    
    return clientsArray
      .map(client => {
        const revenue = invoicesArray
          .filter(i => i.clientId === client.id && i.status === 'paid')
          .reduce((sum, i) => sum + parseFloat(i.amount), 0);
        
        const projectCount = projectsArray.filter(p => p.clientId === client.id).length;
        
        return { ...client, revenue, projectCount };
      })
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, limit);
  }

  async getMonthlyEarnings(): Promise<Array<{ month: string; earnings: number }>> {
    const invoicesArray = Array.from(this.invoices.values());
    const monthlyData: { [key: string]: number } = {};
    
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    
    // Initialize with current year's months
    months.forEach(month => {
      monthlyData[month] = 0;
    });
    
    invoicesArray
      .filter(i => i.status === 'paid')
      .forEach(invoice => {
        const date = new Date(invoice.paidDate || invoice.issueDate);
        const monthIndex = date.getMonth();
        if (monthIndex < 6) { // Only show first 6 months for demo
          const monthName = months[monthIndex];
          monthlyData[monthName] += parseFloat(invoice.amount);
        }
      });
    
    return months.map(month => ({
      month,
      earnings: monthlyData[month],
    }));
  }
}

export const storage = new MemStorage();
