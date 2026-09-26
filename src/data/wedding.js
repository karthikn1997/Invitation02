// Single source of truth for invitation content.
//
// ⚠ PLACEHOLDER marks details that still need the family's real information.
// Photos: set `src` to a path under /public (e.g. '/images/venue.jpg').
// While `src` is null, an elegant "photo coming soon" frame is shown instead.

export const wedding = {
  bride: 'Meenakshi',
  groom: 'Arjun',
  monogram: { bride: 'M', groom: 'A' },
  invitationTa: 'திருமண அழைப்பிதழ்', // "Wedding invitation"
  date: {
    iso: '2026-12-17',
    display: 'Thursday · 17 December 2026',
  },
  // Start of the muhurtham in India Standard Time; drives the countdown.
  muhurthamStart: '2026-12-17T09:30:00+05:30',
  hashtag: '#MeenakshiWedsArjun',
  cta: { label: 'Our Celebration', href: '#celebration' },
  music: {
    // Drop a track at public/audio/wedding-theme.mp3 (e.g. a soft nadaswaram piece).
    src: '/audio/wedding-theme.mp3',
  },
};

// Menu entries; each href matches a section id.
export const navItems = [
  { label: 'Our Celebration', href: '#celebration' },
  { label: 'Our Story', href: '#story' },
  { label: 'Ceremonies', href: '#events' },
  { label: 'Our Families', href: '#family' },
  { label: 'Venue', href: '#venue' },
  { label: 'RSVP', href: '#rsvp' },
];

// ⚠ PLACEHOLDER venue (taken from the design mockup) — confirm before sharing.
export const venue = {
  name: 'Sri Varadaraja Perumal Kalyana Mandapam',
  city: 'Kanchipuram, Tamil Nadu',
  address: ['Sannidhi Street, Little Kanchipuram', 'Kanchipuram, Tamil Nadu 631501'],
  phone: '+91 90000 00000', // ⚠ PLACEHOLDER
  mapQuery: 'Varadaraja Perumal Temple, Kanchipuram',
  notes: [
    { icon: 'car', text: 'Parking available within the mandapam premises' },
    { icon: 'leaf', text: 'Traditional vegetarian banana-leaf lunch after the muhurtham' },
  ],
  photo: { src: "/images/mahal.webp", alt: 'The wedding venue' },
};

// Section 2 — Welcome & wedding details
export const welcome = {
  eyebrow: 'With blessings from our families',
  title: 'Welcome to Our Wedding',
  intro:
    'With hearts full of joy, we invite you to be a part of this beautiful journey as we begin our new life together. Your presence and blessings mean the world to us.',
  details: [
    { icon: 'calendar', label: 'Wedding Date', lines: ['Thursday'], accent: '17 December 2026' },
    { icon: 'pin', label: 'Venue', lines: [venue.name], small: venue.city },
    { icon: 'clock', label: 'Muhurtham', accent: '9:30 AM', small: 'to 10:30 AM' },
  ],
  countdownLabel: 'Counting down to the muhurtham',
  // Softly blended photograph behind the lower half of the section.
  // Swap for your own photo any time; 'narrow' is used on portrait phones.
  backdrop: {
    wide: '/images/hero-desktop-1672.webp',
    narrow: '/images/hero-mobile-800.webp',
  },
  cta: { label: 'View full details', href: '#events' },
};

// Section 3 — Our Story
export const story = {
  eyebrow: 'Our Journey',
  title: ['Two Hearts,', 'One Beautiful Journey'],
  heading: 'Where It All Began',
  lead: [
    'Some journeys begin with a moment,',
    'some with a smile,',
    'and some with two hearts finding their way to each other.',
  ],
  body:
    'From the first hello to this beautiful day, our journey has been filled with laughter, memories, family and countless little moments that brought us closer.',
  photo: {
    alt: 'Meenakshi in a maroon silk saree and Arjun in a white veshti, smiling at each other on flower-lined temple steps at sunrise.',
  },
};

