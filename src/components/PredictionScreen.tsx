import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Users,
  TrendingUp,
  RefreshCw,
  Play,
  Award,
  Zap,
  Cpu,
  LogOut,
  Sparkles,
  ShieldAlert,
  BarChart3,
  ServerCrash
} from 'lucide-react';

interface PredictionScreenProps {
  userId: string;
  platform: '1xbet' | 'melbet';
  subPlatform?: string;
  onLogout: () => void;
  addToast: (text: string, type: 'success' | 'error' | 'info') => void;
}

interface Winner {
  id: string;
  userId: string;
  amount: string;
  platform: string;
  time: string;
}

const FALLBACK_FIREBASE_PREDICTIONS: Record<string, string> = {
  "m1": "0", "m2": "0", "m3": "1", "m4": "0", "m5": "0",
  "m6": "0", "m7": "0", "m8": "1", "m9": "0", "m10": "0",
  "m11": "0", "m12": "1", "m13": "0", "m14": "0", "m15": "0",
  "m16": "1", "m17": "0", "m18": "0", "m19": "0", "m20": "0",
  "m21": "0", "m22": "0", "m23": "1", "m24": "0", "m25": "1",
  "m26": "0", "m27": "0", "m28": "0", "m29": "1", "m30": "1",
  "m31": "1", "m32": "0", "m33": "0", "m34": "0", "m35": "1",
  "m36": "1", "m37": "1", "m38": "1", "m39": "0", "m40": "0",
  "m41": "0", "m42": "1", "m43": "0", "m44": "1", "m45": "1",
  "m46": "0", "m47": "1", "m48": "1", "m49": "1", "m50": "1"
};

const generateFirebasePayload = (): Record<string, { [key: string]: string }> => {
  const payload: Record<string, { [key: string]: string }> = {};

  const getRowValues = (rottenCount: number): string[] => {
    const arr = Array(5).fill('0');
    const rottenIndices: number[] = [];
    while (rottenIndices.length < rottenCount) {
      const idx = Math.floor(Math.random() * 5);
      if (!rottenIndices.includes(idx)) {
        rottenIndices.push(idx);
      }
    }
    rottenIndices.forEach(idx => {
      arr[idx] = '1';
    });
    return arr;
  };

  for (let r = 0; r < 4; r++) {
    const vals = getRowValues(1);
    for (let c = 0; c < 5; c++) {
      const key = `m${(r * 5) + c + 1}`;
      payload[key] = { [key]: vals[c] };
    }
  }

  for (let r = 4; r < 7; r++) {
    const vals = getRowValues(2);
    for (let c = 0; c < 5; c++) {
      const key = `m${(r * 5) + c + 1}`;
      payload[key] = { [key]: vals[c] };
    }
  }

  for (let r = 7; r < 9; r++) {
    const vals = getRowValues(3);
    for (let c = 0; c < 5; c++) {
      const key = `m${(r * 5) + c + 1}`;
      payload[key] = { [key]: vals[c] };
    }
  }

  {
    const vals = getRowValues(4);
    for (let c = 0; c < 5; c++) {
      const key = `m${(9 * 5) + c + 1}`;
      payload[key] = { [key]: vals[c] };
    }
  }

  return payload;
};

const generateRandomLocalGrid = (): Record<string, string> => {
  const grid: Record<string, string> = {};

  const getRowValues = (rottenCount: number): string[] => {
    const arr = Array(5).fill('0');
    const rottenIndices: number[] = [];
    while (rottenIndices.length < rottenCount) {
      const idx = Math.floor(Math.random() * 5);
      if (!rottenIndices.includes(idx)) {
        rottenIndices.push(idx);
      }
    }
    rottenIndices.forEach(idx => {
      arr[idx] = '1';
    });
    return arr;
  };

  for (let r = 0; r < 4; r++) {
    const vals = getRowValues(1);
    for (let c = 0; c < 5; c++) {
      grid[`m${(r * 5) + c + 1}`] = vals[c];
    }
  }

  for (let r = 4; r < 7; r++) {
    const vals = getRowValues(2);
    for (let c = 0; c < 5; c++) {
      grid[`m${(r * 5) + c + 1}`] = vals[c];
    }
  }

  for (let r = 7; r < 9; r++) {
    const vals = getRowValues(3);
    for (let c = 0; c < 5; c++) {
      grid[`m${(r * 5) + c + 1}`] = vals[c];
    }
  }

  {
    const vals = getRowValues(4);
    for (let c = 0; c < 5; c++) {
      grid[`m${(9 * 5) + c + 1}`] = vals[c];
    }
  }

  return grid;
};

