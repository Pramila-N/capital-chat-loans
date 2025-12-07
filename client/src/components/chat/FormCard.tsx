import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, ArrowRight, Upload } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

type FormType = 'pan' | 'dob' | 'employment' | 'income' | 'contact' | 'address' | 'loanAmount' | 'loanPurpose' | 'tenure' | 'documents';

interface FormCardProps {
  type: FormType;
  onSubmit: (data: Record<string, string | number | File[]>) => void;
}

export const FormCard = ({ type, onSubmit }: FormCardProps) => {
  const [pan, setPan] = useState('');
  const [dob, setDob] = useState<Date>();
  const [employment, setEmployment] = useState('');
  const [income, setIncome] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [loanPurpose, setLoanPurpose] = useState('');
  const [tenure, setTenure] = useState('');
  const [uploadedDocs, setUploadedDocs] = useState<{ [key: string]: File | null }>({
    aadhaar: null,
    panDoc: null,
    salarySlips: null,
  });

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
      case 'address':
        onSubmit({ address });
        break;
      case 'loanAmount':
        onSubmit({ loanAmount: parseInt(loanAmount) });
        break;
      case 'loanPurpose':
        onSubmit({ loanPurpose });
        break;
      case 'tenure':
        onSubmit({ tenure: parseInt(tenure) });
        break;
      case 'documents': {
        const files = Object.values(uploadedDocs).filter(f => f !== null);
        onSubmit({ documents: files });
        break;
      }
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
        return name.length > 2 && phone.length === 10 && email.length > 0;
      case 'address':
        return address.length > 5;
      case 'loanAmount':
        return parseInt(loanAmount) > 0;
      case 'loanPurpose':
        return !!loanPurpose;
      case 'tenure':
        return parseInt(tenure) > 0 && parseInt(tenure) <= 84;
      case 'documents':
        return uploadedDocs.aadhaar !== null && uploadedDocs.panDoc !== null && uploadedDocs.salarySlips !== null;
      default:
        return false;
    }
  };

  const handleFileUpload = (docType: string, file: File | null) => {
    setUploadedDocs(prev => ({ ...prev, [docType]: file }));
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
            <Label htmlFor="email" className="text-sm font-medium text-foreground">Email</Label>
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

      {type === 'address' && (
        <div className="space-y-2">
          <Label htmlFor="address" className="text-sm font-medium text-foreground">Address</Label>
          <textarea
            id="address"
            placeholder="Enter your complete address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-input focus:border-primary focus:ring-primary focus:outline-none"
            rows={3}
          />
          <p className="text-xs text-muted-foreground">Include street, city, state and pincode</p>
        </div>
      )}

      {type === 'loanAmount' && (
        <div className="space-y-2">
          <Label htmlFor="loanAmount" className="text-sm font-medium text-foreground">Loan Amount</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">₹</span>
            <Input
              id="loanAmount"
              type="number"
              placeholder="100000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              className="pl-8 rounded-xl border-input focus:border-primary focus:ring-primary"
            />
          </div>
          <p className="text-xs text-muted-foreground">Enter desired loan amount</p>
        </div>
      )}

      {type === 'loanPurpose' && (
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">Purpose of Loan</Label>
          <Select value={loanPurpose} onValueChange={setLoanPurpose}>
            <SelectTrigger className="rounded-xl border-input">
              <SelectValue placeholder="Select loan purpose" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="home">Home Improvement</SelectItem>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="medical">Medical Expenses</SelectItem>
              <SelectItem value="business">Business Needs</SelectItem>
              <SelectItem value="debt">Debt Consolidation</SelectItem>
              <SelectItem value="travel">Travel</SelectItem>
              <SelectItem value="wedding">Wedding</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {type === 'tenure' && (
        <div className="space-y-2">
          <Label htmlFor="tenure" className="text-sm font-medium text-foreground">Loan Tenure (Months)</Label>
          <div className="relative">
            <Input
              id="tenure"
              type="number"
              placeholder="36"
              value={tenure}
              onChange={(e) => setTenure(e.target.value)}
              min="12"
              max="84"
              step="12"
              className="rounded-xl border-input focus:border-primary focus:ring-primary"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">months</span>
          </div>
          <p className="text-xs text-muted-foreground">Select between 12-84 months</p>
        </div>
      )}

      {type === 'documents' && (
        <div className="space-y-3">
          <p className="text-sm font-medium text-foreground">Upload Documents</p>
          {['aadhaar', 'panDoc', 'salarySlips'].map(docType => (
            <div key={docType} className="space-y-2">
              <Label className="text-sm font-medium text-foreground capitalize">
                {docType === 'salarySlips' ? 'Salary Slips (5)' : docType === 'panDoc' ? 'PAN' : docType.charAt(0).toUpperCase() + docType.slice(1)}
              </Label>
              <div 
                className="border-2 border-dashed border-primary/30 rounded-xl p-4 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition"
                onClick={() => document.getElementById(docType)?.click()}
              >
                <input
                  id={docType}
                  type="file"
                  title={`Upload ${docType === 'salarySlips' ? 'salary slips' : docType}`}
                  multiple={docType === 'salarySlips'}
                  accept={docType === 'salarySlips' ? '.pdf,.jpg,.jpeg,.png' : '.pdf,.jpg,.jpeg,.png'}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(docType, file);
                  }}
                  className="hidden"
                />
                <div className="flex flex-col items-center pointer-events-none">
                  <Upload className="w-5 h-5 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    {uploadedDocs[docType as keyof typeof uploadedDocs] ? '✓ Uploaded' : 'Click to upload'}
                  </p>
                  {uploadedDocs[docType as keyof typeof uploadedDocs] && (
                    <p className="text-xs text-primary mt-1">
                      {uploadedDocs[docType as keyof typeof uploadedDocs]?.name}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
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
