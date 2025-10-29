import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { simpatias } from "@/lib/simpatiasData";
import { Heart, Coins, Shield } from "lucide-react";

export default function SimpatiasSection() {
  const [selectedSimpatia, setSelectedSimpatia] = useState<typeof simpatias[number] | null>(null);
  const [open, setOpen] = useState(false);

  const getIcon = (type: string) => {
    switch (type) {
      case "love":
        return <Heart className="h-6 w-6" />;
      case "prosperity":
        return <Coins className="h-6 w-6" />;
      case "protection":
        return <Shield className="h-6 w-6" />;
      default:
        return <Heart className="h-6 w-6" />;
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="simpatias" className="py-20 bg-gradient-to-b from-[hsl(222,18%,15%)] to-primary text-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-accent text-secondary text-xl">Conhecimento Ancestral</span>
          <h2 className="font-heading text-4xl mb-6">Simpatias e Rituais</h2>
          <p className="max-w-2xl mx-auto text-gray-300">
            Simpatias e rituais para harmonizar energias, atrair prosperidade e amor, e afastar energias negativas.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {simpatias.map((simpatia, index) => (
            <motion.div 
              key={index} 
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-secondary/30 hover:border-secondary transition-all hover:shadow-lg hover:shadow-accent/10 group"
              variants={item}
            >
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4 text-[hsl(222,18%,15%)] group-hover:scale-110 transition-transform">
                {getIcon(simpatia.type)}
              </div>
              <h3 className="font-heading text-xl mb-3 text-secondary">{simpatia.title}</h3>
              <p className="text-gray-300 mb-4">{simpatia.description}</p>
              <div className="mb-4">
                <h4 className="font-medium text-accent mb-2">Ingredientes:</h4>
                <ul className="list-disc list-inside text-gray-300 text-sm">
                  {simpatia.ingredients.map((ingredient, i) => (
                    <li key={i}>{ingredient}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-4 pt-4 border-t border-white/20">
                <button 
                  className="text-secondary hover:underline text-sm flex items-center"
                  onClick={() => {
                    setSelectedSimpatia(simpatia);
                    setOpen(true);
                  }}
                >
                  Ver instruções completas
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 ml-2" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="text-center mt-12">
          <Button 
            variant="secondary"
            size="lg"
            className="bg-secondary hover:bg-secondary/90 text-[hsl(222,18%,15%)] px-8 py-3 rounded-full text-lg transition-all transform hover:scale-105"
            onClick={() => {
              const element = document.querySelector("#consultas");
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Consulta Personalizada
          </Button>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-[hsl(222,18%,15%)] text-white border border-secondary">
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl text-secondary">{selectedSimpatia?.title}</DialogTitle>
            <DialogDescription className="text-gray-300 mt-2">
              {selectedSimpatia?.description}
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-4">
            <h4 className="font-medium text-accent mb-2">Ingredientes:</h4>
            <ul className="list-disc list-inside text-gray-300 mb-4">
              {selectedSimpatia?.ingredients.map((ingredient, i) => (
                <li key={i}>{ingredient}</li>
              ))}
            </ul>
            
            <h4 className="font-medium text-accent mb-2">Instruções:</h4>
            <ol className="list-decimal list-inside text-gray-300 space-y-2">
              {selectedSimpatia?.instructions.map((instruction, i) => (
                <li key={i}>{instruction}</li>
              ))}
            </ol>
            
            <div className="mt-6 bg-primary/20 p-4 rounded-lg">
              <p className="text-accent font-medium mb-1">Momento ideal:</p>
              <p className="text-gray-300">{selectedSimpatia?.timing}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
