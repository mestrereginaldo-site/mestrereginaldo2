import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { spiritualCards } from "@/lib/cardsData";
import { HelpCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type CardState = {
  id: number;
  isFlipped: boolean;
  card: typeof spiritualCards[number] | null;
};

export default function CardsSection() {
  const [cards, setCards] = useState<CardState[]>([]);
  const [flippedCount, setFlippedCount] = useState(0);
  const [showReading, setShowReading] = useState(false);
  const [selectedCards, setSelectedCards] = useState<typeof spiritualCards[number][]>([]);

  const cardReadingMutation = useMutation({
    mutationFn: async (cards: typeof spiritualCards[number][]) => {
      return await apiRequest("POST", "/api/card-readings", {
        cards: cards,
        interpretation: generateInterpretation(cards)
      });
    },
    onSuccess: () => {
      setShowReading(true);
    },
    onError: (error) => {
      toast({
        title: "Erro ao processar leitura",
        description: "Não foi possível processar sua leitura de cartas.",
        variant: "destructive",
      });
    }
  });

  useEffect(() => {
    resetCards();
  }, []);

  const resetCards = () => {
    // Create a copy of the cards array to shuffle
    const shuffledCards = [...spiritualCards].sort(() => Math.random() - 0.5);
    
    // Take the first 6 cards for the game
    const gameCards = shuffledCards.slice(0, 6).map((card, index) => ({
      id: index,
      isFlipped: false,
      card
    }));

    setCards(gameCards);
    setFlippedCount(0);
    setShowReading(false);
    setSelectedCards([]);
  };

  const handleCardClick = (id: number) => {
    if (flippedCount >= 3) return;

    setCards(prev => 
      prev.map(card => 
        card.id === id ? { ...card, isFlipped: true } : card
      )
    );

    const clickedCard = cards.find(card => card.id === id);
    if (clickedCard && clickedCard.card) {
      setSelectedCards(prev => [...prev, clickedCard.card!]);
    }

    setFlippedCount(prev => {
      const newCount = prev + 1;
      if (newCount === 3) {
        // When 3 cards are flipped, process the reading
        const selected = cards
          .filter(card => card.id === id || card.isFlipped)
          .map(card => card.card!)
          .filter(Boolean);
          
        cardReadingMutation.mutate(selected);
      }
      return newCount;
    });
  };

  const generateInterpretation = (cards: typeof spiritualCards[number][]) => {
    const names = cards.map(card => card.name).join(", ");
    return `As cartas que você escolheu (${names}) revelam um momento de transformação espiritual em sua vida. 
            Há sinais de mudanças positivas, crescimento pessoal e proteção divina no seu caminho. 
            Os Orixás estão guiando seus passos para um período de harmonia e equilíbrio.`;
  };

  return (
    <section id="cartas" className="py-20 bg-[hsl(222,18%,15%)] text-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-accent text-accent text-xl">Oráculos</span>
          <h2 className="font-heading text-4xl mb-6">Jogo de Cartas Espirituais</h2>
          <p className="max-w-2xl mx-auto text-gray-300">
            As cartas espirituais revelam mensagens dos Orixás para guiar seu caminho. 
            Escolha três cartas e receba orientações sobre passado, presente e futuro.
          </p>
        </motion.div>
        
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 mb-10" id="cardsContainer">
          <AnimatePresence>
            {cards.map((card) => (
              <motion.div
                key={card.id}
                className={`card-flip w-full sm:w-48 md:w-56 lg:w-64 h-72 sm:h-80 md:h-96 relative cursor-pointer ${card.isFlipped ? 'card-flipped' : ''} max-w-[230px]`}
                onClick={() => !card.isFlipped && handleCardClick(card.id)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: card.id * 0.1 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="card-front absolute w-full h-full rounded-xl bg-primary/30 border-2 border-secondary flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center bg-secondary">
                      <HelpCircle className="h-8 w-8 text-[hsl(222,18%,15%)]" />
                    </div>
                    <p className="font-heading mt-4 text-lg">Toque para revelar</p>
                  </div>
                </div>
                <div className="card-back absolute w-full h-full rounded-xl bg-gradient-to-br from-primary to-[hsl(222,18%,15%)] border-2 border-secondary p-6 flex flex-col items-center justify-center">
                  {card.card?.useFullImage ? (
                    <div className="w-32 h-32 overflow-hidden rounded-full mb-4 border-2 border-secondary">
                      <img 
                        src={card.card?.image} 
                        alt={`Carta de ${card.card?.name}`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div 
                      className="w-32 h-32 overflow-hidden rounded-full mb-4 border-2 border-secondary"
                      style={{
                        backgroundImage: `url(${card.card?.image})`,
                        backgroundPosition: card.card?.imagePosition,
                        backgroundSize: '400%',
                        backgroundRepeat: 'no-repeat'
                      }}
                    ></div>
                  )}
                  <h3 className="font-heading text-xl mb-2 text-secondary">{card.card?.name}</h3>
                  <p className="text-sm text-center">{card.card?.description}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        <div className="text-center mt-12">
          <Button 
            variant="secondary"
            size="lg"
            onClick={resetCards}
            className="bg-secondary text-[hsl(222,18%,15%)] hover:bg-secondary/90 px-8 py-3 rounded-full text-lg transition-all transform hover:scale-105"
          >
            Embaralhar Cartas
          </Button>
        </div>
        
        <AnimatePresence>
          {showReading && (
            <motion.div 
              id="cardReading" 
              className="mt-12 p-6 border border-accent/30 rounded-lg bg-primary/20 max-w-3xl mx-auto"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="font-heading text-2xl mb-4 text-accent">Sua Leitura Espiritual</h3>
              <p className="mb-6">
                {generateInterpretation(selectedCards)}
              </p>
              <div className="flex justify-center">
                <Button 
                  variant="outline"
                  className="bg-accent hover:bg-accent/90 text-[hsl(222,18%,15%)] px-6 py-2 rounded-full text-sm transition-all transform hover:scale-105"
                  onClick={() => {
                    const element = document.querySelector("#consultas");
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Agendar consulta detalhada
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
