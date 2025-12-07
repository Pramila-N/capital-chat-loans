import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { LandingPage } from '@/components/LandingPage';
import { ChatWindow } from '@/components/chat/ChatWindow';
import { useChatStore } from '@/store/chatStore';

const Index = () => {
  const navigate = useNavigate();
  const { isChatOpen, setChatOpen, isVerified } = useChatStore();
  const [showFullChat, setShowFullChat] = useState(false);

  const handleStartChat = () => {
    setShowFullChat(true);
    setChatOpen(true);
  };

  const handleOpenWidget = () => {
    navigate('/login');
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
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpenWidget}
            className="fixed bottom-6 right-6 group cursor-pointer z-30"
          >
            {/* Animated Chat Messages - Outside bubble */}
            <motion.div
              animate={{ opacity: [0, 1, 1, 0], y: [-40, -20, -20, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-16 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
            >
              <div className="bg-white text-primary text-xs px-3 py-2 rounded-lg font-semibold shadow-lg border border-primary/10">
                Hello! 👋
              </div>
            </motion.div>

            {/* Main Chat Bubble */}
            <motion.div
              className="w-16 h-16 rounded-full gradient-primary shadow-prominent flex items-center justify-center relative"
              whileHover={{ boxShadow: '0 20px 40px rgba(59, 130, 246, 0.4)' }}
            >
              {/* Chat Icon */}
              <MessageCircle className="w-7 h-7 text-primary-foreground relative z-10" />

              {/* Notification Dot */}
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent border-2 border-background"
              />
            </motion.div>

            {/* Tooltip on hover */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileHover={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-full right-0 mb-3 bg-foreground text-background px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap pointer-events-none"
            >
              🔐 Login to Chat
            </motion.div>
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
