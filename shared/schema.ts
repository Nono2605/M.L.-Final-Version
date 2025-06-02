import { pgTable, text, serial, integer, boolean, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const quotes = pgTable("quotes", {
  id: serial("id").primaryKey(),
  projectType: varchar("project_type", { length: 50 }).notNull(),
  service: varchar("service", { length: 50 }).notNull(),
  subServices: text("sub_services").array().notNull(),
  superficie: integer("superficie").notNull(),
  adresse: text("adresse"),
  email: varchar("email", { length: 255 }),
  telephone: varchar("telephone", { length: 50 }),
  whatsapp: varchar("whatsapp", { length: 50 }),
});

export const insertQuoteSchema = createInsertSchema(quotes).omit({
  id: true,
});

export type InsertQuote = z.infer<typeof insertQuoteSchema>;
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
