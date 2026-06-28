import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Cpu, Terminal, Sparkles, Flame, Wifi } from 'lucide-react';

interface SplashProps {
  onComplete: () => void;
}

const TELEMETRY_LOGS_AR = [
  'جاري إنشاء اتصال آمن بنواة التنين الفسفورية...',
  'توليد طبقة تشفير ديناميكية SSL 256-bit...',
  'مزامنة قنوات التوقع الحية مع Apple of Fortune...',
  'اكتشاف أقرب نقطة اتصال بالخوادم ذات الاستجابة الأسرع...',
  'تخطي جدار الحماية وتأمين الهوية الرقمية لجهازك...',
  'تفعيل خوارزمية الذكاء الاصطناعي لاستخراج التفاحات الآمنة...',
  'موازنة تدفق البيانات الحية وتجنب خوارزميات الكشف...',
  'اتصال ناجح! بوابة التنين الفسفورية جاهزة ومستقرة تماماً.'
];

export default function Splash({ onComplete }: SplashProps) {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);

  useEffect(() => {
    const duration = 2800; // 2.8 seconds fast responsive splash
    const intervalTime = 25;
    const increment = (100 / duration) * intervalTime;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 300);
          return 100;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    const nextLogIdx = Math.min(
      TELEMETRY_LOGS_AR.length - 1,
      Math.floor((progress / 100) * TELEMETRY_LOGS_AR.length)
    );
    setLogIndex(nextLogIdx);
  }, [progress]);

  return (
    <div
      id="splash-screen"
      className="fixed inset-0 bg-[#020503] flex flex-col justify-between py-12 px-6 select-none z-50 overflow-hidden"
    >
      {/* Phosphorescent green cyber grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.02)_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />
      
      {/* Intense Glowing Radial Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-lime-500/15 via-emerald-500/5 to-transparent rounded-full blur-[130px] pointer-events-none animate-pulse-slow" />
      <div className="absolute -top-12 -left-12 w-80 h-80 bg-lime-500/[0.04] rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute -bottom-12 -right-12 w-80 h-80 bg-emerald-500/[0.04] rounded-full blur-[110px] pointer-events-none" />

      {/* Cybernetic HUD Header */}
      <div className="w-full max-w-md mx-auto flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-lime-500/10 border border-lime-400/30 shadow-[0_0_15px_rgba(132,204,22,0.15)]">
          <Terminal className="w-4 h-4 text-lime-400 animate-pulse" />
          <span className="text-[9px] font-mono tracking-[0.25em] text-lime-300 font-extrabold uppercase">
            SYSTEM CORE V5.8
          </span>
        </div>
        
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-400/30 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
          <Wifi className="w-3.5 h-3.5 text-emerald-400 animate-bounce" />
          <span className="text-[9px] text-emerald-400 font-bold tracking-widest uppercase">
            SECURE LINK
          </span>
        </div>
      </div>

      {/* Core Animated Holographic Dragon Area */}
      <div className="flex flex-col items-center relative z-10 my-auto">
        <div className="relative mb-8">
          {/* Intense Phosphorescent Glow backplate */}
          <div className="absolute -inset-12 bg-gradient-to-tr from-lime-500/30 via-emerald-500/15 to-lime-400/20 rounded-full blur-3xl opacity-80 animate-pulse" />
          
          {/* Outer Cyber Radar Target rings */}
          <div className="absolute -inset-6 rounded-full border border-dashed border-lime-400/30 animate-spin-slow" />
          <div className="absolute -inset-10 rounded-full border border-lime-500/10 animate-pulse" />
          
          <div className="absolute -inset-1.5 rounded-3xl border border-lime-400/20 bg-black/50 backdrop-blur-md" />

          <motion.div
            initial={{ rotate: -15, scale: 0.85 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 140, damping: 14 }}
            className="relative w-34 h-34 rounded-2xl bg-gradient-to-b from-neutral-900 to-black flex items-center justify-center border-2 border-lime-400 shadow-[0_0_40px_rgba(132,204,22,0.4)] overflow-hidden"
          >
            <img 
              src="https://plain-eeur-prod-public.komododecks.com/202606/24/Bdn19OZTrlYXQS8dLPf7/image.jpg" 
              alt="Dragon VIP Logo" 
              className="w-[95%] h-[95%] object-cover rounded-xl border border-lime-400/10"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>

        {/* Title and subtitle styled with intense cyber-green theme */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-black tracking-[0.3em] text-white select-none leading-none font-orbitron">
            DRAGON <span className="text-lime-400 drop-shadow-[0_0_12px_rgba(163,230,53,0.8)] font-extrabold">VIP</span>
          </h1>

          <div className="flex items-center justify-center gap-2 mt-4.5">
            <Flame className="w-4.5 h-4.5 text-lime-400 animate-bounce" />
            <span className="text-[10px] font-mono tracking-[0.4em] text-emerald-300 font-bold uppercase">
              PHOSPHOR MATRIX v5
            </span>
            <Sparkles className="w-4 h-4 text-lime-300 animate-pulse" />
          </div>
        </motion.div>
      </div>

      {/* Futuristic Telemetry & Loading Block */}
      <div className="w-full max-w-md mx-auto flex flex-col items-center gap-6 relative z-10">
        
        {/* Real-time Arabic log terminal with bright neon outline */}
        <div className="w-full bg-black/90 border border-lime-500/30 backdrop-blur-xl rounded-2xl p-4.5 h-16.5 flex flex-col justify-center overflow-hidden relative shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
          <div className="absolute inset-y-0 right-0 w-[4px] bg-gradient-to-b from-lime-500 to-emerald-400" />
          <AnimatePresence mode="wait">
            <motion.div
              key={logIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-between text-right w-full flex-row-reverse"
            >
              <p className="text-[10.5px] font-sans text-slate-100 font-bold leading-normal truncate max-w-[85%] pr-1">
                {TELEMETRY_LOGS_AR[logIndex]}
              </p>
              <span className="text-[8px] font-mono text-lime-400 bg-lime-500/10 border border-lime-400/30 px-2 py-0.5 rounded tracking-wider uppercase">
                TUNNEL_OK
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dynamic progress loader with glowing lead indicator */}
        <div className="w-full space-y-3">
          <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-slate-400 font-bold uppercase">
            <span className="flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-lime-400 animate-spin" style={{ animationDuration: '3.5s' }} />
              QUANTUM DECIPHER MATRIX
            </span>
            <span className="text-lime-400 font-black drop-shadow-[0_0_8px_rgba(163,230,53,0.6)]">{Math.min(100, Math.round(progress))}%</span>
          </div>

          <div className="w-full h-3 bg-black/80 rounded-full p-[2px] border border-white/[0.08] shadow-inner relative overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-600 via-lime-400 to-green-300 rounded-full transition-all duration-75 relative"
              style={{ width: `${progress}%` }}
            >
              {/* High-intensity glowing pointer pin */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-lime-400 rounded-full blur-sm opacity-90 animate-ping" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_12px_#A3E635]" />
            </div>
          </div>
        </div>

        {/* Footer legalities */}
        <div className="flex items-center gap-2 text-[9px] text-neutral-600 font-mono tracking-[0.25em] font-bold uppercase">
          <ShieldCheck className="w-4 h-4 text-lime-500/40" />
          <span>ECC ENCRYPTED CHIP • DRAGON VIP NET</span>
        </div>
      </div>
    </div>
  );
}
