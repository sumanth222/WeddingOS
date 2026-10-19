import { Component, ElementRef, inject, ViewChild } from '@angular/core';

import { IntroComponent } from './scenes/intro/intro';


import { TheTwoComponent } from './scenes/the-two/the-two';

import { MemoriesComponent } from './scenes/memories/memories';

import { ScrollService } from './core/scroll';


import { Events } from './scenes/events/events';
import { AudioService } from './core/services/audio';
import { Timeline } from './scenes/timeline/timeline';

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [
    IntroComponent,
    TheTwoComponent,
    MemoriesComponent,
    Events,
    Timeline
  ],

  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {

  private scrollService =
    inject(ScrollService);

    constructor(private audioService: AudioService){}

    @ViewChild('weddingMusic')
    weddingMusic!: ElementRef<HTMLAudioElement>;

    private musicStarted = false;

    ngAfterViewInit(): void {
  const audio = this.weddingMusic.nativeElement;

  audio.loop = true;
  audio.volume = 0.70;

  const startMusic = (): void => {
    audio.play()
      .then(() => {
        console.log('🎵 Wedding music started');
      })
      .catch(error => {
        console.error('Audio failed:', error);
      });
  };

  window.addEventListener('touchstart', startMusic, {
    once: true,
    passive: true
  });
}

}