import { pgTable, text, serial, integer, boolean, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const quotes = pgTable("quotes", {
  id: serial("id").primaryKey(),
  projectType: varchar("project_type", { length: 50 }).notNull(),
  service: varchar("service", { length: 50 }).notNull(),
  subServices: text("sub_services").array().notNull(),
  superficie: integer("superficie").notNull(),
  nom: varchar("nom", { length: 100 }),
  prenom: varchar("prenom", { length: 100 }),
  rue: varchar("rue", { length: 255 }),
  numero: varchar("numero", { length: 20 }),
  codePostal: varchar("code_postal", { length: 10 }),
  ville: varchar("ville", { length: 100 }),
  adresse: text("adresse"),
  email: varchar("email", { length: 255 }),
  telephone: varchar("telephone", { length: 50 }),
  whatsapp: varchar("whatsapp", { length: 50 }),
  status: varchar("status", { length: 20 }).notNull().default("en_attente"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertQuoteSchema = createInsertSchema(quotes).omit({
  id: true,
  status: true,
  notes: true,
  createdAt: true,
  updatedAt: true,
});

export const updateQuoteSchema = createInsertSchema(quotes).pick({
  status: true,
  notes: true,
}).extend({
  status: z.enum(['en_attente', 'traite', 'annule'])
});

export type InsertQuote = z.infer<typeof insertQuoteSchema>;
export type UpdateQuote = z.infer<typeof updateQuoteSchema>;
export type Quote = typeof quotes.$inferSelect;

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
