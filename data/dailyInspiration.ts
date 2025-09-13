// FIX: Import FunFact from the central types file and remove the local definition.
import type { VerseRef, VisualPrompt, FunFact } from '../types';

export const funFacts: FunFact[] = [
  {
    id: 'angels-ophanim',
    question: 'Did you know some biblically accurate angels are described as terrifying wheels covered in eyes?',
    explanation: 'Forget the typical depiction of angels with wings and halos. In the vision of the prophet Ezekiel, the "Ophanim" are described as beings of immense and terrifying power, appearing as a wheel within a wheel, made of glowing beryl and covered all around with eyes. They move alongside the Cherubim and represent the omnipresence and omniscience of God.',
    scriptureRef: { book: 'Ezekiel', chapter: 1, verseStart: 15, verseEnd: 18 },
    visualPrompt: {
      id: 'vp-ophanim',
      prompt: 'A biblically accurate Ophan angel, a spinning wheel within a wheel, made of glowing beryl, covered with countless eyes all around the rims. The scene is cosmic, majestic, and awe-inspiring, not human-like. Ethereal, divine, and set against a backdrop of space and nebulae. A depiction of holy grandeur. Safe for all audiences. Constraints: no nudity, no graphic violence.',
      aspectRatio: '16:9',
    },
  },
  {
    id: 'leviathan',
    question: 'Did you know the Bible describes a sea creature so powerful that it breathes fire?',
    explanation: 'The Book of Job gives a fearsome description of the Leviathan, a colossal sea monster that cannot be tamed by man. The text vividly portrays it with scales like shields, and states that "sparks of fire leap out" and "smoke pours from its nostrils." This majestic beast symbolizes the awesome, untamable power of God\'s creation.',
    scriptureRef: { book: 'Job', chapter: 41, verseStart: 1, verseEnd: 34 },
    visualPrompt: {
      id: 'vp-leviathan',
      prompt: 'The mighty Leviathan, a colossal sea creature from the Book of Job, emerging from a stormy, dark sea. Its scales are like rows of impenetrable shields, and smoke pours from its nostrils with sparks of light erupting from its mouth. A powerful and majestic beast symbolizing God\'s creation. Dramatic, cinematic, photorealistic. Safe for all audiences. Constraints: no nudity, no graphic violence.',
      aspectRatio: '16:9',
    },
  },
  {
    id: 'tower-of-babel',
    question: 'Did you know the Tower of Babel was built so humanity could "make a name for themselves"?',
    explanation: 'The story of the Tower of Babel is about more than just the origin of different languages. It was a monumental act of human pride and unity in defiance of God\'s command to fill the earth. The people sought to build a tower that reached the heavens to consolidate their power and avoid being scattered. God intervened by confusing their language, leading to the diversity of peoples across the world.',
    scriptureRef: { book: 'Genesis', chapter: 11, verseStart: 4 },
    visualPrompt: {
      id: 'vp-babel',
      prompt: 'The Tower of Babel under construction, a massive, spiraling ziggurat of ancient brick and bitumen reaching towards dramatic clouds. Thousands of diverse workers from a united humanity build the structure, filled with great ambition to make a name for themselves. The scene is ancient, epic, and grand in scale, set in the plain of Shinar. Style: historical realism. Safe for all audiences. Constraints: no nudity, no graphic violence.',
      aspectRatio: '16:9',
    },
  },
];

export const versesOfTheDay: VerseRef[] = [
    { book: 'Philippians', chapter: 4, verseStart: 13 },
    { book: 'John', chapter: 3, verseStart: 16 },
    { book: 'Romans', chapter: 8, verseStart: 28 },
    { book: 'Jeremiah', chapter: 29, verseStart: 11 },
    { book: 'Proverbs', chapter: 3, verseStart: 5, verseEnd: 6 },
    { book: 'Isaiah', chapter: 41, verseStart: 10 },
    { book: 'Matthew', chapter: 11, verseStart: 28 },
    { book: 'Psalm', chapter: 23, verseStart: 1 },
];