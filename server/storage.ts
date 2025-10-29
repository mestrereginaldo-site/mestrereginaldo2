import { 
  users, type User, type InsertUser,
  appointments, type Appointment, type InsertAppointment,
  contactMessages, type ContactMessage, type InsertContactMessage,
  buziosReadings, type BuziosReading, type InsertBuziosReading,
  cardReadings, type CardReading, type InsertCardReading
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Appointment methods
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  getAppointments(): Promise<Appointment[]>;
  
  // Contact message methods
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
  
  // Buzios reading methods
  createBuziosReading(reading: InsertBuziosReading): Promise<BuziosReading>;
  getBuziosReadings(): Promise<BuziosReading[]>;
  
  // Card reading methods
  createCardReading(reading: InsertCardReading): Promise<CardReading>;
  getCardReadings(): Promise<CardReading[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private appointments: Map<number, Appointment>;
  private contactMessages: Map<number, ContactMessage>;
  private buziosReadings: Map<number, BuziosReading>;
  private cardReadings: Map<number, CardReading>;
  private currentUserId: number;
  private currentAppointmentId: number;
  private currentContactMessageId: number;
  private currentBuziosReadingId: number;
  private currentCardReadingId: number;

  constructor() {
    this.users = new Map();
    this.appointments = new Map();
    this.contactMessages = new Map();
    this.buziosReadings = new Map();
    this.cardReadings = new Map();
    this.currentUserId = 1;
    this.currentAppointmentId = 1;
    this.currentContactMessageId = 1;
    this.currentBuziosReadingId = 1;
    this.currentCardReadingId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Appointment methods
  async createAppointment(insertAppointment: InsertAppointment): Promise<Appointment> {
    const id = this.currentAppointmentId++;
    const createdAt = new Date();
    const appointment: Appointment = { ...insertAppointment, id, createdAt };
    this.appointments.set(id, appointment);
    return appointment;
  }

  async getAppointments(): Promise<Appointment[]> {
    return Array.from(this.appointments.values());
  }

  // Contact message methods
  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.currentContactMessageId++;
    const createdAt = new Date();
    const message: ContactMessage = { ...insertMessage, id, createdAt };
    this.contactMessages.set(id, message);
    return message;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }

  // Buzios reading methods
  async createBuziosReading(insertReading: InsertBuziosReading): Promise<BuziosReading> {
    const id = this.currentBuziosReadingId++;
    const createdAt = new Date();
    const reading: BuziosReading = { ...insertReading, id, createdAt };
    this.buziosReadings.set(id, reading);
    return reading;
  }

  async getBuziosReadings(): Promise<BuziosReading[]> {
    return Array.from(this.buziosReadings.values());
  }

  // Card reading methods
  async createCardReading(insertReading: InsertCardReading): Promise<CardReading> {
    const id = this.currentCardReadingId++;
    const createdAt = new Date();
    const reading: CardReading = { ...insertReading, id, createdAt };
    this.cardReadings.set(id, reading);
    return reading;
  }

  async getCardReadings(): Promise<CardReading[]> {
    return Array.from(this.cardReadings.values());
  }
}

export const storage = new MemStorage();
