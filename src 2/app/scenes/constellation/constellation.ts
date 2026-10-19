import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-constellation',
  standalone: true,

  templateUrl:
    './constellation.html',

  styleUrl:
    './constellation.scss'
})
export class ConstellationComponent
  implements AfterViewInit {

  @ViewChild('canvas')
  canvas!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;

  private width = 0;
  private height = 0;

  private stars: {
    x: number;
    y: number;
    size: number;
    alpha: number;
  }[] = [];

  private animationFrame = 0;

  ngAfterViewInit(): void {

    gsap.registerPlugin(
      ScrollTrigger
    );

    this.setupCanvas();

    this.createStars();

    this.animateBackground();

    this.createTimeline();

    window.addEventListener(
      'resize',
      () => this.handleResize()
    );
  }


  /* --------------------------------
     CANVAS
  -------------------------------- */

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


  /* --------------------------------
     BACKGROUND STARS
  -------------------------------- */

  private createStars(): void {

    const count =
      window.innerWidth < 600
        ? 70
        : 140;

    this.stars = [];

    for (let i = 0; i < count; i++) {

      this.stars.push({

        x:
          Math.random() *
          this.width,

        y:
          Math.random() *
          this.height,

        size:
          Math.random() *
          1.1 +
          0.3,

        alpha:
          Math.random() *
          0.35 +
          0.1

      });
    }
  }


  private animateBackground = (): void => {

    this.ctx.clearRect(
      0,
      0,
      this.width,
      this.height
    );

    for (const star of this.stars) {

      this.ctx.beginPath();

      this.ctx.arc(
        star.x,
        star.y,
        star.size,
        0,
        Math.PI * 2
      );

      this.ctx.fillStyle =
        `rgba(
          245,
          241,
          232,
          ${star.alpha}
        )`;

      this.ctx.fill();
    }

    this.animationFrame =
      requestAnimationFrame(
        this.animateBackground
      );
  };


  /* --------------------------------
     GSAP STORY
  -------------------------------- */

  private createTimeline(): void {

    const root =
      this.canvas.nativeElement
        .closest('.constellation')!;

    const starOne =
      root.querySelector('.star-one');

    const starTwo =
      root.querySelector('.star-two');

    const lines =
      root.querySelectorAll('.line');

    const orbitOne =
      root.querySelector('.orbit-one');

    const orbitTwo =
      root.querySelector('.orbit-two');

    const storyOne =
      root.querySelector('.story-one');

    const storyTwo =
      root.querySelector('.story-two');

    const heart =
      root.querySelector('.heart');

    const timeline =
      gsap.timeline({

        scrollTrigger: {

          trigger: root,

          start: 'top top',

          end: 'bottom bottom',

          scrub: 1.2

        }

      });


    /* -----------------------------
       PHASE 01
       Two stars appear
    ----------------------------- */

    timeline
      .fromTo(
        [starOne, starTwo],
        {
          scale: 0,
          opacity: 0
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: 'power3.out'
        }
      );


    /* -----------------------------
       PHASE 02
       Stars move inward
    ----------------------------- */

    timeline
      .to(starOne, {

        x: '25vw',
        y: '10vh',

        duration: 2,

        ease: 'power2.inOut'

      })

      .to(starTwo, {

        x: '-25vw',
        y: '10vh',

        duration: 2,

        ease: 'power2.inOut'

      }, '<');


    /* -----------------------------
       PHASE 03
       Constellation appears
    ----------------------------- */

    timeline
      .fromTo(
        lines,
        {
          opacity: 0,
          strokeDasharray: 100,
          strokeDashoffset: 100
        },
        {
          opacity: 1,
          strokeDashoffset: 0,
          duration: 2,
          stagger: 0.25,
          ease: 'power2.out'
        }
      );


    /* -----------------------------
       PHASE 04
       Orbit
    ----------------------------- */

    timeline
      .to(orbitOne, {

        rotation: 180,

        duration: 3,

        ease: 'none'

      })

      .to(orbitTwo, {

        rotation: -180,

        duration: 3,

        ease: 'none'

      }, '<');


    /* -----------------------------
       PHASE 05
       Two stories
    ----------------------------- */

    timeline
      .to(storyOne, {

        opacity: 1,

        y: 0,

        duration: 1.5

      })

      .to(storyOne, {

        opacity: 0,

        y: -25,

        duration: 1

      }, '+=1');


    /* -----------------------------
       PHASE 06
       One destination
    ----------------------------- */

    timeline
      .to(storyTwo, {

        opacity: 1,

        y: 0,

        duration: 1.5

      });


    /* -----------------------------
       PHASE 07
       Heart reveal
    ----------------------------- */

    timeline
      .to(heart, {

        opacity: 1,

        scale: 1,

        duration: 1.5,

        ease: 'back.out(1.7)'

      })

      .to(heart, {

        scale: 1.15,

        duration: 1,

        ease: 'power2.inOut'

      })

      .to(heart, {

        scale: 0,

        opacity: 0,

        duration: 1

      });


    /* -----------------------------
       PHASE 08
       Exit
    ----------------------------- */

    timeline
      .to(
        [
          starOne,
          starTwo,
          lines,
          orbitOne,
          orbitTwo,
          storyTwo
        ],
        {
          opacity: 0,
          scale: 1.15,
          duration: 2
        }
      );
  }


  ngOnDestroy(): void {

    cancelAnimationFrame(
      this.animationFrame
    );
  }

}