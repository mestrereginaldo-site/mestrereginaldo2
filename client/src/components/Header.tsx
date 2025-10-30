import { useState } from "react";
import { Link as WouterLink } from "wouter";
import { Menu, Moon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "#inicio", label: "Início" },
    { href: "#cartas", label: "Cartas" },
    { href: "#buzios", label: "Búzios" },
    { href: "#simpatias", label: "Simpatias" },
    { href: "#consultas", label: "Consultas" },
    { href: "#contato", label: "Contato" },
  ];

  return (
    <header className="bg-[hsl(222,18%,15%)] text-[hsl(48,100%,95%)]">
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mr-3">
            <Moon className="h-6 w-6 text-secondary" />
          </div>
          <div>
            <h1 className="font-heading text-2xl font-bold">Pai Regi de Yemanjá</h1>
            <p className="font-accent text-accent">Consultas Espirituais</p>
          </div>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex flex-wrap justify-center gap-2 md:gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a 
                  href={link.href}
                  className="px-3 py-2 hover:text-secondary transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.querySelector(link.href);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button className="block text-white p-2">
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent className="bg-[hsl(222,18%,15%)] text-[hsl(48,100%,95%)] border-l border-primary/20">
              <nav className="mt-6">
                <ul className="space-y-4">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="block px-3 py-2 hover:text-secondary transition-colors"
                        onClick={(e) => {
                          e.preventDefault();
                          setIsOpen(false);
                          const element = document.querySelector(link.href);
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
