import { MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

export default function WhatsAppButton() {
  return (
    <motion.a 
      href="https://wa.me/5571981579418" 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl shadow-lg hover:bg-green-700 hover:scale-110 transition-all z-50"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 1.5
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <MessageSquare className="h-8 w-8" />
    </motion.a>
  );
}
