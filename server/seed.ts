import { db } from "./db";
import { clients, projects, invoices } from "@shared/schema";

async function seedDatabase() {
  try {
    // Clear existing data
    await db.delete(invoices);
    await db.delete(projects);
    await db.delete(clients);

    // Insert sample clients
    const sampleClients = await db.insert(clients).values([
      {
        name: "Tech Solutions Inc",
        email: "contact@techsolutions.com",
        phone: "+1 (555) 123-4567",
        company: "Tech Solutions Inc",
        address: "123 Business Ave, New York, NY 10001"
      },
      {
        name: "Digital Marketing Co",
        email: "hello@digitalmarketing.com",
        phone: "+1 (555) 987-6543",
        company: "Digital Marketing Co",
        address: "456 Marketing St, San Francisco, CA 94105"
      },
      {
        name: "StartupXYZ",
        email: "founder@startupxyz.com",
        phone: "+1 (555) 456-7890",
        company: "StartupXYZ",
        address: "789 Innovation Blvd, Austin, TX 73301"
      }
    ]).returning();

    // Insert sample projects
    const sampleProjects = await db.insert(projects).values([
      {
        title: "E-commerce Website Development",
        description: "Building a modern e-commerce platform with React and Node.js",
        clientId: sampleClients[0].id,
        status: "active",
        hourlyRate: "125",
        totalBudget: "15000",
        startDate: new Date('2024-01-15'),
        endDate: new Date('2024-06-15')
      },
      {
        title: "SEO Campaign Management",
        description: "Complete SEO optimization and monthly campaign management",
        clientId: sampleClients[1].id,
        status: "active",
        hourlyRate: "85",
        totalBudget: "8500",
        startDate: new Date('2024-02-01'),
        endDate: new Date('2024-08-01')
      },
      {
        title: "Mobile App Development",
        description: "Cross-platform mobile app using React Native",
        clientId: sampleClients[2].id,
        status: "completed",
        hourlyRate: "150",
        totalBudget: "25000",
        startDate: new Date('2023-09-01'),
        endDate: new Date('2024-01-31')
      }
    ]).returning();

    // Insert sample invoices
    await db.insert(invoices).values([
      {
        invoiceNumber: "INV-001",
        clientId: sampleClients[0].id,
        projectId: sampleProjects[0].id,
        amount: "5000",
        status: "paid",
        issueDate: new Date('2024-01-30'),
        dueDate: new Date('2024-02-29'),
        paidDate: new Date('2024-02-15'),
        description: "Website development - Phase 1"
      },
      {
        invoiceNumber: "INV-002",
        clientId: sampleClients[1].id,
        projectId: sampleProjects[1].id,
        amount: "2500",
        status: "paid",
        issueDate: new Date('2024-02-15'),
        dueDate: new Date('2024-03-15'),
        paidDate: new Date('2024-03-10'),
        description: "SEO Campaign - February"
      },
      {
        invoiceNumber: "INV-003",
        clientId: sampleClients[2].id,
        projectId: sampleProjects[2].id,
        amount: "12000",
        status: "paid",
        issueDate: new Date('2024-01-15'),
        dueDate: new Date('2024-02-14'),
        paidDate: new Date('2024-02-10'),
        description: "Mobile app development - Final payment"
      },
      {
        invoiceNumber: "INV-004",
        clientId: sampleClients[0].id,
        projectId: sampleProjects[0].id,
        amount: "5000",
        status: "pending",
        issueDate: new Date('2024-03-01'),
        dueDate: new Date('2024-03-31'),
        description: "Website development - Phase 2"
      },
      {
        invoiceNumber: "INV-005",
        clientId: sampleClients[1].id,
        projectId: sampleProjects[1].id,
        amount: "2500",
        status: "overdue",
        issueDate: new Date('2024-02-01'),
        dueDate: new Date('2024-02-28'),
        description: "SEO Campaign - January (overdue)"
      }
    ]);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}

// Run the seed function if this file is executed directly
seedDatabase().catch(console.error);

export { seedDatabase };