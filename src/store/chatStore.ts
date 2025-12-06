import { create } from 'zustand';

export type MessageType = 'text' | 'quick-reply' | 'form' | 'offer' | 'sanction' | 'status' | 'progress';

export interface Message {
  id: string;
  type: MessageType;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  data?: Record<string, unknown>;
}

export interface LoanOffer {
  amount: number;
  interestRate: number;
  tenure: number;
  emi: number;
  processingFee: number;
}

export type ChatStep = 'welcome' | 'sales' | 'kyc' | 'underwriting' | 'sanction' | 'complete';

interface ChatState {
  messages: Message[];
  isTyping: boolean;
  currentStep: ChatStep;
  userDetails: {
    name?: string;
    pan?: string;
    dob?: string;
    employment?: string;
    income?: number;
    loanAmount?: string;
    phone?: string;
    email?: string;
  };
  loanOffer: LoanOffer | null;
  isChatOpen: boolean;
  
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  setTyping: (typing: boolean) => void;
  setStep: (step: ChatStep) => void;
  updateUserDetails: (details: Partial<ChatState['userDetails']>) => void;
  setLoanOffer: (offer: LoanOffer) => void;
  setChatOpen: (open: boolean) => void;
  resetChat: () => void;
}

const generateId = () => Math.random().toString(36).substring(2, 9);

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  isTyping: false,
  currentStep: 'welcome',
  userDetails: {},
  loanOffer: null,
  isChatOpen: false,
  
  addMessage: (message) =>
    set((state) => ({
      messages: [
        ...state.messages,
        { ...message, id: generateId(), timestamp: new Date() },
      ],
    })),
    
  setTyping: (isTyping) => set({ isTyping }),
  
  setStep: (currentStep) => set({ currentStep }),
  
  updateUserDetails: (details) =>
    set((state) => ({
      userDetails: { ...state.userDetails, ...details },
    })),
    
  setLoanOffer: (loanOffer) => set({ loanOffer }),
  
  setChatOpen: (isChatOpen) => set({ isChatOpen }),
  
  resetChat: () =>
    set({
      messages: [],
      isTyping: false,
      currentStep: 'welcome',
      userDetails: {},
      loanOffer: null,
    }),
}));
