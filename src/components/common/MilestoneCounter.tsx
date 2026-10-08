import React, { useState, useEffect, useRef } from 'react';

interface MilestoneCounterProps {
  label: string;
  value: number | string;
  suffix?: string;
  subtext?: string;
  routeCode?: string;
}

export const MilestoneCounter: React.FC<MilestoneCounterProps> = ({
  label,
  value,
  suffix = '',
  subtext,
  routeCode = 'NH-44',
}) => {
  const [displayValue, setDisplayValue] = useState<number | string>(
    typeof value === 'number' ? 0 : value
  );
  const stoneRef = useRef<HTMLDivElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    if (typeof value !== 'number') {
      setDisplayValue(value);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          const duration = 1400;
          const steps = 30;
          const stepTime = duration / steps;
          let currentStep = 0;

          const timer = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplayValue(Math.round(eased * value));

            if (currentStep >= steps) {
              clearInterval(timer);
              setDisplayValue(value);
            }
          }, stepTime);
        }
      },
      { threshold: 0.2 }
    );

    if (stoneRef.current) {
      observer.observe(stoneRef.current);
    }

    return () => observer.disconnect();
  }, [value]);

  return (
    <div
      ref={stoneRef}
      className="milestone-stone w-full max-w-[240px] mx-auto text-center flex flex-col items-center justify-between p-4 pt-2 pb-5 text-[#14171C] transition-transform hover:-translate-y-1 duration-200"
      style={{ minHeight: '190px' }}
    >
      {/* Top Highway Code Banner */}
      <div className="text-[13px] font-extrabold tracking-widest text-[#14171C] uppercase font-baloo">
        {routeCode}
      </div>

      {/* Black Horizontal Milestone Divider (rendered via CSS before) */}
      <div className="h-3 my-2" />

      {/* Metric Main Number */}
      <div className="my-auto py-1">
        <div className="text-4xl sm:text-5xl font-black font-baloo tracking-tight text-[#14171C]">
          {displayValue}
          {suffix && <span className="text-2xl ml-0.5">{suffix}</span>}
        </div>
      </div>

      {/* Label on the stone base */}
      <div className="w-full pt-1 border-t border-[#14171C]/25">
        <div className="text-sm font-bold font-mukta leading-tight text-[#14171C]">
          {label}
        </div>
        {subtext && (
          <div className="text-[11px] font-semibold text-[#14171C]/75 mt-0.5">
            {subtext}
          </div>
        )}
      </div>
    </div>
  );
};
