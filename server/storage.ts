import { db } from "./db";
import { leads, contactRequests, type InsertLead, type Lead, type InsertContactRequest, type ContactRequest } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  createLead(lead: InsertLead): Promise<Lead>;
  getLeadByEmail(email: string): Promise<Lead | undefined>;
  createContactRequest(contact: InsertContactRequest): Promise<ContactRequest>;
}

export class DatabaseStorage implements IStorage {
  async createLead(insertLead: InsertLead): Promise<Lead> {
    const [lead] = await db!.insert(leads).values(insertLead).returning();
    return lead;
  }

  async getLeadByEmail(email: string): Promise<Lead | undefined> {
    const [lead] = await db!.select().from(leads).where(eq(leads.email, email));
    return lead;
  }

  async createContactRequest(insertContact: InsertContactRequest): Promise<ContactRequest> {
    const [contact] = await db!.insert(contactRequests).values(insertContact).returning();
    return contact;
  }
}

export class MemoryStorage implements IStorage {
  private leads: Lead[] = [];
  private contactRequests: ContactRequest[] = [];
  private nextId = 1;
  private nextContactId = 1;

  async createLead(insertLead: InsertLead): Promise<Lead> {
    const lead: Lead = {
      id: this.nextId++,
      email: insertLead.email,
      createdAt: new Date(),
    };
    this.leads.push(lead);
    return lead;
  }

  async getLeadByEmail(email: string): Promise<Lead | undefined> {
    return this.leads.find((l) => l.email === email);
  }

  async createContactRequest(insertContact: InsertContactRequest): Promise<ContactRequest> {
    const contact: ContactRequest = {
      id: this.nextContactId++,
      name: insertContact.name,
      email: insertContact.email,
      phone: insertContact.phone || null,
      message: insertContact.message || null,
      createdAt: new Date(),
    };
    this.contactRequests.push(contact);
    return contact;
  }
}

export const storage: IStorage = db
  ? new DatabaseStorage()
  : new MemoryStorage();
