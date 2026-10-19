import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild
} from '@angular/core';

interface Particle {
  x: number;
  y: number;

  vx: number;
  vy: number;

  size: number;
  alpha: number;

  twinkle: number;
}

@Component({
  selector: 'app-particle-field',
  standalone: true,
  templateUrl: './particle-field.html',
  styleUrl: './particle-field.scss'
})
export class ParticleFieldComponent
  implements AfterViewInit, OnDestroy {

  @ViewChild('canvas', { static: true })
  canvas!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;

  private particles: Particle[] = [];

  private animationFrame = 0;

  private width = 0;
  private height = 0;

  /*
   * 0 = particles drift normally
   * 1 = particles strongly move toward the center
   *
   * We'll control this from our cinematic
   * scene later.
   */
  private attraction = 0;

  ngAfterViewInit(): void {

    this.setupCanvas();

    this.createParticles();

    this.animate();

    window.addEventListener(
      'resize',
      this.handleResize
    );
  }

  /**
   * Initialize the canvas.
   */
  private setupCanvas(): void {

    const canvas = this.canvas.nativeElement;

    const context = canvas.getContext('2d');

    if (!context) {
      throw new Error(
        'Could not create 2D canvas context.'
      );
    }

    this.ctx = context;

    this.resizeCanvas();
  }

  /**
   * Resize canvas while accounting for
   * high-DPI / Retina displays.
   */
  private resizeCanvas = (): void => {

    const canvas = this.canvas.nativeElement;

    const dpr = Math.min(
      window.devicePixelRatio || 1,
      2
    );

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    canvas.width = this.width * dpr;
    canvas.height = this.height * dpr;

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
  };

  /**
   * Create the initial star field.
   */
  private createParticles(): void {

    /*
     * Keep the number relatively low.
     *
     * We're going to add much more interesting
     * behavior later, so we don't need thousands
     * of particles.
     */
    const count = Math.min(
      220,
      Math.floor(
        (this.width * this.height) / 7500
      )
    );

    this.particles = [];

    for (let i = 0; i < count; i++) {

      this.particles.push({

        x:
          Math.random() *
          this.width,

        y:
          Math.random() *
          this.height,

        vx:
          (Math.random() - 0.5) *
          0.08,

        vy:
          (Math.random() - 0.5) *
          0.08,

        size:
          Math.random() *
          1.4 +
          0.3,

        alpha:
          Math.random() *
          0.45 +
          0.15,

        twinkle:
          Math.random() *
          Math.PI *
          2

      });
    }
  }

  /**
   * Control how strongly particles
   * are attracted toward the center.
   *
   * 0 = normal floating
   * 1 = strong attraction
   */
  public setAttraction(
    value: number
  ): void {

    this.attraction =
      Math.max(
        0,
        Math.min(1, value)
      );
  }

  /**
   * Main animation loop.
   */
  private animate = (): void => {

    this.ctx.clearRect(
      0,
      0,
      this.width,
      this.height
    );

    const centerX =
      this.width / 2;

    const centerY =
      this.height / 2;

    for (const particle of this.particles) {

      /*
       * Normal drifting movement.
       */
      particle.x += particle.vx;
      particle.y += particle.vy;

      /*
       * Attraction toward the center.
       *
       * This becomes useful when we want
       * the entire universe to collapse
       * into one point during a transition.
       */
      if (this.attraction > 0) {

        const dx =
          centerX - particle.x;

        const dy =
          centerY - particle.y;

        particle.x +=
          dx *
          this.attraction *
          0.002;

        particle.y +=
          dy *
          this.attraction *
          0.002;
      }

      /*
       * Wrap particles around the screen
       * so they never disappear permanently.
       */
      if (particle.x < 0) {
        particle.x = this.width;
      }

      if (particle.x > this.width) {
        particle.x = 0;
      }

      if (particle.y < 0) {
        particle.y = this.height;
      }

      if (particle.y > this.height) {
        particle.y = 0;
      }

      /*
       * Subtle star twinkle.
       */
      particle.twinkle += 0.01;

      const alpha =
        particle.alpha +
        Math.sin(
          particle.twinkle
        ) * 0.08;

      /*
       * Draw particle.
       */
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
          245,
          241,
          232,
          ${Math.max(0, alpha)}
        )`;

      this.ctx.fill();
    }

    this.animationFrame =
      requestAnimationFrame(
        this.animate
      );
  };

  /**
   * Handle browser resizing.
   */
  private handleResize = (): void => {

    this.resizeCanvas();

    this.createParticles();
  };

  /**
   * Clean everything up when the
   * component is destroyed.
   */
  ngOnDestroy(): void {

    cancelAnimationFrame(
      this.animationFrame
    );

    window.removeEventListener(
      'resize',
      this.handleResize
    );
  }

}