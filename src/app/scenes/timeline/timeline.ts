import { Component } from '@angular/core';

@Component({
  selector: 'app-timeline',
  standalone: true,
  templateUrl: './timeline.html',
  styleUrl: './timeline.scss'
})
export class Timeline {
  readonly events = [
    {
      id: 'haldi',
      number: '01',
      name: 'Haldi',
      subtitle: 'A golden beginning',
      description:
        'A little sunshine, a lot of laughter, and blessings for the beautiful journey ahead.',
      time: '',
      icon: '✿',
      image: false
    },
    {
      id: 'after-party',
      number: '02',
      name: 'After Party',
      subtitle: 'An evening to remember',
      description:
        'Good music, happy hearts, and our favourite people coming together for a night of celebration.',
      time: 'Evening',
      icon: '✧',
      image: false
    },
    {
      id: 'wedding',
      number: '03',
      name: 'The Wedding',
      subtitle: 'The beginning of forever',
      description:
        'A beautiful promise, surrounded by the love and blessings of everyone who matters most.',
      time: 'MUHURTHAM: 11:30 AM',
      icon: '♡',
      image: true
    }
  ];

  readonly venue = {
    name: 'Aloha resort & convention',
    address: 'Venue address will be added here'
  };
}