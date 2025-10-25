import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, TrendingUp, Users, Ban, Lock, XCircle, AlertCircle, Settings, CheckCircle, Zap, Activity, User, FileText, RotateCcw, Brain } from 'lucide-react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Types
type Domain = 'sassa' | 'raf';

interface Stats {
  alertsToday: number;
  riskScore: number;
  fraudPrevented: number;
  activeCases: number;
}

interface RAFStats {
  claimsProcessedToday: number;
  systemRiskScore: number;
  fraudulentClaimsBlocked: number;
  activeCases: number;
  legitimateVictimsProtected: number;
}

interface RAFActions {
  claimsBlocked: number;
  medicalReportsFlagged: number;
  collisionRingDetected: number;
  casesEscalated: number;
}

interface PreventionAction {
  id: string;
  timestamp: string;
  threatType: string;
  action: string;
  status: 'BLOCKED' | 'PAYMENT HELD' | 'ACCOUNT LOCKED' | 'ESCALATED';
  responseTime: number;
  icon: string;
  details: string;
  domain: Domain;
}

interface PreventionStats {
  paymentsBlocked: number;
  accountsLocked: number;
  applicationsRejected: number;
  casesEscalated: number;
}

interface PreventionRules {
  autoBlockPayments: boolean;
  autoLockAccounts: boolean;
  autoRejectApplications: boolean;
  autoEscalate: boolean;
}

interface TransactionDot {
  id: string;
  type: 'normal' | 'threat';
  x: number;
  y: number;
  speed: number;
  stage: 'detection' | 'analysis' | 'prevention' | 'learning';
  blocked: boolean;
}

interface PreventionMetrics {
  preventionRate: number;
  avgResponseTime: number;
  threatsStopped: number;
  totalProcessed: number;
}

interface HumanReviewCase {
  id: string;
  type: 'auto-prevented' | 'needs-investigation' | 'released';
  threatType: string;
  timestamp: string;
  details: string;
  riskScore: number;
  action: string;
  status: 'PREVENTED' | 'PENDING REVIEW' | 'RELEASED';
  canOverride: boolean;
  domain: Domain;
}

interface ModelLearning {
  retrainCount: number;
  lastRetrain: string;
  accuracyImprovement: number;
}

// Mock data generator

const generatePreventionAction = (domain: Domain = 'sassa'): PreventionAction => {
  const sassaThreatTypes = [
    'Identity Duplication Detected',
    'Collusion Pattern Identified', 
    'Velocity Attack Detected',
    'Document Forgery Attempt',
    'Account Takeover in Progress',
    'Suspicious Payment Pattern',
    'Multiple Application Fraud',
    'Social Engineering Attempt'
  ];
  
  const rafThreatTypes = [
    'Duplicate Claim Detection',
    'Collusion Ring Pattern',
    'Impossible Injury Claims',
    'Ghost Claimant',
    'Velocity Attack',
    'Medical Report Mismatch',
    'Fake Accident Scene',
    'Duplicate Doctor Pattern'
  ];
  
  const threatTypes = domain === 'sassa' ? sassaThreatTypes : rafThreatTypes;
  
  const sassaActions = [
    { action: 'Payment Blocked', status: 'BLOCKED' as const, icon: '🛡️' },
    { action: '3 Accounts Locked', status: 'ACCOUNT LOCKED' as const, icon: '⚠️' },
    { action: 'IP Banned + Case Escalated', status: 'ESCALATED' as const, icon: '🚨' },
    { action: 'Application Rejected', status: 'BLOCKED' as const, icon: '🚫' },
    { action: 'Payment Held for Review', status: 'PAYMENT HELD' as const, icon: '⏸️' }
  ];
  
  const rafActions = [
    { action: 'Claim Blocked', status: 'BLOCKED' as const, icon: '🛡️' },
    { action: '3 Claims Locked', status: 'ACCOUNT LOCKED' as const, icon: '⚠️' },
    { action: 'Doctor License Suspended', status: 'ESCALATED' as const, icon: '🚨' },
    { action: 'Claim Rejected', status: 'BLOCKED' as const, icon: '🚫' },
    { action: 'Claim Held for Review', status: 'PAYMENT HELD' as const, icon: '⏸️' }
  ];
  
  const actions = domain === 'sassa' ? sassaActions : rafActions;
  const selectedAction = actions[Math.floor(Math.random() * actions.length)];
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    timestamp: new Date().toLocaleTimeString(),
    threatType: threatTypes[Math.floor(Math.random() * threatTypes.length)],
    action: selectedAction.action,
    status: selectedAction.status,
    responseTime: Math.floor(Math.random() * 200) + 20,
    icon: selectedAction.icon,
    details: `Automated response triggered for threat ID ${Math.floor(Math.random() * 10000)}`,
    domain
  };
};

