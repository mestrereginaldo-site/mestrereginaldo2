import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Global styles for the custom components
import '@/components/ui/wave-divider.tsx';

// Adding this for the custom styling
const style = document.createElement('style');
style.textContent = `
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  
  @layer base {
    :root {
      --background: 48 33% 97%;
      --foreground: 222.2 84% 4.9%;
      
      --card: 0 0% 100%;
      --card-foreground: 222.2 84% 4.9%;
      
      --popover: 0 0% 100%;
      --popover-foreground: 222.2 84% 4.9%;
      
      --primary: 266 42% 44%;
      --primary-foreground: 210 40% 98%;
      
      --secondary: 43 75% 60%;
      --secondary-foreground: 222.2 84% 4.9%;
      
      --muted: 210 40% 96.1%;
      --muted-foreground: 215.4 16.3% 46.9%;
      
      --accent: 174 67% 51%;
      --accent-foreground: 222.2 84% 4.9%;
      
      --destructive: 0 84.2% 60.2%;
      --destructive-foreground: 210 40% 98%;
      
      --border: 214.3 31.8% 91.4%;
      --input: 214.3 31.8% 91.4%;
      --ring: 266 42% 44%;
      
      --radius: 0.5rem;
      
      --darkBg: 222 18% 15%;
      --lightBg: 48 100% 95%;
    }
  }
  
  body {
    font-family: 'Raleway', sans-serif;
    background-color: hsl(var(--lightBg));
    color: hsl(var(--foreground));
  }
  
  .font-heading {
    font-family: 'Cinzel', serif;
  }
  
  .font-accent {
    font-family: 'Courgette', cursive;
  }
  
  .bg-mystical-pattern {
    background-image: url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80');
  }
  
  .card-flip {
    perspective: 1000px;
    transition: transform 0.6s;
    transform-style: preserve-3d;
  }
  
  .card-front, .card-back {
    backface-visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  
  .card-back {
    transform: rotateY(180deg);
  }
  
  .card-flipped {
    transform: rotateY(180deg);
  }
  
  .buzio {
    transition: transform 0.5s ease-in-out;
  }
  
  .buzio-active {
    transform: translateY(-10px) rotate(5deg);
  }
`;

document.head.appendChild(style);

createRoot(document.getElementById("root")!).render(<App />);
