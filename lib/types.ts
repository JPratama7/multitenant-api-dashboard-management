import { z } from 'zod';

export const ClientSchema = z.object({
  userId: z.string().uuid(),
  maxUsage: z.number().gt(-1),
  currentUsage: z.number().gt(-1).optional(),
  approved: z.boolean(),
  clientSecret: z.string(),
  clientWebhook: z.string().url().optional(),
});

export const TeamSchema = z.object({
  created_at_millis: z.number(),
  id: z.string(),
  display_name: z.string(),
  server_metadata: z.record(z.string(), z.any()),
  profile_image_url: z.string(),
  client_metadata: z.record(z.string(), z.any()),
  client_read_only_metadata: z.record(z.string(), z.any()),
});

export const UserSchema = z.object({
  id: z.string(),
  primary_email_verified: z.boolean(),
  primary_email_auth_enabled: z.boolean(),
  signed_up_at_millis: z.number(),
  last_active_at_millis: z.number(),
  is_anonymous: z.boolean(),
  primary_email: z.string(),
  display_name: z.string(),
  selected_team: TeamSchema,
  selected_team_id: z.string(),
  profile_image_url: z.string(),
  client_metadata: z.record(z.string(), z.any()),
  client_read_only_metadata: z.record(z.string(), z.any()),
  server_metadata: z.record(z.string(), z.any()),
});

export type User = z.infer<typeof UserSchema>;
export type ClientMeta = z.infer<typeof ClientSchema>;
