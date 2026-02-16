import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/config/mongose';
import User from '@/models/users';

export async function PUT(req: NextRequest) {
  try {
    await connect();

    const body = await req.json();
    const { selectedResume, userId } = body;
    console.log('API received body:', body);
    console.log('API received userId:', userId);
    console.log('API received userId type:', typeof userId);
    console.log('API received userId length:', userId?.length);

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
