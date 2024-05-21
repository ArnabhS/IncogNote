import { z } from 'zod';

export const messageSchema = z.object({
    content: z
    .string()
    .min(8,)
    .max(300,{message:'Content can not be more than 300 characters' })
})