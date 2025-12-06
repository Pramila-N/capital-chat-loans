import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatBubbleProps {
  message: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  children?: React.ReactNode;
}

export const ChatBubble = ({ message, sender, timestamp, children }: ChatBubbleProps) => {
  const isUser = sender === 'user';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={cn(
        'flex gap-3 max-w-[85%]',
        isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'
      )}
    >
      {/* Avatar */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
        className={cn(
          'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
          isUser 
            ? 'bg-primary text-primary-foreground' 
            : 'bg-accent text-accent-foreground'
        )}
      >
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </motion.div>
      
      {/* Message Content */}
      <div className={cn('flex flex-col gap-1', isUser ? 'items-end' : 'items-start')}>
        <div
          className={cn(
            'px-4 py-3 max-w-full',
            isUser 
              ? 'chat-bubble-user' 
              : 'chat-bubble-bot'
          )}
        >
          {message && (
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message}</p>
          )}
          {children}
        </div>
        
        {/* Timestamp */}
        <span className="text-xs text-muted-foreground px-1">
          {format(timestamp, 'h:mm a')}
        </span>
      </div>
    </motion.div>
  );
};
