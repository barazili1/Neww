import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Cpu, ArrowRight, ShieldCheck, Server, Activity, Terminal, Database, Sliders } from 'lucide-react';

interface LoginProps {
  onLogin: (password: string) => void;
  onGetPassword: () => void;
  prefilledPassword?: string;
  generatedKey?: string;
}

export default function Login({ onLogin, onGetPassword }: LoginProps) {
  const [onlineNodes, setOnlineNodes] = useState(1648);
  const [connectingServer, setConnectingServer] = useState<string | null>(null);

  // High-performance ping and database latency indicators
  const [egyptPing, setEgyptPing] = useState(11);
  const [globalPing, setGlobalPing] = useState(35);
  const [egyptLoad, setEgyptLoad] = useState(42);
  const [globalLoad, setGlobalLoad] = useState(58);
  const [sysStability, setSysStability] = useState(99.98);

  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineNodes((prev) => {
        const diff = Math.floor(Math.random() * 15) - 7;
        return Math.max(1450, Math.min(1850, prev + diff));
      });

      setEgyptPing((prev) => Math.max(7, Math.min(15, prev + (Math.random() > 0.5 ? 1 : -1))));
      setGlobalPing((prev) => Math.max(30, Math.min(41, prev + (Math.random() > 0.5 ? 2 : -2))));
      
      setEgyptLoad((prev) => Math.max(35, Math.min(50, prev + (Math.random() > 0.5 ? 2 : -2))));
      setGlobalLoad((prev) => Math.max(50, Math.min(68, prev + (Math.random() > 0.5 ? 3 : -3))));
      
      setSysStability((prev) => Math.max(99.94, Math.min(99.99, prev + (Math.random() > 0.5 ? 0.01 : -0.01))));
    }, 1300);

    return () => clearInterval(interval);
  }, []);

  const handleServerSelect = (serverType: string) => {
    setConnectingServer(serverType);
    // Secure tunnel handshake simulation
    setTimeout(() => {
      onGetPassword();
    }, 1400);
  };

  return (
    <div
      id="login-main-screen"
      className="min-h-screen bg-[#010402] text-slate-100 flex flex-col justify-between py-8 px-4 relative overflow-hidden select-none"
    >
      {/* Immersive cyber design backdrops */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.015)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-80 bg-gradient-to-b from-lime-500/[0.04] to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/[0.03] rounded-full blur-[130px] pointer-events-none" />

      {/* Futuristic Navigation Header */}
      <div
        id="elegant-top-bar"
        className="w-full max-w-md mx-auto flex items-center justify-between px-4.5 py-3 rounded-2xl bg-black/90 backdrop-blur-3xl border border-lime-500/25 shadow-[0_0_20px_rgba(132,204,22,0.1)] relative z-10"
      >
        <div className="flex items-center gap-2.5">
          <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-lime-400 p-[1px] bg-neutral-900 shadow-[0_0_12px_rgba(163,230,53,0.3)]">
            <img 
              src="https://plain-eeur-prod-public.komododecks.com/202606/24/Bdn19OZTrlYXQS8dLPf7/image.jpg" 
              alt="Logo" 
              className="w-full h-full object-cover rounded-md"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="text-xs font-mono tracking-[0.25em] text-white font-extrabold uppercase">
            DRAGON <span className="text-lime-400 drop-shadow-[0_0_6px_rgba(163,230,53,0.6)]">VIP</span>
          </span>
        </div>

        {/* Phosphorescent active nodes HUD indicator */}
        <div className="flex items-center gap-2 bg-lime-500/10 border border-lime-500/30 px-3 py-1.5 rounded-xl shadow-[0_0_15px_rgba(163,230,53,0.15)]">
          <Activity className="w-3.5 h-3.5 text-lime-400 animate-pulse" />
          <span className="text-[8.5px] font-mono font-black text-lime-300 tracking-wider">
            {onlineNodes} ACTIVE NODES
          </span>
        </div>
      </div>

      {/* Core Cockpit Dashboard */}
      <div className="w-full max-w-md mx-auto flex-1 flex flex-col justify-center relative z-10 my-6">
        
        {/* Dynamic Header & System Specs */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-lime-500/10 border border-lime-400/30 mb-3 shadow-[0_0_12px_rgba(163,230,53,0.1)]">
            <ShieldCheck className="w-3.5 h-3.5 text-lime-400" />
            <span className="text-[8.5px] font-mono tracking-[0.15em] text-lime-300 font-extrabold uppercase">SECURE GATEWAY PORTAL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-orbitron tracking-wide text-white uppercase leading-none">
            CHOOSE ACCESS <span className="text-lime-400 drop-shadow-[0_0_12px_rgba(163,230,53,0.7)] font-extrabold">NODE</span>
          </h2>
          <p className="text-xs font-sans text-slate-400 mt-2.5 max-w-xs mx-auto leading-relaxed font-bold uppercase tracking-wide">
            اختر العميل المشفر ومطابقة خادم التوقع لمباشرة تفعيل الباقة
          </p>
        </div>

        {/* Live System Diagnostics Dashboard Grid (Unique Touch) */}
        <div className="grid grid-cols-3 gap-2.5 mb-6 text-center">
          <div className="bg-black/80 border border-white/[0.06] p-2.5 rounded-xl flex flex-col justify-center">
            <span className="text-[8px] font-mono text-neutral-500 uppercase font-bold">STABILITY</span>
            <span className="text-[11px] font-mono text-lime-400 font-black mt-1">{sysStability}%</span>
          </div>
          <div className="bg-black/80 border border-white/[0.06] p-2.5 rounded-xl flex flex-col justify-center">
            <span className="text-[8px] font-mono text-neutral-500 uppercase font-bold">ENCRYPTION</span>
            <span className="text-[11px] font-mono text-lime-400 font-black mt-1">AES-256 GCM</span>
          </div>
          <div className="bg-black/80 border border-white/[0.06] p-2.5 rounded-xl flex flex-col justify-center">
            <span className="text-[8px] font-mono text-neutral-500 uppercase font-bold">FIREWALL</span>
            <span className="text-[11px] font-mono text-emerald-400 font-black mt-1">BYPASSED</span>
          </div>
        </div>

        {/* Beautiful Animated Deck */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {connectingServer ? (
              <motion.div
                key="loading-tunnel"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="bg-black/90 backdrop-blur-3xl p-8 rounded-3xl border border-lime-400/30 shadow-[0_0_35px_rgba(163,230,53,0.15)] flex flex-col items-center justify-center gap-6 py-16 text-center"
              >
                <div className="relative">
                  {/* Glowing rotating spinner circles */}
                  <div className="w-16 h-16 rounded-full border-2 border-lime-500/10 border-t-lime-400 animate-spin" />
                  <div className="absolute inset-0 w-16 h-16 rounded-full border border-dashed border-lime-400/20 scale-125 animate-pulse" />
                  <Server className="absolute inset-0 m-auto w-5.5 h-5.5 text-lime-400 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-xs font-mono font-black tracking-[0.2em] text-white uppercase">
                    ESTABLISHING TUNNEL
                  </h3>
                  <p className="text-[10px] font-sans text-lime-300 font-bold mt-2.5 uppercase tracking-widest animate-pulse">
                    جاري التوجيه المشفر وفحص جودة الاتصال بالبوابة...
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="server-cards"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {/* Server Option 1: Egypt Node */}
                <button
                  id="server-egypt-btn"
                  type="button"
                  onClick={() => handleServerSelect('egypt')}
                  className="w-full relative p-5 rounded-2xl bg-black/85 backdrop-blur-3xl border border-white/[0.07] hover:border-lime-400/50 hover:bg-neutral-900/40 transition-all duration-300 flex items-center justify-between cursor-pointer group text-left shadow-2xl hover:shadow-[0_0_20px_rgba(163,230,53,0.1)]"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-[3.5px] bg-transparent group-hover:bg-lime-400 transition-colors" />
                  
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-white/[0.02] group-hover:bg-lime-500/10 text-slate-500 group-hover:text-lime-300 transition-all duration-300 border border-white/[0.04]">
                      <Cpu className="w-6 h-6 stroke-[1.5]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-mono font-extrabold text-white tracking-widest uppercase flex items-center gap-2">
                        EGYPT PRO NODE
                        <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse shadow-[0_0_8px_#84CC16]" />
                      </h3>
                      <p className="text-xs font-sans text-slate-400 font-bold mt-1 uppercase tracking-wider text-right sm:text-left">
                        السيرفر المصري المباشر • EDGE-EGY-VIP
                      </p>
                      
                      <div className="flex items-center gap-2 mt-2">
                        <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-lime-400" style={{ width: `${egyptLoad}%` }} />
                        </div>
                        <span className="text-[8px] font-mono text-slate-500 uppercase">LOAD: {egyptLoad}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono text-lime-400 bg-lime-500/10 px-2.5 py-1 rounded-lg font-black tracking-wider border border-lime-500/20 shadow-md">
                      {egyptPing}ms
                    </span>
                    <div className="text-slate-500 group-hover:text-white transition-colors">
                      <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                    <span className="text-3xl filter saturate-120 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">🇪🇬</span>
                  </div>
                </button>

                {/* Server Option 2: Global Node */}
                <button
                  id="server-global-btn"
                  type="button"
                  onClick={() => handleServerSelect('global')}
                  className="w-full relative p-5 rounded-2xl bg-black/85 backdrop-blur-3xl border border-white/[0.07] hover:border-lime-400/50 hover:bg-neutral-900/40 transition-all duration-300 flex items-center justify-between cursor-pointer group text-left shadow-2xl hover:shadow-[0_0_20px_rgba(163,230,53,0.1)]"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-[3.5px] bg-transparent group-hover:bg-lime-400 transition-colors" />

                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-white/[0.02] group-hover:bg-lime-500/10 text-slate-500 group-hover:text-lime-300 transition-all duration-300 border border-white/[0.04]">
                      <Globe className="w-6 h-6 stroke-[1.5]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-mono font-extrabold text-white tracking-widest uppercase flex items-center gap-2">
                        GLOBAL SECURE HUB
                        <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse shadow-[0_0_8px_#84CC16]" />
                      </h3>
                      <p className="text-xs font-sans text-slate-400 font-bold mt-1 uppercase tracking-wider text-right sm:text-left">
                        السيرفر العالمي المشفر • EDGE-GLB-VIP
                      </p>

                      <div className="flex items-center gap-2 mt-2">
                        <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-400" style={{ width: `${globalLoad}%` }} />
                        </div>
                        <span className="text-[8px] font-mono text-slate-500 uppercase">LOAD: {globalLoad}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono text-lime-400 bg-lime-500/10 px-2.5 py-1 rounded-lg font-black tracking-wider border border-lime-500/20 shadow-md">
                      {globalPing}ms
                    </span>
                    <div className="text-slate-500 group-hover:text-white transition-colors">
                      <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                    <span className="text-3xl filter saturate-120 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">🌐</span>
                  </div>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Cyber Minimalist Footer */}
      <div id="login-footer" className="w-full max-w-md mx-auto text-center relative z-10">
        <p className="text-[8.5px] text-neutral-600 font-mono uppercase tracking-[0.35em] font-extrabold">
          SECURE SHIELD CORE PROTOCOL • DRAGON VIP GATEWAY
        </p>
      </div>
    </div>
  );
}
