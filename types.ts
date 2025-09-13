
export interface VerseRef {
  book: string;
  chapter: number;
  verseStart: number;
  verseEnd?: number;
}

export interface VisualPrompt {
  id: string;
  prompt: string;
  aspectRatio?: "16:9" | "4:3" | "1:1"; // Updated to match imagen-4.0-generate-001 supported values
  styleTags?: string[];
}

export interface Scene {
  id: string;
  title: string;
  verses: VerseRef[];
  narration?: string;
  visualPrompt: VisualPrompt;
}

export interface Story {
  id: string;
  slug: string;
  title: string;
  canonicalRefs: VerseRef[];
  canonicalText?: string;
  scenes: Scene[];
  tags?: string[];
}

export interface StructuredImagePrompt {
    sceneTitle: string;
    verseSummary: string;
    style: string;
    mood: string;
    camera: string;
    lighting: string;
    composition: string;
}
