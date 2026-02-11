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
  clientEmailTemplate: text("client_email_template")
    .notNull()
    .default(`<h2>Confirmation de votre demande de devis</h2>
<p>Bonjour {{prenom}} {{nom}},</p>
<p>Nous avons bien reçu votre demande de devis pour votre projet de type <strong>{{projectType}}</strong>.</p>
<p><strong>Détails de votre demande :</strong></p>
<ul>
  <li>Service : {{service}}</li>
  <li>Superficie : {{superficie}} m²</li>
  <li>Adresse : {{adresse}}</li>
</ul>
<p>Nous vous contacterons dans les plus brefs délais.</p>
<p>Cordialement,<br>L'équipe SuisseToiture</p>`),
  adminEmailTemplate: text("admin_email_template")
    .notNull()
    .default(`<h2>Nouvelle demande de devis</h2>
<p>Une nouvelle demande de devis a été reçue :</p>
<p><strong>Client :</strong> {{prenom}} {{nom}}<br>
<strong>Email :</strong> {{email}}<br>
<strong>Téléphone :</strong> {{telephone}}</p>
<p><strong>Détails du projet :</strong></p>
<ul>
  <li>Type : {{projectType}}</li>
  <li>Service : {{service}}</li>
  <li>Superficie : {{superficie}} m²</li>
  <li>Adresse : {{adresse}}</li>
</ul>`),
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
