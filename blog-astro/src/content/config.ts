import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        author: z.string(),
        date: z.string().datetime().transform((str) => new Date(str)),
        tags: z.array(z.string()).optional(),
        image: z.string().optional(),
        draft: z.boolean().default(false)
    }),
});

export const collections = {
    blog: blogCollection
};