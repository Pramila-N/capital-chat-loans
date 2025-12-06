import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

type FormType = 'pan' | 'dob' | 'employment' | 'income' | 'contact';

interface FormCardProps {
  type: FormType;
  onSubmit: (data: Record<string, string | number>) => void;
}

export const FormCard = ({ type, onSubmit }: FormCardProps) => {
  const [pan, setPan] = useState('');
  const [dob, setDob] = useState<Date>();
  const [employment, setEmployment] = useState('');
  const [income, setIncome] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    switch (type) {
      case 'pan':
        onSubmit({ pan: pan.toUpperCase() });
        break;
      case 'dob':
        if (dob) onSubmit({ dob: format(dob, 'yyyy-MM-dd') });
        break;
      case 'employment':
        onSubmit({ employment });
        break;
      case 'income':
        onSubmit({ income: parseInt(income) });
        break;
      case 'contact':
        onSubmit({ name, phone, email });
        break;
    }
  };

  const isValid = () => {
    switch (type) {
      case 'pan':
        return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i.test(pan);
      case 'dob':
        return !!dob;
      case 'employment':
        return !!employment;
      case 'income':
        return parseInt(income) > 0;
      case 'contact':
        return name.length > 2 && phone.length === 10;
      default:
        return false;
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="glass-card rounded-xl p-4 mt-3 space-y-4"
    >
      {type === 'pan' && (
        <div className="space-y-2">
          <Label htmlFor="pan" className="text-sm font-medium text-foreground">PAN Number</Label>
          <Input
            id="pan"
            placeholder="ABCDE1234F"
            value={pan}
            onChange={(e) => setPan(e.target.value.toUpperCase())}
            maxLength={10}
            className="uppercase tracking-wider font-mono rounded-xl border-input focus:border-primary focus:ring-primary"
          />
          <p className="text-xs text-muted-foreground">Enter your 10-character PAN number</p>
        </div>
      )}

      {type === 'dob' && (
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">Date of Birth</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'w-full justify-start text-left font-normal rounded-xl border-input',
                  !dob && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dob ? format(dob, 'PPP') : 'Select your date of birth'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
              <Calendar
                mode="single"
                selected={dob}
                onSelect={setDob}
                disabled={(date) => date > new Date() || date < new Date('1940-01-01')}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
      )}

      {type === 'employment' && (
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">Employment Type</Label>
          <Select value={employment} onValueChange={setEmployment}>
            <SelectTrigger className="rounded-xl border-input">
              <SelectValue placeholder="Select employment type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="salaried">Salaried</SelectItem>
              <SelectItem value="self-employed">Self Employed</SelectItem>
              <SelectItem value="business">Business Owner</SelectItem>
              <SelectItem value="professional">Professional</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {type === 'income' && (
        <div className="space-y-2">
          <Label htmlFor="income" className="text-sm font-medium text-foreground">Monthly Income</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">₹</span>
            <Input
              id="income"
              type="number"
              placeholder="50,000"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className="pl-8 rounded-xl border-input focus:border-primary focus:ring-primary"
            />
          </div>
          <p className="text-xs text-muted-foreground">Enter your net monthly income</p>
        </div>
      )}

      {type === 'contact' && (
        <div className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-foreground">Full Name</Label>
            <Input
              id="name"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-xl border-input focus:border-primary focus:ring-primary"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium text-foreground">Mobile Number</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">+91</span>
              <Input
                id="phone"
                type="tel"
                placeholder="9876543210"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                maxLength={10}
                className="pl-12 rounded-xl border-input focus:border-primary focus:ring-primary"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-foreground">Email (Optional)</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl border-input focus:border-primary focus:ring-primary"
            />
          </div>
        </div>
      )}

      <Button
        type="submit"
        disabled={!isValid()}
        className="w-full gradient-primary text-primary-foreground font-semibold rounded-xl h-11 hover:opacity-90 transition-all disabled:opacity-50"
      >
        Continue
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </motion.form>
  );
};
