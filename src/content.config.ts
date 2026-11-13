import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const labs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/labs' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    icon: z.string(),
    services: z.array(z.string()).default([]),
    product: z.string().optional(),
    order: z.number().default(0),
  }),
});

const programs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/programs' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    status: z.enum(['open', 'upcoming', 'closed']),
    eligibility: z.array(z.string()).default([]),
    applyUrl: z.string().optional(),
    order: z.number().default(0),
  }),
});

const team = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/team' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    bio: z.string().optional(),
    photo: z.string().optional(),
    order: z.number().default(0),
  }),
});

const siteSettings = defineCollection({
  loader: file('./src/content/site-settings.json'),
  schema: z.object({
    orgName: z.string(),
    tagline: z.string(),
    email: z.string(),
    phone: z.array(z.string()),
    address: z.string().optional(),
    social: z.object({
      linkedin: z.string().optional(),
      twitter: z.string().optional(),
      facebook: z.string().optional(),
      instagram: z.string().optional(),
    }),
  }),
});

export const collections = { labs, programs, team, siteSettings };
