import { account } from '@/config/appwrite';

export async function getCurrentUserResumeData() {
  try {
    const jwt = await account.createJWT();
    const res = await fetch('/api/resume-data', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt.jwt}`,
      },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch resume');
    }
    const data = await res.json();
    return data.resume;
  } catch (error) {
    console.error('getCurrentUserResume error:', error);
    return null;
  }
}