const generateMockStats = (): Stats => ({
  alertsToday: Math.floor(Math.random() * 50) + 10,
  riskScore: Math.floor(Math.random() * 100),
  fraudPrevented: Math.floor(Math.random() * 500000) + 100000,
  activeCases: Math.floor(Math.random() * 20) + 5
});

const generateRAFStats = (): RAFStats => ({
  claimsProcessedToday: Math.floor(Math.random() * 200) + 50,
  systemRiskScore: Math.floor(Math.random() * 30) + 5, // Lower risk for RAF
  fraudulentClaimsBlocked: Math.floor(Math.random() * 2000000) + 500000, // R 500K - R 2.5M
  activeCases: Math.floor(Math.random() * 15) + 3,
  legitimateVictimsProtected: Math.floor(Math.random() * 100) + 20
});

const generateRafaActions = (): RAFActions => ({
  claimsBlocked: Math.floor(Math.random() * 30) + 5,
  medicalReportsFlagged: Math.floor(Math.random() * 25) + 8,
  collisionRingDetected: Math.floor(Math.random() * 10) + 2,
  casesEscalated: Math.floor(Math.random() * 8) + 1
});

const generateScatterData = () => {
  return Array.from({ length: 20 }, (_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    risk: Math.floor(Math.random() * 100)
  }));
};

const generateTransactionDot = (): TransactionDot => ({
  id: Math.random().toString(36).substr(2, 9),
  type: Math.random() < 0.3 ? 'threat' : 'normal',
  x: 0,
  y: Math.random() * 100 + 20,
  speed: Math.random() * 2 + 1,
  stage: 'detection',
  blocked: false
});

const generatePreventionMetrics = (): PreventionMetrics => ({
  preventionRate: 95 + Math.random() * 5, // 95-100%
  avgResponseTime: Math.random() * 50 + 20, // 20-70ms
  threatsStopped: Math.floor(Math.random() * 50) + 100,
  totalProcessed: Math.floor(Math.random() * 200) + 500
});

const generateHumanReviewCase = (type: HumanReviewCase['type'], domain: Domain = 'sassa'): HumanReviewCase => {
  const sassaThreatTypes = [
    'Identity Duplication Detected',
    'Collusion Pattern Identified',
    'Velocity Attack Detected',
    'Document Forgery Attempt',
    'Account Takeover in Progress',
    'Suspicious Payment Pattern',
    'Multiple Application Fraud',
    'Social Engineering Attempt'
  ];
  
  const rafThreatTypes = [
    'Duplicate Claim Detection',
    'Collusion Ring Pattern',
    'Impossible Injury Claims',
    'Ghost Claimant',
    'Velocity Attack',
    'Medical Report Mismatch',
    'Fake Accident Scene',
    'Duplicate Doctor Pattern'
  ];
  
  const sassaActions = [
    'Payment Blocked',
    '3 Accounts Locked',
    'Application Rejected',
    'Payment Held for Review',
    'IP Banned + Case Escalated'
  ];
  
  const rafActions = [
    'Claim Blocked',
    '3 Claims Locked',
    'Claim Rejected',
    'Claim Held for Review',
    'Doctor License Suspended'
  ];
  
  const threatTypes = domain === 'sassa' ? sassaThreatTypes : rafThreatTypes;
  const actions = domain === 'sassa' ? sassaActions : rafActions;
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    type,
    threatType: threatTypes[Math.floor(Math.random() * threatTypes.length)],
    timestamp: new Date().toLocaleTimeString(),
    details: `Automated response triggered for threat ID ${Math.floor(Math.random() * 10000)}`,
    riskScore: Math.floor(Math.random() * 100),
    action: actions[Math.floor(Math.random() * actions.length)],
    status: type === 'auto-prevented' ? 'PREVENTED' : type === 'needs-investigation' ? 'PENDING REVIEW' : 'RELEASED',
    canOverride: type === 'auto-prevented',
    domain
  };
};

