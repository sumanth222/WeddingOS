import {
  AfterViewInit,
  Component,
  OnDestroy
} from '@angular/core';

import gsap from 'gsap';

import {
  ScrollTrigger
} from 'gsap/ScrollTrigger';

import {
  WEDDING_EVENTS
} from '../../core/models/wedding-events';

@Component({
  selector: 'app-events',
  standalone: true,

  templateUrl:
    './events.html',

  styleUrl:
    './events.scss'
})
export class Events
  implements AfterViewInit, OnDestroy {

  events =
    WEDDING_EVENTS;

  private ctx?: gsap.Context;


  ngAfterViewInit(): void {

    gsap.registerPlugin(
      ScrollTrigger
    );

    this.ctx =
      gsap.context(() => {

        this.createTimeline();

      });

  }


  private createTimeline(): void {

    const root =
      document.querySelector(
        '.events'
      ) as HTMLElement;

    if (!root) {
      return;
    }


    const intro =
      root.querySelector(
        '.events-intro'
      );

    const cards =
      gsap.utils.toArray<HTMLElement>(
        '.event-card'
      );

    const ending =
      root.querySelector(
        '.events-ending'
      );

    const glow =
      root.querySelector(
        '.ambient-glow'
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
        intro,

        {
          opacity: 0,

          y: 30,

          filter:
            'blur(10px)'
        },

        {
          opacity: 1,

          y: 0,

          filter:
            'blur(0px)',

          duration: 1.5,

          ease:
            'power3.out'
        }
      );


    /*
     * =================================
     * EVENTS
     * =================================
     */

    cards.forEach(
      (card, index) => {

        /*
         * Bring event into focus.
         */

        timeline
          .fromTo(

            card,

            {
              opacity: 0,

              y: 100,

              scale: 0.82,

              rotateX: 10
            },

            {
              opacity: 1,

              y: 0,

              scale: 1,

              rotateX: 0,

              duration: 1.8,

              ease:
                'power3.out'

            },

            index === 0
              ? '+=0.4'
              : '+=0.3'
          );


        /*
         * Slight glow increase
         * while event is active.
         */

        timeline
          .to(

            glow,

            {
              opacity: 1.35,

              scale: 1.08,

              duration: 1.2,

              ease:
                'power2.inOut'

            },

            '<0.3'
          );


        /*
         * Hold event.
         */

        timeline
          .to(
            {},
            {
              duration: 2
            }
          );


        /*
         * Push current event
         * into the background.
         */

        timeline
          .to(

            card,

            {
              opacity:
                index ===
                cards.length - 1
                  ? 0
                  : 0.25,

              scale: 0.82,

              y: -70,

              rotateX: -5,

              filter:
                'blur(3px)',

              duration: 1.4,

              ease:
                'power2.inOut'

            }
          );

      }
    );


    /*
     * =================================
     * EVENTS END
     * =================================
     */

    timeline
      .to(

        intro,

        {
          opacity: 0,

          y: -30,

          duration: 0.8

        },

        '<'
      );


    /*
     * =================================
     * FINAL MESSAGE
     * =================================
     */

    timeline
      .fromTo(

        ending,

        {
          opacity: 0,

          y: 35,

          scale: 0.96,

          filter:
            'blur(8px)'
        },

        {
          opacity: 1,

          y: 0,

          scale: 1,

          filter:
            'blur(0px)',

          duration: 2,

          ease:
            'power3.out'

        }

      );


    /*
     * Hold.
     */

    timeline.to(
      {},
      {
        duration: 2
      }
    );


    /*
     * Fade out.
     */

    timeline
      .to(

        ending,

        {
          opacity: 0,

          scale: 1.06,

          duration: 1.5

        }

      );

  }


  ngOnDestroy(): void {

    this.ctx?.revert();

  }

}