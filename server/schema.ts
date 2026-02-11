import { pgTable, text, serial, integer, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

// TABLES
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

export const settings = pgTable("settings", {
  id: serial("id").primaryKey(),
  adminPassword: varchar("admin_password", { length: 255 }).notNull().default("123456"),
  adminEmail: varchar("admin_email", { length: 255 }),
  clientEmailTemplate: text("client_email_template").notNull(),
  adminEmailTemplate: text("admin_email_template").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// TYPES (✅ ce qui te manque)
export type Quote = InferSelectModel<typeof quotes>;
export type InsertQuote = InferInsertModel<typeof quotes>;
export type UpdateQuote = Partial<Pick<Quote, "status" | "notes">>;

export type Settings = InferSelectModel<typeof settings>;
export type UpdateSettings = Partial<Pick<Settings, "adminPassword" | "adminEmail" | "clientEmailTemplate" | "adminEmailTemplate">>;

// ZOD SCHEMAS (si tu en as besoin dans /api)
export const insertQuoteSchema = createInsertSchema(quotes).omit({
  id: true,
  status: true,
  notes: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  projectType: z.enum(["maison", "immeuble", "autre"]),
});

export const updateQuoteSchema = createInsertSchema(quotes)
  .pick({ status: true, notes: true })
  .extend({
    status: z.enum(["en_attente", "traite", "annule"]),
  });

export const updateSettingsSchema = createInsertSchema(settings)
  .pick({
    adminPassword: true,
    adminEmail: true,
    clientEmailTemplate: true,
    adminEmailTemplate: true,
  })
  .partial();
