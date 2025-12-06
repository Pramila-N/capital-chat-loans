import { motion } from 'framer-motion';
import { Loader2, Check, Shield, CreditCard, FileSearch } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatusCardProps {
  status: 'loading' | 'success' | 'error';
  title: string;
  description?: string;
  type?: 'kyc' | 'credit' | 'eligibility' | 'default';
}

const iconMap = {
  kyc: Shield,
  credit: CreditCard,
  eligibility: FileSearch,
  default: Shield,
};

export const StatusCard = ({ status, title, description, type = 'default' }: StatusCardProps) => {
  const Icon = iconMap[type];
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        'glass-card rounded-xl p-4 flex items-center gap-4',
        status === 'success' && 'border-accent/50',
        status === 'error' && 'border-destructive/50'
      )}
    >
      {/* Icon */}
      <div className={cn(
        'w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0',
        status === 'loading' && 'bg-primary/10',
        status === 'success' && 'bg-accent/10',
        status === 'error' && 'bg-destructive/10'
      )}>
        {status === 'loading' ? (
          <Loader2 className="w-6 h-6 text-primary animate-spin" />
        ) : status === 'success' ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Check className="w-6 h-6 text-accent" />
          </motion.div>
        ) : (
          <Icon className="w-6 h-6 text-destructive" />
        )}
      </div>
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4 className={cn(
          'font-display font-semibold text-sm',
          status === 'loading' && 'text-primary',
          status === 'success' && 'text-accent',
          status === 'error' && 'text-destructive'
        )}>
          {title}
        </h4>
        {description && (
          <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
        )}
        
        {/* Progress Bar for Loading */}
        {status === 'loading' && (
          <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 3, ease: 'linear' }}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};
