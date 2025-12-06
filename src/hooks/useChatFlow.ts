import { useCallback } from 'react';
import { useChatStore, type LoanOffer } from '@/store/chatStore';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const useChatFlow = () => {
  const {
    addMessage,
    setTyping,
    setStep,
    updateUserDetails,
    setLoanOffer,
    currentStep,
    userDetails,
  } = useChatStore();

  const simulateBotResponse = useCallback(async (
    content: string,
    type: 'text' | 'quick-reply' | 'form' | 'status' | 'offer' | 'sanction' = 'text',
    data?: Record<string, unknown>,
    typingDelay = 1500
  ) => {
    setTyping(true);
    await delay(typingDelay);
    setTyping(false);
    addMessage({ content, sender: 'bot', type, data });
  }, [addMessage, setTyping]);

  const initializeChat = useCallback(async () => {
    await simulateBotResponse(
      "Hello! 👋 Welcome to Tata Capital's AI Loan Assistant. I'm here to help you get a personal loan approved in minutes!",
      'text',
      undefined,
      1000
    );
    
    await delay(500);
    await simulateBotResponse(
      "To get started, could you please share your name and contact details?",
      'form',
      { formType: 'contact' }
    );
  }, [simulateBotResponse]);

  const sendMessage = useCallback((content: string) => {
    addMessage({ content, sender: 'user', type: 'text' });
  }, [addMessage]);

  const handleQuickReply = useCallback(async (option: string) => {
    addMessage({ content: option, sender: 'user', type: 'text' });
    
    if (option.includes('Lakhs') || option.includes('Lakh')) {
      updateUserDetails({ loanAmount: option });
      setStep('kyc');
      
      await simulateBotResponse(
        `Great choice! You've selected ${option}. Now let's quickly verify your identity.`,
        'text'
      );
      
      await delay(500);
      await simulateBotResponse(
        "Please enter your PAN number for KYC verification:",
        'form',
        { formType: 'pan' }
      );
    }
  }, [addMessage, updateUserDetails, setStep, simulateBotResponse]);

  const handleFormSubmit = useCallback(async (data: Record<string, string | number>) => {
    if (data.name && data.phone) {
      updateUserDetails({ 
        name: data.name as string, 
        phone: data.phone as string,
        email: data.email as string 
      });
      
      addMessage({ 
        content: `Name: ${data.name}\nPhone: +91 ${data.phone}${data.email ? `\nEmail: ${data.email}` : ''}`, 
        sender: 'user', 
        type: 'text' 
      });
      
      setStep('sales');
      
      await simulateBotResponse(
        `Nice to meet you, ${data.name}! 🎉 How much loan amount are you looking for?`,
        'quick-reply',
        { options: ['₹1-3 Lakhs', '₹3-5 Lakhs', '₹5-10 Lakhs', '₹10+ Lakhs'] }
      );
    }
    
    else if (data.pan) {
      updateUserDetails({ pan: data.pan as string });
      addMessage({ content: `PAN: ${data.pan}`, sender: 'user', type: 'text' });
      
      await simulateBotResponse(
        '',
        'status',
        { status: 'loading', title: 'Verifying your KYC...', description: 'Checking PAN details securely', type: 'kyc' }
      );
      
      await delay(3000);
      
      await simulateBotResponse(
        '',
        'status',
        { status: 'success', title: 'KYC Verified!', description: 'Your identity has been confirmed', type: 'kyc' }
      );
      
      await delay(500);
      await simulateBotResponse(
        "Perfect! Now I need a few more details. What's your date of birth?",
        'form',
        { formType: 'dob' }
      );
    }
    
    else if (data.dob) {
      updateUserDetails({ dob: data.dob as string });
      addMessage({ content: `DOB: ${data.dob}`, sender: 'user', type: 'text' });
      
      await simulateBotResponse(
        "Great! What's your employment type?",
        'form',
        { formType: 'employment' }
      );
    }
    
    else if (data.employment) {
      updateUserDetails({ employment: data.employment as string });
      addMessage({ content: `Employment: ${data.employment}`, sender: 'user', type: 'text' });
      
      await simulateBotResponse(
        "Almost there! What's your monthly income?",
        'form',
        { formType: 'income' }
      );
    }
    
    else if (data.income) {
      updateUserDetails({ income: data.income as number });
      addMessage({ content: `Monthly Income: ₹${data.income.toLocaleString('en-IN')}`, sender: 'user', type: 'text' });
      
      setStep('underwriting');
      
      await simulateBotResponse(
        '',
        'status',
        { status: 'loading', title: 'Fetching credit score...', description: 'Securely accessing your credit history', type: 'credit' }
      );
      
      await delay(2500);
      
      await simulateBotResponse(
        '',
        'status',
        { status: 'success', title: 'Credit Score: 742', description: 'Excellent credit profile!', type: 'credit' }
      );
      
      await delay(1000);
      
      await simulateBotResponse(
        '',
        'status',
        { status: 'loading', title: 'Checking loan eligibility...', description: 'Our AI is analyzing your profile', type: 'eligibility' }
      );
      
      await delay(3000);
      
      setStep('sanction');
      
      // Calculate loan offer based on income
      const income = data.income as number;
      const maxLoan = Math.min(income * 20, 1000000);
      const interestRate = 10.5;
      const tenure = 36;
      const emi = Math.round((maxLoan * (interestRate / 1200) * Math.pow(1 + interestRate / 1200, tenure)) / (Math.pow(1 + interestRate / 1200, tenure) - 1));
      const processingFee = Math.round(maxLoan * 0.02);
      
      const offer: LoanOffer = {
        amount: maxLoan,
        interestRate,
        tenure,
        emi,
        processingFee,
      };
      
      setLoanOffer(offer);
      
      await simulateBotResponse(
        "🎊 Fantastic news! Based on your profile, you're pre-approved for a personal loan!",
        'offer'
      );
    }
  }, [addMessage, updateUserDetails, setStep, setLoanOffer, simulateBotResponse]);

  const acceptOffer = useCallback(async () => {
    addMessage({ content: "I accept the offer!", sender: 'user', type: 'text' });
    setStep('complete');
    
    await simulateBotResponse(
      "Wonderful choice! 🎉 Here's your official sanction letter. You can download it for your records.",
      'sanction'
    );
    
    await delay(1000);
    
    await simulateBotResponse(
      "Your loan will be disbursed within 24 hours to your registered bank account. Is there anything else I can help you with?",
      'text'
    );
  }, [addMessage, setStep, simulateBotResponse]);

  return {
    sendMessage,
    handleQuickReply,
    handleFormSubmit,
    initializeChat,
    acceptOffer,
  };
};
