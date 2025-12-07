import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useChatStore } from '@/store/chatStore';
import { motion } from 'framer-motion';
import { LogOut, MessageCircle, Home, CreditCard, TrendingUp, Sparkles, Clock, Zap } from 'lucide-react';
import { ChatWindow } from '@/components/chat/ChatWindow';

const Dashboard = () => {
  const navigate = useNavigate();
  const { phone, userDetails, resetChat, setVerified, creditScore, documentsUploaded } = useChatStore();
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogout = () => {
    resetChat();
    setVerified(false);
    navigate('/');
  };

  const recentActivity = [
    { date: '2024-12-07', action: 'Logged in', status: 'Completed', icon: '✓' },
    { date: '2024-12-06', action: 'Viewed loan offers', status: 'Viewed', icon: '👁' },
    { date: '2024-12-05', action: 'Started chat with AI', status: 'Completed', icon: '💬' },
  ];

  const sanctionedLoans = [
    {
      id: 'LOAN001',
      amount: 500000,
      interestRate: 12.5,
      tenure: 60,
      emi: 10500,
      status: 'Active',
      disbursedDate: '2024-11-15',
    },
    {
      id: 'LOAN002',
      amount: 250000,
      interestRate: 11.8,
      tenure: 36,
      emi: 7850,
      status: 'Active',
      disbursedDate: '2024-10-20',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-border/50 bg-card/50 backdrop-blur sticky top-0 z-40"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <span className="font-display font-bold text-primary-foreground">T</span>
            </div>
            <div>
              <h1 className="font-display font-bold text-foreground">Tata Capital</h1>
              <p className="text-xs text-muted-foreground">Dashboard</p>
            </div>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="gap-2 border-destructive/20 text-destructive hover:bg-destructive/10 rounded-full"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </motion.div>

      {/* Tabs Navigation */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-card/50 border border-border/30 rounded-full p-1">
            <TabsTrigger value="dashboard" className="gap-2 rounded-full data-[state=active]:gradient-primary">
              <Home className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="chatbot" className="gap-2 rounded-full data-[state=active]:gradient-primary">
              <MessageCircle className="w-4 h-4" />
              Chatbot
            </TabsTrigger>
            <TabsTrigger value="loans" className="gap-2 rounded-full data-[state=active]:gradient-primary">
              <CreditCard className="w-4 h-4" />
              My Loans
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Welcome Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative overflow-hidden rounded-3xl p-8 border border-primary/20 bg-gradient-to-br from-primary/15 via-background to-accent/10"
            >
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -left-10 -top-10 w-40 h-40 rounded-full bg-primary/20 blur-3xl" />
                <div className="absolute right-0 top-8 w-24 h-24 rounded-full bg-accent/20 blur-3xl" />
              </div>
              <div className="relative flex flex-col gap-4">
                <div className="flex items-center gap-3 text-sm text-accent font-semibold">
                  <Sparkles className="w-5 h-5" />
                  Personalized overview
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground">Hello, {userDetails.name || 'User'}!</h2>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/20 text-primary border border-primary/30">Verified</span>
                  {documentsUploaded ? (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/15 text-green-600 border border-green-500/30">Docs uploaded</span>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-600 border border-amber-500/30">Docs pending</span>
                  )}
                </div>
                <p className="text-muted-foreground max-w-3xl">Stay on top of your loan journey, track progress, and continue where you left off. Everything stays in sync with the chatbot and My Loans.</p>
                <div className="flex flex-wrap gap-3">
                  <div className="px-3 py-2 rounded-xl bg-card/70 border border-primary/15 text-xs font-medium text-foreground">Mobile: +91 {phone || 'N/A'}</div>
                  <div className="px-3 py-2 rounded-xl bg-card/70 border border-primary/15 text-xs font-medium text-foreground">Profile: {userDetails.name || 'Not updated'}</div>
                </div>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid md:grid-cols-4 gap-6"
            >
              {/* Profile Card */}
              <motion.div
                whileHover={{ y: -4 }}
                className="glass-card rounded-2xl p-6 border border-primary/25 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Profile</p>
                    <h3 className="font-semibold text-foreground">Overview</h3>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
                    <span className="text-lg">👤</span>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="flex justify-between"><span className="text-muted-foreground">Name</span><span className="font-semibold text-foreground">{userDetails.name || 'Not set'}</span></p>
                  <p className="flex justify-between"><span className="text-muted-foreground">Mobile</span><span className="font-semibold text-foreground">+91 {phone || 'N/A'}</span></p>
                  <p className="flex justify-between"><span className="text-muted-foreground">Status</span><span className="font-semibold text-accent">Active</span></p>
                </div>
              </motion.div>

              {/* Active Loans Card */}
              <motion.div
                whileHover={{ y: -4 }}
                className="glass-card rounded-2xl p-6 border border-accent/25 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Loans</p>
                    <h3 className="font-semibold text-foreground">Active</h3>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-accent" />
                  </div>
                </div>
                <p className="text-4xl font-bold text-accent mb-1">{sanctionedLoans.length}</p>
                <p className="text-xs text-muted-foreground">Across all active accounts</p>
              </motion.div>

              {/* Monthly EMI Card */}
              <motion.div
                whileHover={{ y: -4 }}
                className="glass-card rounded-2xl p-6 border border-primary/25 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Repayments</p>
                    <h3 className="font-semibold text-foreground">Total EMI</h3>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <p className="text-4xl font-bold text-primary mb-1">₹{sanctionedLoans.reduce((sum, l) => sum + l.emi, 0).toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Monthly obligation</p>
              </motion.div>

              {/* Credit Score Card */}
              {documentsUploaded && creditScore ? (
                <motion.div
                  whileHover={{ y: -4 }}
                  className="glass-card rounded-2xl p-6 border border-green-500/30 shadow-sm hover:shadow-lg transition-all bg-gradient-to-br from-green-500/8 to-emerald-500/5"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Score</p>
                      <h3 className="font-semibold text-foreground">Credit</h3>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-green-500/15 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-green-600" />
                    </div>
                  </div>
                  <p className="text-4xl font-bold text-green-600 mb-1">{creditScore}</p>
                  <p className="text-xs text-muted-foreground">Based on submitted docs</p>
                </motion.div>
              ) : (
                <motion.div
                  whileHover={{ y: -4 }}
                  className="glass-card rounded-2xl p-6 border border-muted/30 shadow-sm hover:shadow-lg transition-all opacity-70"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Score</p>
                      <h3 className="font-semibold text-foreground">Credit</h3>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-muted/20 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </div>
                  <p className="text-4xl font-bold text-muted-foreground mb-1">--</p>
                  <p className="text-xs text-muted-foreground">Upload docs to generate</p>
                </motion.div>
              )}
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-2xl p-6 border border-border/30"
            >
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Recent Activity
              </h3>
              <div className="space-y-3">
                {recentActivity.map((activity, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    className="flex items-center justify-between pb-3 border-b border-border/30 last:border-b-0 hover:bg-secondary/30 px-3 py-2 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{activity.icon}</span>
                      <div>
                        <p className="text-sm font-medium text-foreground">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.date}</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-accent/10 text-accent">
                      {activity.status}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          {/* Chatbot Tab */}
          <TabsContent value="chatbot">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border border-border/50 rounded-xl bg-card/80 backdrop-blur overflow-hidden h-[600px]"
            >
              <ChatWindow isInline={true} />
            </motion.div>
          </TabsContent>

          {/* My Loans Tab */}
          <TabsContent value="loans" className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {sanctionedLoans.length > 0 ? (
                <div className="space-y-4">
                  {sanctionedLoans.map((loan, idx) => (
                    <motion.div
                      key={loan.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ y: -5 }}
                      className="glass-card rounded-2xl p-6 border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-elevated"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-foreground text-lg">{loan.id}</h4>
                          <p className="text-xs text-muted-foreground">Disbursed: {loan.disbursedDate}</p>
                        </div>
                        <span className="px-4 py-2 rounded-full bg-green-500/10 text-green-600 text-xs font-semibold border border-green-500/20">
                          {loan.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="bg-secondary/50 rounded-lg p-3">
                          <p className="text-xs text-muted-foreground mb-1">Loan Amount</p>
                          <p className="font-bold text-foreground">₹{loan.amount.toLocaleString()}</p>
                        </div>
                        <div className="bg-secondary/50 rounded-lg p-3">
                          <p className="text-xs text-muted-foreground mb-1">Interest Rate</p>
                          <p className="font-bold text-foreground">{loan.interestRate}%</p>
                        </div>
                        <div className="bg-secondary/50 rounded-lg p-3">
                          <p className="text-xs text-muted-foreground mb-1">Tenure</p>
                          <p className="font-bold text-foreground">{loan.tenure}m</p>
                        </div>
                        <div className="bg-accent/10 rounded-lg p-3 border border-accent/20">
                          <p className="text-xs text-muted-foreground mb-1">Monthly EMI</p>
                          <p className="font-bold text-accent">₹{loan.emi.toLocaleString()}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="glass-card rounded-2xl p-12 text-center border border-border/30">
                  <CreditCard className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">No sanctioned loans yet. Start a chat with our AI to apply for a loan.</p>
                </div>
              )}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
