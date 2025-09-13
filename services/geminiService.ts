
import { GoogleGenAI } from "@google/genai";
import type { StructuredImagePrompt, VisualPrompt, GenerateVideosOperation } from '../types';

// --- Image Generation Template ---
function formatPrompt(structured: StructuredImagePrompt): string {
  return `${structured.sceneTitle} — ${structured.verseSummary}. Visualize exactly as the scripture describes, imaginative and reverent. Style: ${structured.style}. Mood: ${structured.mood}. Camera: ${structured.camera}. Lighting: ${structured.lighting}. Composition: ${structured.composition}. Constraints: no modern clothing, no logos, no graphic gore, no sexual content, no modern buildings.`;
}

// --- Adapter Interface ---
interface AiAdapter {
  generateImage(visualPrompt: VisualPrompt): Promise<string>;
  startVideoGeneration(prompt: string): Promise<GenerateVideosOperation>;
  getVideosOperation(operation: GenerateVideosOperation): Promise<GenerateVideosOperation>;
  generateVerseText(book: string, chapter: number, verse: number, version: string): Promise<string>;
}

// --- Mock Adapter ---
class MockAdapter implements AiAdapter {
  private mockVideoOperations: Record<string, { status: string; calls: number }> = {};

  async generateImage(visualPrompt: VisualPrompt): Promise<string> {
    console.log("Using Mock Adapter for image generation. Prompt:", visualPrompt.prompt);
    const aspectRatios: { [key: string]: string } = {
      "16:9": "1280/720",
      "4:3": "1024/768",
      "1:1": "1080/1080",
    };
    const ratio = aspectRatios[visualPrompt.aspectRatio || "16:9"] || "1280/720";
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    return `https://picsum.photos/${ratio}?random=${Math.random()}`;
  }

  async startVideoGeneration(prompt: string): Promise<GenerateVideosOperation> {
    console.log("Using Mock Adapter to start video generation. Prompt:", prompt);
    await new Promise(resolve => setTimeout(resolve, 500));
    const operationId = `mock-op-${Date.now()}`;
    this.mockVideoOperations[operationId] = { status: "PROCESSING", calls: 0 };
    // FIX: Cast to unknown first because GenerateVideosOperation is not a simple object.
    return { name: operationId, done: false } as unknown as GenerateVideosOperation;
  }

  async getVideosOperation(operation: GenerateVideosOperation): Promise<GenerateVideosOperation> {
    console.log("Using Mock Adapter to check video status.");
    await new Promise(resolve => setTimeout(resolve, 2000));
    const opDetails = this.mockVideoOperations[operation.name];
    if (!opDetails) throw new Error("Mock operation not found");

    opDetails.calls++;
    if (opDetails.calls < 3) {
      // FIX: Cast to unknown first to satisfy GenerateVideosOperation type for mock response.
      return { name: operation.name, done: false, metadata: { state: "PROCESSING", progressPercent: opDetails.calls * 33 } } as unknown as GenerateVideosOperation;
    } else {
      // FIX: Cast to unknown first to satisfy GenerateVideosOperation type for mock response.
      return {
        name: operation.name,
        done: true,
        response: {
          generatedVideos: [{
            video: { uri: 'https://storage.googleapis.com/web-dev-assets/video-api-demo/flowers.mp4' }
          }]
        }
      } as unknown as GenerateVideosOperation;
    }
  }

  async generateVerseText(book: string, chapter: number, verse: number, version: string): Promise<string> {
    console.log(`Mock generating verse text for ${book} ${chapter}:${verse}`);
    await new Promise(resolve => setTimeout(resolve, 200));
    return `(Mock) And he said unto them, Go ye into all the world, and preach the gospel to every creature. [${book} ${chapter}:${verse} - ${version}]`;
  }
}

// --- Gemini Adapter ---
class GeminiAdapter implements AiAdapter {
  private ai: GoogleGenAI;

