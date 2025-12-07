import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

export const TypingIndicator = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex gap-3 max-w-[85%] mr-auto"
    >
      {/* Avatar */}
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center">
        <Bot className="w-4 h-4" />
      </div>
      
      {/* Typing Bubble */}
      <div className="chat-bubble-bot px-4 py-3">
        <div className="flex gap-1.5 items-center h-5">
          <div className="typing-dot w-2 h-2 rounded-full bg-primary" />
          <div className="typing-dot w-2 h-2 rounded-full bg-primary" />
          <div className="typing-dot w-2 h-2 rounded-full bg-primary" />
        </div>
      </div>
    </motion.div>
  );
};
