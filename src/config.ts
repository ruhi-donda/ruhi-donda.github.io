// ─────────────────────────────────────────────────────────────
// Central site config — edit your details here in one place.
// ─────────────────────────────────────────────────────────────

export const SITE = {
  /** Full canonical URL, no trailing slash. Must match astro.config `site`. */
  url: 'https://ruhi-donda.github.io',
  title: 'Ruhi Donda',
  /** Used as the default meta description / OG description. */
  description:
    'CS student at Rutgers building AI + space-adjacent software. Projects, writing, and things I make for fun.',
  /** Default social-share image (lives in /public). */
  ogImage: '/og-default.png',
  author: 'Ruhi Donda',
  locale: 'en_US',
};

export const PROFILE = {
  name: 'Ruhi Donda',
  /** One-line positioning shown in heroes. Reword to taste. */
  tagline: 'CS student at Rutgers building AI + space-adjacent software.',
  /** Slightly longer positioning for the recruiter hero. */
  positioning:
    'Computer Science student at Rutgers (Class of 2027, Business Administration minor). I build AI tooling and space-adjacent software — from satellite simulation to multi-agent LLM systems.',
  email: 'Ruhidonda25@gmail.com',
  location: 'New Jersey, USA',
};

// External links. Leave `resume` pointing at the placeholder until you drop
// the real PDF into /public/resume.pdf.
export const LINKS = {
  github: 'https://github.com/ruhi-donda',
  linkedin: 'https://www.linkedin.com/in/ruhi-donda-27717b34a',
  resume: '/resume.pdf',
  email: 'mailto:Ruhidonda25@gmail.com',
};

// Education — edit/add entries here; the recruiter page renders them in order.
export const EDUCATION = [
  {
    school: 'Rutgers University',
    degree: 'B.S. Computer Science',
    detail: 'Minor in Business Administration',
    period: 'Class of 2027',
    gpa: '3.559',
  },
];

// Skills grouped by category. Add categories/items freely.
export const SKILLS = [
  { category: 'Languages', items: ['Python', 'JavaScript / TypeScript', 'Swift'] },
  { category: 'Frameworks & Libraries', items: ['React', 'Next.js'] },
  { category: 'Data & Backend', items: ['Supabase', 'SQL'] },
];

// The two "worlds" the landing gate routes into. Used by the gate + SwitchView.
export const VIEWS = {
  recruiter: { path: '/recruiter', label: 'Recruiter view' },
  explore: { path: '/explore', label: 'Explore view' },
} as const;

/** localStorage key that remembers a returning visitor's chosen view. */
export const VIEW_STORAGE_KEY = 'ruhi:view';
