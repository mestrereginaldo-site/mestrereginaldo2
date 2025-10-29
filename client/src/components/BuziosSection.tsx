import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { buzios } from "@/lib/buziosData";
import { toast } from "@/hooks/use-toast";

export default function BuziosSection() {
  const [question, setQuestion] = useState("");
  const [isThrown, setIsThrown] = useState(false);
  const [showInterpretation, setShowInterpretation] = useState(false);
  const [buziosPattern, setBuziosPattern] = useState<Array<{ id: number; rotation: number }>>([]);
  const questionRef = useRef<HTMLInputElement>(null);

  const buzioReadingMutation = useMutation({
    mutationFn: async (data: { question: string, result: any }) => {
      return await apiRequest("POST", "/api/buzios-readings", {
        question: data.question,
        result: data.result,
        interpretation: generateInterpretation()
      });
    },
    onSuccess: () => {
      setTimeout(() => {
        setShowInterpretation(true);
      }, 1500);
    },
    onError: (error) => {
      toast({
        title: "Erro ao processar leitura",
        description: "Não foi possível processar sua leitura de búzios.",
        variant: "destructive",
      });
      setIsThrown(false);
    }
  });

  const throwBuzios = () => {
    if (!question.trim()) {
      toast({
        title: "Pergunta necessária",
        description: "Por favor, digite sua pergunta antes de lançar os búzios.",
        variant: "destructive",
      });
      questionRef.current?.focus();
      return;
    }

    // Generate random pattern for buzios
    const pattern = buzios.map((buzio, index) => ({
      id: index,
      rotation: Math.floor(Math.random() * 360),
    }));

    setBuziosPattern(pattern);
    setIsThrown(true);
    
    // Process the reading
    buzioReadingMutation.mutate({
      question,
      result: pattern
    });
  };

  const generateInterpretation = () => {
    // Different interpretations based on possible patterns
    const interpretations = [
      "Os búzios indicam que seu caminho está sob a proteção de Oxum. Há prosperidade e abundância se aproximando, especialmente no campo emocional e financeiro.",
      "Xangô se manifesta nos búzios, trazendo justiça e realizações para sua vida. É um momento de colher os frutos do seu trabalho e determinação.",
      "Iemanjá está presente na leitura, indicando que você precisa se conectar mais com suas emoções e intuição. Cuide do seu lar e das relações familiares.",
      "Os búzios revelam a presença de Oxóssi, trazendo oportunidades e novos caminhos. É um bom momento para explorar novas possibilidades.",
      "Ogum aparece nos búzios, mostrando que você tem força para superar os obstáculos. A vitória virá através da persistência e determinação."
    ];

    // Randomly select an interpretation
    return interpretations[Math.floor(Math.random() * interpretations.length)];
  };

  const resetBuzios = () => {
    setQuestion("");
    setIsThrown(false);
    setShowInterpretation(false);
    setBuziosPattern([]);
  };

  return (
    <section id="buzios" className="py-20 bg-[hsl(48,100%,95%)]">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-accent text-primary text-xl">Divinação</span>
          <h2 className="font-heading text-4xl mb-6 text-[hsl(222,18%,15%)]">Jogo de Búzios</h2>
          <p className="max-w-2xl mx-auto text-gray-700">
            O jogo de búzios é um método de divinação sagrado utilizado para comunicação com os Orixás. 
            Faça sua pergunta e lance os búzios para receber orientação.
          </p>
        </motion.div>
        
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 mb-10">
          <div className="mb-6">
            <Label htmlFor="buziosQuestion" className="block text-gray-700 mb-2 font-medium">
              Faça sua pergunta ao Oráculo:
            </Label>
            <Input 
              id="buziosQuestion"
              ref={questionRef}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Digite sua pergunta aqui..." 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <div className="flex justify-center mb-10">
            <Button 
              variant="default"
              onClick={throwBuzios}
              disabled={isThrown}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full text-lg transition-all transform hover:scale-105"
            >
              Lançar Búzios
            </Button>
          </div>
          
          <div className="relative h-48 sm:h-56 md:h-64 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-4 flex justify-center items-center" id="buziosContainer">
            {!isThrown && (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-center text-gray-600">
                  Faça sua pergunta e lance os búzios para receber orientação dos Orixás
                </p>
              </div>
            )}
            
            <AnimatePresence>
              {isThrown && (
                <motion.div 
                  id="buziosResult" 
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {buzios.map((buzio, index) => {
                    const pattern = buziosPattern.find(p => p.id === index);
                    return (
                      <motion.div 
                        key={index} 
                        className="buzio transition-all"
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ 
                          y: [0, -10, 0], 
                          opacity: 1,
                          rotate: pattern?.rotation || 0 
                        }}
                        transition={{ 
                          duration: 0.5, 
                          delay: index * 0.1,
                          y: { repeat: 0, duration: 0.5 }
                        }}
                      >
                        <img 
                          src={buzio.image} 
                          alt="Búzio" 
                          className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain mx-auto" 
                        />
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <AnimatePresence>
            {showInterpretation && (
              <motion.div 
                id="buziosInterpretation" 
                className="mt-8 p-6 border border-primary/30 rounded-lg bg-primary/5"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="font-heading text-xl mb-4 text-primary">Interpretação dos Búzios</h3>
                <p className="mb-4">
                  {generateInterpretation()}
                </p>
                <p className="italic text-gray-600 text-sm">
                  Este é apenas um oráculo simplificado. Para uma consulta completa com o jogo de búzios, agende uma sessão personalizada.
                </p>
                <div className="flex flex-col sm:flex-row justify-center mt-6 gap-3 sm:gap-4">
                  <Button 
                    variant="outline"
                    className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-full text-sm transition-all transform hover:scale-105"
                    onClick={() => {
                      const element = document.querySelector("#consultas");
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    Agendar consulta completa
                  </Button>
                  <Button 
                    variant="ghost"
                    className="text-primary hover:text-primary/90 px-6 py-2 text-sm"
                    onClick={resetBuzios}
                  >
                    Fazer nova pergunta
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
