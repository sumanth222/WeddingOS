import {
  AfterViewInit,
  Component,
  OnDestroy
} from '@angular/core';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
  WEDDING_MEMORIES
} from '../../core/models/wedding-memories';

@Component({
  selector: 'app-memories',
  standalone: true,

  templateUrl:
    './memories.html',

  styleUrl:
    './memories.scss'
})
export class MemoriesComponent
  implements AfterViewInit, OnDestroy {

  memories =
    WEDDING_MEMORIES;

  private ctx?: gsap.Context;


  ngAfterViewInit(): void {

    gsap.registerPlugin(
      ScrollTrigger
    );

    this.ctx =
      gsap.context(() => {

        this.createAnimation();

      });

  }


  private createAnimation(): void {

    const root =
      document.querySelector(
        '.memories'
      ) as HTMLElement;

    if (!root) {
      return;
    }


    const heading =
      root.querySelector(
        '.memory-heading'
      );

    const cards =
      gsap.utils.toArray<HTMLElement>(
        '.memory-card'
      );

    const ending =
      root.querySelector(
        '.memory-ending'
      );


    /*
     * =================================
     * MASTER TIMELINE
     * =================================
     */

    const timeline =
      gsap.timeline({

        scrollTrigger: {

          trigger: root,

          start: 'top top',

          end: 'bottom bottom',

          scrub: 1.2

        }

      });


    /*
     * =================================
     * INTRO
     * =================================
     */

    timeline
      .fromTo(
        heading,

        {
          opacity: 0,
          y: 25,
          filter: 'blur(8px)'
        },

        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',

          duration: 1.5,

          ease: 'power3.out'
        }
      );


    /*
     * =================================
     * PHOTOS
     * =================================
     */

    cards.forEach(
      (card, index) => {

        const image =
          card.querySelector(
            'img'
          );

        /*
         * First card starts normally.
         * Every subsequent card begins
         * slightly above and rotated.
         */

        timeline
          .fromTo(

            card,

            {
              opacity: 0,

              y: 80,

              scale: 0.82,

              rotateZ:
                index % 2 === 0
                  ? -4
                  : 4,

              rotateY:
                index % 2 === 0
                  ? -8
                  : 8
            },

            {
              opacity: 1,

              y: 0,

              scale: 1,

              rotateZ: 0,

              rotateY: 0,

              duration: 1.5,

              ease:
                'power3.out'

            },

            index === 0
              ? '+=0.5'
              : '+=0.2'
          );


        /*
         * Slow cinematic
         * image movement.
         */

        timeline.to(

          image,

          {
            scale: 1.02,

            duration: 1.8,

            ease: 'none'

          }

        );


        /*
         * Move the current
         * memory backward.
         */

        if (
          index <
          cards.length - 1
        ) {

          timeline.to(

            card,

            {
              scale: 0.88,

              y: -35,

              opacity: 0.45,

              rotateZ:
                index % 2 === 0
                  ? -2
                  : 2,

              duration: 1.1,

              ease:
                'power2.inOut'

            }

          );

        }

      }
    );


    /*
     * =================================
     * FINAL STATEMENT
     * =================================
     */

    timeline
      .to(
        cards,
        {
          opacity: 0,

          scale: 0.92,

          y: -30,

          duration: 1.5,

          stagger: 0.05

        }
      );


    timeline
      .to(
        heading,
        {
          opacity: 0,

          y: -30,

          duration: 0.8

        },
        '<'
      );


    timeline
      .fromTo(

        ending,

        {
          opacity: 0,

          y: 30,

          filter:
            'blur(8px)'

        },

        {
          opacity: 1,

          y: 0,

          filter:
            'blur(0px)',

          duration: 2,

          ease:
            'power3.out'

        }

      );


    /*
     * Hold the ending.
     */

    timeline.to(
      {},
      {
        duration: 1.5
      }
    );


    /*
     * Fade out for
     * WeddingOS transition.
     */

    timeline.to(

      ending,

      {
        opacity: 0,

        scale: 1.08,

        duration: 1.5

      }

    );

  }


  ngOnDestroy(): void {

    this.ctx?.revert();

  }

}