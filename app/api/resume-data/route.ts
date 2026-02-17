export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { connect } from '@/config/mongose';
import Resume from '@/models/resumes';
import User from '@/models/users';
import { getServerAccount } from '@/config/appwrite-server';
import { Account, Client } from 'node-appwrite';

export async function GET(req: Request) {
  try {
    await connect();

    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');

    const account = getServerAccount(token);

    const appwriteUser = await account.get();

    const user = await User.findOne({
      appwriteUserId: appwriteUser.$id,
    });

    if (!user) {
      return NextResponse.json({ resume: null });
    }

    const resumes = await Resume.find({
      userId: user._id,
    }).sort({ createdAt: -1 });

    return NextResponse.json({ resumes });
  } catch (error) {
    console.error('Check resume error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch resume' },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const jwt = authHeader.replace('Bearer ', '');

    const account = getServerAccount(jwt);
    const appwriteUser = await account.get();

    await connect();

    const user = await User.findOne({
      appwriteUserId: appwriteUser.$id,
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const { name, parsedData } = await req.json();

    if (!name || !parsedData) {
      return NextResponse.json(
        { error: 'Missing required fields: name and parsedData' },
        { status: 400 },
      );
    }

    const resume = new Resume({
      userId: user._id,
      name,
      parsedData,
    });

    await resume.save();

    return NextResponse.json({ resume }, { status: 201 });
  } catch (error) {
    console.error('Save resume error:', error);
    return NextResponse.json(
      { error: 'Failed to save resume' },
      { status: 500 },
    );
  }
}
