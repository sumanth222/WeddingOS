import { Component, ElementRef, inject, ViewChild } from '@angular/core';

import { IntroComponent } from './scenes/intro/intro';


import { TheTwoComponent } from './scenes/the-two/the-two';

import { MemoriesComponent } from './scenes/memories/memories';

import { ScrollService } from './core/scroll';


import { Events } from './scenes/events/events';
import { Timeline } from './scenes/timeline/timeline';
import { KeepAliveService } from './core/services/keep-alive';

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

  ngOnInit(): void {
    this.keepAlive.start();
  }

  private scrollService =
    inject(ScrollService);

    constructor(private keepAlive: KeepAliveService){}

    @ViewChild('weddingMusic')
    weddingMusic!: ElementRef<HTMLAudioElement>;

    private musicStarted = false;

}