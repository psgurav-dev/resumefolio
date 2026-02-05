export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { connect } from '@/config/mongose';
import User from '@/models/users';
import { getServerAccount } from '@/config/appwrite-server';

export async function POST(req: Request) {
  try {
    const { jwt } = await req.json();
    if (!jwt) throw new Error('Missing JWT');

    await connect();

    // ✅ user-scoped Appwrite client
    const account = getServerAccount(jwt);
    const appwriteUser = await account.get();

    const user = await User.findOneAndUpdate(
      { appwriteUserId: appwriteUser.$id },
      {
        appwriteUserId: appwriteUser.$id,
        email: appwriteUser.email,
        name: appwriteUser.name,
        provider: (appwriteUser as any).providers?.[0] || 'google',
      },
      { upsert: true, new: true },
    );

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Auth sync error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 401 },
    );
  }
}
