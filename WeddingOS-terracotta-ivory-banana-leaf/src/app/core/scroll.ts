import { Injectable, NgZone } from '@angular/core';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  private lenis!: Lenis;

  constructor(
    private zone: NgZone
  ) {
    this.init();
  }

  private init(): void {

    if (typeof window === 'undefined') {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    this.zone.runOutsideAngular(() => {

      this.lenis = new Lenis({
        autoRaf: false,
        lerp: 0.08,
        smoothWheel: true
      });

      this.lenis.on('scroll', ScrollTrigger.update);

      gsap.ticker.add((time) => {
        this.lenis.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);

    });
  }
}