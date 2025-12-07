import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Slider } from '@/components/ui/slider';
import { IndianRupee, Calendar, TrendingDown } from 'lucide-react';
import { useChatStore } from '@/store/chatStore';

interface LoanSliderProps {
  onStartChat: () => void;
}

export const LoanSlider = ({ onStartChat }: LoanSliderProps) => {
  const navigate = useNavigate();
  const { isVerified } = useChatStore();
  const [amount, setAmount] = useState([300000]);
  const [tenure, setTenure] = useState([24]);
  
  const interestRate = 10.5;
  const principal = amount[0];
  const months = tenure[0];
  const monthlyRate = interestRate / 1200;
  const emi = Math.round((principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1));
  
  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="glass-card rounded-2xl p-6 max-w-md mx-auto lg:mx-0"
    >
      <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
        <TrendingDown className="w-5 h-5 text-primary" />
        Loan Calculator
      </h3>
      
      {/* Amount Slider */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between">
          <label className="text-sm text-muted-foreground">Loan Amount</label>
          <span className="font-display font-bold text-lg text-primary">{formatCurrency(principal)}</span>
        </div>
        <Slider
          value={amount}
          onValueChange={setAmount}
          min={50000}
          max={1000000}
          step={10000}
          className="[&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>₹50K</span>
          <span>₹10L</span>
        </div>
      </div>
      
      {/* Tenure Slider */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between">
          <label className="text-sm text-muted-foreground">Tenure</label>
          <span className="font-display font-bold text-lg text-foreground">{months} months</span>
        </div>
        <Slider
          value={tenure}
          onValueChange={setTenure}
          min={6}
          max={60}
          step={6}
          className="[&_[role=slider]]:bg-accent [&_[role=slider]]:border-accent"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>6 mo</span>
          <span>60 mo</span>
        </div>
      </div>
      
      {/* EMI Display */}
      <div className="bg-secondary rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
            <IndianRupee className="w-5 h-5 text-accent" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Monthly EMI</p>
            <p className="font-display font-bold text-xl text-foreground">{formatCurrency(emi)}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Interest Rate</p>
          <p className="font-display font-semibold text-accent">{interestRate}% p.a.</p>
        </div>
      </div>
      
      <button
        onClick={() => {
          if (!isVerified) navigate('/login');
          else onStartChat();
        }}
        className="w-full mt-4 py-3 gradient-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition-opacity"
      >
        Apply for This Amount
      </button>
    </motion.div>
  );
};
