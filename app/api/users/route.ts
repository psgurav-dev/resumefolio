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
    const { selectedResume, userId, name, email, username, templateId } = body;

    // Get user ID from auth header if userId not provided
    let userIdToUpdate = userId;
    if (!userIdToUpdate) {
      const authHeader = req.headers.get('authorization');
      if (!authHeader) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      const token = authHeader.replace('Bearer ', '');
      const account = getServerAccount(token);
      const appwriteUser = await account.get();
      userIdToUpdate = appwriteUser.$id;
    }

    // Build update object with only provided fields
    const updateData: any = {};

    if (selectedResume) {
      updateData.selectedResume = selectedResume;
    }

    if (templateId) {
      updateData.templateId = templateId;
    }

    // Profile edit fields
    if (name !== undefined) {
      if (!name || name.trim().length < 2) {
        return NextResponse.json(
          { error: 'Name must be at least 2 characters' },
          { status: 400 },
        );
      }
      updateData.name = name.trim();
    }

    if (email !== undefined) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        return NextResponse.json(
          { error: 'Invalid email address' },
          { status: 400 },
        );
      }
      updateData.email = email.trim();
    }

    if (username !== undefined && username !== null) {
      if (username && username.length < 3) {
        return NextResponse.json(
          { error: 'Username must be at least 3 characters' },
          { status: 400 },
        );
      }
      if (username && !/^[a-zA-Z0-9_-]+$/.test(username)) {
        return NextResponse.json(
          {
            error:
              'Username can only contain letters, numbers, hyphens, and underscores',
          },
          { status: 400 },
        );
      }
      updateData.username = username.trim() || undefined;
    }

    // At least one field should be provided
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: 'No fields to update' },
        { status: 400 },
      );
    }

    // Update user
    const user = await User.findOneAndUpdate(
      { appwriteUserId: userIdToUpdate },
      { ...updateData, updatedAt: new Date() },
      { new: true, runValidators: true },
    );

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error('Update user error:', error);
    return NextResponse.json(
      {
        error: 'Failed to update user',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}