  constructor() {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY environment variable not set for GeminiAdapter.");
    }
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async generateImage(visualPrompt: VisualPrompt): Promise<string> {
    console.log("Using Gemini Adapter for image generation.");
    try {
      const response = await this.ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: visualPrompt.prompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: visualPrompt.aspectRatio || "16:9",
        },
      });

      const imageBytes = response?.generatedImages?.[0]?.image?.imageBytes;

      if (imageBytes) {
        return `data:image/jpeg;base64,${imageBytes}`;
      } else {
        // Log the full response for debugging purposes and create a more informative error.
        console.warn("Image generation returned no images. Full API response:", response);
        
        // The exact structure for generateImages response's feedback isn't specified in the provided guidelines,
        // so we'll defensively check for a common pattern from other Gemini APIs.
        // @ts-ignore - a flexible check for feedback properties.
        const feedback = response.promptFeedback;
        const blockReason = feedback?.blockReason;
        const safetyRatings = feedback?.safetyRatings?.map((r: { category: string; probability: string; }) => `${r.category}: ${r.probability}`).join(', ');

        let errorMessage = "No image generated by Gemini API.";
        if (blockReason) {
          errorMessage += ` Reason: ${blockReason}.`;
        }
        if (safetyRatings) {
          errorMessage += ` Safety concerns: [${safetyRatings}].`;
        }
        
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("Error generating image with Gemini:", error);
      return 'https://picsum.photos/1280/720?grayscale';
    }
  }

  async startVideoGeneration(prompt: string): Promise<GenerateVideosOperation> {
    console.log("Using Gemini Adapter to start video generation.");
    return this.ai.models.generateVideos({
      model: 'veo-2.0-generate-001',
      prompt: prompt,
      config: { numberOfVideos: 1 }
    });
  }

  async getVideosOperation(operation: GenerateVideosOperation): Promise<GenerateVideosOperation> {
    console.log("Using Gemini Adapter to check video status.");
    return this.ai.operations.getVideosOperation({ operation: operation });
  }

  async generateVerseText(book: string, chapter: number, verse: number, version: string): Promise<string> {
    console.log("Using Gemini Adapter for verse text generation.");
    try {
      let versionPrompt = "";
      switch (version) {
        case "NIV":
          versionPrompt = "from the New International Version (NIV)";
          break;
        case "ESV":
          versionPrompt = "from the English Standard Version (ESV)";
          break;
        case "AMP":
          versionPrompt = "from the Amplified Bible (AMP)";
          break;
        case "Literal & Contextual":
          versionPrompt = "providing a modern, literal translation from the original languages (Hebrew/Greek)";
          break;
        case "KJV":
        default:
          versionPrompt = "from the King James Version (KJV)";
          break;
      }
      
      const prompt = `Provide the full and exact Bible verse text for ${book} chapter ${chapter} verse ${verse}, ${versionPrompt}. IMPORTANT: Only return the verse text itself. Do not include the verse reference, any introductory phrases like "Here is the verse:", quotation marks, or any other commentary.`;
      
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            temperature: 0.1, 
        }
      });

      const text = response.text.trim();
      if (text) {
        return text;
      } else {
        throw new Error("No text generated by Gemini API for verse.");
      }
    } catch (error) {
      console.error(`Error generating verse text for ${book} ${chapter}:${verse}:`, error);
      return `[Error fetching verse text from AI for ${book} ${chapter}:${verse}]`;
    }
  }
}

// --- Service Configuration ---
const useMock = !process.env.API_KEY; 
let adapter: AiAdapter;

if (useMock) {
  console.log("Bible Stories Alive is running in MOCK mode. No real API calls will be made.");
  adapter = new MockAdapter();
} else {
  try {
    adapter = new GeminiAdapter();
  } catch (error) {
    console.error("Failed to initialize Gemini Adapter, falling back to Mock Adapter.", error);
    adapter = new MockAdapter();
  }
}

export const generateImage = (visualPrompt: VisualPrompt): Promise<string> => {
  return adapter.generateImage(visualPrompt);
};

export const startVideoGeneration = (prompt: string): Promise<GenerateVideosOperation> => {
  return adapter.startVideoGeneration(prompt);
}

export const getVideosOperation = (operation: GenerateVideosOperation): Promise<GenerateVideosOperation> => {
  return adapter.getVideosOperation(operation);
}

export const generateVerseText = (book: string, chapter: number, verse: number, version: string): Promise<string> => {
  return adapter.generateVerseText(book, chapter, verse, version);
};
