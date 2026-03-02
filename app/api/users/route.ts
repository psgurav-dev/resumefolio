export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/config/mongose';
import User from '@/models/users';
import { getServerAccount } from '@/config/appwrite-server';

export async function GET(req: NextRequest) {
  try {
    await connect();
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({
        error: 'Unauthorized',
      });
    }
    const token = authHeader.replace('Bearer ', '');
    const account = getServerAccount(token);
    const appwriteUser = await account.get();

    const user = await User.findOne({
      appwriteUserId: appwriteUser.$id,
    });
    if (!user) {
      return NextResponse.json({ user: null });
    }
    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.log(error);
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connect();

    const body = await req.json();
    const { selectedResume, userId } = body;

    if (!selectedResume) {
      return NextResponse.json(
        { error: 'selectedResume is required' },
        { status: 400 },
      );
    }

    const user = await User.findOneAndUpdate(
      { appwriteUserId: userId },
      { selectedResume },
      { new: true },
    );
    console.log('Updated user:', user);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error('Update user error:', error);
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 },
    );
  }
}
