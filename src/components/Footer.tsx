import { Moon, Instagram, Facebook, Youtube, MessageSquare } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[hsl(222,18%,15%)] text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between mb-12">
          <div className="mb-8 md:mb-0 md:w-1/3">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mr-3">
                <Moon className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold">Pai Regi de Yemanjá</h3>
                <p className="font-accent text-accent text-sm">Consultas Espirituais</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 text-sm">
              Oferecendo orientação espiritual, consultas com jogo de búzios e cartas, 
              e rituais para harmonizar energias e trazer equilíbrio para sua vida.
            </p>
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
          
          <div className="mb-8 md:mb-0 md:w-1/4">
            <h3 className="font-heading text-lg mb-4 text-secondary">Navegação</h3>
            <ul className="space-y-2">
              {["Início", "Jogo de Cartas", "Jogo de Búzios", "Simpatias e Rituais", "Consultas", "Contato"].map((item, index) => (
                <li key={index}>
                  <a 
                    href={`#${["inicio", "cartas", "buzios", "simpatias", "consultas", "contato"][index]}`}
                    className="text-gray-400 hover:text-secondary transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.querySelector(`#${["inicio", "cartas", "buzios", "simpatias", "consultas", "contato"][index]}`);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mb-8 md:mb-0 md:w-1/4">
            <h3 className="font-heading text-lg mb-4 text-secondary">Serviços</h3>
            <ul className="space-y-2">
              {["Consulta Online", "Jogo de Búzios Completo", "Limpeza Espiritual", "Simpatias Personalizadas", "Leitura de Cartas"].map((item, index) => (
                <li key={index}>
                  <a 
                    href="#consultas"
                    className="text-gray-400 hover:text-secondary transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.querySelector("#consultas");
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Pai Regi de Yemanjá - Consultas Espirituais. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
