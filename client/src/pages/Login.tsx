import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useChatStore } from '@/store/chatStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Phone, CheckCircle, AlertCircle, X } from 'lucide-react';

const Login = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const demoOtp = '123456';
  const { setVerified, setPhone: setStorePhone, setChatOpen, updateUserDetails } = useChatStore();
  const navigate = useNavigate();

  const sendOtp = () => {
    if (!name || name.length < 2) {
      setNotification({ type: 'error', message: 'Enter a valid name' });
      return;
    }
    if (!phone || phone.length < 10) {
      setNotification({ type: 'error', message: 'Enter a valid mobile number' });
      return;
    }
    setOtpSent(true);
    setStorePhone(phone);
    setNotification({ type: 'success', message: `Demo OTP sent: ${demoOtp}` });
    setTimeout(() => setNotification(null), 4000);
  };

  const verify = () => {
    if (otp === demoOtp) {
      setVerified(true);
      setChatOpen(true);
      updateUserDetails({ name });
      navigate('/dashboard');
    } else {
      setNotification({ type: 'error', message: 'Invalid OTP' });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-secondary/20 p-6">
      {/* Notification Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-50"
          >
            <div className={`flex items-center gap-3 px-4 py-3 rounded-lg border backdrop-blur shadow-lg ${
              notification.type === 'success' 
                ? 'bg-green-500/10 border-green-500/20 text-green-600' 
                : 'bg-red-500/10 border-red-500/20 text-red-600'
            }`}>
              {notification.type === 'success' ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <AlertCircle className="w-5 h-5" />
              )}
              <p className="text-sm font-medium">{notification.message}</p>
              <button 
                onClick={() => setNotification(null)} 
                className="ml-2"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="border border-primary/30 rounded-2xl p-8 bg-card/80 backdrop-blur shadow-lg">
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
              <Lock className="w-6 h-6 text-primary-foreground" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center mb-2 text-foreground">Welcome</h2>
          <p className="text-sm text-center text-muted-foreground mb-8">Enter your mobile number to receive a one-time passcode (demo).</p>

          {!otpSent ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col gap-4"
            >
              <div className="relative">
                <Input
                  className="pl-3"
                  placeholder="Full name"
                  value={name}
                  onChange={(e: any) => setName(e.target.value)}
                />
              </div>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input
                  className="pl-10"
                  placeholder="Mobile number"
                  value={phone}
                  onChange={(e: any) => setPhone(e.target.value)}
                  maxLength={10}
                />
              </div>
              <Button onClick={sendOtp} className="gradient-primary text-primary-foreground font-semibold h-11">Send OTP</Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col gap-4"
            >
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 text-center">
                <p className="text-xs text-muted-foreground mb-1">Demo OTP sent to</p>
                <p className="text-sm font-semibold text-foreground">+91 {phone}</p>
              </div>
              <Input
                placeholder="Enter OTP"
                value={otp}
                onChange={(e: any) => setOtp(e.target.value)}
                maxLength={6}
                className="text-center text-2xl tracking-widest font-semibold"
              />
              <div className="bg-accent/10 rounded-lg p-3 text-center">
                <p className="text-xs text-muted-foreground">Demo OTP:</p>
                <p className="text-lg font-bold text-accent">123456</p>
              </div>
              <div className="flex gap-3">
                <Button onClick={verify} className="flex-1 gradient-primary text-primary-foreground font-semibold h-11">Verify</Button>
                <Button variant="outline" onClick={() => { setOtpSent(false); setOtp(''); }} className="flex-1 h-11">Change number</Button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