// Section 4 — Ceremonies. Times are India Standard Time (+05:30).
// ⚠ PLACEHOLDER schedule except the muhurtham — confirm with the family.
export const events = {
  eyebrow: 'The Celebrations',
  title: ['Join Us for', 'the Ceremonies'],
  intro: 'Two days of rituals, music and togetherness, and we would love to share every moment with you.',
  items: [
    {
      icon: 'rings',
      name: 'Nichayathartham',
      nameTa: 'நிச்சயதார்த்தம்',
      text: 'The formal engagement, as our families exchange blessings and gifts.',
      dateLabel: 'Wednesday · 16 December 2026',
      timeLabel: '10:00 AM – 12:00 PM',
      start: '2026-12-16T10:00:00+05:30',
      end: '2026-12-16T12:00:00+05:30',
    },
    {
      icon: 'note',
      name: 'Mappillai Azhaippu',
      nameTa: 'மாப்பிள்ளை அழைப்பு',
      text: 'Welcoming the groom with nadaswaram, lamps and a joyful procession.',
      dateLabel: 'Wednesday · 16 December 2026',
      timeLabel: '6:00 PM – 9:00 PM',
      start: '2026-12-16T18:00:00+05:30',
      end: '2026-12-16T21:00:00+05:30',
    },
    {
      icon: 'kalash',
      name: 'Muhurtham',
      nameTa: 'முகூர்த்தம்',
      text: 'The sacred wedding ceremony and the tying of the thaali.',
      dateLabel: 'Thursday · 17 December 2026',
      timeLabel: '9:30 AM – 10:30 AM',
      start: '2026-12-17T09:30:00+05:30',
      end: '2026-12-17T10:30:00+05:30',
      featured: true,
    },
    {
      icon: 'sparkle',
      name: 'Reception',
      nameTa: 'வரவேற்பு',
      text: 'An evening of dinner, music and celebration with everyone we love.',
      dateLabel: 'Thursday · 17 December 2026',
      timeLabel: '7:00 PM – 10:00 PM',
      start: '2026-12-17T19:00:00+05:30',
      end: '2026-12-17T22:00:00+05:30',
    },
  ],
};

// Section 5 — Families. ⚠ PLACEHOLDER names throughout.
export const family = {
  eyebrow: 'With the blessings of',
  title: 'Our Families',
  sides: [
    {
      role: 'The Bride',
      name: 'Meenakshi',
      relation: 'Beloved daughter of',
      parents: 'Thiru. R. Ramasamy & Tmt. R. Kamala',
      grandRelation: 'Granddaughter of',
      grandparents: 'Thiru. K. Rangasamy & Tmt. R. Saraswathi',
      photo: { src: "/images/bride-1.jpg", alt: "Meenakshi's family" },
    },
    {
      role: 'The Groom',
      name: 'Arjun',
      relation: 'Beloved son of',
      parents: 'Thiru. S. Krishnan & Tmt. K. Vasantha',
      grandRelation: 'Grandson of',
      grandparents: 'Thiru. V. Subramaniam & Tmt. S. Meenambal',
      photo: { src: "/images/groom-1.jpg", alt: "Arjun's family" },
    },
  ],
  note: 'Together with our families, we request the honour of your presence and blessings as we begin our life together.',
  signature: 'With love, the Ramasamy & Krishnan families',
  // Softly blended photograph behind the whole section. A family group
  // photo works beautifully here once you have one.
  backdrop: { src: '/images/story-couple-902.webp' },
};

// Section 8 — RSVP. Responses open in WhatsApp, addressed to this number.
export const rsvp = {
  eyebrow: 'Kindly Respond',
  title: ['Will You', 'Join Us?'],
  intro: 'Kindly let us know by 30 November 2026 so we can welcome you properly.',
  whatsapp: '919000000000', // ⚠ PLACEHOLDER: country code + number, digits only
  maxGuests: 6,
};

export const footer = {
  blessingTa: 'அன்புடன் அழைக்கிறோம்', // "We invite you with love"
  thanks: 'Your love and blessings are the greatest gift of all.',
};
