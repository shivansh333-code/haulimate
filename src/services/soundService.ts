/**
 * Indian Truck Air Horn Synthesizer via Web Audio API
 * Generates an authentic dual-tone pneumatic commercial truck horn
 * Zero network dependencies, zero latency, works across modern browsers.
 */

class SoundService {
  private audioCtx: AudioContext | null = null;
  private soundEnabled: boolean = true;
  private lastPlayTime: number = 0;

  constructor() {
    // Check localStorage preference, default to enabled
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('haulimate_horn_sound_enabled');
      this.soundEnabled = stored !== 'false';
    }
  }

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  public isEnabled(): boolean {
    return this.soundEnabled;
  }

  public setEnabled(enabled: boolean): void {
    this.soundEnabled = enabled;
    if (typeof window !== 'undefined') {
      localStorage.setItem('haulimate_horn_sound_enabled', enabled ? 'true' : 'false');
    }
  }

  public toggle(): boolean {
    this.setEnabled(!this.soundEnabled);
    if (this.soundEnabled) {
      // Play a short preview horn when enabled
      this.playTruckHorn(true);
    }
    return this.soundEnabled;
  }

  /**
   * Plays an authentic dual-tone Indian truck air-horn blast.
   * Typical highway truck tone: High trumpet ~435Hz (A4), Low trumpet ~345Hz (F4), Sub ~172Hz
   */
  public playTruckHorn(force: boolean = false): void {
    if (!this.soundEnabled && !force) return;

    const now = Date.now();
    // Prevent overlapping spam on rapid clicking (120ms debounce)
    if (now - this.lastPlayTime < 120) return;
    this.lastPlayTime = now;

    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const currentTime = ctx.currentTime;
      const duration = 0.22; // snappy punchy horn blast

      // Master output gain for comfortable listening volume
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, currentTime);
      // Fast pneumatic attack
      masterGain.gain.linearRampToValueAtTime(0.18, currentTime + 0.025);
      // Short plateau sustain
      masterGain.gain.setValueAtTime(0.18, currentTime + duration * 0.55);
      // Natural air decay
      masterGain.gain.exponentialRampToValueAtTime(0.001, currentTime + duration);
      masterGain.connect(ctx.destination);

      // Low-pass filter to simulate acoustic metal bell / horn flare
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2600, currentTime);
      filter.Q.setValueAtTime(2.0, currentTime);
      filter.connect(masterGain);

      // Trumpet 1: Low pneumatic pipe (~345 Hz with slight pitch drop)
      const osc1 = ctx.createOscillator();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(352, currentTime);
      osc1.frequency.exponentialRampToValueAtTime(340, currentTime + duration);
      
      const gain1 = ctx.createGain();
      gain1.gain.setValueAtTime(0.45, currentTime);
      osc1.connect(gain1);
      gain1.connect(filter);

      // Trumpet 2: High pneumatic pipe (~435 Hz with harmonic overtone)
      const osc2 = ctx.createOscillator();
      osc2.type = 'sawtooth';
      osc2.frequency.setValueAtTime(442, currentTime);
      osc2.frequency.exponentialRampToValueAtTime(430, currentTime + duration);

      const gain2 = ctx.createGain();
      gain2.gain.setValueAtTime(0.40, currentTime);
      osc2.connect(gain2);
      gain2.connect(filter);

      // Sub-harmonic: Cabin body vibration resonance (~175 Hz)
      const osc3 = ctx.createOscillator();
      osc3.type = 'triangle';
      osc3.frequency.setValueAtTime(175, currentTime);
      
      const gain3 = ctx.createGain();
      gain3.gain.setValueAtTime(0.20, currentTime);
      osc3.connect(gain3);
      gain3.connect(filter);

      // Start & stop all oscillators
      osc1.start(currentTime);
      osc2.start(currentTime);
      osc3.start(currentTime);

      osc1.stop(currentTime + duration);
      osc2.stop(currentTime + duration);
      osc3.stop(currentTime + duration);
    } catch {
      // AudioContext autoplay restrictions or inactive tab handling
    }
  }
}

export const soundService = new SoundService();
