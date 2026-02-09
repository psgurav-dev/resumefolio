import { GoogleGenAI, Type } from '@google/genai';
import { PortfolioData } from '@/types/portfolio';
import {
  documentToJSONPrompt,
  resumeContentToJSONPrompt,
} from '@/data/prompts/resume-parse';
import { GEMINI_KEY } from '@/config/const';

const ai = new GoogleGenAI({ apiKey: GEMINI_KEY || '' });

const portfolioSchema = {
  type: Type.OBJECT,
  properties: {
    fullName: { type: Type.STRING },
    jobTitle: { type: Type.STRING },
    email: { type: Type.STRING },
    phone: { type: Type.STRING },
    location: { type: Type.STRING },
    linkedin: { type: Type.STRING },
    github: { type: Type.STRING },
    summary: { type: Type.STRING },
    skills: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          category: { type: Type.STRING },
          items: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: ['category', 'items'],
      },
    },
    experience: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          company: { type: Type.STRING },
          role: { type: Type.STRING },
          location: { type: Type.STRING },
          period: { type: Type.STRING },
          description: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: ['company', 'role', 'period', 'description'],
      },
    },
    education: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          institution: { type: Type.STRING },
          degree: { type: Type.STRING },
          period: { type: Type.STRING },
          gpa: { type: Type.STRING },
        },
        required: ['institution', 'degree', 'period'],
      },
    },
    projects: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          description: { type: Type.STRING },
          technologies: { type: Type.ARRAY, items: { type: Type.STRING } },
          link: { type: Type.STRING },
        },
        required: ['name', 'description', 'technologies'],
      },
    },
    interests: { type: Type.ARRAY, items: { type: Type.STRING } },
  },
  required: [
    'fullName',
    'jobTitle',
    'email',
    'summary',
    'skills',
    'experience',
    'education',
    'projects',
  ],
};

export const parseResume = async (
  input: string | { data: string; mimeType: string },
): Promise<PortfolioData> => {
  let parts: any[] = [];

  if (typeof input === 'string') {
    parts.push({ text: resumeContentToJSONPrompt(input) });
  } else {
    parts.push({
      inlineData: {
        data: input.data,
        mimeType: input.mimeType,
      },
    });
    parts.push({ text: documentToJSONPrompt });
  }

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: { parts },
    config: {
      responseMimeType: 'application/json',
      responseSchema: portfolioSchema,
    },
  });

  if (!response.text) {
    throw new Error('Failed to parse resume content');
  }

  return JSON.parse(response.text.trim());
};
