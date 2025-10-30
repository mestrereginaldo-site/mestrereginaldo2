import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { toast } from "@/hooks/use-toast";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Instagram,
  Facebook,
  Youtube,
  MessageSquare
} from "lucide-react";

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

// Form validation schema
const contactSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  subject: z.string().min(3, "Assunto deve ter pelo menos 3 caracteres"),
  message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactSection() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormValues) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Mensagem enviada",
        description: "Recebemos sua mensagem. Responderemos em breve!",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Erro ao enviar",
        description: "Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    contactMutation.mutate(data);
  };

  return (
    <section id="contato" className="py-20 bg-[hsl(222,18%,15%)] text-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-accent text-accent text-xl">Contato</span>
          <h2 className="font-heading text-4xl mb-6">Fale Conosco</h2>
          <p className="max-w-2xl mx-auto text-gray-300">
            Estamos à disposição para esclarecer suas dúvidas e atender suas necessidades espirituais.
          </p>
        </motion.div>
        
        <div className="flex flex-col md:flex-row gap-10">
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-primary/20 backdrop-blur-sm rounded-xl p-8 border border-primary/30 h-full">
              <h3 className="font-heading text-2xl mb-6 text-secondary">Informações de Contato</h3>
              
              <div className="flex items-start mb-6">
                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center mr-4 text-secondary">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium text-accent mb-1">Endereço</h4>
                  <p className="text-gray-300">Avenida Santa Clara, Campinas de Malhadas<br />Mata de São João–BA</p>
                </div>
              </div>
              
              <div className="flex items-start mb-6">
                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center mr-4 text-secondary">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium text-accent mb-1">Telefone</h4>
                  <p className="text-gray-300">(71) 98157-9418</p>
                </div>
              </div>
              
              <div className="flex items-start mb-6">
                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center mr-4 text-secondary">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium text-accent mb-1">E-mail</h4>
                  <p className="text-gray-300">contato@mestrereginaldo.com.br</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center mr-4 text-secondary">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium text-accent mb-1">Horário de Atendimento</h4>
                  <p className="text-gray-300">Segunda a Sexta: 9h às 18h<br />Sábado: 9h às 14h</p>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-white/20">
                <h4 className="font-medium text-accent mb-4">Redes Sociais</h4>
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-secondary hover:text-[hsl(222,18%,15%)] transition-colors">
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-secondary hover:text-[hsl(222,18%,15%)] transition-colors">
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-secondary hover:text-[hsl(222,18%,15%)] transition-colors">
                    <Youtube className="h-5 w-5" />
                  </a>
                  <a href="https://wa.me/5571981579418" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-secondary hover:text-[hsl(222,18%,15%)] transition-colors">
                    <MessageSquare className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-primary/20 backdrop-blur-sm rounded-xl p-8 border border-primary/30">
              <h3 className="font-heading text-2xl mb-6 text-secondary">Envie sua Mensagem</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-gray-300 mb-2">Nome completo *</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            className="w-full px-4 py-3 border border-primary/30 bg-white/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-white" 
                          />
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
                        <FormLabel className="block text-gray-300 mb-2">E-mail *</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="email"
                            className="w-full px-4 py-3 border border-primary/30 bg-white/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-white" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-gray-300 mb-2">Assunto *</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            className="w-full px-4 py-3 border border-primary/30 bg-white/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-white" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-gray-300 mb-2">Mensagem *</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            rows={5}
                            className="w-full px-4 py-3 border border-primary/30 bg-white/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-white" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit"
                    disabled={contactMutation.isPending}
                    className="w-full bg-secondary hover:bg-secondary/90 text-[hsl(222,18%,15%)] font-medium px-6 py-3 rounded-lg transition-colors"
                  >
                    {contactMutation.isPending ? "Enviando..." : "Enviar Mensagem"}
                  </Button>
                </form>
              </Form>
            </div>
          </motion.div>
        </div>
        
        <div className="mt-16 flex justify-center">
          <a 
            href="https://wa.me/5571981579418" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full text-lg transition-all transform hover:scale-105"
          >
            <MessageSquare className="h-6 w-6 mr-3" />
            Fale conosco pelo WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