const generateModelLearning = (): ModelLearning => ({
  retrainCount: Math.floor(Math.random() * 5) + 1,
  lastRetrain: new Date().toLocaleTimeString(),
  accuracyImprovement: Math.random() * 2 + 0.5 // 0.5-2.5%
});

const App: React.FC = () => {
  const [currentDomain, setCurrentDomain] = useState<Domain>('sassa');
  const [stats, setStats] = useState<Stats>(generateMockStats());
  const [rafStats, setRafStats] = useState<RAFStats>(generateRAFStats());
  const [rafActions, setRafActions] = useState<RAFActions>(generateRafaActions());
  const [scatterData, setScatterData] = useState(generateScatterData());
  const [isOnline, setIsOnline] = useState(true);
  const [preventionActions, setPreventionActions] = useState<PreventionAction[]>([]);
  const [preventionStats, setPreventionStats] = useState<PreventionStats>({
    paymentsBlocked: 23,
    accountsLocked: 8,
    applicationsRejected: 15,
    casesEscalated: 4
  });
  const [preventionRules, setPreventionRules] = useState<PreventionRules>({
    autoBlockPayments: true,
    autoLockAccounts: true,
    autoRejectApplications: true,
    autoEscalate: true
  });
  const [showPreventionModal, setShowPreventionModal] = useState(false);
  const [selectedAction, setSelectedAction] = useState<PreventionAction | null>(null);
  const [transactionDots, setTransactionDots] = useState<TransactionDot[]>([]);
  const [preventionMetrics, setPreventionMetrics] = useState<PreventionMetrics>(generatePreventionMetrics());
  const [recentPreventions, setRecentPreventions] = useState<PreventionAction[]>([]);
  const [activeTab, setActiveTab] = useState<'auto-prevented' | 'needs-investigation' | 'released'>('auto-prevented');
  const [humanReviewCases, setHumanReviewCases] = useState<HumanReviewCase[]>([]);
  const [modelLearning, setModelLearning] = useState<ModelLearning>(generateModelLearning());

  useEffect(() => {
    // Initialize with some prevention actions
    const initialPreventionActions = Array.from({ length: 5 }, () => generatePreventionAction(currentDomain));
    setPreventionActions(initialPreventionActions);
    setRecentPreventions(initialPreventionActions.slice(0, 5));
    
    // Initialize human review cases
    const initialAutoPrevented = Array.from({ length: 8 }, () => generateHumanReviewCase('auto-prevented', currentDomain));
    const initialNeedsInvestigation = Array.from({ length: 3 }, () => generateHumanReviewCase('needs-investigation', currentDomain));
    const initialReleased = Array.from({ length: 2 }, () => generateHumanReviewCase('released', currentDomain));
    setHumanReviewCases([...initialAutoPrevented, ...initialNeedsInvestigation, ...initialReleased]);

    // Auto-update every 3 seconds
    const interval = setInterval(() => {
      
      // Simulate automated threat prevention
      if (Math.random() < 0.7) { // 70% chance of prevention action
        const newPreventionAction = generatePreventionAction(currentDomain);
        setPreventionActions(prev => [newPreventionAction, ...prev].slice(0, 15));
        setRecentPreventions(prev => [newPreventionAction, ...prev].slice(0, 5));
        
        // Update prevention stats based on action type
        setPreventionStats(prev => {
          const updated = { ...prev };
          switch (newPreventionAction.status) {
            case 'BLOCKED':
              if (newPreventionAction.action.includes('Payment')) {
                updated.paymentsBlocked += 1;
              } else {
                updated.applicationsRejected += 1;
              }
              break;
            case 'ACCOUNT LOCKED':
              updated.accountsLocked += 1;
              break;
            case 'ESCALATED':
              updated.casesEscalated += 1;
              break;
          }
          return updated;
        });
      }
      
      // Update prevention metrics
      setPreventionMetrics(generatePreventionMetrics());
      
      // Update stats
      setStats(generateMockStats());
      setRafStats(generateRAFStats());
      setRafActions(generateRafaActions());
      
      // Update scatter data
      setScatterData(generateScatterData());
      
      // Simulate occasional offline status
      if (Math.random() < 0.1) {
        setIsOnline(false);
        setTimeout(() => setIsOnline(true), 2000);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Transaction dots animation
  useEffect(() => {
    const animationInterval = setInterval(() => {
      // Add new transaction dots
      if (Math.random() < 0.8) {
        const newDot = generateTransactionDot();
        setTransactionDots(prev => [...prev, newDot]);
      }

      // Update existing dots
      setTransactionDots(prev => 
        prev.map(dot => {
          const newX = dot.x + dot.speed;
          let newStage = dot.stage;
          
          if (newX > 20 && dot.stage === 'detection') newStage = 'analysis';
          if (newX > 40 && dot.stage === 'analysis') newStage = 'prevention';
          if (newX > 60 && dot.stage === 'prevention') newStage = 'learning';
          
          // Block threats at prevention stage
          if (dot.type === 'threat' && newStage === 'prevention' && !dot.blocked) {
            return { ...dot, x: newX, stage: newStage, blocked: true };
          }
          
          return { ...dot, x: newX, stage: newStage };
        }).filter(dot => dot.x < 100) // Remove dots that have passed through
      );
    }, 100);

    return () => clearInterval(animationInterval);
  }, []);

  // Refresh data when domain changes
  useEffect(() => {
    // Generate new data for the selected domain
    const newPreventionActions = Array.from({ length: 5 }, () => generatePreventionAction(currentDomain));
    setPreventionActions(newPreventionActions);
    setRecentPreventions(newPreventionActions.slice(0, 5));
    
    const newAutoPrevented = Array.from({ length: 8 }, () => generateHumanReviewCase('auto-prevented', currentDomain));
    const newNeedsInvestigation = Array.from({ length: 3 }, () => generateHumanReviewCase('needs-investigation', currentDomain));
    const newReleased = Array.from({ length: 2 }, () => generateHumanReviewCase('released', currentDomain));
    setHumanReviewCases([...newAutoPrevented, ...newNeedsInvestigation, ...newReleased]);
  }, [currentDomain]); // eslint-disable-line react-hooks/exhaustive-deps


  const getStatusColor = (status: PreventionAction['status']) => {
    switch (status) {
      case 'BLOCKED': return 'text-red-400 bg-red-900/20';
      case 'PAYMENT HELD': return 'text-yellow-400 bg-yellow-900/20';
      case 'ACCOUNT LOCKED': return 'text-orange-400 bg-orange-900/20';
      case 'ESCALATED': return 'text-purple-400 bg-purple-900/20';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR'
    }).format(amount);
  };

  const handlePreventionActionClick = (action: PreventionAction) => {
    setSelectedAction(action);
    setShowPreventionModal(true);
  };

  const togglePreventionRule = (rule: keyof PreventionRules) => {
    setPreventionRules(prev => ({
      ...prev,
      [rule]: !prev[rule]
    }));
  };

  const handleOverride = (caseId: string) => {
    setHumanReviewCases(prev => 
      prev.map(case_ => 
        case_.id === caseId 
          ? { ...case_, type: 'released' as const, status: 'RELEASED' as const }
          : case_
      )
    );
    // Update model learning
    setModelLearning(prev => ({
      ...prev,
      retrainCount: prev.retrainCount + 1,
      lastRetrain: new Date().toLocaleTimeString()
    }));
  };

  const handleApprovePrevention = (caseId: string) => {
    setHumanReviewCases(prev => 
      prev.map(case_ => 
        case_.id === caseId 
          ? { ...case_, type: 'auto-prevented' as const, status: 'PREVENTED' as const }
          : case_
      )
    );
  };

  const handleRelease = (caseId: string) => {
    setHumanReviewCases(prev => 
      prev.map(case_ => 
        case_.id === caseId 
          ? { ...case_, type: 'released' as const, status: 'RELEASED' as const }
          : case_
      )
    );
  };

  const getHumanReviewStatusColor = (status: HumanReviewCase['status']) => {
    switch (status) {
      case 'PREVENTED': return 'text-green-400 bg-green-900/20';
      case 'PENDING REVIEW': return 'text-yellow-400 bg-yellow-900/20';
      case 'RELEASED': return 'text-blue-400 bg-blue-900/20';
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg text-white">
      {/* Header */}
      <header className="bg-dark-card border-b border-dark-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Shield className="h-8 w-8 text-blue-400" />
            <h1 className="text-2xl font-bold">LAID FIBA Engine</h1>
          </div>
          <div className="flex items-center space-x-6">
            {/* Domain Toggle */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">Domain:</span>
              <div className="flex bg-dark-bg rounded-lg border border-dark-border">
                <button
                  onClick={() => setCurrentDomain('sassa')}
                  className={`px-4 py-2 text-sm font-medium rounded-l-lg transition-colors ${
                    currentDomain === 'sassa'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  SASSA Grant Fraud
                </button>
                <button
                  onClick={() => setCurrentDomain('raf')}
                  className={`px-4 py-2 text-sm font-medium rounded-r-lg transition-colors ${
                    currentDomain === 'raf'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  RAF Claims Fraud
                </button>
              </div>
            </div>
            
            {/* System Status */}
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-sm font-medium">
                {isOnline ? 'System Online' : 'System Offline'}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Row */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {currentDomain === 'sassa' ? (
            <>
              <div className="bg-dark-card rounded-lg p-6 border border-dark-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Alerts Today</p>
                    <p className="text-3xl font-bold text-white">{stats.alertsToday}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-orange-400" />
                </div>
              </div>

              <div className="bg-dark-card rounded-lg p-6 border border-dark-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Risk Score</p>
                    <p className="text-3xl font-bold text-white">{stats.riskScore}/100</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-red-400" />
                </div>
              </div>

              <div className="bg-dark-card rounded-lg p-6 border border-dark-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Fraud Prevented</p>
                    <p className="text-3xl font-bold text-white">{formatCurrency(stats.fraudPrevented)}</p>
                  </div>
                  <Shield className="h-8 w-8 text-green-400" />
                </div>
              </div>

              <div className="bg-dark-card rounded-lg p-6 border border-dark-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Active Cases</p>
                    <p className="text-3xl font-bold text-white">{stats.activeCases}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-400" />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="bg-dark-card rounded-lg p-6 border border-dark-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Claims Processed Today</p>
                    <p className="text-3xl font-bold text-white">{rafStats.claimsProcessedToday}</p>
                  </div>
                  <Activity className="h-8 w-8 text-blue-400" />
                </div>
              </div>

              <div className="bg-dark-card rounded-lg p-6 border border-dark-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">System Risk Score</p>
                    <p className="text-3xl font-bold text-white">{rafStats.systemRiskScore}/100</p>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                      <div 
                        className="bg-green-400 h-2 rounded-full" 
                        style={{ width: `${rafStats.systemRiskScore}%` }}
                      ></div>
                    </div>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-400" />
                </div>
              </div>

              <div className="bg-dark-card rounded-lg p-6 border border-dark-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Fraudulent Claims Blocked</p>
                    <p className="text-3xl font-bold text-white">{formatCurrency(rafStats.fraudulentClaimsBlocked)}</p>
                  </div>
                  <Shield className="h-8 w-8 text-red-400" />
                </div>
              </div>

              <div className="bg-dark-card rounded-lg p-6 border border-dark-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Active Investigations</p>
                    <p className="text-3xl font-bold text-white">{rafStats.activeCases}</p>
                  </div>
                  <Users className="h-8 w-8 text-orange-400" />
                </div>
              </div>
            </>
          )}
        </div>

        {/* RAF Additional Stats */}
        {currentDomain === 'raf' && (
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 mb-8">
            <div className="bg-dark-card rounded-lg p-6 border border-dark-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Legitimate Victims Protected</p>
                  <p className="text-3xl font-bold text-white">{rafStats.legitimateVictimsProtected}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
            </div>
          </div>
        )}

        {/* Automated Actions Panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {currentDomain === 'sassa' ? (
            <>
              <div className="bg-dark-card rounded-lg p-6 border border-dark-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Payments Blocked Today</p>
                    <p className="text-3xl font-bold text-white">{preventionStats.paymentsBlocked}</p>
                  </div>
                  <Ban className="h-8 w-8 text-red-400" />
                </div>
              </div>

              <div className="bg-dark-card rounded-lg p-6 border border-dark-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Accounts Locked</p>
                    <p className="text-3xl font-bold text-white">{preventionStats.accountsLocked}</p>
                  </div>
                  <Lock className="h-8 w-8 text-orange-400" />
                </div>
              </div>

              <div className="bg-dark-card rounded-lg p-6 border border-dark-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Applications Rejected</p>
                    <p className="text-3xl font-bold text-white">{preventionStats.applicationsRejected}</p>
                  </div>
                  <XCircle className="h-8 w-8 text-yellow-400" />
                </div>
              </div>

              <div className="bg-dark-card rounded-lg p-6 border border-dark-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Cases Escalated</p>
                    <p className="text-3xl font-bold text-white">{preventionStats.casesEscalated}</p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-purple-400" />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="bg-dark-card rounded-lg p-6 border border-dark-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Claims Blocked</p>
                    <p className="text-3xl font-bold text-white">{rafActions.claimsBlocked}</p>
                  </div>
                  <Ban className="h-8 w-8 text-red-400" />
                </div>
              </div>

              <div className="bg-dark-card rounded-lg p-6 border border-dark-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Medical Reports Flagged</p>
                    <p className="text-3xl font-bold text-white">{rafActions.medicalReportsFlagged}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-orange-400" />
                </div>
              </div>

              <div className="bg-dark-card rounded-lg p-6 border border-dark-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Collusion Rings Detected</p>
                    <p className="text-3xl font-bold text-white">{rafActions.collisionRingDetected}</p>
                  </div>
                  <Users className="h-8 w-8 text-yellow-400" />
                </div>
              </div>

              <div className="bg-dark-card rounded-lg p-6 border border-dark-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Cases Escalated</p>
                    <p className="text-3xl font-bold text-white">{rafActions.casesEscalated}</p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-blue-400" />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Prevention Rules Toggle */}
        <div className="bg-dark-card rounded-lg p-6 border border-dark-border mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Settings className="h-5 w-5 text-blue-400" />
            <h2 className="text-xl font-semibold">Prevention Rules</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center justify-between p-4 bg-dark-bg rounded-lg border border-dark-border">
              <div>
                <p className="font-medium text-white">
                  {currentDomain === 'sassa' ? 'Auto-block payments' : 'Auto-block claims'}
                </p>
                <p className="text-sm text-gray-400">Risk &gt; 80</p>
              </div>
              <button
                onClick={() => togglePreventionRule('autoBlockPayments')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  preventionRules.autoBlockPayments ? 'bg-green-500' : 'bg-gray-600'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  preventionRules.autoBlockPayments ? 'translate-x-6' : 'translate-x-0.5'
                }`}></div>
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-dark-bg rounded-lg border border-dark-border">
              <div>
                <p className="font-medium text-white">
                  {currentDomain === 'sassa' ? 'Auto-lock accounts' : 'Auto-lock claims'}
                </p>
                <p className="text-sm text-gray-400">Risk &gt; 90</p>
              </div>
              <button
                onClick={() => togglePreventionRule('autoLockAccounts')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  preventionRules.autoLockAccounts ? 'bg-green-500' : 'bg-gray-600'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  preventionRules.autoLockAccounts ? 'translate-x-6' : 'translate-x-0.5'
                }`}></div>
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-dark-bg rounded-lg border border-dark-border">
              <div>
                <p className="font-medium text-white">
                  {currentDomain === 'sassa' ? 'Auto-reject applications' : 'Auto-reject claims'}
                </p>
                <p className="text-sm text-gray-400">Risk &gt; 95</p>
              </div>
              <button
                onClick={() => togglePreventionRule('autoRejectApplications')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  preventionRules.autoRejectApplications ? 'bg-green-500' : 'bg-gray-600'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  preventionRules.autoRejectApplications ? 'translate-x-6' : 'translate-x-0.5'
                }`}></div>
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-dark-bg rounded-lg border border-dark-border">
              <div>
                <p className="font-medium text-white">Auto-escalate</p>
                <p className="text-sm text-gray-400">Complex patterns</p>
              </div>
              <button
                onClick={() => togglePreventionRule('autoEscalate')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  preventionRules.autoEscalate ? 'bg-green-500' : 'bg-gray-600'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  preventionRules.autoEscalate ? 'translate-x-6' : 'translate-x-0.5'
                }`}></div>
              </button>
            </div>
          </div>
        </div>

        {/* Live Threat Prevention Visualization */}
        <div className="bg-dark-card rounded-lg border border-dark-border mb-8">
          <div className="p-6 border-b border-dark-border">
            <div className="flex items-center space-x-2 mb-4">
              <Activity className="h-6 w-6 text-blue-400" />
              <h2 className="text-xl font-semibold">Live Threat Prevention</h2>
            </div>
            
            {/* IPS Pipeline Visualization */}
            <div className="relative h-32 bg-dark-bg rounded-lg border border-dark-border mb-4 overflow-hidden">
              {/* Pipeline Stages */}
              <div className="absolute inset-0 flex items-center">
                <div className="w-full flex justify-between px-4">
                  <div className="text-center">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Zap className="h-4 w-4 text-white" />
                    </div>
                    <p className="text-xs text-gray-400">Detection</p>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Activity className="h-4 w-4 text-white" />
                    </div>
                    <p className="text-xs text-gray-400">Analysis</p>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Shield className="h-4 w-4 text-white" />
                    </div>
                    <p className="text-xs text-gray-400">Prevention</p>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <p className="text-xs text-gray-400">Learning</p>
                  </div>
                </div>
              </div>
              
              {/* Animated Transaction Dots */}
              {transactionDots.map((dot) => (
                <div
                  key={dot.id}
                  className={`absolute w-3 h-3 rounded-full transition-all duration-100 ${
                    dot.type === 'normal' 
                      ? 'bg-blue-400' 
                      : dot.blocked 
                        ? 'bg-red-500 animate-pulse' 
                        : 'bg-red-400'
                  }`}
                  style={{
                    left: `${dot.x}%`,
                    top: `${dot.y}%`,
                    transform: dot.blocked ? 'scale(1.5)' : 'scale(1)'
                  }}
                >
                  {dot.blocked && (
                    <div className="absolute -top-1 -left-1 text-red-500 font-bold text-xs">
                      ✕
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Prevention Rate Gauge */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">
                  {preventionMetrics.preventionRate.toFixed(1)}%
                </div>
                <p className="text-sm text-gray-400">Threats Stopped</p>
                <p className="text-xs text-gray-500">&lt; {Math.round(preventionMetrics.avgResponseTime)}ms avg</p>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  {preventionMetrics.threatsStopped}
                </div>
                <p className="text-sm text-gray-400">Threats Prevented Today</p>
                <p className="text-xs text-gray-500">{preventionMetrics.totalProcessed} total processed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Last 5 Prevented Threats Mini-Feed */}
        <div className="bg-dark-card rounded-lg border border-dark-border mb-8">
          <div className="p-6 border-b border-dark-border">
            <h2 className="text-xl font-semibold">Last 5 Prevented Threats</h2>
            <p className="text-sm text-gray-400 mt-1">Real-time prevention feed</p>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {recentPreventions.map((prevention, index) => (
                <div key={prevention.id} className="flex items-center justify-between p-3 bg-dark-bg rounded-lg border border-dark-border">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{prevention.icon}</span>
                    <div>
                      <p className="font-medium text-white text-sm">{prevention.threatType}</p>
                      <p className="text-xs text-gray-400">{prevention.timestamp}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-300">→ {prevention.action}</p>
                    <p className="text-xs text-gray-500">{prevention.responseTime}ms</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Human Oversight Dashboard */}
        <div className="bg-dark-card rounded-lg border border-dark-border mb-8">
          <div className="p-6 border-b border-dark-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <User className="h-6 w-6 text-purple-400" />
                <h2 className="text-xl font-semibold">Human Oversight</h2>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Brain className="h-4 w-4" />
                <span>Model retrained {modelLearning.retrainCount} times today from overrides</span>
              </div>
            </div>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex border-b border-dark-border">
            {[
              { id: 'auto-prevented', label: 'Auto-Prevented', count: humanReviewCases.filter(c => c.type === 'auto-prevented').length },
              { id: 'needs-investigation', label: 'Needs Investigation', count: humanReviewCases.filter(c => c.type === 'needs-investigation').length },
              { id: 'released', label: 'Released', count: humanReviewCases.filter(c => c.type === 'released').length }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-purple-400 border-b-2 border-purple-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
          
          {/* Tab Content */}
          <div className="p-6">
            <div className="space-y-4">
              {humanReviewCases
                .filter(case_ => case_.type === activeTab)
                .map((case_) => (
                  <div key={case_.id} className="bg-dark-bg rounded-lg p-4 border border-dark-border">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <span className="font-medium text-white">{case_.threatType}</span>
                        <span className="text-sm text-gray-400">{case_.timestamp}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-white">Risk: {case_.riskScore}%</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getHumanReviewStatusColor(case_.status)}`}>
                          {case_.status}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-300 mb-3">{case_.details}</p>
                    <p className="text-sm text-gray-400 mb-4">Action: {case_.action}</p>
                    
                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-3">
                      {activeTab === 'auto-prevented' && case_.canOverride && (
                        <button
                          onClick={() => handleOverride(case_.id)}
                          className="flex items-center space-x-2 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          <RotateCcw className="h-4 w-4" />
                          <span>Override & Release</span>
                        </button>
                      )}
                      
                      {activeTab === 'needs-investigation' && (
                        <>
                          <button
                            onClick={() => handleApprovePrevention(case_.id)}
                            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                          >
                            <CheckCircle className="h-4 w-4" />
                            <span>Approve Prevention</span>
                          </button>
                          <button
                            onClick={() => handleRelease(case_.id)}
                            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                          >
                            <RotateCcw className="h-4 w-4" />
                            <span>Release</span>
                          </button>
                        </>
                      )}
                      
                      {activeTab === 'released' && (
                        <span className="text-sm text-gray-400 italic">
                          Released after human review - fed back to ML model
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              
              {humanReviewCases.filter(case_ => case_.type === activeTab).length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No cases in this category</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Auto-Response Log */}
          <div className="bg-dark-card rounded-lg border border-dark-border">
            <div className="p-6 border-b border-dark-border">
              <h2 className="text-xl font-semibold">Auto-Response Log</h2>
              <p className="text-sm text-gray-400 mt-1">Real-time threat prevention actions</p>
            </div>
            <div className="p-6 max-h-96 overflow-y-auto">
              <div className="space-y-3">
                {preventionActions.map((action, index) => (
                  <div 
                    key={action.id} 
                    className="bg-dark-bg rounded-lg p-4 border border-dark-border hover:border-blue-500 transition-colors cursor-pointer"
                    onClick={() => handlePreventionActionClick(action)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{action.icon}</span>
                        <span className="font-medium text-white">{action.threatType}</span>
                        <span className="text-sm text-gray-400">{action.timestamp}</span>
                      </div>
                      <span className="text-sm font-medium text-white">{action.responseTime}ms</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">→ {action.action}</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(action.status)}`}>
                        {action.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Risk Visualization */}
          <div className="bg-dark-card rounded-lg border border-dark-border">
            <div className="p-6 border-b border-dark-border">
              <h2 className="text-xl font-semibold">Risk Distribution</h2>
            </div>
            <div className="p-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart data={scatterData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis 
                      type="number" 
                      dataKey="x" 
                      name="Transaction Volume"
                      stroke="#64748b"
                      tick={{ fill: '#94a3b8' }}
                    />
                    <YAxis 
                      type="number" 
                      dataKey="y" 
                      name="Risk Level"
                      stroke="#64748b"
                      tick={{ fill: '#94a3b8' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1e293b', 
                        border: '1px solid #334155',
                        borderRadius: '8px',
                        color: '#ffffff'
                      }}
                    />
                    <Scatter 
                      dataKey="risk" 
                      fill="#3b82f6"
                      r={6}
                    />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-400">
                  Each point represents a transaction with its risk level and volume
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Prevention Action Details Modal */}
      {showPreventionModal && selectedAction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-dark-card rounded-lg border border-dark-border p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Prevention Action Details</h3>
              <button
                onClick={() => setShowPreventionModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{selectedAction.icon}</span>
                <div>
                  <p className="font-medium text-white">{selectedAction.threatType}</p>
                  <p className="text-sm text-gray-400">{selectedAction.timestamp}</p>
                </div>
              </div>
              
              <div className="bg-dark-bg rounded-lg p-4 border border-dark-border">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Action Taken</p>
                    <p className="font-medium text-white">{selectedAction.action}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Response Time</p>
                    <p className="font-medium text-white">{selectedAction.responseTime}ms</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Status</p>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(selectedAction.status)}`}>
                      {selectedAction.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Threat ID</p>
                    <p className="font-medium text-white">{selectedAction.id}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-400 mb-2">Details</p>
                <p className="text-sm text-gray-300">{selectedAction.details}</p>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowPreventionModal(false)}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                  <CheckCircle className="h-4 w-4 inline mr-2" />
                  Mark as Reviewed
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
