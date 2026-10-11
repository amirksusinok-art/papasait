// Ambient Piano/Celeste sound generator using Web Audio API
class AmbientMusicPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timer: ReturnType<typeof setInterval> | null = null;
  private customAudio: HTMLAudioElement | null = null;
  private customUrl?: string;

  constructor(customUrl?: string) {
    this.customUrl = customUrl;
  }

  public setCustomUrl(url?: string) {
    this.customUrl = url;
  }

  public async start() {
    if (this.isPlaying) return;

    if (this.customUrl) {
      if (!this.customAudio) {
        this.customAudio = new Audio(this.customUrl);
        this.customAudio.loop = true;
      }
      try {
        await this.customAudio.play();
        this.isPlaying = true;
        return;
      } catch (err) {
        console.warn('Custom audio playback failed, falling back to synth', err);
      }
    }

    // Web Audio Synthesizer fallback
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!this.ctx) {
      this.ctx = new AudioContextClass();
    }

    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }

    this.isPlaying = true;

    // Harmonic pentatonic peaceful notes (Hz): C, D, E, G, A, C5, D5, E5, G5
    const chordPitches = [
      [261.63, 329.63, 392.00, 523.25], // C major
      [220.00, 261.63, 329.63, 440.00], // A minor
      [174.61, 261.63, 349.23, 523.25], // F major
      [196.00, 246.94, 293.66, 392.00], // G major
    ];

    let chordIndex = 0;
    let step = 0;

    const playTenderNote = (freq: number, duration: number, gainValue: number) => {
      if (!this.ctx || !this.isPlaying) return;
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      // Warm sine + low harmonics
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      // Low pass filter to keep it warm and mellow
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, now);

      // Soft envelope
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(gainValue, now + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration + 0.1);
    };

    // Arpeggiator loop
    this.timer = setInterval(() => {
      if (!this.isPlaying) return;
      const currentChord = chordPitches[chordIndex];
      const pitch = currentChord[step % currentChord.length];

      playTenderNote(pitch, 2.5, 0.08);

      step++;
      if (step % 4 === 0) {
        chordIndex = (chordIndex + 1) % chordPitches.length;
      }
    }, 700);
  }

  public stop() {
    this.isPlaying = false;
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    if (this.customAudio) {
      this.customAudio.pause();
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }
}

export const ambientPlayer = new AmbientMusicPlayer();
