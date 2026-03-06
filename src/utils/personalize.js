/**
 * Personalization utility
 * Replaces placeholder tokens in story text with actual family names
 */

export function personalizeText(text, familyData) {
  if (!text || !familyData) return text;

  return text
    .replace(/\{\{CHILD\}\}/g, familyData.childName || 'Child')
    .replace(/\{\{FATHER\}\}/g, familyData.fatherName || 'Papa')
    .replace(/\{\{MOTHER\}\}/g, familyData.motherName || 'Mama')
    .replace(/\{\{SIBLING\}\}/g, familyData.siblingName || 'Sibling');
}

export function personalizeStory(story, familyData) {
  if (!story || !familyData) return story;

  return {
    ...story,
    title: personalizeText(story.title, familyData),
    pages: story.pages.map(page => ({
      ...page,
      text: page.text.map(line => personalizeText(line, familyData))
    }))
  };
}

export const defaultFamily = {
  childName: 'Yuvika',
  fatherName: 'Papa Sahil',
  motherName: 'Mama Simran',
  siblingName: 'Samaira'
};
