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
    setCreditScore,
    setDocumentsUploaded,
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
      "To get started, could you please share your contact details?",
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

  const handleFormSubmit = useCallback(async (data: Record<string, string | number | File[]>) => {
    // Contact Form - name, phone, email
    if (data.name && data.phone) {
      updateUserDetails({ 
        name: data.name as string, 
        phone: data.phone as string,
        email: data.email as string 
      });
      setStep('sales');
      
      addMessage({ 
        content: `Name: ${data.name}\nPhone: +91 ${data.phone}\nEmail: ${data.email}`, 
        sender: 'user', 
        type: 'text' 
      });
      
      await delay(500);
      await simulateBotResponse(
        `Nice to meet you, ${data.name}! 😊 Now, could you please share your address?`,
        'form',
        { formType: 'address' }
      );
    }
    
    // Address Form
    else if (data.address) {
      updateUserDetails({ address: data.address as string });
      addMessage({ content: `Address: ${data.address}`, sender: 'user', type: 'text' });
      
      await delay(500);
      await simulateBotResponse(
        "Great! How much loan amount are you looking for?",
        'form',
        { formType: 'loanAmount' }
      );
    }
    
    // Loan Amount Form
    else if (data.loanAmount) {
      updateUserDetails({ loanAmount: (data.loanAmount as number).toString() });
      addMessage({ content: `₹${(data.loanAmount as number).toLocaleString('en-IN')}`, sender: 'user', type: 'text' });
      
      await delay(500);
      await simulateBotResponse(
        "Perfect! What's the purpose of this loan?",
        'form',
        { formType: 'loanPurpose' }
      );
    }
    
    // Loan Purpose Form
    else if (data.loanPurpose) {
      updateUserDetails({ loanPurpose: data.loanPurpose as string });
      addMessage({ content: `Purpose: ${data.loanPurpose}`, sender: 'user', type: 'text' });
      
      await delay(500);
      await simulateBotResponse(
        "Excellent! For how many months would you like the loan?",
        'form',
        { formType: 'tenure' }
      );
    }
    
    // Tenure Form
    else if (data.tenure) {
      updateUserDetails({ tenure: data.tenure as number });
      const months = data.tenure;
      addMessage({ content: `Tenure: ${months} months`, sender: 'user', type: 'text' });
      
      await delay(500);
      await simulateBotResponse(
        "Thank you! Now I need some financial details. What's your monthly income?",
        'form',
        { formType: 'income' }
      );
    }
    
    // Income Form
    else if (data.income) {
      updateUserDetails({ income: data.income as number });
      addMessage({ content: `Monthly Income: ₹${(data.income as number).toLocaleString('en-IN')}`, sender: 'user', type: 'text' });
      
      await delay(500);
      await simulateBotResponse(
        "Almost there! What's your employment type?",
        'form',
        { formType: 'employment' }
      );
    }
    
    // Employment Form
    else if (data.employment) {
      updateUserDetails({ employment: data.employment as string });
      addMessage({ content: `Employment: ${data.employment}`, sender: 'user', type: 'text' });
      
      setStep('kyc');
      
      await delay(500);
      await simulateBotResponse(
        "Great! Now let's verify your identity. Please enter your PAN number:",
        'form',
        { formType: 'pan' }
      );
    }
    
    // PAN Form
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
        "Perfect! What's your date of birth?",
        'form',
        { formType: 'dob' }
      );
    }
    
    // DOB Form
    else if (data.dob) {
      updateUserDetails({ dob: data.dob as string });
      addMessage({ content: `DOB: ${data.dob}`, sender: 'user', type: 'text' });
      
      await delay(500);
      await simulateBotResponse(
        "Now, please upload your documents for verification.",
        'form',
        { formType: 'documents' }
      );
    }
    
    // Documents Form
    else if (data.documents && Array.isArray(data.documents)) {
      const files = data.documents as File[];
      addMessage({ content: `Documents uploaded: ${files.length} file(s)`, sender: 'user', type: 'text' });
      
      setDocumentsUploaded(true);
      
      await simulateBotResponse(
        '',
        'status',
        { status: 'loading', title: 'Verifying documents...', description: 'Securely processing your files', type: 'kyc' }
      );
      
      await delay(3000);
      
      await simulateBotResponse(
        '',
        'status',
        { status: 'success', title: 'Documents Verified!', description: 'All documents accepted', type: 'kyc' }
      );
      
      await delay(1000);
      
      setStep('underwriting');
      
      await simulateBotResponse(
        '',
        'status',
        { status: 'loading', title: 'Generating credit score...', description: 'Securely analyzing your profile', type: 'credit' }
      );
      
      await delay(2500);
      
      const creditScore = Math.floor(Math.random() * (800 - 650 + 1)) + 650; // Random score 650-800
      setCreditScore(creditScore);
      
      await simulateBotResponse(
        '',
        'status',
        { status: 'success', title: `Credit Score: ${creditScore}`, description: 'Excellent credit profile!', type: 'credit' }
      );
      
      await delay(1000);
      
      await simulateBotResponse(
        '',
        'status',
        { status: 'loading', title: 'Checking loan eligibility...', description: 'Our AI is analyzing your profile', type: 'eligibility' }
      );
      
      await delay(3000);

      // Eligibility logic
      const income = userDetails.income || 50000;
      const requestedAmount = parseInt(userDetails.loanAmount || '100000');
      const tenure = userDetails.tenure || 36;
      const preApprovedLimit = income * 15; // base pre-approved limit

      const calcEmi = (amount: number, rate: number, months: number) => {
        const monthly = rate / 1200;
        return Math.round((amount * monthly * Math.pow(1 + monthly, months)) / (Math.pow(1 + monthly, months) - 1));
      };

      const interestRate = creditScore >= 750 ? 9.5 : creditScore >= 700 ? 10.5 : 11.5;
      const emiAtRequested = calcEmi(requestedAmount, interestRate, tenure);

      let approved = false;
      let approvedAmount = requestedAmount;
      let decisionMsg = '';

      if (creditScore < 700) {
        approved = false;
        decisionMsg = 'Application rejected: credit score below 700.';
      } else if (requestedAmount <= preApprovedLimit) {
        approved = true;
        decisionMsg = 'Approved instantly within your pre-approved limit.';
      } else if (requestedAmount <= preApprovedLimit * 2) {
        if (emiAtRequested <= income * 0.5) {
          approved = true;
          decisionMsg = 'Approved after income check (EMI within 50% of salary).';
        } else {
          approved = false;
          decisionMsg = 'Rejected: EMI exceeds 50% of your salary.';
        }
      } else {
        approved = false;
        decisionMsg = 'Rejected: requested amount exceeds 2x your pre-approved limit.';
      }

      if (!approved) {
        await simulateBotResponse(
          '',
          'status',
          { status: 'error', title: 'Application Rejected', description: decisionMsg, type: 'eligibility' }
        );
        setStep('complete');
        return;
      }

      setStep('sanction');

      const processingFee = Math.round(approvedAmount * 0.02);
      const offerEmi = calcEmi(approvedAmount, interestRate, tenure);

      const offer: LoanOffer = {
        amount: approvedAmount,
        interestRate,
        tenure,
        emi: offerEmi,
        processingFee,
      };
      
      setLoanOffer(offer);
      
      await simulateBotResponse(
        `🎊 Fantastic news! ${decisionMsg}`,
        'offer'
      );
    }
  }, [addMessage, updateUserDetails, setStep, setLoanOffer, setCreditScore, setDocumentsUploaded, simulateBotResponse, userDetails]);

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
