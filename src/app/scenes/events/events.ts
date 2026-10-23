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
import { Timeline } from '../timeline/timeline';

interface RsvpResponse {
  success: boolean;
  message: string;
  emailSent: boolean;
}


@Component({
  selector: 'app-events',
  standalone: true,
  templateUrl: './events.html',
  styleUrl: './events.scss',
  imports: [Timeline]
})
export class Events implements AfterViewInit, OnDestroy {

  events = WEDDING_EVENTS;

  rsvpSubmitted = false;
  rsvpSubmitting = false;
  rsvpError = '';
  emailNotificationWarning = '';


  rsvpDetails = {
    name: '',
    phone: '',
    guests: '1',
    attendance: '',
    arrivalDate: '',
    arrivalTime: '',
    departureDate: '',
    departureTime: '',
    travelBack: '',
  };

  attendanceSelection = '';

  onAttendanceChange(value: string): void {
    this.attendanceSelection = value;
  }

  // Replace this with your deployed backend URL when deploying.
  private readonly rsvpApiUrl = 'https://arcus-api-bohd.onrender.com/api/rsvps';

  
async submitRsvp(event: SubmitEvent): Promise<void> {
  event.preventDefault();

  const form = event.currentTarget as HTMLFormElement;

  if (!form.reportValidity() || this.rsvpSubmitting) {
    return;
  }

  const data = new FormData(form);
  const attending = data.get('attendance') === 'YES';

  const name = String(data.get('name') ?? '').trim();
  const phone = String(data.get('phone') ?? '').trim();
  const guests = attending
    ? Number(data.get('guests') ?? 1)
    : 1;

  const arrivalDate = attending
    ? String(data.get('arrivalDate') ?? '')
    : '';

  const arrivalTime = attending
    ? String(data.get('arrivalTime') ?? '')
    : '';

  const departureDate = attending
    ? String(data.get('departureDate') ?? '')
    : '';

  const departureTime = attending
    ? String(data.get('departureTime') ?? '')
    : '';

  const travelBack = attending
    ? String(data.get('travelBack') ?? '')
    : '';

  const payload = {
    name,
    phone,
    guests,
    attendance: String(data.get('attendance') ?? '')
      .trim()
      .toUpperCase(),
    arrivalDate: arrivalDate || null,
    arrivalTime: arrivalTime ? `${arrivalTime}:00` : null,
    departureDate: departureDate || null,
    departureTime: departureTime ? `${departureTime}:00` : null,
    travelBack: travelBack || null
  };

  this.rsvpSubmitting = true;
  this.rsvpError = '';
  this.emailNotificationWarning = '';

  try {
    const response = await fetch(this.rsvpApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(
        result?.detail ||
        result?.message ||
        `RSVP submission failed (${response.status}).`
      );
    }

    const apiResult = result as RsvpResponse;

    this.rsvpDetails = {
      name,
      phone,
      guests: String(guests),
      attendance: payload.attendance,
      arrivalDate,
      arrivalTime,
      departureDate,
      departureTime,
      travelBack
    };

    if (apiResult.emailSent === false) {
      this.emailNotificationWarning =
        'Your RSVP was saved, but the email notification could not be sent.';
    }

    this.rsvpSubmitted = true;

  } catch (error) {
    console.error('RSVP submission failed:', error);

    this.rsvpError = error instanceof Error
      ? error.message
      : 'Unable to submit your RSVP. Please try again.';

  } finally {
    this.rsvpSubmitting = false;
  }
}


  editRsvp(): void {
    this.rsvpSubmitted = false;
    this.rsvpError = '';
    this.emailNotificationWarning = '';
  }

  private ctx?: gsap.Context;

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);

    this.ctx = gsap.context(() => {
      this.createTimeline();
    });
  }

  private createTimeline(): void {
    const root = document.querySelector(
      '.events-scene'
    ) as HTMLElement;

    if (!root) {
      return;
    }

    const intro = root.querySelector('.events-intro');

    const cards = gsap.utils.toArray<HTMLElement>(
      '.event-card',
      root
    );

    const ending = root.querySelector('.events-ending');
    const glow = root.querySelector('.ambient-glow');

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2
      }
    });

    timeline.fromTo(
      intro,
      {
        opacity: 0,
        y: 30,
        filter: 'blur(10px)'
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.5,
        ease: 'power3.out'
      }
    );

    cards.forEach((card, index) => {
      timeline.fromTo(
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
          ease: 'power3.out'
        },
        index === 0 ? '+=0.4' : '+=0.3'
      );

      timeline.to(
        glow,
        {
          opacity: 1.35,
          scale: 1.08,
          duration: 1.2,
          ease: 'power2.inOut'
        },
        '<0.3'
      );

      timeline.to({}, { duration: 2 });

      timeline.to(card, {
        opacity: index === cards.length - 1 ? 0 : 0.25,
        scale: 0.82,
        y: -70,
        rotateX: -5,
        filter: 'blur(3px)',
        duration: 1.4,
        ease: 'power2.inOut'
      });
    });

    timeline.to(
      intro,
      {
        opacity: 0,
        y: -30,
        duration: 0.8
      },
      '<'
    );

    timeline.fromTo(
      ending,
      {
        opacity: 0,
        y: 35,
        scale: 0.96,
        filter: 'blur(8px)'
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: 2,
        ease: 'power3.out'
      }
    );

    timeline.to({}, { duration: 2 });

    timeline.to(ending, {
      opacity: 0,
      scale: 1.06,
      duration: 1.5
    });
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
  }
}