import {
  fetchAuthSession,
} from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '@/data-schema';
import { Amplify } from 'aws-amplify';
import outputs from '../amplify_outputs.json';

Amplify.configure(outputs, { ssr: true });
export const amplifyClient = generateClient<Schema>();

// Helper to get the correct token for API requests
export async function getAuthToken(): Promise<string> {
  const session = await fetchAuthSession();
  const accessToken = session?.tokens?.accessToken;
  if (accessToken) {
    if (typeof accessToken === 'string') return accessToken;
    if (typeof accessToken.toString === 'function')
      return accessToken.toString();
  }
  return '';
}
