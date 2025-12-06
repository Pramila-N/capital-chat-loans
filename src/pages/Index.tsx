import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { LandingPage } from '@/components/LandingPage';
import { ChatWindow } from '@/components/chat/ChatWindow';
import { useChatStore } from '@/store/chatStore';

const Index = () => {
  const { isChatOpen, setChatOpen } = useChatStore();
  const [showFullChat, setShowFullChat] = useState(false);

  const handleStartChat = () => {
    setShowFullChat(true);
    setChatOpen(true);
  };

  const handleOpenWidget = () => {
    setChatOpen(true);
  };

  const handleCloseChat = () => {
    setChatOpen(false);
  };

  if (showFullChat) {
    return <ChatWindow isFullPage />;
  }

  return (
    <>
      <LandingPage onStartChat={handleStartChat} />

      {/* Floating Chat Widget Button */}
      <AnimatePresence>
        {!isChatOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpenWidget}
            className="fixed bottom-6 right-6 w-16 h-16 rounded-full gradient-primary shadow-prominent flex items-center justify-center z-50 group"
          >
            <MessageCircle className="w-7 h-7 text-primary-foreground" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent border-2 border-background animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Widget */}
      <AnimatePresence>
        {isChatOpen && !showFullChat && (
          <ChatWindow onClose={handleCloseChat} />
        )}
      </AnimatePresence>
    </>
  );
};

export default Index;
