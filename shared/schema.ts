import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

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

// Agendamentos de consultas
export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  consultationType: text("consultation_type").notNull(),
  date: text("date").notNull(),
  timePreference: text("time_preference").notNull(),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertAppointmentSchema = createInsertSchema(appointments).omit({
  id: true,
  createdAt: true,
});

export type InsertAppointment = z.infer<typeof insertAppointmentSchema>;
export type Appointment = typeof appointments.$inferSelect;

// Mensagens do formulário de contato
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true,
});

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;

// Leituras de buzios
export const buziosReadings = pgTable("buzios_readings", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  result: json("result").notNull(),
  interpretation: text("interpretation").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertBuziosReadingSchema = createInsertSchema(buziosReadings).omit({
  id: true,
  createdAt: true,
});

export type InsertBuziosReading = z.infer<typeof insertBuziosReadingSchema>;
export type BuziosReading = typeof buziosReadings.$inferSelect;

// Leituras de cartas
export const cardReadings = pgTable("card_readings", {
  id: serial("id").primaryKey(),
  cards: json("cards").notNull(),
  interpretation: text("interpretation").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertCardReadingSchema = createInsertSchema(cardReadings).omit({
  id: true,
  createdAt: true,
});

export type InsertCardReading = z.infer<typeof insertCardReadingSchema>;
export type CardReading = typeof cardReadings.$inferSelect;
