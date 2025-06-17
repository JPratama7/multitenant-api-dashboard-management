// Zod schema for validating ClientMeta creation requests
import { z } from 'zod';

export const ClientMetaCreateSchema = z.object({
  userId: z.string().min(1, 'userId is required'),
  maxUsage: z.number().int().positive('maxUsage must be a positive integer'),
  clientSecret: z.string(),
  clientWebhook: z.string().url().optional(),
});

export type ClientMetaCreateInput = z.infer<typeof ClientMetaCreateSchema>;
