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

  @ViewChild('canvas')
  canvas!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;

  private particles: Particle[] = [];

  private animationFrame = 0;

  private width = 0;
  private height = 0;

  ngAfterViewInit(): void {

    this.setup();

    this.createParticles();

    this.animate();

    window.addEventListener(
      'resize',
      this.handleResize
    );
  }

  private setup(): void {

    const canvas = this.canvas.nativeElement;

    this.ctx =
      canvas.getContext('2d')!;

    this.resizeCanvas();
  }

  private resizeCanvas = (): void => {

    const canvas = this.canvas.nativeElement;

    const dpr =
      Math.min(window.devicePixelRatio || 1, 2);

    this.width = window.innerWidth;
    this.height = window.innerHeight;

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
  };

  private createParticles(): void {

    const count =
      Math.min(
        180,
        Math.floor(
          (this.width * this.height) / 9000
        )
      );

    this.particles = [];

    for (let i = 0; i < count; i++) {

      this.particles.push({

        x: Math.random() * this.width,

        y: Math.random() * this.height,

        vx: (Math.random() - 0.5) * 0.08,

        vy: (Math.random() - 0.5) * 0.08,

        size:
          Math.random() * 1.4 + 0.3,

        alpha:
          Math.random() * 0.5 + 0.15,

        twinkle:
          Math.random() * Math.PI * 2

      });

    }
  }

  private animate = (): void => {

    this.ctx.clearRect(
      0,
      0,
      this.width,
      this.height
    );

    for (const particle of this.particles) {

      particle.x += particle.vx;
      particle.y += particle.vy;

      particle.twinkle += 0.01;

      if (particle.x < 0)
        particle.x = this.width;

      if (particle.x > this.width)
        particle.x = 0;

      if (particle.y < 0)
        particle.y = this.height;

      if (particle.y > this.height)
        particle.y = 0;

      const alpha =
        particle.alpha +
        Math.sin(particle.twinkle) * 0.08;

      this.ctx.beginPath();

      this.ctx.arc(
        particle.x,
        particle.y,
        particle.size,
        0,
        Math.PI * 2
      );

      this.ctx.fillStyle =
        `rgba(245, 241, 232, ${alpha})`;

      this.ctx.fill();
    }

    this.animationFrame =
      requestAnimationFrame(this.animate);
  };

  ngOnDestroy(): void {

    cancelAnimationFrame(
      this.animationFrame
    );

    window.removeEventListener(
      'resize',
      this.handleResize
    );
  }

  private handleResize = (): void => {

    this.resizeCanvas();

    this.createParticles();

  };

}