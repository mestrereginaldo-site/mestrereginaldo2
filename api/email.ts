// Usando abordagem direta conforme documentação do SendGrid
import sgMail from '@sendgrid/mail';
import fs from 'fs';
import path from 'path';

// Armazenar mensagens localmente como backup
const MESSAGES_DIR = path.join(process.cwd(), 'emails');

// Criar pasta de emails se não existir
try {
  if (!fs.existsSync(MESSAGES_DIR)) {
    fs.mkdirSync(MESSAGES_DIR, { recursive: true });
    console.log('Pasta de emails criada:', MESSAGES_DIR);
  }
} catch (error) {
  console.error('Erro ao criar pasta de emails:', error);
}

// Função para salvar mensagem localmente
function saveMessageLocally(type: string, data: any): void {
  try {
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const filename = path.join(MESSAGES_DIR, `${type}_${timestamp}.json`);
    fs.writeFileSync(filename, JSON.stringify(data, null, 2));
    console.log(`Mensagem de ${type} salva localmente: ${filename}`);
  } catch (error) {
    console.error('Erro ao salvar mensagem localmente:', error);
  }
}

// Configuração do SendGrid
const SENDGRID_API_KEY = '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';
sgMail.setApiKey(SENDGRID_API_KEY);
console.log('SendGrid configurado com a nova chave API');

// Template ID fornecido para SendGrid
const SENDGRID_TEMPLATE_ID = 'd-e3a431ecbb104df3a0fba5fb703cf199';

// Email origem e destino
const FROM_EMAIL = 'dr.regisilva@icloud.com';
const TO_EMAIL = 'dr.regisilva@icloud.com';

// Interface para dados de contato
export interface ContactEmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Interface para dados de agendamento
export interface AppointmentEmailData {
  name: string;
  email: string;
  phone: string;
  consultationType: string;
  date: string;
  timePreference: string;
  notes?: string | undefined;
}

// Função para enviar email de contato
export async function sendContactEmail(data: ContactEmailData): Promise<boolean> {
  // Sempre salva localmente como backup
  saveMessageLocally('contato', data);
  
  try {
    // Preparar conteúdo do email
    const html = `
      <h2>Nova mensagem de contato</h2>
      <p><strong>Nome:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Assunto:</strong> ${data.subject}</p>
      <p><strong>Mensagem:</strong><br>${data.message.replace(/\n/g, '<br>')}</p>
    `;
    
    const text = `
      Nova mensagem de contato
      
      Nome: ${data.name}
      Email: ${data.email}
      Assunto: ${data.subject}
      Mensagem: ${data.message}
    `;
    
    const msg = {
      to: TO_EMAIL,
      from: FROM_EMAIL,
      subject: `Contato via Site - ${data.subject}`,
      text: text,
      html: html
    };
    
    await sgMail.send(msg);
    console.log('Email de contato enviado com sucesso via SendGrid');
    return true;
  } catch (error) {
    console.error('Erro ao enviar email de contato via SendGrid:', error);
    if (error.response) {
      console.error(error.response.body);
    }
    // Já foi salvo localmente, então ainda é um "sucesso"
    return true;
  }
}

// Função para enviar email de agendamento
export async function sendAppointmentEmail(data: AppointmentEmailData): Promise<boolean> {
  // Sempre salva localmente como backup
  saveMessageLocally('agendamento', data);
  
  try {
    // Mapeamento para os nomes amigáveis dos horários
    const timeLabels: Record<string, string> = {
      manha: "Manhã (09:00 - 12:00)",
      tarde: "Tarde (14:00 - 17:00)",
      noite: "Noite (18:00 - 21:00)",
    };
    
    // Horário formatado
    const horario = timeLabels[data.timePreference] || data.timePreference;
    
    // Preparar conteúdo do email
    const html = `
      <h2>Novo agendamento de consulta</h2>
      <p><strong>Nome:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Telefone:</strong> ${data.phone}</p>
      <p><strong>Tipo de Consulta:</strong> ${data.consultationType}</p>
      <p><strong>Data:</strong> ${data.date}</p>
      <p><strong>Horário:</strong> ${horario}</p>
      <p><strong>Observações:</strong><br>${(data.notes || "Nenhuma informação adicional fornecida").replace(/\n/g, '<br>')}</p>
    `;
    
    const text = `
      Novo agendamento de consulta
      
      Nome: ${data.name}
      Email: ${data.email}
      Telefone: ${data.phone}
      Tipo de Consulta: ${data.consultationType}
      Data: ${data.date}
      Horário: ${horario}
      Observações: ${data.notes || "Nenhuma informação adicional fornecida"}
    `;
    
    const msg = {
      to: TO_EMAIL,
      from: FROM_EMAIL,
      subject: `Agendamento de Consulta - ${data.consultationType}`,
      text: text,
      html: html
    };
    
    await sgMail.send(msg);
    console.log('Email de agendamento enviado com sucesso via SendGrid');
    return true;
  } catch (error) {
    console.error('Erro ao enviar email de agendamento via SendGrid:', error);
    if (error.response) {
      console.error(error.response.body);
    }
    // Já foi salvo localmente, então ainda é um "sucesso"
    return true;
  }
}