export default function PredictionScreen({ userId, platform, subPlatform, onLogout, addToast }: PredictionScreenProps) {
  const [onlineUsers, setOnlineUsers] = useState(1530);
  const [sessionSeconds, setSessionSeconds] = useState(29 * 60 + 59); // 30 mins
  const [isScanning, setIsScanning] = useState(false);
  const [scannedPath, setScannedPath] = useState<number[]>([]); 
  const [activePlayRow, setActivePlayRow] = useState<number>(-1); 
  const [firebaseGrid, setFirebaseGrid] = useState<Record<string, string> | null>(null);

  // Decryption stats metrics for visual premium luxury
  const [winrate, setWinrate] = useState(98.7);
  const [multiplier, setMultiplier] = useState(1.0);
  const [signalStrength, setSignalStrength] = useState(100);

  // Simulated live payouts winners list
  const [winners, setWinners] = useState<Winner[]>([
    { id: '1', userId: '5829****21', amount: '+450 EGP', platform: '1xbet', time: 'Just now' },
    { id: '2', userId: '1029****56', amount: '+12.50$', platform: 'melbet', time: '1s ago' },
    { id: '3', userId: '9381****10', amount: '+1,500 EGP', platform: '1xbet', time: '2s ago' },
    { id: '4', userId: '4829****04', amount: '+45.00$', platform: '1xbet', time: '4s ago' },
    { id: '5', userId: '2019****88', amount: '+750 EGP', platform: 'melbet', time: '5s ago' }
  ]);

  // Online metrics fluctuation
  useEffect(() => {
    const userInterval = setInterval(() => {
      setOnlineUsers((prev) => {
        const diff = Math.floor(Math.random() * 11) - 5;
        return Math.max(1400, Math.min(1800, prev + diff));
      });

      setWinrate((prev) => {
        const offset = (Math.random() - 0.5) * 0.1;
        return Math.max(97.2, Math.min(99.9, +(prev + offset).toFixed(1)));
      });

      setSignalStrength((prev) => {
        const change = Math.random() > 0.85 ? (Math.random() > 0.5 ? 1 : -1) : 0;
        return Math.max(98, Math.min(100, prev + change));
      });
    }, 1200);

    return () => clearInterval(userInterval);
  }, []);

  // Session countdown
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setSessionSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  // Update multiplier as user climbs rows
  useEffect(() => {
    const multiplierMap = [1.23, 1.54, 1.93, 2.41, 4.02, 6.83, 11.2, 19.8, 35.4, 69.3];
    if (activePlayRow >= 0 && activePlayRow < 10) {
      setMultiplier(multiplierMap[activePlayRow]);
    } else {
      setMultiplier(1.0);
    }
  }, [activePlayRow]);

  // Cascade Live Winners Updates
  useEffect(() => {
    const winnerInterval = setInterval(() => {
      const prefixes = ['11', '24', '38', '45', '59', '73', '81', '90', '98'];
      const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
      const randomSuffix = Math.floor(10 + Math.random() * 90).toString();
      const newUserId = `${randomPrefix}${Math.floor(1000 + Math.random() * 9000)}****${randomSuffix}`;
      
      const isEGP = Math.random() > 0.45;
      const randomAmount = isEGP 
        ? `+${(Math.floor(3 + Math.random() * 30) * 150).toLocaleString()} EGP`
        : `+${(Math.floor(8 + Math.random() * 120)).toFixed(2)}$`;

      const newWinner: Winner = {
        id: Math.random().toString(),
        userId: newUserId,
        amount: randomAmount,
        platform: Math.random() > 0.45 ? '1xbet' : 'melbet',
        time: 'Just now'
      };

      setWinners((prev) => {
        const withUpdatedTimes = prev.map(w => ({
          ...w,
          time: w.time === 'Just now' ? '3s ago' : w.time.includes('s ago') ? `${parseInt(w.time) + 3}s ago` : w.time
        }));
        return [newWinner, ...withUpdatedTimes.slice(0, 4)];
      });
    }, 3000);

    return () => clearInterval(winnerInterval);
  }, []);

  const hours = Math.floor(sessionSeconds / 3600);
  const minutes = Math.floor((sessionSeconds % 3600) / 60);
  const seconds = sessionSeconds % 60;
  const padNum = (num: number) => String(num).padStart(2, '0');

  const triggerScan = () => {
    if (isScanning) return;
    
    setIsScanning(true);
    setScannedPath([]);
    setActivePlayRow(-1);
    setFirebaseGrid(null);

    let count = 0;
    const interval = setInterval(async () => {
      count += 1;
      if (count >= 10) {
        clearInterval(interval);
        
        const cleanUserId = (userId || '').trim();
        if (cleanUserId === '1729018123') {
          try {
            const response = await fetch('https://evoioi-default-rtdb.europe-west1.firebasedatabase.app/m11.json');
            const data = await response.json();
            
            const parsedGrid: Record<string, string> = {};
            if (data && typeof data === 'object') {
              Object.keys(data).forEach((key) => {
                const val = data[key];
                if (val && typeof val === 'object' && val[key] !== undefined) {
                  parsedGrid[key] = String(val[key]);
                } else {
                  parsedGrid[key] = String(val);
                }
              });
            }
            
            const finalGrid = { ...FALLBACK_FIREBASE_PREDICTIONS, ...parsedGrid };
            setFirebaseGrid(finalGrid);
            
            const resolvedPath: number[] = [];
            for (let r = 0; r < 10; r++) {
              let safeCol = 0;
              for (let c = 0; c < 5; c++) {
                const key = `m${(r * 5) + c + 1}`;
                if (finalGrid[key] === '0') {
                  safeCol = c;
                  break;
                }
              }
              resolvedPath.push(safeCol);
            }
            setScannedPath(resolvedPath);
          } catch (error) {
            console.error("Error fetching live predictions:", error);
            setFirebaseGrid(FALLBACK_FIREBASE_PREDICTIONS);
            
            const resolvedPath: number[] = [];
            for (let r = 0; r < 10; r++) {
              let safeCol = 0;
              for (let c = 0; c < 5; c++) {
                const key = `m${(r * 5) + c + 1}`;
                if (FALLBACK_FIREBASE_PREDICTIONS[key] === '0') {
                  safeCol = c;
                  break;
                }
              }
              resolvedPath.push(safeCol);
            }
            setScannedPath(resolvedPath);
          }
        } else {
          const localGrid = generateRandomLocalGrid();
          setFirebaseGrid(localGrid);

          const resolvedPath: number[] = [];
          for (let r = 0; r < 10; r++) {
            let safeCol = 0;
            for (let c = 0; c < 5; c++) {
              const key = `m${(r * 5) + c + 1}`;
              if (localGrid[key] === '0') {
                safeCol = c;
                break;
              }
            }
            resolvedPath.push(safeCol);
          }
          setScannedPath(resolvedPath);
        }

        setIsScanning(false);
        setActivePlayRow(0); // Setup starting row
      }
    }, 200); 
  };

  const handleRestart = async () => {
    setScannedPath([]);
    setActivePlayRow(-1);
    setFirebaseGrid(null);

    const cleanUserId = (userId || '').trim();
    if (cleanUserId === '1729018123') {
      try {
        const payload = generateFirebasePayload();
        
        const response = await fetch('https://evoioi-default-rtdb.europe-west1.firebasedatabase.app/m11.json', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        });

        if (!response.ok) throw new Error(`HTTP error ${response.status}`);
      } catch (error) {
        console.error("Error resetting predictions:", error);
      }
    }
  };

  const handleCellClick = (rowIdx: number, colIdx: number) => {
    if (isScanning || scannedPath.length === 0) return;
    const gameRow = 9 - rowIdx; 
    
    const isSafe = firebaseGrid 
      ? firebaseGrid[`m${(gameRow * 5) + colIdx + 1}`] === '0'
      : scannedPath[gameRow] === colIdx;

    if (isSafe) {
      if (gameRow === activePlayRow) {
        setActivePlayRow(prev => prev + 1);
      }
    }
  };

  return (
    <div
      id="prediction-main-screen"
      className="min-h-screen bg-transparent text-slate-100 flex flex-col py-6 px-4 relative overflow-y-auto select-none custom-scrollbar pb-12"
    >
      {/* Cyber ambient background highlights */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,102,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,102,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-crimson/10 via-amber-500/[0.04] to-transparent rounded-full blur-[160px] pointer-events-none animate-pulse-slow" />

      {/* Main Layout Container */}
      <div className="w-full max-w-lg mx-auto flex-1 flex flex-col relative z-10 gap-5">
        
        {/* PREMIUM INSTRUMENT HEADER BAR */}
        <div
          id="prediction-top-bar"
          className="flex items-center justify-between p-4 rounded-3xl bg-black/75 backdrop-blur-2xl border border-white/[0.08] shadow-2xl"
        >
          {/* Logo brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center shadow-lg border-2 border-amber-500/30 p-[1px] bg-neutral-900">
              <img 
                src="https://plain-eeur-prod-public.komododecks.com/202606/24/Bdn19OZTrlYXQS8dLPf7/image.jpg" 
                alt="Logo" 
                className="w-full h-full object-cover rounded-lg"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h1 className="text-sm font-black font-orbitron tracking-[0.2em] leading-none uppercase">
                DRAGON <span className="text-crimson-bright glow-text-crimson-bright font-black">VIP</span>
              </h1>
              <span className="text-[8px] font-orbitron tracking-[0.3em] text-amber-400 uppercase leading-none font-bold block mt-1 glow-text-gold">
                ELITE PROBABILITY GRID
              </span>
            </div>
          </div>

          {/* Sync status & User ID & Logout */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-2xl shadow-[0_0_12px_rgba(234,179,8,0.15)]">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
              <span className="text-[9px] font-mono font-black text-slate-200 tracking-wider">
                {onlineUsers} ACTIVE
              </span>
              <Users className="w-3.5 h-3.5 text-amber-300" />
            </div>

            <button
              id="platform-logout-btn"
              onClick={onLogout}
              className="p-2 rounded-xl bg-white/[0.02] hover:bg-rose-500/15 text-slate-400 hover:text-rose-400 transition-all cursor-pointer border border-white/[0.05]"
              title="Logout session"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* STATS BENTO ROW (Probability / Multiplier / Quality) */}
        <div className="grid grid-cols-3 gap-3.5">
          {/* Win Probability */}
          <div className="glass-card-premium border-white/[0.08] rounded-2xl p-3.5 flex flex-col justify-between h-20.5 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-12 h-12 bg-crimson/[0.02] rounded-full blur-md" />
            <div className="flex items-center justify-between">
              <span className="text-[8px] font-orbitron tracking-widest text-slate-400 font-extrabold">ACCURACY</span>
              <BarChart3 className="w-4 h-4 text-crimson-bright" />
            </div>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl font-black font-orbitron text-white glow-text-crimson">{winrate}%</span>
              <span className="text-[8px] font-mono text-emerald-400 font-bold">MAX</span>
            </div>
          </div>

          {/* Current Multiplier */}
          <div className="glass-card-premium border-amber-500/30 rounded-2xl p-3.5 flex flex-col justify-between h-20.5 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-12 h-12 bg-amber-500/[0.02] rounded-full blur-md" />
            <div className="flex items-center justify-between">
              <span className="text-[8px] font-orbitron tracking-widest text-slate-400 font-extrabold">MULTIPLIER</span>
              <TrendingUp className="w-4 h-4 text-amber-400" />
            </div>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl font-black font-orbitron text-amber-400 glow-text-gold">{multiplier}x</span>
              <span className="text-[8px] font-mono text-neutral-500 font-bold font-black">LIMIT</span>
            </div>
          </div>

          {/* Signal Quality */}
          <div className="glass-card-premium border-white/[0.08] rounded-2xl p-3.5 flex flex-col justify-between h-20.5 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-12 h-12 bg-crimson/[0.02] rounded-full blur-md" />
            <div className="flex items-center justify-between">
              <span className="text-[8px] font-orbitron tracking-widest text-slate-400 font-extrabold">SIGNAL FEED</span>
              <Cpu className="w-4 h-4 text-crimson" />
            </div>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl font-black font-orbitron text-white">{signalStrength}%</span>
              <span className="text-[8px] font-mono text-emerald-400 font-bold">SEC</span>
            </div>
          </div>
        </div>

        {/* REAL-TIME SESSION TIMER BAR */}
        <div
          id="timer-section-rgb-circles"
          className="bg-black/75 backdrop-blur-2xl border border-white/[0.08] p-4.5 rounded-3xl shadow-2xl flex items-center justify-around gap-4"
        >
          {/* Hour Circle */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="relative w-14 h-14 flex items-center justify-center">
              <div className="absolute inset-0.5 rounded-full border border-dashed border-cyan-500/10 animate-spin" style={{ animationDuration: '20s' }} />
              <div className="absolute inset-1.5 rounded-full border border-cyan-400/40 shadow-[0_0_10px_rgba(34,211,238,0.15)] flex items-center justify-center bg-black/80">
                <span className="font-orbitron font-black text-xs text-cyan-300 tracking-wider">
                  {padNum(hours)}
                </span>
              </div>
            </div>
            <span className="text-[7.5px] font-orbitron tracking-widest text-cyan-400 font-black uppercase">
              PLATFORM SYNC
            </span>
          </div>

          {/* Minute Circle */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <div className="absolute inset-0.5 rounded-full border-2 border-dashed border-crimson-bright/20 animate-spin" style={{ animationDuration: '30s' }} />
              <div className="absolute inset-2 rounded-full border-2 border-crimson shadow-[0_0_15px_rgba(0,255,102,0.3)] flex items-center justify-center bg-black/90">
                <span className="font-orbitron font-black text-sm text-white glow-text-crimson">
                  {padNum(minutes)}
                </span>
              </div>
            </div>
            <span className="text-[7.5px] font-orbitron tracking-widest text-crimson-bright font-black uppercase animate-pulse">
              SIGNAL SYNC
            </span>
          </div>

          {/* Second Circle */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="relative w-14 h-14 flex items-center justify-center">
              <div className="absolute inset-0.5 rounded-full border border-dashed border-amber-500/10 animate-spin" style={{ animationDuration: '10s' }} />
              <div className="absolute inset-1.5 rounded-full border border-amber-400/40 shadow-[0_0_10px_rgba(251,191,36,0.15)] flex items-center justify-center bg-black/80">
                <span className="font-orbitron font-black text-xs text-amber-300 tracking-wider">
                  {padNum(seconds)}
                </span>
              </div>
            </div>
            <span className="text-[7.5px] font-orbitron tracking-widest text-amber-400 font-black uppercase">
              CYBER ENGINE
            </span>
          </div>
        </div>

        {/* DECIPHER GAME DECK: standard Apple of Fortune 5x10 matrix */}
        <div className="glass-card-premium p-5 rounded-3xl border border-white/[0.08] shadow-2xl relative flex-1 flex flex-col justify-center gap-4.5 animate-scale-up">
          
          {/* Laser scanning sweep layer */}
          <AnimatePresence>
            {isScanning && (
              <div className="absolute inset-0 rounded-3xl bg-crimson/[0.04] overflow-hidden z-20 pointer-events-none">
                <div className="absolute left-0 right-0 h-[3.5px] bg-gradient-to-r from-transparent via-crimson-bright to-transparent shadow-[0_0_15px_#39FF14] animate-scanning" />
                <div className="absolute inset-0 bg-radial-gradient from-crimson/5 to-transparent flex items-center justify-center backdrop-blur-[2px]">
                  <div className="flex flex-col items-center gap-2.5">
                    <div className="w-14 h-14 rounded-full border-2 border-dashed border-crimson animate-spin flex items-center justify-center bg-black/60 shadow-lg">
                      <Cpu className="w-7 h-7 text-crimson-bright" />
                    </div>
                    <span className="text-xs font-orbitron tracking-[0.25em] text-crimson-bright font-black uppercase glow-text-crimson-bright">
                      DECIPHERING QUANTUM CELLS...
                    </span>
                  </div>
                </div>
              </div>
            )}
          </AnimatePresence>

          {/* Interactive Game matrix */}
          <div className="grid grid-cols-5 gap-1.5 flex-1 p-1">
            {Array.from({ length: 10 }).map((_, rIdx) => {
              const rowNum = 10 - rIdx; 
              const gameRowIdx = 9 - rIdx; 
              
              const isLocked = scannedPath.length > 0 && activePlayRow !== -1 && gameRowIdx > activePlayRow;
              const isCurrent = scannedPath.length > 0 && activePlayRow === gameRowIdx;
              const isCleared = scannedPath.length > 0 && activePlayRow > gameRowIdx;

              return (
                <div key={rowNum} className="col-span-5 grid grid-cols-5 gap-1.5 relative">
                  {/* Subtle index mark label */}
                  <div className="absolute -left-1.5 top-1/2 -translate-x-full -translate-y-1/2 text-[8px] font-mono text-neutral-600 font-bold tracking-tighter hidden md:block select-none pointer-events-none">
                    L{rowNum}
                  </div>

                  {Array.from({ length: 5 }).map((_, cIdx) => {
                    const isSafePrediction = firebaseGrid 
                      ? firebaseGrid[`m${(gameRowIdx * 5) + cIdx + 1}`] === '0'
                      : scannedPath.length > 0 && scannedPath[gameRowIdx] === cIdx;
                    
                    let cellBg = 'bg-black/45 hover:bg-neutral-900/40 border-white/[0.05]';
                    let itemNode = null;

                    if (scannedPath.length > 0) {
                      if (isSafePrediction) {
                        if (isScanning) {
                          cellBg = 'bg-crimson/10 border-crimson/35 animate-pulse';
                        } else {
                          // Predicted safe apple
                          cellBg = 'bg-gradient-to-b from-neutral-900 to-black border-2 border-crimson shadow-[0_0_15px_rgba(0,255,102,0.18)] hover:border-crimson-bright';
                          itemNode = (
                            <motion.div
                              initial={{ scale: 0.4, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ type: 'spring', stiffness: 180, damping: 12 }}
                              className="relative flex items-center justify-center w-full h-full p-0"
                            >
                              <img
                                src="https://video11.rf.gd/apple.png"
                                referrerPolicy="no-referrer"
                                alt="Safe Apple"
                                className="w-full h-full object-contain"
                              />
                              <Sparkles className="absolute top-1 right-1 w-2.5 h-2.5 text-amber-400 animate-pulse" />
                            </motion.div>
                          );
                        }
                      } else {
                        // Regular rotten/poisoned apple
                        cellBg = 'bg-neutral-950/80 border-white/[0.03]';
                        itemNode = (
                          <motion.div
                            initial={{ scale: 0.6, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="flex items-center justify-center w-full h-full p-0"
                          >
                            <img
                              src="https://video11.rf.gd/poi.png"
                              referrerPolicy="no-referrer"
                              alt="Rotten Apple"
                              className="w-full h-full object-contain"
                            />
                          </motion.div>
                        );
                      }
                    }

                    // Special state for successful simulator climb-ups
                    if (scannedPath.length > 0 && isCleared && isSafePrediction) {
                      cellBg = 'bg-emerald-950/25 border-2 border-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.25)]';
                      itemNode = (
                        <motion.div
                          initial={{ scale: 0.85 }}
                          animate={{ scale: 1 }}
                          className="relative flex items-center justify-center w-full h-full p-0"
                        >
                          <img
                            src="https://video11.rf.gd/apple.png"
                            referrerPolicy="no-referrer"
                            alt="Safe Apple"
                            className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                          />
                          <div className="absolute bottom-0.5 right-0.5 bg-emerald-400 text-black text-[7px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-black shadow-md">
                            ✓
                          </div>
                        </motion.div>
                      );
                    }

                    return (
                      <button
                        key={cIdx}
                        id={`grid-cell-${rowNum}-${cIdx}`}
                        onClick={() => handleCellClick(rIdx, cIdx)}
                        disabled={isScanning || scannedPath.length === 0}
                        className={`aspect-square rounded-full border flex items-center justify-center transition-all ${cellBg} relative p-0 overflow-hidden ${
                          scannedPath.length > 0 ? 'cursor-pointer' : 'cursor-default'
                        }`}
                      >
                        {itemNode ? (
                          itemNode
                        ) : (
                          <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                        )}
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>

          {/* Controller buttons bar */}
          <div className="flex gap-4 mt-1">
            <button
              id="action-start-predictions"
              onClick={triggerScan}
              disabled={isScanning}
              className="flex-1 relative group overflow-hidden py-4 rounded-xl font-orbitron text-xs font-black tracking-widest cursor-pointer text-white disabled:opacity-50"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-crimson via-crimson-bright to-crimson group-hover:opacity-95 transition-opacity rounded-xl animate-pulse" />
              <div className="absolute -inset-1 bg-crimson-bright blur-lg opacity-40 group-hover:opacity-75 transition-opacity rounded-xl" />
              <span className="relative flex items-center justify-center gap-2">
                <Play className="w-3.5 h-3.5 fill-white" />
                START MATRIX SCAN
              </span>
            </button>

            <button
              id="action-restart-predictions"
              onClick={handleRestart}
              disabled={isScanning || scannedPath.length === 0}
              className="px-6 rounded-xl border border-neutral-800 hover:border-crimson/50 hover:bg-crimson/10 text-slate-400 hover:text-white transition-all text-xs font-orbitron tracking-widest cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed font-black"
            >
              <span className="flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5" />
                RESET
              </span>
            </button>
          </div>
        </div>

        {/* REAL-TIME PAYOUT WINNERS FEED PANEL */}
        <div
          id="live-winners-panel"
          className="bg-black/75 border border-white/[0.08] backdrop-blur-2xl p-4.5 rounded-3xl shadow-2xl"
        >
          <div className="flex items-center justify-between mb-4.5 border-b border-white/[0.05] pb-2.5">
            <div className="flex items-center gap-2">
              <Award className="w-4.5 h-4.5 text-amber-400 animate-bounce" />
              <span className="text-[10px] font-orbitron tracking-widest text-slate-300 font-black uppercase">
                REAL-TIME PAYOUT CLOUD
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[8.5px] font-orbitron tracking-wider text-emerald-400 font-black glow-text-crimson">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span>LIVE PAYOUTS ACTIVE</span>
            </div>
          </div>

          <div id="live-winners-list" className="space-y-2 h-[120px] overflow-hidden relative">
            {/* Fade boundary layout overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black via-black/25 to-transparent pointer-events-none z-10" />

            <AnimatePresence initial={false}>
              {winners.map((winner, idx) => (
                <motion.div
                  key={winner.id}
                  id={`winner-item-${idx}`}
                  initial={{ opacity: 0, y: -10, scale: 0.98 }}
                  animate={{ opacity: 1 - idx * 0.18, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.015] border border-white/[0.03] text-xs font-sans hover:bg-white/[0.03] transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <div className="px-2 py-0.5 rounded-lg text-[8px] font-mono tracking-wide font-black uppercase bg-crimson/15 text-crimson-bright border border-crimson/25">
                      {winner.platform}
                    </div>
                    <span className="font-mono text-[11px] font-bold text-slate-300 pl-1">
                      ID: {winner.userId}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-black text-emerald-400 tracking-wide font-mono">
                      {winner.amount}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[8px] font-orbitron tracking-widest font-black uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                      WINNING ✓
                    </span>
                    <span className="text-[9px] text-slate-500 font-mono hidden sm:inline">
                      {winner.time}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
