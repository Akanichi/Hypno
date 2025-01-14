import axios from 'axios';

interface ProgressCallback {
  (progress: number): void;
}

export const generateHypnosisScript = async (
  sessionType: string,
  onProgress: ProgressCallback,
  language: string = 'en'
): Promise<string> => {
  try {
    onProgress(10);

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are an experienced hypnotherapist creating a very brief 10-second test script in ${language === 'ar' ? 'right-to-left' : 'left-to-right'} format.
                     Create a single calming suggestion with one [PAUSE] marker.
                     Keep it extremely short - just 2-3 sentences maximum.
                     Mark emphasis words with *asterisks*.
                     Example format: "Take a *deep* breath in. [PAUSE] Feel yourself becoming *completely* relaxed."`
          },
          {
            role: 'user',
            content: `Create a 10-second test hypnosis script for ${sessionType}.`
          }
        ],
        temperature: 0.7,
        max_tokens: 100,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    onProgress(100);
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating hypnosis script:', error);
    throw new Error('Failed to generate hypnosis script');
  }
}; 