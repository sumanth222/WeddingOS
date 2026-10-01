import { Component, inject } from '@angular/core';

import { IntroComponent } from './scenes/intro/intro';

import { ConstellationComponent } from './scenes/constellation/constellation';

import { TheTwoComponent } from './scenes/the-two/the-two';

import { MemoriesComponent } from './scenes/memories/memories';

import { ScrollService } from './core/scroll';

import { WeddingOs } from './scenes/wedding-os/wedding-os';

import { Events } from './scenes/events/events';

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [
    IntroComponent,
    ConstellationComponent,
    TheTwoComponent,
    MemoriesComponent,
    WeddingOs,
    Events
  ],

  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {

  private scrollService =
    inject(ScrollService);

}