import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild
} from '@angular/core';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-the-two',
  standalone: true,

  templateUrl:
    './the-two.html',

  styleUrl:
    './the-two.scss'
})
export class TheTwoComponent
  implements AfterViewInit, OnDestroy {

  @ViewChild('canvas', { static: true })
  canvas!: ElementRef<HTMLCanvasElement>;

  @ViewChild('heroPhoto', { static: true })
  heroPhoto!: ElementRef<HTMLImageElement>;

  private ctx!: CanvasRenderingContext2D;

  private animationFrame = 0;

  private width = 0;

  private height = 0;

  private particles: Particle[] = [];

  private resizeHandler!: () => void;


  ngAfterViewInit(): void {

    gsap.registerPlugin(
      ScrollTrigger
    );

    this.setupCanvas();

    this.createParticles();

    this.animateParticles();

    this.createTimeline();

    this.resizeHandler =
      () => this.handleResize();

    window.addEventListener(
      'resize',
      this.resizeHandler
    );
  }


  // =================================
  // CANVAS
  // =================================

  private setupCanvas(): void {

    const canvas =
      this.canvas.nativeElement;

    const context =
      canvas.getContext('2d');

    if (!context) {
      throw new Error(
        'Unable to create canvas context.'
      );
    }

    this.ctx = context;

    this.handleResize();
  }


  private handleResize(): void {

    const canvas =
      this.canvas.nativeElement;

    const dpr =
      Math.min(
        window.devicePixelRatio || 1,
        2
      );

    this.width =
      window.innerWidth;

    this.height =
      window.innerHeight;

    canvas.width =
      this.width * dpr;

    canvas.height =
      this.height * dpr;

    canvas.style.width =
      `${this.width}px`;

    canvas.style.height =
      `${this.height}px`;

    this.ctx.setTransform(
      dpr,
      0,
      0,
      dpr,
      0,
      0
    );
  }


  // =================================
  // PARTICLES
  // =================================

  private createParticles(): void {

    const count =
      window.innerWidth < 600
        ? 90
        : 160;

    this.particles = [];

    for (
      let i = 0;
      i < count;
      i++
    ) {

      this.particles.push({

        x:
          Math.random() *
          this.width,

        y:
          Math.random() *
          this.height,

        size:
          Math.random() *
          1.2 +
          0.2,

        alpha:
          Math.random() *
          0.35 +
          0.05,

        vx:
          (Math.random() - 0.5) *
          0.05,

        vy:
          (Math.random() - 0.5) *
          0.05
      });
    }
  }


  private animateParticles = (): void => {

    this.ctx.clearRect(
      0,
      0,
      this.width,
      this.height
    );

    for (
      const particle of this.particles
    ) {

      particle.x +=
        particle.vx;

      particle.y +=
        particle.vy;


      if (
        particle.x < 0
      ) {
        particle.x =
          this.width;
      }

      if (
        particle.x > this.width
      ) {
        particle.x = 0;
      }

      if (
        particle.y < 0
      ) {
        particle.y =
          this.height;
      }

      if (
        particle.y > this.height
      ) {
        particle.y = 0;
      }


      this.ctx.beginPath();

      this.ctx.arc(
        particle.x,
        particle.y,
        particle.size,
        0,
        Math.PI * 2
      );

      this.ctx.fillStyle =
        `rgba(
          201,
          169,
          110,
          ${particle.alpha}
        )`;

      this.ctx.fill();
    }

    this.animationFrame =
      requestAnimationFrame(
        this.animateParticles
      );
  };


  // =================================
  // MAIN TIMELINE
  // =================================

  private createTimeline(): void {

    const root =
      this.canvas.nativeElement
        .closest('.the-two')!;


    const photo =
      root.querySelector(
        '.photo-reveal'
      );

    const image =
      this.heroPhoto.nativeElement;

    const glow =
      root.querySelector(
        '.ambient-glow'
      );

    const shimmer =
      root.querySelector(
        '.photo-shimmer'
      );

    const groom =
      root.querySelector(
        '.groom'
      );

    const bride =
      root.querySelector(
        '.bride'
      );

    const ampersand =
      root.querySelector(
        '.ampersand'
      );

    const story =
      root.querySelector(
        '.story-line'
      );


    const timeline =
      gsap.timeline({

        scrollTrigger: {

          trigger: root,

          start: 'top top',

          end: 'bottom bottom',

          scrub: 1.2

        }

      });


    // =================================
    // PHASE 01
    // THE PHOTO IS BORN
    // =================================

    timeline
      .fromTo(
        photo,

        {
          clipPath:
            'inset(50% 50% 50% 50%)',

          scale: 0.88,

          rotateX: 8,

          opacity: 0
        },

        {
          clipPath:
            'inset(0% 0% 0% 0%)',

          scale: 1,

          rotateX: 0,

          opacity: 1,

          duration: 2,

          ease: 'power3.out'
        }
      );


    // =================================
    // PHASE 02
    // WARM LIGHT
    // =================================

    timeline
      .to(glow, {

        opacity: 1,

        duration: 1.5

      }, '<0.4');


    // =================================
    // PHASE 03
    // CINEMATIC PHOTO ZOOM
    // =================================

    timeline
      .to(image, {

        scale: 1,

        duration: 2,

        ease: 'none'

      });


    // =================================
    // PHASE 04
    // GROOM NAME
    // =================================

    timeline
      .fromTo(
        groom,

        {
          opacity: 0,

          y: -35,

          filter:
            'blur(8px)'
        },

        {
          opacity: 1,

          y: 0,

          filter:
            'blur(0px)',

          duration: 1.4,

          ease: 'power3.out'
        }
      );


    // =================================
    // PHASE 05
    // AMPERSAND
    // =================================

    timeline
      .to(ampersand, {

        opacity: 1,

        scale: 1,

        duration: 0.8,

        ease: 'back.out(1.7)'

      });


    // =================================
    // PHASE 06
    // BRIDE NAME
    // =================================

    timeline
      .fromTo(
        bride,

        {
          opacity: 0,

          y: 35,

          filter:
            'blur(8px)'
        },

        {
          opacity: 1,

          y: 0,

          filter:
            'blur(0px)',

          duration: 1.4,

          ease: 'power3.out'
        }
      );


    // =================================
    // PHASE 07
    // GOLDEN SHIMMER
    // =================================

    timeline
      .to(shimmer, {

        opacity: 1,

        left: '130%',

        duration: 2.5,

        ease: 'power2.inOut'

      });


    // =================================
    // PHASE 08
    // STORY
    // =================================

    timeline
      .to(story, {

        opacity: 1,

        y: -5,

        duration: 1.5

      });


    // =================================
    // PHASE 09
    // HOLD
    // =================================

    timeline
      .to({}, {

        duration: 1.5

      });


    // =================================
    // PHASE 10
    // DISSOLVE
    // =================================

    timeline
      .to(
        [
          groom,
          bride,
          ampersand,
          story
        ],
        {

          opacity: 0,

          y: -20,

          duration: 1.2

        }
      );


    // =================================
    // PHASE 11
    // PHOTO FADES
    // =================================

    timeline
      .to(photo, {

        scale: 1.08,

        opacity: 0,

        filter:
          'blur(10px)',

        duration: 2,

        ease: 'power2.in'

      });


    // =================================
    // PHASE 12
    // LIGHT COLLAPSE
    // =================================

    timeline
      .to(glow, {

        opacity: 0,

        scale: 0.5,

        duration: 1.5

      }, '<');

  }


  ngOnDestroy(): void {

    cancelAnimationFrame(
      this.animationFrame
    );

    if (this.resizeHandler) {

      window.removeEventListener(
        'resize',
        this.resizeHandler
      );
    }

    ScrollTrigger
      .getAll()
      .forEach(trigger => {
        trigger.kill();
      });
  }

}


interface Particle {

  x: number;

  y: number;

  size: number;

  alpha: number;

  vx: number;

  vy: number;
}