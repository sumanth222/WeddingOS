import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  private audio?: HTMLAudioElement;
  private audioStarted = false;

  initialize(audio: HTMLAudioElement): void {
    this.audio = audio;
    this.audio.loop = true;
    this.audio.volume = 0.35;
  }

  play(): void {
    if(!this.audioStarted){
      console.log('Attempting to play audio...');
      this.audio?.play().catch(error => {
        console.warn('Audio playback blocked:', error);
      });
      this.audioStarted = true;
    }
  }
}