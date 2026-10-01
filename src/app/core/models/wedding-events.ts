export interface WeddingEvent {
  id: string;

  number: string;

  type: string;

  title: string;

  date: string;

  time: string;

  venue: string;

  description: string;

  icon: string;
}

export const WEDDING_EVENTS: WeddingEvent[] = [

  {
    id: 'event-01',

    number: '01',

    type: 'CEREMONY',

    title: 'HALDI',

    date: '12 OCTOBER 2026',

    time: '10:00 AM',

    venue: 'Venue Name',

    description:
      'A celebration of color, laughter and new beginnings.',

    icon: '✦'
  },

  {
    id: 'event-02',

    number: '02',

    type: 'CELEBRATION',

    title: 'SANGEET',

    date: '13 OCTOBER 2026',

    time: '7:00 PM',

    venue: 'Venue Name',

    description:
      'Music, dance and a room full of people who love them.',

    icon: '♫'
  },

  {
    id: 'event-03',

    number: '03',

    type: 'THE WEDDING',

    title: 'MUHURTHAM',

    date: '14 OCTOBER 2026',

    time: '9:30 AM',

    venue: 'Venue Name',

    description:
      'The moment two stories become one.',

    icon: '♡'
  },

  {
    id: 'event-04',

    number: '04',

    type: 'CELEBRATION',

    title: 'RECEPTION',

    date: '14 OCTOBER 2026',

    time: '7:00 PM',

    venue: 'Venue Name',

    description:
      'One final celebration before the next chapter begins.',

    icon: '✧'
  }

];