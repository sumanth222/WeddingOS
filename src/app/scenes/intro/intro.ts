import {
  AfterViewInit,
  Component,
  ElementRef,
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
export class IntroComponent implements AfterViewInit {

  private element = inject(ElementRef);

  constructor(private audioService: AudioService) {}

  ngAfterViewInit(): void {

  gsap.registerPlugin(ScrollTrigger);

  const root = this.element.nativeElement;

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

}

startMusic(): void {
  this.audioService.play();
}
}