import { parseResume } from '@/services/gemini-ai';

export const extractResumeJSON = async (
  payload: {
    data: string;
    mimeType: string;
    name: string;
  },
  resumeText?: string,
) => {
  if (!payload) {
    throw Error(
      'Please provide your resume text or upload a file (PDF, Image, Text)',
    );
  }
  try {
    const input = payload
      ? { data: payload.data, mimeType: payload.mimeType }
      : resumeText;
    if (!input) {
      throw Error('Invalid input: both payload and resumeText are missing');
    }
    const parsedData = await parseResume(input);
    console.log('Parsed Portfolio Data:', parsedData);
    return parsedData;
  } catch (err: any) {
    console.error(err);
    throw err;
  }
};
