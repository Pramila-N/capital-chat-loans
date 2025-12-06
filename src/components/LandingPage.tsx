import { motion } from 'framer-motion';
import { ArrowRight, Shield, Clock, BadgeCheck, Sparkles, MessageCircle, Star, TrendingDown, Users, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LoanSlider } from '@/components/LoanSlider';
import aiAssistantImage from '@/assets/ai-assistant.png';

interface LandingPageProps {
  onStartChat: () => void;
}

export const LandingPage = ({ onStartChat }: LandingPageProps) => {
  const features = [
    { icon: Clock, title: 'Instant Approval', description: 'Get approved in under 5 minutes with our AI' },
    { icon: Shield, title: '100% Secure', description: 'Bank-grade encryption protects your data' },
    { icon: BadgeCheck, title: 'RBI Regulated', description: 'Fully compliant with all regulations' },
  ];

  const stats = [
    { value: '2M+', label: 'Happy Customers', icon: Users },
    { value: '₹5000Cr+', label: 'Loans Disbursed', icon: Building2 },
    { value: '4.8', label: 'App Rating', icon: Star, showFill: true },
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-6 py-4 flex items-center justify-between max-w-7xl mx-auto"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
            <span className="font-display font-bold text-primary-foreground text-lg">T</span>
          </div>
          <div>
            <h1 className="font-display font-bold text-foreground text-lg">Tata Capital</h1>
            <p className="text-xs text-muted-foreground">Personal Loans</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
          <Shield className="w-4 h-4" />
          <span>End-to-end encrypted</span>
        </div>
      </motion.header>

      {/* Hero Section */}
      <main className="px-6 py-8 lg:py-12 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">AI-Powered Instant Loans</span>
            </motion.div>

            {/* Headline */}
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Personal Loans
              <span className="block bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">Approved in Minutes</span>
            </h2>

            {/* Subheadline */}
            <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0">
              Chat with our AI assistant to get instant loan approval. No paperwork, no branch visits, just a simple conversation.
            </p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                onClick={onStartChat}
                size="lg"
                className="gradient-primary text-primary-foreground font-semibold rounded-full px-8 h-14 text-lg shadow-elevated hover:shadow-prominent transition-all duration-300 hover:scale-105 group"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Start Conversation
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-8 h-14 text-lg border-primary/20 hover:bg-primary/5"
              >
                Check Eligibility
              </Button>
            </motion.div>

            {/* Trust Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex items-center justify-center lg:justify-start gap-6 sm:gap-10 mt-10 pt-8 border-t border-border/50"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <stat.icon className={`w-4 h-4 ${stat.showFill ? 'text-accent fill-accent' : 'text-primary'}`} />
                    <span className="font-display text-xl sm:text-2xl font-bold text-foreground">{stat.value}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - AI Assistant Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="relative flex flex-col items-center justify-center gap-8"
          >
            {/* AI Assistant Image */}
            <div className="relative">
              {/* Background Decorations */}
              <div className="absolute inset-0 flex items-center justify-center -z-10">
                <div className="w-64 h-64 rounded-full bg-primary/5 animate-pulse" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center -z-10">
                <div className="w-48 h-48 rounded-full bg-accent/10 animate-pulse" style={{ animationDelay: '0.5s' }} />
              </div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <img
                  src={aiAssistantImage}
                  alt="AI Loan Assistant"
                  className="w-56 h-56 lg:w-72 lg:h-72 object-contain drop-shadow-xl"
                />
              </motion.div>

              {/* Floating Cards */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, type: 'spring' }}
                className="absolute -top-4 -right-4 lg:right-0 glass-card rounded-xl px-3 py-2 shadow-card"
              >
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center">
                    <BadgeCheck className="w-3.5 h-3.5 text-accent" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground">Credit Score</p>
                    <p className="font-display font-semibold text-sm text-foreground">750+</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, type: 'spring' }}
                className="absolute -bottom-4 -left-4 lg:left-0 glass-card rounded-xl px-3 py-2 shadow-card"
              >
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground">Approval</p>
                    <p className="font-display font-semibold text-sm text-foreground">&lt; 5 mins</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Loan Calculator */}
            <LoanSlider onStartChat={onStartChat} />
          </motion.div>
        </div>
      </main>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="px-6 py-16 max-w-7xl mx-auto"
      >
        <div className="text-center mb-10">
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-3">Why Choose Tata Capital?</h3>
          <p className="text-muted-foreground">Experience the future of lending with our AI-powered platform</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.1 }}
              className="glass-card rounded-2xl p-6 text-center hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h4 className="font-display font-semibold text-foreground mb-2">{feature.title}</h4>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-border/50 bg-secondary/30">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2024 Tata Capital. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
