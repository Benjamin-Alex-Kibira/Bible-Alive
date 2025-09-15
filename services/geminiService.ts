// FIX: Implemented the geminiService to provide AI functionality to the app.
// FIX: Add GenerateContentResponse and GenerateImagesResponse to imports to type API call results.
import { GoogleGenAI, Type, GenerateContentResponse, GenerateImagesResponse } from "@google/genai";
import type { VisualPrompt, GenerateVideosOperation, BibleVerse, FunFact, VerseRef } from '../types';

// This check is important for server-side environments or build steps.
if (!process.env.API_KEY) {
  // In a real app, you might want to show a more user-friendly error or disable AI features.
  throw new Error("API_KEY environment variable not set. Please obtain an API key from Google AI Studio.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * A simple retry wrapper for API calls to handle transient errors.
 * @param apiCall The async function to call.
 * @param retries The number of retries.
 * @returns The result of the API call.
 */
const withRetry = async <T>(apiCall: () => Promise<T>, retries = 3): Promise<T> => {
  let lastError: Error | undefined;
  for (let i = 0; i < retries; i++) {
    try {
      return await apiCall();
    } catch (error) {
      lastError = error as Error;
      console.warn(`API call failed, attempt ${i + 1}/${retries}. Retrying...`);
      if (i < retries - 1) {
        await new Promise(res => setTimeout(res, 1000 * (i + 1))); // Exponential backoff
      }
    }
  }
  throw new Error(`API call failed after ${retries} retries: ${lastError?.message}`);
};

/**
 * Generates an image based on a visual prompt.
 * @param visualPrompt The prompt details.
 * @returns A base64 encoded image data URL string.
 */
export const generateImage = async (visualPrompt: VisualPrompt): Promise<string> => {
  const apiCall = async () => {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: visualPrompt.prompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        aspectRatio: visualPrompt.aspectRatio || '1:1',
      },
    }) as GenerateImagesResponse;

    if (response.generatedImages && response.generatedImages.length > 0) {
      const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
      return `data:image/jpeg;base64,${base64ImageBytes}`;
    }
    throw new Error('Image generation failed or returned no images.');
  };
  return withRetry(apiCall);
};


/**
 * Starts a video generation process.
 * @param prompt The text prompt for the video.
 * @returns The initial video generation operation object.
 */
export const startVideoGeneration = async (prompt: string): Promise<GenerateVideosOperation> => {
    return ai.models.generateVideos({
        model: 'veo-2.0-generate-001',
        prompt: prompt,
        config: {
            numberOfVideos: 1,
        }
    });
};

/**
 * Fetches the current status of a video generation operation.
 * @param operation The operation to poll.
 * @returns The updated video generation operation object.
 */
export const getVideosOperation = async (operation: GenerateVideosOperation): Promise<GenerateVideosOperation> => {
    return ai.operations.getVideosOperation({ operation });
};


/**
 * Generates the text for a specific Bible verse using AI.
 * @param book The Bible book.
 * @param chapter The chapter number.
 * @param verse The verse number.
 * @param version The Bible version/translation.
 * @returns The generated text of the verse as a string.
 */
export const generateVerseText = async (book: string, chapter: number, verse: number, version: string): Promise<string> => {
  const prompt = `Provide the text for the Bible verse: ${book} ${chapter}:${verse} from the ${version} translation. Respond with only the verse text itself, without any introductory phrases like "Here is the text..." or any verse numbers/references.`;
  const apiCall = async () => {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    }) as GenerateContentResponse;
    return response.text.trim();
  };
  return withRetry(apiCall);
};

/**
 * Generates fun facts related to a given Bible verse.
 * @param verse The BibleVerse object to generate facts about.
 * @returns An array of FunFact objects.
 */
export const generateFunFacts = async (verse: BibleVerse): Promise<FunFact[]> => {
  const prompt = `Based on the Bible verse "${verse.text}" (${verse.book} ${verse.chapter}:${verse.verse}), generate 3 interesting and surprising fun facts. These facts could be about historical context, cultural significance, linguistic nuances, or theological interpretations. For each fact, create a "Did you know...?" style question, a detailed explanation, and a relevant visual prompt for an AI image generator.`;
  
  const apiCall = async () => {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: {
                type: Type.STRING,
                description: 'A "Did you know...?" style question.',
              },
              explanation: {
                type: Type.STRING,
                description: 'A detailed explanation of the fun fact.',
              },
              visualPrompt: {
                type: Type.STRING,
                description: 'A detailed prompt for an AI image generator to create a visual for this fact.',
              },
            },
          },
        },
      },
    }) as GenerateContentResponse;

    const parsedFacts = JSON.parse(response.text);

    // Add required fields to match the FunFact interface
    return parsedFacts.map((fact: any, index: number) => ({
      ...fact,
      id: `generated-fact-${verse.book}-${verse.chapter}-${verse.verse}-${index}`,
      scriptureRef: { book: verse.book, chapter: verse.chapter, verseStart: verse.verse } as VerseRef,
      visualPrompt: {
        id: `vp-generated-${verse.book}-${verse.chapter}-${verse.verse}-${index}`,
        prompt: fact.visualPrompt, // Use the generated prompt
        aspectRatio: '16:9'
      } as VisualPrompt
    }));
  };

  return withRetry(apiCall, 2); // Retry fewer times for this non-critical call
};
