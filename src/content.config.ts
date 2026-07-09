import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// ── Projects ──────────────────────────────────────────────────
// Add a project = drop a markdown file in src/content/projects/.
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    stack: z.array(z.string()).default([]),
    repo: z.string().url().optional(),
    demo: z.string().url().optional(),
    // Show on the recruiter page's featured grid.
    featured: z.boolean().default(true),
    // Lower numbers sort first.
    order: z.number().default(0),
    // For projects with no public link — renders a "write-up" card instead.
    writeup: z.boolean().default(false),
  }),
});

// ── Blog ──────────────────────────────────────────────────────
// Add a post = drop a markdown file in src/content/blog/.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      tags: z.array(z.string()).default([]),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      draft: z.boolean().default(false),
    }),
});

// ── Hobbies (media gallery) ───────────────────────────────────
// Add media = drop a markdown file in src/content/hobbies/.
const hobbies = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/hobbies' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      category: z.enum(['blender', 'art', 'photography', 'gardening']),
      type: z.enum(['image', 'video']).default('image'),
      // For type: image
      image: image().optional(),
      alt: z.string().optional(),
      // For type: video — an embed id + provider
      videoId: z.string().optional(),
      provider: z.enum(['youtube', 'vimeo']).optional(),
      // Optional poster/thumbnail for videos
      thumb: image().optional(),
      date: z.coerce.date().optional(),
      order: z.number().default(0),
    }),
});

export const collections = { projects, blog, hobbies };
