import { motion } from 'framer-motion';
import { CheckCircle2, TrendingDown, Calendar, Banknote, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';
import type { LoanOffer } from '@/store/chatStore';

interface OfferCardProps {
  offer: LoanOffer;
  onAccept: () => void;
  onViewMore?: () => void;
}

export const OfferCard = ({ offer, onAccept, onViewMore }: OfferCardProps) => {
  useEffect(() => {
    // Trigger confetti on mount
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#0054A6', '#8DC63F', '#FFD700'],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#0054A6', '#8DC63F', '#FFD700'],
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="relative overflow-hidden rounded-2xl"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 gradient-primary opacity-95" />
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/10 rounded-full translate-y-1/2 -translate-x-1/2" />
      
      <div className="relative z-10 p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2 mb-4"
        >
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Sparkles className="w-6 h-6 text-accent" />
          </motion.div>
          <span className="text-sm font-medium text-primary-foreground/80">Congratulations!</span>
        </motion.div>
        
        {/* Approved Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
          className="flex items-center gap-2 mb-4"
        >
          <CheckCircle2 className="w-8 h-8 text-accent" />
          <h3 className="font-display text-2xl font-bold text-primary-foreground">Loan Approved!</h3>
        </motion.div>
        
        {/* Amount */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-6"
        >
          <p className="text-primary-foreground/70 text-sm mb-1">Sanction Amount</p>
          <p className="font-display text-4xl font-bold text-accent">
            {formatCurrency(offer.amount)}
          </p>
        </motion.div>
        
        {/* Details Grid */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-3 gap-4 mb-6"
        >
          <div className="bg-primary-foreground/10 rounded-xl p-3 text-center">
            <TrendingDown className="w-5 h-5 text-accent mx-auto mb-1" />
            <p className="text-xs text-primary-foreground/70">Interest</p>
            <p className="font-display font-semibold text-primary-foreground">{offer.interestRate}%</p>
          </div>
          <div className="bg-primary-foreground/10 rounded-xl p-3 text-center">
            <Calendar className="w-5 h-5 text-accent mx-auto mb-1" />
            <p className="text-xs text-primary-foreground/70">Tenure</p>
            <p className="font-display font-semibold text-primary-foreground">{offer.tenure} mo</p>
          </div>
          <div className="bg-primary-foreground/10 rounded-xl p-3 text-center">
            <Banknote className="w-5 h-5 text-accent mx-auto mb-1" />
            <p className="text-xs text-primary-foreground/70">EMI</p>
            <p className="font-display font-semibold text-primary-foreground">{formatCurrency(offer.emi)}</p>
          </div>
        </motion.div>
        
        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex gap-3"
        >
          <Button
            onClick={onAccept}
            className="flex-1 bg-accent hover:bg-accent-dark text-accent-foreground font-semibold rounded-xl h-12 shadow-glow transition-all duration-200 hover:scale-[1.02]"
          >
            Accept Offer
          </Button>
          {onViewMore && (
            <Button
              variant="outline"
              onClick={onViewMore}
              className="flex-1 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 rounded-xl h-12"
            >
              View More
            </Button>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};
