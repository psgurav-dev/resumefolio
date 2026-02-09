import { account } from '@/config/appwrite';
import { PortfolioData } from '@/types/portfolio';

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
    return data.resumes;
  } catch (error) {
    console.error('getCurrentUserResume error:', error);
    return null;
  }
}

export async function saveResumeData(name: string, parsedData: PortfolioData) {
  try {
    const jwt = await account.createJWT();
    const res = await fetch('/api/resume-data', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwt.jwt}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        parsedData,
      }),
    });

    if (!res.ok) {
      throw new Error('Failed to save resume');
    }
    const data = await res.json();
    return data.resume;
  } catch (error) {
    console.error('saveResumeData error:', error);
    throw error;
  }
}
