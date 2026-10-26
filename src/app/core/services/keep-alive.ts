import { Injectable, OnDestroy } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KeepAliveService implements OnDestroy {

  private readonly pingUrl =
    'https://arcus-api-bohd.onrender.com/ping';

  private intervalId?: ReturnType<typeof setInterval>;

  start(): void {
    if (this.intervalId) {
      return;
    }

    // Ping every 1 minutes while the website is open.
    this.intervalId = setInterval(() => {
      if (document.visibilityState === 'visible') {
        fetch(this.pingUrl, {
          method: 'GET',
          cache: 'no-store'
        }).catch(error => {
          console.debug('Backend ping failed:', error);
        });
      }
    }, 60 * 1000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}