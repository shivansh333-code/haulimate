import React, { useState, useRef } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { ShieldCheck, UserX, MoveHorizontal } from 'lucide-react';

export const BeforeAfterSlider: React.FC = () => {
  const { t } = useLanguage();
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPos(percent);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) {
      handleMove(e.clientX);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-12 px-4">
      <div className="text-center mb-6">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#F5C400]/30 text-[#1B3A6B] border border-[#F5C400] mb-2">
          {t('slider.title')}
        </span>
        <h3 className="text-2xl sm:text-3xl font-bold font-baloo text-[#1B3A6B]">
          {t('slider.title')}
        </h3>
        <p className="text-sm sm:text-base text-[#14171C]/80 mt-1 max-w-xl mx-auto">
          {t('slider.subtitle')}
        </p>
      </div>

      {/* Comparison Container */}
      <div
        ref={containerRef}
        onMouseDown={() => (isDragging.current = true)}
        onMouseUp={() => (isDragging.current = false)}
        onMouseLeave={() => (isDragging.current = false)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="relative w-full aspect-16/10 sm:aspect-2/1 rounded-2xl overflow-hidden shadow-xl border-4 border-[#1B3A6B] select-none cursor-ew-resize bg-[#14171C]"
      >
        {/* AFTER LAYER (Full background - HauliMate Professional) */}
        <div className="absolute inset-0 bg-[#1B3A6B] flex items-center justify-center overflow-hidden">
          <img
            src="/assets/images/driver_uniformed.jpg"
            alt="HauliMate Uniformed Indian Commercial Heavy Vehicle Driver with ID Badge"
            className="w-full h-full object-cover object-center filter brightness-95"
            referrerPolicy="no-referrer"
          />
          {/* Overlay elements for professional badge */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B3A6B]/90 via-transparent to-black/30" />
          
          <div className="absolute top-4 right-4 bg-[#1E7F4F] text-white px-3 py-1.5 rounded-md text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-md">
            <ShieldCheck className="w-4 h-4 text-[#F5C400]" />
            <span>{t('slider.afterLabel')}</span>
          </div>

          <div className="absolute bottom-4 right-4 bg-[#1B3A6B]/95 text-white p-3 rounded-xl border border-[#F5C400]/40 max-w-xs text-right hidden sm:block">
            <div className="text-xs font-bold text-[#F5C400]">HauliMate ID: HM-DL-4082</div>
            <div className="text-sm font-bold">Gurpreet Singh (HMV Specialist)</div>
            <div className="text-xs text-white/80">Navy Uniformed • Police Verified • PF & ESI Tracked</div>
          </div>
        </div>

        {/* BEFORE LAYER (Clipped overlay - Informal driver) */}
        <div
          className="absolute inset-y-0 left-0 overflow-hidden bg-gray-900 border-r-2 border-white"
          style={{ width: `${sliderPos}%` }}
        >
          <div 
            className="absolute inset-0"
            style={{ width: containerRef.current?.clientWidth || '100%', height: '100%' }}
          >
            <img
              src="/assets/images/driver_informal.jpg"
              alt="Informal commercial driver without uniform or verified ID"
              className="w-full h-full object-cover object-center filter grayscale contrast-125 brightness-75"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

            <div className="absolute top-4 left-4 bg-[#C8322B] text-white px-3 py-1.5 rounded-md text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-md">
              <UserX className="w-4 h-4" />
              <span>{t('slider.beforeLabel')}</span>
            </div>

            <div className="absolute bottom-4 left-4 bg-black/80 text-white p-3 rounded-xl border border-white/20 max-w-xs hidden sm:block">
              <div className="text-xs text-red-300 font-bold">Informal Hiring</div>
              <div className="text-sm font-bold">No Uniform • No Verified ID • Unpredictable</div>
              <div className="text-xs text-gray-300">No company support, gate delays, no replacement guarantee</div>
            </div>
          </div>
        </div>

        {/* DRAGGABLE DIVIDER HANDLE */}
        <div
          className="absolute inset-y-0 w-1 bg-[#F5C400] shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#F4741F] border-2 border-white text-white flex items-center justify-center shadow-lg pointer-events-auto cursor-grab active:cursor-grabbing">
            <MoveHorizontal className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      {/* Accessible Range Input for Mobile / Screen Readers */}
      <div className="mt-4 flex items-center justify-between text-xs text-[#14171C]/70">
        <span>← {t('slider.beforeLabel')}</span>
        <input
          type="range"
          min="5"
          max="95"
          value={sliderPos}
          onChange={(e) => setSliderPos(Number(e.target.value))}
          aria-label="Comparison slider position"
          className="w-1/2 accent-[#F4741F] cursor-pointer"
        />
        <span>{t('slider.afterLabel')} →</span>
      </div>
    </div>
  );
};
