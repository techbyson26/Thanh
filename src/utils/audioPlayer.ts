"use client";

// Romantic Audio Manager
// Plays the classical, romantic Canon in D masterpiece starting from second 6
// Smooth volume fade-in, looping from 6s, and play/pause controls

class RomanticAudioManager {
  private audio: HTMLAudioElement | null = null;
  private isPlaying: boolean = false;
  private targetVolume: number = 0.55;
  private fadeInterval: NodeJS.Timeout | null = null;
  private startTimeSeconds: number = 6;

  constructor() {
    if (typeof window !== "undefined") {
      this.initAudio();
    }
  }

  private initAudio() {
    if (this.audio) return;
    this.audio = new Audio("/music/romantic.mp3");
    this.audio.loop = false; // Manually loop to second 6
    this.audio.preload = "auto";
    this.audio.volume = 0;

    // Set seek position to second 6 as soon as metadata is ready
    this.audio.addEventListener("loadedmetadata", () => {
      if (this.audio && this.audio.currentTime < this.startTimeSeconds - 0.2) {
        this.audio.currentTime = this.startTimeSeconds;
      }
    });

    // When the audio finishes, loop back to second 6 seamlessly
    this.audio.addEventListener("ended", () => {
      if (this.audio) {
        this.audio.currentTime = this.startTimeSeconds;
        this.audio.play().catch(() => {});
      }
    });

    this.audio.addEventListener("pause", () => {
      this.isPlaying = false;
    });

    this.audio.addEventListener("playing", () => {
      this.isPlaying = true;
    });
  }

  private fadeIn(durationMs: number = 1500) {
    if (!this.audio) return;
    if (this.fadeInterval) clearInterval(this.fadeInterval);

    const stepTime = 50;
    const steps = durationMs / stepTime;
    const volumeStep = this.targetVolume / steps;

    this.audio.volume = 0;
    this.fadeInterval = setInterval(() => {
      if (!this.audio) {
        if (this.fadeInterval) clearInterval(this.fadeInterval);
        return;
      }
      if (this.audio.volume + volumeStep < this.targetVolume) {
        this.audio.volume += volumeStep;
      } else {
        this.audio.volume = this.targetVolume;
        if (this.fadeInterval) clearInterval(this.fadeInterval);
      }
    }, stepTime);
  }

  public async play(): Promise<boolean> {
    this.initAudio();
    if (!this.audio) return false;

    // Skip the first 5 seconds, jump directly to second 6
    if (this.audio.currentTime < this.startTimeSeconds - 0.2) {
      this.audio.currentTime = this.startTimeSeconds;
    }

    try {
      await this.audio.play();
      this.isPlaying = true;
      this.fadeIn(1200);
      return true;
    } catch (err) {
      this.isPlaying = false;
      return false;
    }
  }

  public pause(): void {
    if (!this.audio) return;
    if (this.fadeInterval) clearInterval(this.fadeInterval);
    this.audio.pause();
    this.isPlaying = false;
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

  public setVolume(vol: number): void {
    this.targetVolume = Math.max(0, Math.min(1, vol));
    if (this.audio && this.isPlaying) {
      this.audio.volume = this.targetVolume;
    }
  }

  public setupAutoplay(): void {
    if (typeof window === "undefined") return;

    this.play().then((success) => {
      if (!success) {
        // Fallback: If browser policy blocks autoplay with zero interaction,
        // start playback from second 6 on the very first touch/click anywhere on the screen
        const onFirstInteraction = () => {
          this.play();
          window.removeEventListener("pointerdown", onFirstInteraction);
          window.removeEventListener("touchstart", onFirstInteraction);
          window.removeEventListener("click", onFirstInteraction);
          window.removeEventListener("keydown", onFirstInteraction);
        };

        window.addEventListener("pointerdown", onFirstInteraction, { once: true, passive: true });
        window.addEventListener("touchstart", onFirstInteraction, { once: true, passive: true });
        window.addEventListener("click", onFirstInteraction, { once: true, passive: true });
        window.addEventListener("keydown", onFirstInteraction, { once: true, passive: true });
      }
    });
  }
}

export const romanticAudio = typeof window !== "undefined" ? new RomanticAudioManager() : null;
