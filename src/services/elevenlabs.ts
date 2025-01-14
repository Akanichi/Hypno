import axios from 'axios';

type SupportedLanguage = 'en' | 'fr' | 'ar';

// Voice IDs for different languages
const VOICE_IDS: Record<SupportedLanguage, string> = {
  en: 'PB6BdkFkZLbI39GHdnbQ', // English voice
  fr: 'jsCqWAovK2LkecY7zXl4', // French voice
  ar: 't0jbNlBVZ17f02VDIeMI', // Arabic voice
};

// Helper function to clean text from any special markers
const cleanText = (text: string): string => {
  return text
    .replace(/\[PAUSE\]/g, '')
    .replace(/\[LONG_PAUSE\]/g, '')
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
};

export const generateAudio = async (
  text: string,
  onProgress: (progress: number) => void,
  language: SupportedLanguage = 'en'
): Promise<Blob> => {
  try {
    onProgress(0);
    const cleanedText = cleanText(text);
    const response = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_IDS[language]}`,
      {
        text: cleanedText,
        voice_settings: {
          stability: 0.98,
          similarity_boost: 0.75,
          style: 0.15,
          speaking_rate: 0.7
        }
      },
      {
        headers: {
          'Accept': 'audio/mpeg',
          'xi-api-key': process.env.REACT_APP_ELEVENLABS_API_KEY,
          'Content-Type': 'application/json',
        },
        responseType: 'blob',
        onDownloadProgress: (progressEvent) => {
          const progress = (progressEvent.loaded / (progressEvent.total || 1)) * 100;
          onProgress(progress);
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error generating audio:', error);
    throw new Error('Failed to generate audio');
  }
}; 