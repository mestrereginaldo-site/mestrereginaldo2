import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { toast } from "@/hooks/use-toast";
import { consultationTypes } from "@/lib/consultasData";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Form validation schema
const appointmentSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "Telefone deve ter pelo menos 10 dígitos"),
  consultationType: z.string().min(1, "Selecione um tipo de consulta"),
  date: z.string().min(1, "Selecione uma data"),
  timePreference: z.string().min(1, "Selecione uma preferência de horário"),
  message: z.string().optional(),
});

type AppointmentFormValues = z.infer<typeof appointmentSchema>;

export default function ConsultasSection() {
  const [selectedConsultation, setSelectedConsultation] = useState<string | null>(null);

  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      consultationType: "",
      date: "",
      timePreference: "",
      message: "",
    },
  });

  const appointmentMutation = useMutation({
    mutationFn: async (data: AppointmentFormValues) => {
      return await apiRequest("POST", "/api/appointments", data);
    },
    onSuccess: () => {
      toast({
        title: "Solicitação enviada",
        description: "Recebemos sua solicitação de agendamento. Entraremos em contato em breve!",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Erro ao enviar",
        description: "Ocorreu um erro ao enviar sua solicitação. Por favor, tente novamente.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: AppointmentFormValues) => {
    appointmentMutation.mutate(data);
  };

  const chooseConsultation = (type: string) => {
    setSelectedConsultation(type);
    form.setValue("consultationType", type);
    
    // Scroll to form
    const formElement = document.getElementById("appointmentForm");
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section id="consultas" className="py-20 bg-[hsl(48,100%,95%)]">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-accent text-primary text-xl">Serviços</span>
          <h2 className="font-heading text-4xl mb-6 text-[hsl(222,18%,15%)]">Consultas Espirituais</h2>
          <p className="max-w-2xl mx-auto text-gray-700">
            Oferecemos diferentes tipos de consultas para atender suas necessidades espirituais. 
            Escolha a modalidade que melhor se adapta à sua situação.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {consultationTypes.map((consultation, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="h-48 bg-primary/20 flex items-center justify-center">
                <img 
                  src={consultation.image} 
                  alt={consultation.title} 
                  className="h-full w-full object-cover" 
                />
              </div>
              <div className="p-6">
                <h3 className="font-heading text-xl mb-3 text-[hsl(222,18%,15%)]">{consultation.title}</h3>
                <p className="text-gray-600 mb-4">{consultation.description}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-primary text-xl">{consultation.price}</span>
                  <Button 
                    variant="default"
                    className="bg-primary text-white px-4 py-2 rounded-full text-sm hover:bg-primary/90 transition-colors"
                    onClick={() => chooseConsultation(consultation.id)}
                  >
                    Agendar
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Formulário de Agendamento */}
        <div id="appointmentForm" className="mt-16 max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h3 className="font-heading text-2xl mb-6 text-center text-[hsl(222,18%,15%)]">Agende sua Consulta</h3>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Nome completo *</FormLabel>
                      <FormControl>
                        <Input {...field} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">E-mail *</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Telefone/WhatsApp *</FormLabel>
                      <FormControl>
                        <Input {...field} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="consultationType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Tipo de Consulta *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                            <SelectValue placeholder="Selecione uma opção" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {consultationTypes.map((type) => (
                            <SelectItem key={type.id} value={type.id}>{type.title}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Data pretendida *</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          type="date" 
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="timePreference"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Horário preferencial *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                            <SelectValue placeholder="Selecione um horário" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="manha">Manhã (09:00 - 12:00)</SelectItem>
                          <SelectItem value="tarde">Tarde (14:00 - 17:00)</SelectItem>
                          <SelectItem value="noite">Noite (18:00 - 21:00)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Motivo da consulta</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-center">
                <Button 
                  type="submit"
                  disabled={appointmentMutation.isPending}
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full text-lg transition-all transform hover:scale-105"
                >
                  {appointmentMutation.isPending ? "Enviando..." : "Solicitar Agendamento"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
