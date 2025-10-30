import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { WaveDivider } from "@/components/ui/wave-divider";

export default function HeroSection() {
  return (
    <section 
      id="inicio" 
      className="relative overflow-hidden bg-mystical-pattern bg-cover bg-center py-24 text-center text-white"
    >
      <div className="absolute inset-0 bg-[hsl(222,18%,15%)] bg-opacity-70"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2 
          className="font-heading text-4xl md:text-6xl mb-6 text-secondary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Descubra seu Caminho Espiritual
        </motion.h2>
        <motion.p 
          className="text-xl md:text-2xl max-w-3xl mx-auto mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Consultas espirituais, jogos de cartas e búzios para guiar sua jornada com a sabedoria ancestral dos Orixás
        </motion.p>
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button 
            variant="default"
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full text-lg transition-all transform hover:scale-105"
            onClick={() => {
              const element = document.querySelector("#consultas");
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Agendar Consulta
          </Button>
          <Button 
            variant="secondary"
            size="lg"
            className="bg-secondary hover:bg-secondary/90 text-[hsl(222,18%,15%)] px-8 py-3 rounded-full text-lg transition-all transform hover:scale-105"
            onClick={() => {
              const element = document.querySelector("#cartas");
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Consultar Cartas
          </Button>
        </motion.div>
      </div>
      <WaveDivider className="absolute bottom-0 w-full" />
    </section>
  );
}
