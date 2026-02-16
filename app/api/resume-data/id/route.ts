export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { connect } from '@/config/mongose';
import Resume from '@/models/resumes';
import User from '@/models/users';

export async function POST(req: Request) {
	try {
		await connect();
		const { userId } = await req.json();
		console.log('Check resume - received userId:', userId);
		const user = await User.findOne({
			username: userId,
		});

		if (!user) {
			return NextResponse.json({ resume: null });
		}

		// Get the user's selected resume
		const selectedResume = await Resume.findById(user.selectedResume);

		if (!selectedResume) {
			return NextResponse.json({ resume: null });
		}

		return NextResponse.json({ resume: selectedResume });
	} catch (error) {
		console.error('Check resume error:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch resume' },
			{ status: 500 }
		);
	}
}
