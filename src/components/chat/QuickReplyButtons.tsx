import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface QuickReplyButtonsProps {
  options: string[];
  onSelect: (option: string) => void;
}

export const QuickReplyButtons = ({ options, onSelect }: QuickReplyButtonsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="flex flex-wrap gap-2 mt-3"
    >
      {options.map((option, index) => (
        <motion.div
          key={option}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 * index }}
        >
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSelect(option)}
            className="rounded-full border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:scale-105 hover:shadow-soft"
          >
            {option}
          </Button>
        </motion.div>
      ))}
    </motion.div>
  );
};
