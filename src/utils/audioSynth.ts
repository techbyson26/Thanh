"use client";

// Web Audio Romantic Melody Generator
// Synthesizes a soothing, emotional piano & chime progression
// Completely self-contained, no external assets needed, 100% reliable on Vercel

class RomanticSynth {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timer: NodeJS.Timeout | null = null;
  private gainNode: GainNode | null = null;

  private chords = [
    // [root, 3rd, 5th, 7th, 9th/extension] in MIDI frequencies
    [261.63, 329.63, 392.0, 493.88, 587.33], // Cmaj9
    [220.0, 261.63, 329.63, 392.0, 493.88],  // Am9
    [174.61, 220.0, 261.63, 329.63, 392.0],  // Fmaj7
    [196.0, 246.94, 293.66, 349.23, 440.0],  // Gsus4 / G7
    [164.81, 196.0, 246.94, 329.63, 392.0],  // Em7
    [220.0, 277.18, 329.63, 392.0, 440.0],   // A7
    [146.83, 174.61, 220.0, 261.63, 329.63], // Dm7
    [196.0, 246.94, 293.66, 392.0, 523.25],  // G7add9
  ];

  private currentChordIdx = 0;
  private currentNoteIdx = 0;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.35, this.ctx.currentTime);
      this.gainNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  private playTone(freq: number, duration: number = 2.2, type: OscillatorType = "sine", volume: number = 0.15) {
    if (!this.ctx || !this.gainNode) return;

    const osc = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // Warm acoustic filter
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1400, this.ctx.currentTime);
    filter.Q.setValueAtTime(1.2, this.ctx.currentTime);

    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    // Piano-like envelope: instant attack, exponential smooth decay
    const now = this.ctx.currentTime;
    noteGain.gain.setValueAtTime(0.0001, now);
    noteGain.gain.linearRampToValueAtTime(volume, now + 0.05);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.gainNode);

    osc.start(now);
    osc.stop(now + duration + 0.1);
  }

  private step = () => {
    if (!this.isPlaying) return;

    const chord = this.chords[this.currentChordIdx];
    const freq = chord[this.currentNoteIdx];

    // Primary warm piano tone
    this.playTone(freq, 2.5, "triangle", 0.18);
    // Harmonious shimmering harmonic (celesta overtone)
    this.playTone(freq * 2, 1.8, "sine", 0.06);

    // Root bass on chord start
    if (this.currentNoteIdx === 0) {
      this.playTone(freq / 2, 3.5, "sine", 0.22);
    }

    this.currentNoteIdx++;
    if (this.currentNoteIdx >= chord.length) {
      this.currentNoteIdx = 0;
      this.currentChordIdx = (this.currentChordIdx + 1) % this.chords.length;
    }

    // Romantic slow arpeggio tempo (around 480ms per note)
    this.timer = setTimeout(this.step, 480);
  };

  public play() {
    this.initContext();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.step();
  }

  public pause() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }

  public setVolume(val: number) {
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(Math.max(0, Math.min(1, val)), this.ctx.currentTime);
    }
  }
}

export const romanticSynth = typeof window !== "undefined" ? new RomanticSynth() : null;
