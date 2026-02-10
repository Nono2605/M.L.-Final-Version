import {
  quotes,
  type Quote,
  type InsertQuote,
  type UpdateQuote,
  settings,
  type Settings,
  type UpdateSettings,
} from "../shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getQuote(id: number): Promise<Quote | undefined>;
  createQuote(quote: InsertQuote): Promise<Quote>;
  getAllQuotes(): Promise<Quote[]>;
  updateQuote(id: number, updates: UpdateQuote): Promise<Quote | undefined>;
  getSettings(): Promise<Settings>;
  updateSettings(updates: UpdateSettings): Promise<Settings>;
}

export class DatabaseStorage implements IStorage {
  async getQuote(id: number): Promise<Quote | undefined> {
    const [quote] = await db.select().from(quotes).where(eq(quotes.id, id));
    return quote || undefined;
  }

  async createQuote(insertQuote: InsertQuote): Promise<Quote> {
    const [quote] = await db
      .insert(quotes)
      .values(insertQuote)
      .returning();
    return quote;
  }

  async getAllQuotes(): Promise<Quote[]> {
    return await db.select().from(quotes).orderBy(desc(quotes.createdAt));
  }

  async updateQuote(id: number, updates: UpdateQuote): Promise<Quote | undefined> {
    const [quote] = await db
      .update(quotes)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(quotes.id, id))
      .returning();
    return quote || undefined;
  }

  async getSettings(): Promise<Settings> {
    const [existingSettings] = await db.select().from(settings).limit(1);
    
    if (!existingSettings) {
      const [newSettings] = await db
        .insert(settings)
        .values({})
        .returning();
      return newSettings;
    }
    
    return existingSettings;
  }

  async updateSettings(updates: UpdateSettings): Promise<Settings> {
    const existingSettings = await this.getSettings();
    
    const [updatedSettings] = await db
      .update(settings)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(settings.id, existingSettings.id))
      .returning();
    
    return updatedSettings;
  }
}

export const storage = new DatabaseStorage();
