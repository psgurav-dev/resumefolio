import { Client, Account } from 'node-appwrite';
import { APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID } from './const';

export function getServerAccount(jwt: string) {
  const client = new Client()
    .setEndpoint(APPWRITE_ENDPOINT!)
    .setProject(APPWRITE_PROJECT_ID!)
    .setJWT(jwt); // 🔑 THIS IS THE FIX

  return new Account(client);
}

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
  .setKey(process.env.APPWRITE_API_KEY!); // 🔑 THIS IS THE FIX

export const account = new Account(client);
