import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Youtube,
  Send,
  Download,
  Copy,
  CreditCard,
  User,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Gift,
  Zap,
  Activity,
  CheckCircle2,
  Lock
} from 'lucide-react';

interface ConditionPageProps {
  onBack: () => void;
  onSubmit: (userId: string, platform: '1xbet' | 'melbet', subPlatform: string, depositScreenshot: string, promoScreenshot: string) => void;
  addToast: (text: string, type: 'success' | 'error' | 'info') => void;
}

export default function ConditionPage({ onBack, onSubmit, addToast }: ConditionPageProps) {
  const [platform, setPlatform] = useState<'1xbet' | 'melbet' | null>(null);
  const [subPlatform, setSubPlatform] = useState<string | null>(null);
  const [userId, setUserId] = useState('');
  
  // Active step tracker for glow highlighting and scrolling (0 to 3)
  const [activeStep, setActiveStep] = useState(0);

  // Verification task completed statuses
  const [telegramJoined, setTelegramJoined] = useState(false);
  const [youtubeJoined, setYoutubeJoined] = useState(false);
  const [platformInstalled, setPlatformInstalled] = useState(false);

  // Submit quantum loading overlays
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyProgress, setVerifyProgress] = useState(0);
  const [verifyStatusText, setVerifyStatusText] = useState('Initializing Secure Handshake...');

  // Scroll references for side-by-side steps
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const step0Ref = useRef<HTMLDivElement>(null);
  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);

  const getPromoCode = () => {
    return platform === 'melbet' ? 'TOO3' : 'A77N';
  };

  const handleCopyPromo = () => {
    navigator.clipboard.writeText(getPromoCode());
    addToast('تم نسخ كود التفعيل الفسفوري بنجاح!', 'success');
  };

  const handleSocialClick = (url: string, type: 'telegram' | 'youtube') => {
    window.open(url, '_blank');
    if (type === 'telegram') {
      setTelegramJoined(true);
      addToast('تم تفعيل خطوة التليجرام بنجاح!', 'success');
    } else {
      setYoutubeJoined(true);
      addToast('تم تفعيل خطوة اليوتيوب بنجاح!', 'success');
    }
  };

  const handleInstallClick = () => {
    const activePlatform = platform || '1xbet';
    const url = activePlatform === '1xbet' ? 'https://eg-1xbet.com/ar/mobile' : 'https://melbetegypt.com/en/mobile';
    window.open(url, '_blank');
    setPlatformInstalled(true);
    addToast('تم فتح رابط التحميل المباشر للبرنامج!', 'success');
  };

  const scrollToStep = (stepIdx: number) => {
    setActiveStep(stepIdx);
    const refs = [step0Ref, step1Ref, step2Ref, step3Ref];
    const targetRef = refs[stepIdx];
    if (targetRef && targetRef.current && stepsContainerRef.current) {
      const container = stepsContainerRef.current;
      const card = targetRef.current;
      
      // Smoothly scroll the horizontal flex container to align this step card
      container.scrollTo({
        left: card.offsetLeft - container.offsetLeft,
        behavior: 'smooth'
      });
    }
  };

  // Step-by-step next button validation & triggers
  const handleNextFromPlatform = () => {
    if (!platform || !subPlatform) {
      addToast('يرجى اختيار المنصة وفئة الاشتراك لتخطي هذه الخطوة!', 'error');
      return;
    }
    scrollToStep(1);
    addToast('تم تفعيل منصة الألعاب. انتقل لخطوة المهام الاجتماعية...', 'success');
  };

  const handleNextFromTasks = () => {
    scrollToStep(2);
    addToast('انتقلت بنجاح إلى خطوة كود التفعيل!', 'success');
  };

  const handleNextFromPromo = () => {
    scrollToStep(3);
    addToast('كود التفعيل جاهز ومحجوز. خطوة إدخال معرف اللاعب...', 'success');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!platform || !subPlatform) {
      addToast('يرجى تحديد المنصة وفئة الاشتراك أولاً في الخطوة الأولى!', 'error');
      scrollToStep(0);
      return;
    }

    if (!userId.trim()) {
      addToast('يرجى إدخال معرف حساب اللاعب الرقمي (ID) في الخطوة الرابعة!', 'error');
      scrollToStep(3);
      return;
    }

    // Launch futuristic phosphorescent loading overlay
    setIsVerifying(true);
    setVerifyProgress(0);
    setVerifyStatusText('جاري فتح قناة التحقق الفسفورية الآمنة...');

    const verificationSteps = [
      { progress: 18, text: 'جاري فحص اتصال خادم اللاعب ومطابقة الـ ID الرقمي...' },
      { progress: 38, text: 'التحقق من صحة المعطيات وسجلات قنوات التليجرام واليوتيوب...' },
      { progress: 62, text: `مزامنة كود الخصم الفسفوري المعتمد [${getPromoCode()}] في قاعدة البيانات...` },
      { progress: 85, text: 'استيراد رخصة المرور وتأمين نظام تجنب الحظر لشبكة VIP...' },
      { progress: 100, text: 'تم إنشاء ترخيص VIP بنجاح! جاري تحويلك لبوابة التوقعات...' }
    ];

    let checkIdx = 0;
    const timer = setInterval(() => {
      setVerifyProgress((prev) => {
        const nextVal = prev + 1;
        
        if (checkIdx < verificationSteps.length && nextVal >= verificationSteps[checkIdx].progress) {
          setVerifyStatusText(verificationSteps[checkIdx].text);
          checkIdx++;
        }

        if (nextVal >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsVerifying(false);
            onSubmit(
              userId.trim(),
              platform,
              subPlatform,
              'deposit_confirmed',
              'promo_registered'
            );
          }, 500);
          return 100;
        }
        return nextVal;
      });
    }, 40); // ~4 seconds
  };

  return (
    <div
      id="condition-main-screen"
      className="min-h-screen bg-[#010402] text-slate-100 flex flex-col py-6 px-4 relative overflow-y-auto select-none custom-scrollbar pb-12"
    >
      {/* Mesh and glowing vector lines in neon-green */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.015)_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-lime-500/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto relative z-10 flex-1 flex flex-col justify-between">
        
        {/* Navigation & Demo bypass */}
        <div className="flex items-center justify-between mb-6 w-full max-w-lg mx-auto md:max-w-none">
          <button
            id="back-to-login"
            onClick={onBack}
            className="flex items-center gap-2 text-slate-400 hover:text-lime-400 transition-colors text-xs font-mono tracking-widest uppercase py-2 cursor-pointer font-extrabold"
          >
            <ArrowLeft className="w-4 h-4 text-lime-400" />
            رجوع للخلف
          </button>
        </div>

        {/* Title Block */}
        <div className="mb-6 text-center w-full max-w-lg mx-auto md:max-w-none">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-lime-500/10 border border-lime-400/30 mb-2 shadow-[0_0_12px_rgba(163,230,53,0.1)]">
            <Zap className="w-3.5 h-3.5 text-lime-400" />
            <span className="text-[8.5px] font-mono tracking-[0.2em] text-lime-300 font-extrabold uppercase">
              VIP MEMBERSHIP ACCREDITATION
            </span>
          </div>
          <h2 className="text-3xl font-black font-orbitron tracking-wider text-white uppercase leading-none mt-1">
            شروط <span className="text-lime-400 drop-shadow-[0_0_10px_rgba(163,230,53,0.7)] font-extrabold">التفعيل</span>
          </h2>
          <p className="text-xs font-sans text-slate-400 mt-2 max-w-md mx-auto leading-relaxed font-bold uppercase tracking-wide">
            يرجى إكمال الشروط المتتالية لتفعيل اشتراكك وربط جهازك بالخادم بنجاح
          </p>
        </div>

        {/* Horizontal side-by-side indicator dots */}
        <div className="flex justify-center gap-3 mb-6">
          {[0, 1, 2, 3].map((stepIdx) => (
            <button
              key={stepIdx}
              type="button"
              onClick={() => {
                // Allow jumping to steps if conditions are met
                if (stepIdx === 1 && (!platform || !subPlatform)) return;
                if (stepIdx === 2 && (!platform || !subPlatform)) return;
                if (stepIdx === 3 && (!platform || !subPlatform)) return;
                scrollToStep(stepIdx);
              }}
              className={`w-10 h-2 rounded-full transition-all duration-300 ${
                activeStep === stepIdx
                  ? 'bg-lime-400 shadow-[0_0_10px_rgba(163,230,53,0.7)]'
                  : 'bg-white/10 hover:bg-white/20'
              }`}
              title={`Step ${stepIdx + 1}`}
            />
          ))}
        </div>

        {/* Horizontal Container: Steps side-by-side with Next button under each */}
        <div
          ref={stepsContainerRef}
          className="flex flex-row overflow-x-auto snap-x snap-mandatory gap-5 pb-6 px-1 md:grid md:grid-cols-4 md:overflow-x-visible md:snap-none custom-scrollbar"
        >
          {/* STEP 1 CARD */}
          <div
            ref={step0Ref}
            className={`min-w-[88vw] sm:min-w-[420px] md:min-w-0 snap-center transition-all duration-300 rounded-3xl p-5 border flex flex-col justify-between h-[450px] relative overflow-hidden ${
              activeStep === 0
                ? 'bg-[#030704] border-lime-400/50 shadow-[0_0_25px_rgba(163,230,53,0.15)]'
                : 'bg-black/75 border-white/[0.05] opacity-60'
            }`}
          >
            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-4 flex-row-reverse text-right">
                <span className="text-[8.5px] font-mono bg-lime-500/10 text-lime-400 px-2 py-0.5 rounded border border-lime-500/20">
                  STEP 01
                </span>
                <div className="flex items-center gap-3 flex-row-reverse">
                  <div className="w-8 h-8 rounded-xl bg-lime-500/10 border border-lime-400/20 flex items-center justify-center text-xs font-mono font-black text-lime-400">
                    ١
                  </div>
                  <h3 className="text-sm font-black text-slate-200">المنصة وفئة الاشتراك</h3>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 font-sans text-right mb-5">
                حدد منصة الألعاب المفضلة لديك ثم اختر فئة الاشتراك المطلوبة لربط السيرفر
              </p>

              {/* Platform Select Toggle */}
              <div className="relative flex p-1 bg-black/60 rounded-xl border border-white/[0.06] mb-5">
                {platform && (
                  <div
                    className="absolute top-1 bottom-1 left-1 rounded-lg bg-gradient-to-r from-lime-600 via-lime-500 to-green-400 transition-all duration-300 shadow-md"
                    style={{
                      width: 'calc(50% - 4px)',
                      transform: platform === 'melbet' ? 'translateX(100%)' : 'none'
                    }}
                  />
                )}
                <button
                  type="button"
                  onClick={() => {
                    setPlatform('1xbet');
                    setSubPlatform(null);
                  }}
                  className={`flex-1 text-center py-2.5 text-xs font-mono tracking-wider font-extrabold z-10 transition-colors cursor-pointer ${
                    platform === '1xbet' ? 'text-black' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  1XBET
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPlatform('melbet');
                    setSubPlatform(null);
                  }}
                  className={`flex-1 text-center py-2.5 text-xs font-mono tracking-wider font-extrabold z-10 transition-colors cursor-pointer ${
                    platform === 'melbet' ? 'text-black' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  MELBET
                </button>
              </div>

              {/* Tier/SubPlatform Select Toggle */}
              {platform && (
                <div className="space-y-2 mt-2">
                  <span className="block text-[9px] font-sans text-slate-400 text-right font-extrabold uppercase">
                    اختر نوع حساب التوقع المفضل لديك
                  </span>
                  <div className="relative flex p-1 bg-black/40 rounded-xl border border-white/[0.04]">
                    {subPlatform && (
                      <div
                        className="absolute top-1 bottom-1 left-1 rounded-lg bg-gradient-to-r from-lime-500/25 to-lime-500 transition-all duration-300 shadow-sm"
                        style={{
                          width: 'calc(50% - 4px)',
                          transform: subPlatform.endsWith('vip') ? 'translateX(100%)' : 'none'
                        }}
                      />
                    )}
                    <button
                      type="button"
                      onClick={() => setSubPlatform(platform)}
                      className={`flex-1 text-center py-2 text-xs font-sans font-extrabold z-10 transition-colors cursor-pointer ${
                        subPlatform && !subPlatform.endsWith('vip') ? 'text-white font-bold' : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      STANDARD العادي
                    </button>
                    <button
                      type="button"
                      onClick={() => setSubPlatform(`${platform} vip`)}
                      className={`flex-1 text-center py-2 text-xs font-sans font-extrabold z-10 transition-colors cursor-pointer ${
                        subPlatform && subPlatform.endsWith('vip') ? 'text-black font-black' : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      👑 VIP المميز
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Next Button */}
            <button
              id="next-btn-step-0"
              type="button"
              onClick={handleNextFromPlatform}
              className="w-full relative py-3 rounded-xl font-sans text-[11px] font-black cursor-pointer text-black overflow-hidden mt-auto flex items-center justify-center gap-1.5 shadow-lg shadow-lime-500/10"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-lime-500 via-lime-400 to-green-300 hover:opacity-95 transition-all" />
              <span className="relative flex items-center justify-center gap-1.5">
                التالي: تفعيل المهام
                <ChevronRight className="w-4 h-4 text-black" />
              </span>
            </button>
          </div>

          {/* STEP 2 CARD */}
          <div
            ref={step1Ref}
            className={`min-w-[88vw] sm:min-w-[420px] md:min-w-0 snap-center transition-all duration-300 rounded-3xl p-5 border flex flex-col justify-between h-[450px] relative overflow-hidden ${
              activeStep === 1
                ? 'bg-[#030704] border-lime-400/50 shadow-[0_0_25px_rgba(163,230,53,0.15)]'
                : 'bg-black/75 border-white/[0.05] opacity-60'
            }`}
          >
            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-4 flex-row-reverse text-right">
                <span className="text-[8.5px] font-mono bg-lime-500/10 text-lime-400 px-2 py-0.5 rounded border border-lime-500/20">
                  STEP 02
                </span>
                <div className="flex items-center gap-3 flex-row-reverse">
                  <div className="w-8 h-8 rounded-xl bg-lime-500/10 border border-lime-400/20 flex items-center justify-center text-xs font-mono font-black text-lime-400">
                    ٢
                  </div>
                  <h3 className="text-sm font-black text-slate-200">الاشتراك والمتابعة (اختياري)</h3>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 font-sans text-right mb-4">
                انضم للقنوات وثبت برنامج اللعبة لتأهيل حسابك للمزامنة (اختياري)
              </p>

              {/* Mini tasks stack */}
              <div className="space-y-2.5">
                {/* Telegram */}
                <button
                  type="button"
                  onClick={() => handleSocialClick('https://t.me/THEAGLE', 'telegram')}
                  className="w-full flex items-center justify-between p-2 rounded-xl bg-black/40 border border-white/[0.04] hover:border-lime-500/35 transition-all flex-row-reverse text-right"
                >
                  <div className="flex items-center gap-2.5 flex-row-reverse">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/15">
                      <Send className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-200">قناة التليجرام الرئيسية</p>
                    </div>
                  </div>
                  <span className={`text-[9px] font-sans px-2.5 py-1 rounded-lg ${
                    telegramJoined ? 'bg-emerald-500/20 text-emerald-400' : 'bg-lime-400 text-black font-black'
                  }`}>
                    {telegramJoined ? '✓ تم' : 'انضمام'}
                  </span>
                </button>

                {/* Youtube */}
                <button
                  type="button"
                  onClick={() => handleSocialClick('https://youtube.com/@dragon-p8k6q?si=NN8sba_-PU4IPxVN', 'youtube')}
                  className="w-full flex items-center justify-between p-2 rounded-xl bg-black/40 border border-white/[0.04] hover:border-lime-500/35 transition-all flex-row-reverse text-right"
                >
                  <div className="flex items-center gap-2.5 flex-row-reverse">
                    <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-500 border border-rose-500/15">
                      <Youtube className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-200">قناة اليوتيوب الرسمية</p>
                    </div>
                  </div>
                  <span className={`text-[9px] font-sans px-2.5 py-1 rounded-lg ${
                    youtubeJoined ? 'bg-emerald-500/20 text-emerald-400' : 'bg-lime-400 text-black font-black'
                  }`}>
                    {youtubeJoined ? '✓ تم' : 'اشتراك'}
                  </span>
                </button>

                {/* Install App */}
                <button
                  type="button"
                  onClick={handleInstallClick}
                  className="w-full flex items-center justify-between p-2 rounded-xl bg-black/40 border border-white/[0.04] hover:border-lime-500/35 transition-all flex-row-reverse text-right"
                >
                  <div className="flex items-center gap-2.5 flex-row-reverse">
                    <div className="w-8 h-8 rounded-lg bg-lime-500/10 flex items-center justify-center text-lime-400 border border-lime-500/15">
                      <Download className="w-4 h-4 animate-pulse" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-200">تنزيل برنامج المنصة</p>
                    </div>
                  </div>
                  <span className={`text-[9px] font-sans px-2.5 py-1 rounded-lg ${
                    platformInstalled ? 'bg-emerald-500/20 text-emerald-400' : 'bg-lime-400 text-black font-black'
                  }`}>
                    {platformInstalled ? '✓ تم' : 'تحميل'}
                  </span>
                </button>
              </div>
            </div>

            {/* Bottom Next Button */}
            <button
              id="next-btn-step-1"
              type="button"
              onClick={handleNextFromTasks}
              className="w-full relative py-3 rounded-xl font-sans text-[11px] font-black cursor-pointer text-black overflow-hidden mt-auto flex items-center justify-center gap-1.5 shadow-lg shadow-lime-500/10"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-lime-500 via-lime-400 to-green-300 hover:opacity-95 transition-all" />
              <span className="relative flex items-center justify-center gap-1.5">
                التالي: كود التفعيل
                <ChevronRight className="w-4 h-4 text-black" />
              </span>
            </button>
          </div>

          {/* STEP 3 CARD */}
          <div
            ref={step2Ref}
            className={`min-w-[88vw] sm:min-w-[420px] md:min-w-0 snap-center transition-all duration-300 rounded-3xl p-5 border flex flex-col justify-between h-[450px] relative overflow-hidden ${
              activeStep === 2
                ? 'bg-[#030704] border-lime-400/50 shadow-[0_0_25px_rgba(163,230,53,0.15)]'
                : 'bg-black/75 border-white/[0.05] opacity-60'
            }`}
          >
            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-4 flex-row-reverse text-right">
                <span className="text-[8.5px] font-mono bg-lime-500/10 text-lime-400 px-2 py-0.5 rounded border border-lime-500/20">
                  STEP 03
                </span>
                <div className="flex items-center gap-3 flex-row-reverse">
                  <div className="w-8 h-8 rounded-xl bg-lime-500/10 border border-lime-400/20 flex items-center justify-center text-xs font-mono font-black text-lime-400">
                    ٣
                  </div>
                  <h3 className="text-sm font-black text-slate-200">الرمز ومبلغ التأمين</h3>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 font-sans text-right mb-3">
                سجل حساباً جديداً تماماً باستخدام هذا الكود لربطه بخوارزمية التوقعات VIP
              </p>

              {/* Coupon area */}
              <div className="p-3.5 rounded-2xl bg-black/60 border border-lime-500/30 flex items-center justify-between gap-2.5 mb-3 relative overflow-hidden">
                <div className="flex items-center gap-2 bg-neutral-900/95 border border-white/[0.08] py-1.5 px-3 rounded-xl justify-between shadow-inner w-full sm:w-auto">
                  <span className="font-mono text-lg font-black text-lime-400 tracking-wider">
                    {getPromoCode()}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyPromo}
                    className="p-1.5 rounded-lg bg-lime-500/15 hover:bg-lime-500/25 text-lime-300 transition-colors cursor-pointer border border-lime-400/20"
                    title="Copy Promo"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="text-right">
                  <span className="block text-[8px] font-mono text-lime-400 font-bold uppercase">PROMO CODE</span>
                  <span className="text-[10px] text-slate-300 font-bold leading-none block mt-1">رمز التفعيل</span>
                </div>
              </div>

              {/* Deposit specification badge */}
              <div className="p-3.5 rounded-2xl bg-black/50 border border-white/[0.05] relative text-right">
                <div className="text-[8px] font-mono text-lime-500/60 uppercase">MIN DEPOSIT REQUIRED</div>
                <div className="text-sm font-bold text-white tracking-wide mt-1">
                  الحد الأدنى للاعتماد:{' '}
                  <span className="text-lime-400 font-black drop-shadow-[0_0_8px_rgba(163,230,53,0.5)]">
                    {subPlatform && subPlatform.endsWith('vip') ? '300 EGP' : '200 EGP'}
                  </span>{' '}
                  <span className="text-neutral-600">|</span>{' '}
                  <span className="text-emerald-400">
                    {subPlatform && subPlatform.endsWith('vip') ? '5$' : '3$'}
                  </span>
                </div>
                <p className="text-[9.5px] text-slate-400 leading-normal mt-2">
                  يرجى شحن هذا المبلغ في الحساب الجديد كشرط ضروري لمطابقة الخوادم بنجاح
                </p>
              </div>
            </div>

            {/* Bottom Next Button */}
            <button
              id="next-btn-step-2"
              type="button"
              onClick={handleNextFromPromo}
              className="w-full relative py-3 rounded-xl font-sans text-[11px] font-black cursor-pointer text-black overflow-hidden mt-auto flex items-center justify-center gap-1.5 shadow-lg shadow-lime-500/10"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-lime-500 via-lime-400 to-green-300 hover:opacity-95 transition-all" />
              <span className="relative flex items-center justify-center gap-1.5">
                التالي: معرف اللاعب
                <ChevronRight className="w-4 h-4 text-black" />
              </span>
            </button>
          </div>

          {/* STEP 4 CARD */}
          <div
            ref={step3Ref}
            className={`min-w-[88vw] sm:min-w-[420px] md:min-w-0 snap-center transition-all duration-300 rounded-3xl p-5 border flex flex-col justify-between h-[450px] relative overflow-hidden ${
              activeStep === 3
                ? 'bg-[#030704] border-lime-400/50 shadow-[0_0_25px_rgba(163,230,53,0.15)]'
                : 'bg-black/75 border-white/[0.05] opacity-60'
            }`}
          >
            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-4 flex-row-reverse text-right">
                <span className="text-[8.5px] font-mono bg-lime-500/10 text-lime-400 px-2 py-0.5 rounded border border-lime-500/20">
                  STEP 04
                </span>
                <div className="flex items-center gap-3 flex-row-reverse">
                  <div className="w-8 h-8 rounded-xl bg-lime-500/10 border border-lime-400/20 flex items-center justify-center text-xs font-mono font-black text-lime-400">
                    ٤
                  </div>
                  <h3 className="text-sm font-black text-slate-200">معرف اللاعب الرقمي</h3>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 font-sans text-right mb-4">
                أدخل معرف حساب اللاعب الرقمي (User ID) لتسجيل رخصة الدخول على خادم التنبؤ الحقيقي
              </p>

              {/* Numerical user id input */}
              <div className="space-y-2 text-right">
                <label htmlFor="user-id-input" className="block text-[9.5px] font-sans tracking-wide text-slate-400 font-extrabold uppercase pr-1">
                  معرف حسابك الرقمي في المنصة
                </label>
                <div className="relative flex items-center bg-black/60 rounded-xl border border-white/[0.1] focus-within:border-lime-500 transition-colors p-[1px] shadow-inner">
                  <span className="pl-3.5 text-lime-400">
                    <User className="w-4.5 h-4.5 text-lime-400" />
                  </span>
                  <input
                    id="user-id-input"
                    type="text"
                    pattern="[0-9]*"
                    inputMode="numeric"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value.replace(/\D/g, ''))}
                    placeholder="مثال: 582930492"
                    required
                    className="w-full bg-transparent border-none py-3.5 px-3 text-slate-100 placeholder-neutral-700 focus:outline-none focus:ring-0 text-sm tracking-widest font-mono font-black text-right"
                  />
                </div>
              </div>
            </div>

            {/* Final Submission Button under Step 4 */}
            <button
              id="submit-verification-btn"
              type="submit"
              onClick={handleSubmit}
              className="w-full relative group overflow-hidden py-3 rounded-xl font-sans text-[11px] font-black cursor-pointer text-white shadow-2xl mt-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-lime-600 via-lime-400 to-green-300 group-hover:opacity-95 transition-all rounded-xl animate-pulse" />
              <div className="absolute -inset-1 bg-lime-400 blur-lg opacity-30 group-hover:opacity-60 transition-all rounded-xl" />
              <span className="relative flex items-center justify-center gap-1.5 text-black font-black">
                إرسال البيانات ومطابقة الخوادم ⚡
              </span>
            </button>
          </div>
        </div>

        {/* Minimalist Encryption Line */}
        <div className="w-full text-center mt-4">
          <p className="text-[8px] text-neutral-600 font-mono tracking-wider uppercase">
            END-TO-END VERIFICATION BYPASS DECK • SECURE TUNNEL OK
          </p>
        </div>
      </div>

      {/* Cyber Verification Handshake Modal Overlay (Aesthetic Spinner & Loader) */}
      <AnimatePresence>
        {isVerifying && (
          <div
            id="verification-modal"
            className="fixed inset-0 z-50 bg-[#020503]/98 backdrop-blur-2xl flex flex-col items-center justify-center p-6 select-none"
          >
            {/* Visual background details */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.012)_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-lime-500/5 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />

            <div className="w-full max-w-md text-center relative z-10 flex flex-col items-center">
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-lime-500/20 rounded-full blur-3xl animate-pulse" />
                
                <motion.div
                  id="spinning-gear-container"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, ease: "linear", repeat: Infinity }}
                  className="w-24 h-24 rounded-full border-2 border-lime-500/50 flex items-center justify-center relative bg-black/90 shadow-2xl"
                >
                  <Activity className="w-12 h-12 text-lime-400 stroke-[1.25] animate-pulse" />
                  <div className="absolute inset-0 rounded-full border-4 border-dashed border-lime-500/20 scale-110" />
                </motion.div>
              </div>

              <h4 className="text-base font-mono font-black tracking-widest text-white mb-2 uppercase leading-none">
                VERIFYING ACCREDITATION
              </h4>
              <p className="text-[11px] font-sans text-lime-300 font-black uppercase tracking-wider mb-8 h-10 flex items-center justify-center text-center px-4">
                {verifyStatusText}
              </p>

              {/* Progress bar */}
              <div className="w-full bg-white/5 h-3.5 rounded-full border border-white/[0.08] p-[2px] mb-4 shadow-inner overflow-hidden">
                <div
                  className="bg-gradient-to-r from-emerald-600 via-lime-400 to-green-300 h-full rounded-full transition-all duration-75 relative"
                  style={{ width: `${verifyProgress}%` }}
                >
                  <div className="absolute -right-1 -top-1 w-5 h-5 bg-lime-400 blur-md rounded-full" />
                </div>
              </div>

              <div className="flex justify-between w-full text-[10px] font-mono text-slate-500 font-black tracking-widest">
                <span>SECURITY LEVEL: PHOSPHOR-ECL</span>
                <span className="text-white font-extrabold">{verifyProgress}%</span>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
