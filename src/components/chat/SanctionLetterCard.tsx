import { motion } from 'framer-motion';
import { FileText, Download, Calendar, IndianRupee, Percent, Clock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { LoanOffer } from '@/store/chatStore';

interface SanctionLetterCardProps {
  offer: LoanOffer;
  userName: string;
  onDownload: () => void;
}

export const SanctionLetterCard = ({ offer, userName, onDownload }: SanctionLetterCardProps) => {
  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

  const today = new Date().toLocaleDateString('en-IN', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="bg-card rounded-2xl shadow-card overflow-hidden border border-border"
    >
      {/* Header */}
      <div className="gradient-primary p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-display font-bold text-primary-foreground">Sanction Letter</h3>
            <p className="text-xs text-primary-foreground/70">Ref: TC{Date.now().toString().slice(-8)}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-primary-foreground/70">Date</p>
          <p className="text-sm font-medium text-primary-foreground">{today}</p>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Applicant */}
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Applicant</p>
          <p className="font-display font-semibold text-foreground">{userName || 'Valued Customer'}</p>
        </div>
        
        {/* Loan Details Grid */}
        <div className="grid grid-cols-2 gap-3">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-secondary rounded-xl p-3"
          >
            <div className="flex items-center gap-2 mb-1">
              <IndianRupee className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground">Loan Amount</span>
            </div>
            <p className="font-display font-bold text-lg text-foreground">{formatCurrency(offer.amount)}</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-secondary rounded-xl p-3"
          >
            <div className="flex items-center gap-2 mb-1">
              <Percent className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground">Interest Rate</span>
            </div>
            <p className="font-display font-bold text-lg text-foreground">{offer.interestRate}% p.a.</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-secondary rounded-xl p-3"
          >
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground">Tenure</span>
            </div>
            <p className="font-display font-bold text-lg text-foreground">{offer.tenure} Months</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-accent/10 rounded-xl p-3"
          >
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-accent" />
              <span className="text-xs text-muted-foreground">Monthly EMI</span>
            </div>
            <p className="font-display font-bold text-lg text-accent">{formatCurrency(offer.emi)}</p>
          </motion.div>
        </div>
        
        {/* Processing Fee */}
        <div className="flex items-center justify-between py-3 border-t border-dashed border-border">
          <span className="text-sm text-muted-foreground">Processing Fee</span>
          <span className="font-semibold text-foreground">{formatCurrency(offer.processingFee)}</span>
        </div>
        
        {/* Terms Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-muted/50 rounded-xl p-3 flex gap-3"
        >
          <AlertCircle className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            This offer is valid for 30 days from the date of issue. Terms and conditions apply. 
            Final disbursement subject to document verification.
          </p>
        </motion.div>
        
        {/* Download Button */}
        <Button
          onClick={onDownload}
          className="w-full gradient-primary text-primary-foreground font-semibold rounded-xl h-12 hover:opacity-90 transition-opacity"
        >
          <Download className="w-5 h-5 mr-2" />
          Download Sanction Letter
        </Button>
      </div>
    </motion.div>
  );
};
