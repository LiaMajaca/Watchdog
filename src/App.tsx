import React, { useState } from 'react';
import { Shield, AlertTriangle, TrendingUp, Users, Ban, XCircle, AlertCircle, CheckCircle, Activity, Play, RotateCcw, Brain, Database, Zap, Eye } from 'lucide-react';

// Types
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
  collusionRingsDetected: number;
  casesEscalated: number;
}

interface PreventionAction {
  id: string;
  timestamp: string;
  phase: string;
  threatType: string;
  action: string;
  status: 'DETECTED' | 'ANALYZING' | 'BLOCKED' | 'FLAGGED' | 'ESCALATED';
  responseTime: number;
  details: string;
  claimAmount?: number;
  technicalDetails?: string;
  mlModel?: string;
  riskFactors?: Array<{ factor: string; weight: number; value: string }>;
}

interface DemoResults {
  title: string;
  fraudPrevented: number;
  victimsProtected: number;
  responseTime: string;
  details: string;
  technicalSummary: string;
}

// Helper function
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    maximumFractionDigits: 0
  }).format(amount);
};

const App: React.FC = () => {
  const [rafStats, setRafStats] = useState<RAFStats>({
    claimsProcessedToday: 147,
    systemRiskScore: 12,
    fraudulentClaimsBlocked: 0,
    activeCases: 3,
    legitimateVictimsProtected: 0
  });

  const [rafActions, setRafActions] = useState<RAFActions>({
    claimsBlocked: 0,
    medicalReportsFlagged: 0,
    collusionRingsDetected: 0,
    casesEscalated: 0
  });

  const [preventionLog, setPreventionLog] = useState<PreventionAction[]>([]);
  const [demoRunning, setDemoRunning] = useState(false);
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [demoResults, setDemoResults] = useState<DemoResults | null>(null);
  const [demoProgress, setDemoProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState<string>('');
  const [selectedAction, setSelectedAction] = useState<PreventionAction | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'analytics' | 'cases' | 'settings'>('dashboard');

  // Main Demo Function with Realistic Data
  const runRealisticCollusionDemo = async () => {
    setDemoRunning(true);
    setDemoProgress(0);
    setPreventionLog([]);
    setCurrentPhase('Initializing Detection Engine...');

    const realisticActions: PreventionAction[] = [
      {
        id: 'RAF-2024-001',
        timestamp: '2024-01-15 09:23:45',
        phase: 'DETECTION',
        threatType: 'Suspicious Collusion Pattern',
        action: 'Real-time analysis of claim patterns detected potential collusion ring',
        status: 'DETECTED',
        responseTime: 47,
        details: 'Multiple claims from same geographic area with similar injury patterns and overlapping medical providers detected. ML model flagged 3 claims with 94% confidence.',
        claimAmount: 450000,
        technicalDetails: 'Used ensemble of Random Forest and Neural Network models trained on 5 years of RAF data. Pattern matching algorithm identified suspicious correlations.',
        mlModel: 'RAF-Collusion-Detector v2.1',
        riskFactors: [
          { factor: 'Geographic clustering', weight: 0.35, value: 'High' },
          { factor: 'Medical provider overlap', weight: 0.28, value: 'High' },
          { factor: 'Injury pattern similarity', weight: 0.22, value: 'Medium' },
          { factor: 'Timing correlation', weight: 0.15, value: 'Medium' }
        ]
      },
      {
        id: 'RAF-2024-002',
        timestamp: '2024-01-15 09:24:12',
        phase: 'ANALYSIS',
        threatType: 'Medical Report Inconsistency',
        action: 'Deep analysis of medical documentation revealed fabricated injuries',
        status: 'ANALYZING',
        responseTime: 89,
        details: 'NLP analysis of medical reports showed identical phrasing across multiple claims. Radiology reports contain impossible injury combinations.',
        claimAmount: 320000,
        technicalDetails: 'Natural Language Processing model analyzed 15 medical reports. Found 87% text similarity and impossible anatomical correlations.',
        mlModel: 'RAF-Medical-NLP v1.8'
      },
      {
        id: 'RAF-2024-003',
        timestamp: '2024-01-15 09:25:33',
        phase: 'PREVENTION',
        threatType: 'Collusion Ring Dismantled',
        action: 'Successfully blocked fraudulent claims and escalated to investigation team',
        status: 'BLOCKED',
        responseTime: 156,
        details: 'System automatically blocked 3 fraudulent claims totaling R1,200,000. Case escalated to RAF Special Investigations Unit.',
        claimAmount: 1200000,
        technicalDetails: 'Multi-layered fraud detection prevented payout. Automated escalation triggered investigation protocols.',
        mlModel: 'RAF-Prevention-Engine v3.0'
      }
    ];

    // Simulate real-time processing
    for (let i = 0; i < realisticActions.length; i++) {
      setCurrentPhase(realisticActions[i].phase);
      setDemoProgress(((i + 1) / realisticActions.length) * 100);
      
      // Add action to log
      setPreventionLog(prev => [...prev, realisticActions[i]]);
      
      // Update stats
      setRafStats(prev => ({
        ...prev,
        fraudulentClaimsBlocked: prev.fraudulentClaimsBlocked + (realisticActions[i].claimAmount || 0),
        legitimateVictimsProtected: prev.legitimateVictimsProtected + 1
      }));

      setRafActions(prev => ({
        ...prev,
        claimsBlocked: prev.claimsBlocked + 1,
        medicalReportsFlagged: prev.medicalReportsFlagged + 1,
        collusionRingsDetected: prev.collusionRingsDetected + 1,
        casesEscalated: prev.casesEscalated + 1
      }));

      await sleep(2000);
    }

    setDemoResults({
      title: 'Collusion Ring Dismantled',
      fraudPrevented: 1200000,
      victimsProtected: 3,
      responseTime: '156ms',
      details: 'Successfully identified and blocked a sophisticated collusion ring operating in Gauteng province.',
      technicalSummary: 'Used advanced ML models to detect geographic clustering, medical provider overlap, and fabricated documentation patterns.'
    });

    setDemoRunning(false);
    setShowResultsModal(true);
  };

  const resetDemo = () => {
    setDemoRunning(false);
    setDemoProgress(0);
    setCurrentPhase('');
    setPreventionLog([]);
    setShowResultsModal(false);
    setDemoResults(null);
    setRafStats({
      claimsProcessedToday: 147,
      systemRiskScore: 12,
      fraudulentClaimsBlocked: 0,
      activeCases: 3,
      legitimateVictimsProtected: 0
    });
    setRafActions({
      claimsBlocked: 0,
      medicalReportsFlagged: 0,
      collusionRingsDetected: 0,
      casesEscalated: 0
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DETECTED': return 'text-blue-400 bg-blue-900/20';
      case 'ANALYZING': return 'text-yellow-400 bg-yellow-900/20';
      case 'BLOCKED': return 'text-red-400 bg-red-900/20';
      case 'FLAGGED': return 'text-orange-400 bg-orange-900/20';
      case 'ESCALATED': return 'text-purple-400 bg-purple-900/20';
    }
  };

  const getPhaseIcon = (phase: string) => {
    if (phase.includes('DETECTION')) return <Zap className="h-4 w-4 text-blue-400" />;
    if (phase.includes('ANALYSIS')) return <Brain className="h-4 w-4 text-yellow-400" />;
    if (phase.includes('PREVENTION')) return <Shield className="h-4 w-4 text-red-400" />;
    if (phase.includes('LEARNING')) return <Activity className="h-4 w-4 text-green-400" />;
    return <Database className="h-4 w-4 text-gray-400" />;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-4 lg:px-6 py-4 flex-shrink-0">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <Shield className="h-8 w-8 text-blue-400" />
            <div>
              <h1 className="text-xl lg:text-2xl font-bold">Khusela</h1>
              <p className="text-xs lg:text-sm text-gray-400">RAF Claims Fraud Prevention System</p>
            </div>
          </div>
          
          {/* Demo Controls */}
          <div className="flex items-center gap-2 lg:gap-3 w-full lg:w-auto">
            <button
              onClick={runRealisticCollusionDemo}
              disabled={demoRunning}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed px-4 lg:px-6 py-2 lg:py-3 rounded-lg font-bold transition-all text-sm lg:text-base flex-1 lg:flex-none"
            >
              <Play className="h-4 w-4 lg:h-5 lg:w-5" />
              <span className="hidden sm:inline">{demoRunning ? 'Demo Running...' : 'Run Collusion Demo'}</span>
              <span className="sm:hidden">{demoRunning ? 'Running...' : 'Run Demo'}</span>
            </button>
            <button
              onClick={resetDemo}
              className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-3 lg:px-4 py-2 lg:py-3 rounded-lg font-medium transition-all text-sm lg:text-base"
            >
              <RotateCcw className="h-4 w-4 lg:h-5 lg:w-5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>
        
        {/* Progress Bar & Phase */}
        {demoRunning && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400 flex items-center gap-2">
                <Activity className="h-4 w-4" />
                {currentPhase}
              </span>
              <span className="text-sm text-blue-400">{demoProgress}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${demoProgress}%` }}
              ></div>
            </div>
          </div>
        )}
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-gray-800 border-b border-gray-700 px-4 lg:px-6 flex-shrink-0">
        <div className="flex space-x-1 overflow-x-auto">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: Activity },
            { id: 'analytics', label: 'Analytics', icon: TrendingUp },
            { id: 'cases', label: 'Cases', icon: Users },
            { id: 'settings', label: 'Settings', icon: Shield }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-t-lg transition-all whitespace-nowrap ${
                activeTab === id
                  ? 'bg-gray-900 text-blue-400 border-b-2 border-blue-400'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-4 lg:p-6">
          {/* Dashboard Tab Content */}
          {activeTab === 'dashboard' && (
            <div>
              {/* Stats Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-6 mb-6 lg:mb-8">
                <div className="bg-gray-800 rounded-lg p-4 lg:p-6 border border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs lg:text-sm text-gray-400">Claims Processed</p>
                      <p className="text-2xl lg:text-3xl font-bold text-white">{rafStats.claimsProcessedToday}</p>
                    </div>
                    <Activity className="h-6 w-6 lg:h-8 lg:w-8 text-blue-400" />
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-4 lg:p-6 border border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs lg:text-sm text-gray-400">System Risk Score</p>
                      <p className={`text-2xl lg:text-3xl font-bold ${
                        rafStats.systemRiskScore > 70 ? 'text-red-400' : 
                        rafStats.systemRiskScore > 40 ? 'text-yellow-400' : 
                        'text-green-400'
                      }`}>
                        {rafStats.systemRiskScore}/100
                      </p>
                    </div>
                    <TrendingUp className="h-6 w-6 lg:h-8 lg:w-8 text-red-400" />
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-4 lg:p-6 border border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs lg:text-sm text-gray-400">Fraud Blocked</p>
                      <p className="text-xl lg:text-2xl font-bold text-green-400">
                        {formatCurrency(rafStats.fraudulentClaimsBlocked)}
                      </p>
                    </div>
                    <Shield className="h-6 w-6 lg:h-8 lg:w-8 text-green-400" />
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-4 lg:p-6 border border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs lg:text-sm text-gray-400">Active Cases</p>
                      <p className="text-2xl lg:text-3xl font-bold text-white">{rafStats.activeCases}</p>
                    </div>
                    <Users className="h-6 w-6 lg:h-8 lg:w-8 text-orange-400" />
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-4 lg:p-6 border border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs lg:text-sm text-gray-400">Victims Protected</p>
                      <p className="text-2xl lg:text-3xl font-bold text-blue-400">{rafStats.legitimateVictimsProtected}</p>
                    </div>
                    <CheckCircle className="h-6 w-6 lg:h-8 lg:w-8 text-blue-400" />
                  </div>
                </div>
              </div>

              {/* Actions Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
                <div className="bg-gray-800 rounded-lg p-4 lg:p-6 border border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs lg:text-sm text-gray-400">Claims Blocked</p>
                      <p className="text-2xl lg:text-3xl font-bold text-red-400">{rafActions.claimsBlocked}</p>
                    </div>
                    <Ban className="h-6 w-6 lg:h-8 lg:w-8 text-red-400" />
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-4 lg:p-6 border border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs lg:text-sm text-gray-400">Medical Reports Flagged</p>
                      <p className="text-2xl lg:text-3xl font-bold text-orange-400">{rafActions.medicalReportsFlagged}</p>
                    </div>
                    <AlertTriangle className="h-6 w-6 lg:h-8 lg:w-8 text-orange-400" />
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-4 lg:p-6 border border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs lg:text-sm text-gray-400">Collusion Rings Detected</p>
                      <p className="text-2xl lg:text-3xl font-bold text-yellow-400">{rafActions.collusionRingsDetected}</p>
                    </div>
                    <Users className="h-6 w-6 lg:h-8 lg:w-8 text-yellow-400" />
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-4 lg:p-6 border border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs lg:text-sm text-gray-400">Cases Escalated</p>
                      <p className="text-2xl lg:text-3xl font-bold text-purple-400">{rafActions.casesEscalated}</p>
                    </div>
                    <AlertCircle className="h-6 w-6 lg:h-8 lg:w-8 text-purple-400" />
                  </div>
                </div>
              </div>

              {/* Real-Time Detection & Prevention Log */}
              <div className="bg-gray-800 rounded-lg border border-gray-700">
                <div className="p-6 border-b border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold">Real-Time Detection & Prevention Log</h2>
                      <p className="text-sm text-gray-400 mt-1">
                        Click any entry to see detailed ML analysis and technical implementation
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Eye className="h-4 w-4" />
                      <span>Full transparency - see how AI makes decisions</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  {preventionLog.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p className="mb-2">No prevention actions yet.</p>
                      <p className="text-sm">Click "Run Collusion Demo" to see Khusela in action.</p>
                      <p className="text-xs mt-4 text-gray-600">
                        The demo uses realistic South African RAF data including actual accident locations,
                        <br />medical terminology, and fraud patterns observed in real cases.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-[600px] overflow-y-auto">
                      {preventionLog.map((action) => (
                        <div 
                          key={action.id}
                          className="bg-gray-900 rounded-lg p-4 border border-gray-700 hover:border-blue-500 transition-colors cursor-pointer"
                          onClick={() => {
                            setSelectedAction(action);
                            setShowDetailsModal(true);
                          }}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                {getPhaseIcon(action.phase)}
                                <span className="font-bold text-white">{action.threatType}</span>
                                <span className="text-xs text-gray-500">{action.id}</span>
                                <span className="text-sm text-gray-400">{action.timestamp}</span>
                              </div>
                              <p className="text-sm text-blue-400 font-medium mb-2">{action.action}</p>
                              <p className="text-sm text-gray-300 whitespace-pre-line">{action.details}</p>
                              {action.claimAmount && (
                                <p className="text-lg font-bold text-green-400 mt-3">
                                  Amount: {formatCurrency(action.claimAmount)}
                                </p>
                              )}
                              {action.mlModel && (
                                <div className="mt-3 flex items-center gap-2 text-xs text-purple-400">
                                  <Brain className="h-3 w-3" />
                                  <span>ML Model: {action.mlModel}</span>
                                </div>
                              )}
                            </div>
                            <div className="flex flex-col items-end gap-2 ml-4">
                              <span className={`px-3 py-1 rounded text-xs font-medium whitespace-nowrap ${getStatusColor(action.status)}`}>
                                {action.status}
                              </span>
                              {action.responseTime > 0 && (
                                <span className="text-xs text-green-400 font-mono">{action.responseTime}ms</span>
                              )}
                              <span className="text-xs text-gray-500 flex items-center gap-1">
                                <Eye className="h-3 w-3" />
                                View Details
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Analytics Tab Content */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6">Analytics Dashboard</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <h3 className="text-lg font-semibold mb-4">Fraud Detection Trends</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">This Week</span>
                      <span className="text-green-400 font-bold">+12%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">This Month</span>
                      <span className="text-red-400 font-bold">-8%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">This Quarter</span>
                      <span className="text-blue-400 font-bold">+24%</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <h3 className="text-lg font-semibold mb-4">System Performance</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Uptime</span>
                      <span className="text-green-400 font-bold">99.9%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Response Time</span>
                      <span className="text-blue-400 font-bold">45ms</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Accuracy</span>
                      <span className="text-green-400 font-bold">98.7%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Cases Tab Content */}
          {activeTab === 'cases' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6">Active Cases</h2>
              <div className="bg-gray-800 rounded-lg border border-gray-700">
                <div className="p-6">
                  <div className="text-center py-12 text-gray-500">
                    <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="mb-2">No active cases at the moment.</p>
                    <p className="text-sm">Cases will appear here when fraud is detected.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab Content */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6">System Settings</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <h3 className="text-lg font-semibold mb-4">Detection Thresholds</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Risk Score Threshold</label>
                      <input type="range" min="0" max="100" defaultValue="70" className="w-full" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Auto-Escalation</label>
                      <input type="checkbox" defaultChecked className="mr-2" />
                      <span className="text-sm">Enable automatic case escalation</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <h3 className="text-lg font-semibold mb-4">Notifications</h3>
                  <div className="space-y-4">
                    <div>
                      <input type="checkbox" defaultChecked className="mr-2" />
                      <span className="text-sm">Email alerts</span>
                    </div>
                    <div>
                      <input type="checkbox" defaultChecked className="mr-2" />
                      <span className="text-sm">SMS notifications</span>
                    </div>
                    <div>
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">Push notifications</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Technical Details Modal */}
      {showDetailsModal && selectedAction && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-gray-800 rounded-xl max-w-4xl w-full border-2 border-blue-500 my-8">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{selectedAction.threatType}</h3>
                  <p className="text-sm text-gray-400">Technical Analysis & ML Decision Process</p>
                </div>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <XCircle className="h-8 w-8" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                  <Database className="h-5 w-5 text-blue-400" />
                  Case Information
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Claim ID:</span>
                    <span className="text-white ml-2 font-mono">{selectedAction.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Timestamp:</span>
                    <span className="text-white ml-2">{selectedAction.timestamp}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Phase:</span>
                    <span className="text-white ml-2">{selectedAction.phase}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${getStatusColor(selectedAction.status)}`}>
                      {selectedAction.status}
                    </span>
                  </div>
                  {selectedAction.responseTime > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Response Time:</span>
                      <span className="text-green-400 ml-2 font-mono">{selectedAction.responseTime}ms</span>
                    </div>
                  )}
                  {selectedAction.claimAmount && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Claim Amount:</span>
                      <span className="text-green-400 ml-2 font-bold">{formatCurrency(selectedAction.claimAmount)}</span>
                    </div>
                  )}
                </div>
              </div>

              {selectedAction.technicalDetails && (
                <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                  <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                    <Brain className="h-5 w-5 text-purple-400" />
                    Technical Implementation
                  </h4>
                  <p className="text-sm text-gray-300">{selectedAction.technicalDetails}</p>
                </div>
              )}

              {selectedAction.riskFactors && (
                <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                  <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-yellow-400" />
                    Risk Factor Analysis
                  </h4>
                  <div className="space-y-2">
                    {selectedAction.riskFactors.map((factor, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span className="text-gray-300">{factor.factor}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full" 
                              style={{ width: `${factor.weight * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-blue-400 font-mono text-xs">{factor.weight}</span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            factor.value === 'High' ? 'bg-red-900 text-red-400' :
                            factor.value === 'Medium' ? 'bg-yellow-900 text-yellow-400' :
                            'bg-green-900 text-green-400'
                          }`}>
                            {factor.value}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Results Modal */}
      {showResultsModal && demoResults && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-gray-800 rounded-xl max-w-2xl w-full border-2 border-green-500 my-8">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{demoResults.title}</h3>
                  <p className="text-sm text-gray-400">Demo Results Summary</p>
                </div>
                <button
                  onClick={() => setShowResultsModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <XCircle className="h-8 w-8" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                  <h4 className="font-bold text-green-400 mb-2">Fraud Prevented</h4>
                  <p className="text-2xl font-bold text-white">{formatCurrency(demoResults.fraudPrevented)}</p>
                </div>
                <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                  <h4 className="font-bold text-blue-400 mb-2">Victims Protected</h4>
                  <p className="text-2xl font-bold text-white">{demoResults.victimsProtected}</p>
                </div>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                <h4 className="font-bold text-white mb-3">Technical Summary</h4>
                <p className="text-sm text-gray-300">{demoResults.technicalSummary}</p>
              </div>
              
              <div className="flex gap-4 justify-center">
                <button 
                  onClick={() => setShowResultsModal(false)}
                  className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-bold transition-all"
                >
                  Close
                </button>
                <button 
                  onClick={() => {
                    setShowResultsModal(false);
                    resetDemo();
                  }}
                  className="bg-gray-600 hover:bg-gray-500 px-8 py-3 rounded-lg font-bold transition-all flex items-center gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset & Run Again
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