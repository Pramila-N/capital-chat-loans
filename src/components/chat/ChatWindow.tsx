import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, Paperclip, RotateCcw, X, Shield, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChatBubble } from './ChatBubble';
import { TypingIndicator } from './TypingIndicator';
import { ProgressTracker } from './ProgressTracker';
import { QuickReplyButtons } from './QuickReplyButtons';
import { FormCard } from './FormCard';
import { StatusCard } from './StatusCard';
import { OfferCard } from './OfferCard';
import { SanctionLetterCard } from './SanctionLetterCard';
import { useChatStore } from '@/store/chatStore';
import { useChatFlow } from '@/hooks/useChatFlow';
import { cn } from '@/lib/utils';

interface ChatWindowProps {
  isFullPage?: boolean;
  onClose?: () => void;
}

export const ChatWindow = ({ isFullPage = false, onClose }: ChatWindowProps) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const { messages, isTyping, currentStep, userDetails, loanOffer, resetChat } = useChatStore();
  const { sendMessage, handleQuickReply, handleFormSubmit, initializeChat, acceptOffer } = useChatFlow();

  useEffect(() => {
    initializeChat();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
    inputRef.current?.focus();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleRestart = () => {
    resetChat();
    setTimeout(() => initializeChat(), 100);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={cn(
        'flex flex-col bg-background',
        isFullPage 
          ? 'fixed inset-0 z-50' 
          : 'fixed bottom-4 right-4 w-[400px] h-[600px] max-h-[80vh] rounded-2xl shadow-prominent border border-border overflow-hidden z-50'
      )}
    >
      {/* Header */}
      <div className="gradient-primary px-4 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-display font-semibold text-primary-foreground">AI Loan Assistant</h2>
            <p className="text-xs text-primary-foreground/70 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Online • Tata Capital
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleRestart}
            className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10 rounded-full"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
          {!isFullPage && onClose && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10 rounded-full"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Progress Tracker */}
      {currentStep !== 'welcome' && currentStep !== 'complete' && (
        <ProgressTracker currentStep={currentStep} />
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide gradient-hero">
        <AnimatePresence mode="popLayout">
          {messages.map((message) => (
            <div key={message.id}>
              <ChatBubble
                message={message.content}
                sender={message.sender}
                timestamp={message.timestamp}
              >
                {/* Render special content based on message type */}
                {message.type === 'quick-reply' && message.data?.options && (
                  <QuickReplyButtons
                    options={message.data.options as string[]}
                    onSelect={handleQuickReply}
                  />
                )}
                {message.type === 'form' && message.data?.formType && (
                  <FormCard
                    type={message.data.formType as 'pan' | 'dob' | 'employment' | 'income' | 'contact'}
                    onSubmit={handleFormSubmit}
                  />
                )}
                {message.type === 'status' && message.data && (
                  <StatusCard
                    status={message.data.status as 'loading' | 'success' | 'error'}
                    title={message.data.title as string}
                    description={message.data.description as string}
                    type={message.data.type as 'kyc' | 'credit' | 'eligibility'}
                  />
                )}
                {message.type === 'offer' && loanOffer && (
                  <OfferCard
                    offer={loanOffer}
                    onAccept={acceptOffer}
                  />
                )}
                {message.type === 'sanction' && loanOffer && (
                  <SanctionLetterCard
                    offer={loanOffer}
                    userName={userDetails.name || ''}
                    onDownload={() => console.log('Download sanction letter')}
                  />
                )}
              </ChatBubble>
            </div>
          ))}
        </AnimatePresence>
        
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Trust Badge */}
      <div className="px-4 py-2 border-t border-border/50 bg-card/50">
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Shield className="w-3 h-3" />
          <span>End-to-end encrypted • RBI Regulated</span>
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-border bg-card flex-shrink-0">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-primary rounded-full flex-shrink-0"
          >
            <Paperclip className="w-5 h-5" />
          </Button>
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 rounded-full border-input bg-secondary focus:bg-background transition-colors"
          />
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-primary rounded-full flex-shrink-0"
          >
            <Mic className="w-5 h-5" />
          </Button>
          <Button
            onClick={handleSend}
            disabled={!input.trim()}
            className="gradient-primary text-primary-foreground rounded-full w-10 h-10 p-0 flex-shrink-0 hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
