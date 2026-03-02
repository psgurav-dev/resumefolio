export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/config/mongose';
import User from '@/models/users';
import { getServerAccount } from '@/config/appwrite-server';

export async function POST(req: Request) {
  try {
    const { jwt } = await req.json();
    if (!jwt) throw new Error('Missing JWT');

    await connect();

    const account = getServerAccount(jwt);
    const appwriteUser = await account.get();

    const filter = { appwriteUserId: appwriteUser.$id };
    const generatedUsername = `user_${appwriteUser.$id}`;

    const update = {
      $set: {
        appwriteUserId: appwriteUser.$id,
        email: appwriteUser.email,
        name: appwriteUser.name,
        provider: (appwriteUser as any).providers?.[0] || 'google',
        updatedAt: new Date(),
      },
      $setOnInsert: {
        username: generatedUsername,
        createdAt: new Date(),
      },
    };

    const options = {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    } as any;

    const user = await User.findOneAndUpdate(filter, update, options);

    if (!user) {
      const created = await User.create({
        appwriteUserId: appwriteUser.$id,
        email: appwriteUser.email,
        name: appwriteUser.name,
        provider: (appwriteUser as any).providers?.[0] || 'google',
      });
      return NextResponse.json({ user: created });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Auth sync error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 401 },
    );
  }
}
