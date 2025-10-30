import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAppointmentSchema, insertContactMessageSchema, insertBuziosReadingSchema, insertCardReadingSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { sendContactEmail, sendAppointmentEmail } from "./email";
import fs from 'fs';
import path from 'path';

export async function registerRoutes(app: Express): Promise<Server> {
  // Definição do conteúdo do ads.txt
  const getAdsContent = () => {
    const adsFilePath = path.join(process.cwd(), 'ads.txt');
    if (fs.existsSync(adsFilePath)) {
      return fs.readFileSync(adsFilePath, 'utf-8');
    } else {
      return 'google.com, pub-2796792312502848, DIRECT, f08c47fec0942fa0\nmestrereginaldo.com.br, pub-2796792312502848, DIRECT, f08c47fec0942fa0';
    }
  };

  // Middleware para verificar se a requisição é para ads.txt em qualquer nível
  app.use((req, res, next) => {
    const url = req.url.toLowerCase();
    if (url.endsWith('/ads.txt') || url === '/ads.txt') {
      res.type('text/plain');
      res.send(getAdsContent());
    } else {
      next();
    }
  });
  
  // Rota específica para o ads.txt na raiz (backup da abordagem acima)
  app.get("/ads.txt", (req, res) => {
    res.type('text/plain');
    res.send(getAdsContent());
  });
  
  // Definição do conteúdo do robots.txt
  const getRobotsContent = () => {
    const robotsFilePath = path.join(process.cwd(), 'robots.txt');
    if (fs.existsSync(robotsFilePath)) {
      return fs.readFileSync(robotsFilePath, 'utf-8');
    } else {
      return 'User-agent: *\nAllow: /\nAllow: /ads.txt\n\nUser-agent: Mediapartners-Google\nAllow: /\nAllow: /ads.txt\n\nUser-agent: Google-Display-Ads-Bot\nAllow: /\nAllow: /ads.txt';
    }
  };
  
  // Middleware para verificar se a requisição é para robots.txt em qualquer nível
  app.use((req, res, next) => {
    const url = req.url.toLowerCase();
    if (url.endsWith('/robots.txt') || url === '/robots.txt') {
      res.type('text/plain');
      res.send(getRobotsContent());
    } else {
      next();
    }
  });
  
  // Rota específica para o robots.txt na raiz (backup da abordagem acima)
  app.get("/robots.txt", (req, res) => {
    res.type('text/plain');
    res.send(getRobotsContent());
  });
  
  // Rota para servir o favicon
  app.get("/generated-icon.png", (req, res) => {
    res.sendFile(path.join(process.cwd(), 'generated-icon.png'));
  });
  // Appointments API
  app.post("/api/appointments", async (req, res) => {
    try {
      const appointment = insertAppointmentSchema.parse(req.body);
      const createdAppointment = await storage.createAppointment(appointment);
      
      // Enviar email de agendamento
      try {
        await sendAppointmentEmail({
          name: appointment.name,
          email: appointment.email,
          phone: appointment.phone,
          consultationType: appointment.consultationType,
          date: new Date(appointment.date).toLocaleDateString('pt-BR'),
          timePreference: appointment.timePreference,
          notes: appointment.message || ''
        });
      } catch (emailError) {
        console.error("Erro ao enviar email de agendamento:", emailError);
        // Continuamos o fluxo mesmo se o email falhar
      }
      
      res.status(201).json(createdAppointment);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: fromZodError(error).message });
      } else {
        res.status(500).json({ message: "Erro interno ao criar agendamento" });
      }
    }
  });

  app.get("/api/appointments", async (req, res) => {
    try {
      const appointments = await storage.getAppointments();
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar agendamentos" });
    }
  });

  // Contact messages API
  app.post("/api/contact", async (req, res) => {
    try {
      const message = insertContactMessageSchema.parse(req.body);
      const createdMessage = await storage.createContactMessage(message);
      
      // Enviar email de contato
      try {
        await sendContactEmail({
          name: message.name,
          email: message.email,
          subject: message.subject,
          message: message.message
        });
      } catch (emailError) {
        console.error("Erro ao enviar email de contato:", emailError);
        // Continuamos o fluxo mesmo se o email falhar
      }
      
      res.status(201).json(createdMessage);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: fromZodError(error).message });
      } else {
        res.status(500).json({ message: "Erro interno ao enviar mensagem" });
      }
    }
  });

  app.get("/api/contact", async (req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar mensagens" });
    }
  });

  // Buzios reading API
  app.post("/api/buzios-readings", async (req, res) => {
    try {
      const reading = insertBuziosReadingSchema.parse(req.body);
      const createdReading = await storage.createBuziosReading(reading);
      res.status(201).json(createdReading);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: fromZodError(error).message });
      } else {
        res.status(500).json({ message: "Erro interno ao salvar leitura de búzios" });
      }
    }
  });

  // Card reading API
  app.post("/api/card-readings", async (req, res) => {
    try {
      const reading = insertCardReadingSchema.parse(req.body);
      const createdReading = await storage.createCardReading(reading);
      res.status(201).json(createdReading);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: fromZodError(error).message });
      } else {
        res.status(500).json({ message: "Erro interno ao salvar leitura de cartas" });
      }
    }
  });
  
  // API para acessar mensagens salvas
  app.get("/api/mensagens-salvas", async (req, res) => {
    try {
      const messagesDir = path.join(process.cwd(), 'emails');
      
      if (!fs.existsSync(messagesDir)) {
        return res.json({
          contato: [],
          agendamento: []
        });
      }
      
      const files = fs.readdirSync(messagesDir);
      
      const contatoMessages = [];
      const agendamentoMessages = [];
      
      for (const file of files) {
        if (file.endsWith('.json')) {
          const filePath = path.join(messagesDir, file);
          const content = fs.readFileSync(filePath, 'utf-8');
          const data = JSON.parse(content);
          
          if (file.startsWith('contato_')) {
            contatoMessages.push({
              data: new Date(file.split('_')[1].split('.')[0].replace(/-/g, ':')).toLocaleString('pt-BR'),
              ...data
            });
          } else if (file.startsWith('agendamento_')) {
            agendamentoMessages.push({
              data: new Date(file.split('_')[1].split('.')[0].replace(/-/g, ':')).toLocaleString('pt-BR'),
              ...data
            });
          }
        }
      }
      
      return res.json({
        contato: contatoMessages.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()),
        agendamento: agendamentoMessages.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
      });
    } catch (error) {
      console.error('Erro ao listar mensagens salvas:', error);
      return res.status(500).json({ message: 'Erro ao listar mensagens salvas' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
