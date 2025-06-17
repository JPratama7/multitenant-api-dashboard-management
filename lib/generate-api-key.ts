// Utility to generate a unique API key (simple random string)

import crypto from 'crypto';

export async function generateApiKey(): Promise<string> {
  return crypto.randomBytes(32).toString('hex');
}
