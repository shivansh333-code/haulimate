import React, { useEffect, useState, useRef } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { soundService } from '../../services/soundService';

interface ClickRipple {
  id: number;
  x: number;
  y: number;
  text: string;
}

export const TruckCursor: React.FC = () => {
  const [soundEnabled, setSoundEnabled] = useState(soundService.isEnabled());
  const [ripples, setRipples] = useState<ClickRipple[]>([]);
  const rippleIdRef = useRef(0);

  // Global click listener to trigger truck horn sound and visual honk ripple
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Trigger truck horn sound
      soundService.playTruckHorn();

      // Show brief honk wave at click coordinate
      const newRipple: ClickRipple = {
        id: ++rippleIdRef.current,
        x: e.clientX,
        y: e.clientY,
        text: Math.random() > 0.5 ? 'HORN! 📯' : 'PAWN-PAWN! 🚚',
      };

      setRipples((prev) => [...prev.slice(-4), newRipple]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 700);
    };

    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

  const handleToggleSound = (e: React.MouseEvent) => {
    e.stopPropagation(); // Don't trigger horn click on the toggle itself
    const newState = soundService.toggle();
    setSoundEnabled(newState);
  };

  const handleTestHonk = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundService.playTruckHorn(true);
  };

  return (
    <>
      {/* Click Visual Waves ("HORN OK PLEASE" Honk indicator) */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {ripples.map((ripple) => (
          <div
            key={ripple.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 animate-ping-short flex items-center gap-1 select-none"
            style={{ left: ripple.x, top: ripple.y }}
          >
            <span className="px-2 py-0.5 rounded-full bg-[#F4741F] text-white text-[10px] font-extrabold tracking-wider font-baloo shadow-lg border border-[#F5C400]">
              {ripple.text}
            </span>
          </div>
        ))}
      </div>

      {/* Floating Truck Horn Audio Controller at bottom-left */}
      <aside aria-label="Truck horn audio controls" className="fixed bottom-4 left-4 z-40 hidden sm:flex items-center gap-2 bg-[#1B3A6B]/95 text-white px-3 py-2 rounded-full shadow-xl border-2 border-[#F5C400] backdrop-blur-xs select-none">
        <button
          onClick={handleToggleSound}
          type="button"
          className="flex items-center gap-1.5 text-xs font-bold text-[#F5C400] hover:text-white transition-colors cursor-pointer"
          title={soundEnabled ? 'Click to Mute Truck Horn' : 'Click to Enable Truck Horn'}
        >
          {soundEnabled ? (
            <>
              <Volume2 className="w-4 h-4 text-[#F5C400] animate-pulse" />
              <span>Horn: ON</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-red-400" />
              <span className="text-gray-300">Horn: Muted</span>
            </>
          )}
        </button>

        <span className="text-white/30">|</span>

        <button
          onClick={handleTestHonk}
          type="button"
          className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#F4741F] hover:bg-[#F4741F]/80 text-[11px] font-bold text-white transition-transform active:scale-95 cursor-pointer shadow-xs"
          title="Test Truck Horn"
        >
          <Sparkles className="w-3 h-3 text-[#F5C400]" />
          <span>Honk! 🚚</span>
        </button>
      </aside>
    </>
  );
};
