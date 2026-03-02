import { Client, Account } from 'node-appwrite';
import { APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID } from './const';

export function getServerAccount(jwt: string) {
  const client = new Client()
    .setEndpoint(APPWRITE_ENDPOINT!)
    .setProject(APPWRITE_PROJECT_ID!)
    .setJWT(jwt); // 🔑 THIS IS THE FIX

  return new Account(client);
}
