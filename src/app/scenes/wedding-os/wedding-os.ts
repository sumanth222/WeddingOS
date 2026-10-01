import {
  AfterViewInit,
  Component,
  OnDestroy
} from '@angular/core';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-wedding-os',
  standalone: true,

  templateUrl:
    './wedding-os.html',

  styleUrl:
    './wedding-os.scss'
})
export class WeddingOs
  implements AfterViewInit, OnDestroy {

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
        '.wedding-os'
      ) as HTMLElement;

    if (!root) {
      return;
    }


    const boot =
      root.querySelector(
        '.boot-screen'
      );

    const lines =
      gsap.utils.toArray<HTMLElement>(
        '.terminal-line'
      );

    const progress =
      root.querySelector(
        '.progress'
      );

    const progressBar =
      root.querySelector(
        '.progress-bar'
      );

    const progressPercent =
      root.querySelector(
        '.progress-percent'
      );

    const ready =
      root.querySelector(
        '.system-ready'
      );

    const interfaceEl =
      root.querySelector(
        '.os-interface'
      );

    const welcome =
      root.querySelector(
        '.welcome'
      );

    const couple =
      root.querySelector(
        '.couple-module'
      );

    const modules =
      root.querySelector(
        '.modules'
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
     * BOOT HEADER
     * =================================
     */

    timeline
      .fromTo(
        boot,
        {
          opacity: 0
        },
        {
          opacity: 1,
          duration: 0.5
        }
      );


    /*
     * =================================
     * TERMINAL LINES
     * =================================
     */

    lines.forEach(
      (line, index) => {

        timeline
          .to(
            line,
            {
              opacity: 1,
              duration: 0.7
            }
          );

        if (index < lines.length - 1) {

          timeline.to(
            {},
            {
              duration: 0.25
            }
          );

        }

      }
    );


    /*
     * =================================
     * PROGRESS BAR
     * =================================
     */

    timeline
      .to(
        progress,
        {
          opacity: 1,
          duration: 0.5
        }
      );


    timeline
      .to(
        progressBar,
        {
          width: '100%',
          duration: 2,
          ease: 'power2.inOut',

          onUpdate: () => {

            const current =
              Math.round(
                gsap.getProperty(
                  progressBar,
                  'width',
                  '%'
                ) as number
              );

            progressPercent!
              .textContent =
              `${current}%`;

          }
        }
      );


    /*
     * =================================
     * SYSTEM READY
     * =================================
     */

    timeline
      .to(
        ready,
        {
          opacity: 1,
          scale: 1.05,
          duration: 1,

          ease:
            'power2.out'
        }
      );


    timeline
      .to(
        ready,
        {
          scale: 1,
          duration: 0.8
        }
      );


    /*
     * =================================
     * BOOT SCREEN EXITS
     * =================================
     */

    timeline
      .to(
        boot,
        {
          opacity: 0,
          scale: 1.04,
          duration: 1.5,

          ease:
            'power2.inOut'
        }
      );


    /*
     * =================================
     * INTERFACE APPEARS
     * =================================
     */

    timeline
      .to(
        interfaceEl,
        {
          opacity: 1,
          duration: 1.2
        },
        '<0.5'
      );


    /*
     * =================================
     * WELCOME
     * =================================
     */

    timeline
      .fromTo(
        welcome,
        {
          opacity: 0,
          y: 30,
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
     * COUPLE
     * =================================
     */

    timeline
      .fromTo(
        couple,
        {
          opacity: 0,
          y: 25
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out'
        }
      );


    /*
     * =================================
     * MODULES
     * =================================
     */

    timeline
      .fromTo(
        modules,
        {
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: 'power3.out'
        }
      );


    /*
     * =================================
     * DASHBOARD HOLD
     * =================================
     */

    timeline.to(
      {},
      {
        duration: 4
      }
    );


    /*
     * =================================
     * SUBTLE EXIT
     * =================================
     */

    timeline
      .to(
        interfaceEl,
        {
          opacity: 0.3,
          scale: 0.98,
          duration: 2
        }
      );

  }

  scrollToScene(id: string): void {

      console.log('Clicked:', id);

      
    const element = document.getElementById(id);

    if (!element) {
      console.error(`Scene not found: #${id}`);
      return;
    }

    const top =
      element.getBoundingClientRect().top +
      window.scrollY;

    window.scrollTo({
      top,
      behavior: 'smooth'
    });
  }


  ngOnDestroy(): void {

    this.ctx?.revert();

  }

}