import { apiRequest } from "./queryClient";
import type { Client, InsertClient, Project, InsertProject, Invoice, InsertInvoice } from "@shared/schema";

export const api = {
  // Clients
  clients: {
    getAll: () => fetch("/api/clients").then(res => res.json()) as Promise<Client[]>,
    get: (id: number) => fetch(`/api/clients/${id}`).then(res => res.json()) as Promise<Client>,
    create: (data: InsertClient) => apiRequest("POST", "/api/clients", data),
    update: (id: number, data: Partial<InsertClient>) => apiRequest("PATCH", `/api/clients/${id}`, data),
    delete: (id: number) => apiRequest("DELETE", `/api/clients/${id}`),
  },

  // Projects
  projects: {
    getAll: () => fetch("/api/projects").then(res => res.json()),
    get: (id: number) => fetch(`/api/projects/${id}`).then(res => res.json()),
    create: (data: InsertProject) => apiRequest("POST", "/api/projects", data),
    update: (id: number, data: Partial<InsertProject>) => apiRequest("PATCH", `/api/projects/${id}`, data),
    delete: (id: number) => apiRequest("DELETE", `/api/projects/${id}`),
  },

  // Invoices
  invoices: {
    getAll: () => fetch("/api/invoices").then(res => res.json()),
    get: (id: number) => fetch(`/api/invoices/${id}`).then(res => res.json()),
    create: (data: InsertInvoice) => apiRequest("POST", "/api/invoices", data),
    update: (id: number, data: Partial<InsertInvoice>) => apiRequest("PATCH", `/api/invoices/${id}`, data),
    delete: (id: number) => apiRequest("DELETE", `/api/invoices/${id}`),
  },

  // Dashboard
  dashboard: {
    getStats: () => fetch("/api/dashboard/stats").then(res => res.json()),
    getTopClients: () => fetch("/api/dashboard/top-clients").then(res => res.json()),
    getMonthlyEarnings: () => fetch("/api/dashboard/monthly-earnings").then(res => res.json()),
  },
};
