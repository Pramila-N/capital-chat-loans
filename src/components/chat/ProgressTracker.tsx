import { motion } from 'framer-motion';
import { Check, UserPlus, FileCheck, ClipboardCheck, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ChatStep } from '@/store/chatStore';

interface ProgressTrackerProps {
  currentStep: ChatStep;
}

const steps = [
  { id: 'sales', label: 'Sales', icon: UserPlus },
  { id: 'kyc', label: 'KYC', icon: FileCheck },
  { id: 'underwriting', label: 'Underwriting', icon: ClipboardCheck },
  { id: 'sanction', label: 'Sanction', icon: FileText },
];

const stepOrder: ChatStep[] = ['welcome', 'sales', 'kyc', 'underwriting', 'sanction', 'complete'];

export const ProgressTracker = ({ currentStep }: ProgressTrackerProps) => {
  const currentIndex = stepOrder.indexOf(currentStep);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-xl p-4 mx-4 mt-4"
    >
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepIndex = stepOrder.indexOf(step.id as ChatStep);
          const isCompleted = currentIndex > stepIndex;
          const isCurrent = currentStep === step.id;
          const Icon = step.icon;
          
          return (
            <div key={step.id} className="flex items-center">
              {/* Step Circle */}
              <motion.div
                initial={false}
                animate={{
                  scale: isCurrent ? 1.1 : 1,
                  backgroundColor: isCompleted 
                    ? 'hsl(var(--accent))' 
                    : isCurrent 
                      ? 'hsl(var(--primary))' 
                      : 'hsl(var(--muted))',
                }}
                className={cn(
                  'relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300',
                  isCurrent && 'ring-4 ring-primary/20'
                )}
              >
                {isCompleted ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Check className="w-5 h-5 text-accent-foreground" />
                  </motion.div>
                ) : (
                  <Icon className={cn(
                    'w-5 h-5',
                    isCurrent ? 'text-primary-foreground' : 'text-muted-foreground'
                  )} />
                )}
                
                {/* Pulse Animation for Current Step */}
                {isCurrent && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-primary"
                    initial={{ opacity: 0.5, scale: 1 }}
                    animate={{ opacity: 0, scale: 1.5 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </motion.div>
              
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="w-8 sm:w-12 h-1 mx-1 sm:mx-2 rounded-full overflow-hidden bg-muted">
                  <motion.div
                    className="h-full bg-accent"
                    initial={{ width: 0 }}
                    animate={{ width: isCompleted ? '100%' : '0%' }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Step Labels */}
      <div className="flex justify-between mt-2 px-1">
        {steps.map((step) => {
          const isCurrent = currentStep === step.id;
          const stepIndex = stepOrder.indexOf(step.id as ChatStep);
          const isCompleted = currentIndex > stepIndex;
          
          return (
            <span
              key={step.id}
              className={cn(
                'text-xs font-medium transition-colors w-10 text-center',
                isCurrent 
                  ? 'text-primary' 
                  : isCompleted 
                    ? 'text-accent' 
                    : 'text-muted-foreground'
              )}
            >
              {step.label}
            </span>
          );
        })}
      </div>
    </motion.div>
  );
};
