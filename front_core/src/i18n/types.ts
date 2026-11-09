export type Locale = 'uz' | 'en' | 'ru';

export interface Step {
  title: string;
  text: string;
}

export interface Dictionary {
  nav: { home: string; opportunities: string; challenges: string; signIn: string; menu: string };
  hero: { title: [string, string]; subtitle: string; register: string; howItWorks: string };
  categories: { internships: string; volunteering: string; debates: string; olympiads: string; challenges: string };
  overview: { title: string; facts: [string, string, string] };
  benefits: {
    eyebrow: string;
    title: [string, string];
    discover: { title: string; text: string; cta: string };
    interests: { title: string; text: string };
    dates: { title: string; text: string };
    practice: { title: string; text: string; cta: string };
  };
  how: { eyebrow: string; title: string; steps: [Step, Step, Step] };
  cta: { title: [string, string]; text: string; button: string };
  directions: {
    title: string;
    subtitle: string;
    explore: string;
    items: [Step, Step, Step, Step];
    all: string;
  };
  footer: { privacy: string; copyright: string };
}
