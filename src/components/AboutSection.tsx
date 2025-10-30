import { motion } from "framer-motion";
import { Star, Users, Award } from "lucide-react";
import iemanjaImg from "../assets/individuais/iemanja-nova.jpeg";

export default function AboutSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div 
              className="rounded-lg shadow-xl overflow-hidden w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]" 
            >
              <img 
                src={iemanjaImg}
                alt="Yemanjá, Rainha do Mar"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-accent text-primary text-xl">Sobre</span>
            <h2 className="font-heading text-3xl md:text-4xl mb-6 text-[hsl(222,18%,15%)]">Pai Regi de Yemanjá</h2>
            <p className="text-gray-700 mb-6">Com mais de 20 anos de experiência nos cultos de matriz africana, ofereço orientação espiritual através de consultas presenciais e online. Sou filho de Yemanjá e fui iniciado nas tradições do Candomblé Ketu.</p>
            <p className="text-gray-700 mb-6">Meu trabalho é guiado pelos Orixás e entidades de luz para trazer equilíbrio, paz e prosperidade para aqueles que buscam ajuda espiritual.</p>
            <div className="flex items-center gap-6 mt-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <p className="text-gray-700"><span className="font-bold text-primary">1200+</span><br />Consultas</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <p className="text-gray-700"><span className="font-bold text-primary">850+</span><br />Clientes</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <p className="text-gray-700"><span className="font-bold text-primary">20+</span><br />Anos</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
