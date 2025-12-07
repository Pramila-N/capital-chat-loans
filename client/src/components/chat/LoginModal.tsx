import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useChatStore } from '@/store/chatStore';

interface LoginModalProps {
  onVerified?: () => void;
}

export const LoginModal = ({ onVerified }: LoginModalProps) => {
  const [phone, setLocalPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [demoOtp, setDemoOtp] = useState('123456');
  const { setVerified, setPhone: setStorePhone } = useChatStore();

  const sendOtp = () => {
    if (!phone || phone.length < 10) return alert('Enter a valid mobile number');
    // demo: show OTP to user instead of sending SMS
    setOtpSent(true);
    setDemoOtp('123456');
    setStorePhone(phone);
    alert(`Demo OTP sent: 123456`);
  };

  const verify = () => {
    if (otp === demoOtp) {
      setVerified(true);
      onVerified?.();
    } else {
      alert('Invalid OTP');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-60 flex items-center justify-center">
      <div className="bg-background rounded-xl p-6 w-[360px]">
        <h3 className="text-lg font-semibold mb-2">Sign in to continue</h3>
        <p className="text-sm text-muted-foreground mb-4">Enter your mobile number to receive a one-time passcode (demo).</p>
        <div className="flex flex-col gap-3">
          {!otpSent ? (
            <>
              <Input
                placeholder="Mobile number"
                value={phone}
                onChange={(e: any) => setLocalPhone(e.target.value)}
                maxLength={10}
              />
              <Button onClick={sendOtp}>Send OTP</Button>
            </>
          ) : (
            <>
              <Input
                placeholder="Enter OTP"
                value={otp}
                onChange={(e: any) => setOtp(e.target.value)}
                maxLength={6}
              />
              <div className="flex gap-2">
                <Button onClick={verify}>Verify</Button>
                <Button variant="ghost" onClick={() => { setOtpSent(false); setOtp(''); }}>Change number</Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
