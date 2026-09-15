import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({ extend: z.object({
      legacyTitle: z.string().optional(),
      review: z.object({
        id: z.string(), status: z.string(), confidence: z.string(),
        last_reviewed: z.string(), source: z.string(),
      }).optional(),
    }) }),
  }),
};
