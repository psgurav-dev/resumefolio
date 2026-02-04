export const documentToJSONPrompt =
  'Parse the resume in this document/image into a structured professional portfolio JSON. Create an engaging professional summary based on the details. Categorize skills logically.';
export const resumeContentToJSONPrompt = (content: string) =>
  `Parse the following resume content into a structured professional portfolio JSON. Ensure the summary is engaging and the skills are well-categorized. Content: ${content}`;
