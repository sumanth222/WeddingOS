import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  inject
} from '@angular/core';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ParticleFieldComponent } from '../../particle-field/particle-field';
import { AudioService } from '../../core/services/audio';


@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [
    ParticleFieldComponent
  ],
  templateUrl: './intro.html',
  styleUrl: './intro.scss'
})
export class IntroComponent implements AfterViewInit, OnDestroy {

  private element = inject(ElementRef);

  constructor(private audioService: AudioService) {}

  private introContext?: gsap.Context;

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);

    const root = this.element.nativeElement;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.introContext = gsap.context(() => {

  const textOne = root.querySelector('.text-one');
  const textTwo = root.querySelector('.text-two');
  const textThree = root.querySelector('.text-three');
  const textFour = root.querySelector('.text-four');

  const core = root.querySelector('.core-light');
  const scrollHint = root.querySelector('.scroll-hint');
  const scrollProgress = root.querySelector('.scroll-progress');

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: root,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.2
    }
  });

  /*
   * --------------------------------
   * CHAPTER 01
   * --------------------------------
   */

  timeline
    .fromTo(textOne,
      {
        opacity: 0,
        y: 40
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'power3.out'
      }
    )

    .to(textOne, {
      opacity: 0,
      y: -40,
      duration: 1.2,
      ease: 'power2.in'
    }, '+=0.8');


  /*
   * --------------------------------
   * CHAPTER 02
   * --------------------------------
   */

  timeline
    .fromTo(textTwo,
      {
        opacity: 0,
        y: 40
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'power3.out'
      }
    )

    .to(textTwo, {
      opacity: 0,
      y: -40,
      duration: 1.2,
      ease: 'power2.in'
    }, '+=0.8');


  /*
   * --------------------------------
   * CHAPTER 03
   * --------------------------------
   */

  timeline
    .fromTo(textThree,
      {
        opacity: 0,
        scale: 0.96
      },
      {
        opacity: 1,
        scale: 1,
        duration: 1.8,
        ease: 'power2.out'
      }
    )

    .to(textThree, {
      opacity: 0,
      scale: 1.04,
      duration: 1.4,
      ease: 'power2.in'
    }, '+=1');


  /*
   * --------------------------------
   * CHAPTER 04
   * --------------------------------
   */

  timeline
    .fromTo(textFour,
      {
        opacity: 0,
        scale: 0.96
      },
      {
        opacity: 1,
        scale: 1,
        duration: 2,
        ease: 'power2.out'
      }
    )

    .to(textFour, {
      opacity: 0,
      scale: 1.08,
      duration: 1.5,
      ease: 'power2.in'
    }, '+=1');


  /*
   * --------------------------------
   * THE LIGHT
   * --------------------------------
   */

  timeline
    .fromTo(core,
      {
        opacity: 0,
        scale: 0.5
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5
      }
    )

    .to(core, {
      scale: 40,
      opacity: 0,
      duration: 2,
      ease: 'power4.in'
    });


  /*
   * --------------------------------
   * SCROLL INDICATOR
   * --------------------------------
   */

  gsap.to(scrollProgress, {
    scaleY: 1,

    scrollTrigger: {
      trigger: root,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true
    }
  });

  gsap.to(scrollHint, {
    opacity: 0,

    scrollTrigger: {
      trigger: root,
      start: 'top top',
      end: '15% top',
      scrub: true
    }
  });

  // Decorative motion stays gentle and independent from the scroll story.
  if (!reducedMotion) {
    gsap.to(root.querySelectorAll('.botanical-orbit span'), {
      y: (index: number) => index === 1 ? -13 : 10,
      rotation: (index: number) => index === 1 ? 5 : -4,
      duration: (index: number) => 3.8 + index * 0.7,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      stagger: 0.25
    });

    gsap.to(root.querySelectorAll('.floating-petals span'), {
      y: (index: number) => index % 2 === 0 ? -24 : 18,
      x: (index: number) => index % 2 === 0 ? 12 : -10,
      rotation: (index: number) => index % 2 === 0 ? 18 : -14,
      opacity: (index: number) => index % 2 === 0 ? 0.72 : 0.28,
      duration: (index: number) => 4 + index * 0.45,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      stagger: 0.18
    });

    gsap.to(scrollHint, {
      y: 7,
      duration: 1.25,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true
    });

  }
  }, root);
  }

  ngOnDestroy(): void {
    this.introContext?.revert();
  }

startMusic(): void {
  this.audioService.play();
}
}