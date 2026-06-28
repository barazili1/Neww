import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { ToastMessage } from '../types';

interface ToastContainerProps {
  toasts: ToastMessage[];
  removeToast: (id: string) => void;
}

export default function ToastContainer({ toasts, removeToast }: ToastContainerProps) {
  return (
    <div className="fixed top-6 right-6 z-50 flex flex-col gap-3.5 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          let Icon = Info;
          let iconColor = 'text-cyan-400';
          let borderColor = 'border-rose-950';
          let glowStyle = 'shadow-[0_0_15px_rgba(34,211,238,0.1)]';

          if (toast.type === 'success') {
            Icon = CheckCircle2;
            iconColor = 'text-emerald-400';
            borderColor = 'border-emerald-500/35';
            glowStyle = 'shadow-[0_0_20px_rgba(0,255,102,0.15)]';
          } else if (toast.type === 'error') {
            Icon = AlertCircle;
            iconColor = 'text-rose-500';
            borderColor = 'border-rose-500/35';
            glowStyle = 'shadow-[0_0_20px_rgba(244,63,94,0.15)]';
          }

          return (
            <motion.div
              key={toast.id}
              id={`toast-${toast.id}`}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className={`pointer-events-auto w-full bg-black/85 backdrop-blur-md p-4 rounded-xl flex items-start gap-3 border relative overflow-hidden ${borderColor} ${glowStyle}`}
            >
              {/* Vertical neon stripe accent */}
              <div className={`absolute left-0 top-0 bottom-0 w-[3px] ${toast.type === 'success' ? 'bg-crimson' : toast.type === 'error' ? 'bg-rose-500' : 'bg-cyan-400'}`} />

              <div className="mt-0.5 shrink-0 pl-1">
                <Icon className={`w-5 h-5 ${iconColor}`} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-slate-100 font-sans leading-relaxed uppercase tracking-wide">
                  {toast.text}
                </p>
              </div>
              <button
                id={`close-toast-${toast.id}`}
                onClick={() => removeToast(toast.id)}
                className="text-slate-500 hover:text-white transition-colors cursor-pointer p-0.5 rounded-lg hover:bg-white/5 shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
