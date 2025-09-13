
import type { Story } from '../types';

export const stories: Story[] = [
  {
    id: 'genesis-1',
    slug: 'genesis-1',
    title: 'The Creation',
    canonicalRefs: [{ book: 'Genesis', chapter: 1, verseStart: 1, verseEnd: 31 }],
    canonicalText: 'In the beginning God created the heavens and the earth...',
    tags: ['Genesis', 'Creation', 'Beginnings'],
    scenes: [
      {
        id: 'scene-1-1',
        title: 'Let There Be Light',
        verses: [{ book: 'Genesis', chapter: 1, verseStart: 3, verseEnd: 5 }],
        narration: "And God said, 'Let there be light,' and there was light. God saw that the light was good, and he separated the light from the darkness.",
        visualPrompt: {
          id: 'vp-1-1',
          prompt: "A divine, powerful light piercing through a formless void and darkness, separating into brilliant day and deep night. Abstract, cosmic, and awe-inspiring.",
          aspectRatio: "16:9",
          styleTags: ["cosmic", "ethereal", "divine light"]
        }
      },
      {
        id: 'scene-1-2',
        title: 'The Firmament',
        verses: [{ book: 'Genesis', chapter: 1, verseStart: 6, verseEnd: 8 }],
        narration: 'And God said, "Let there be an expanse in the midst of the waters, and let it separate the waters from the waters."',
        visualPrompt: {
          id: 'vp-1-2',
          prompt: 'A vast expanse, the sky, being formed, separating primordial waters above from the waters below. A grand architectural act of creation.',
          aspectRatio: "16:9",
          styleTags: ["elemental", "vast", "creation"]
        }
      }
    ]
  },
  {
    id: 'exodus-14',
    slug: 'exodus-14',
    title: 'The Parting of the Red Sea',
    canonicalRefs: [{ book: 'Exodus', chapter: 14, verseStart: 1, verseEnd: 31 }],
    canonicalText: 'Then Moses stretched out his hand over the sea...',
    tags: ['Exodus', 'Moses', 'Miracle'],
    scenes: [
      {
        id: 'scene-2-1',
        title: 'The Stretched-Out Hand',
        verses: [{ book: 'Exodus', chapter: 14, verseStart: 21, verseEnd: 22 }],
        narration: 'Then Moses stretched out his hand over the sea, and all that night the Lord drove the sea back with a strong east wind and turned it into dry land. The waters were divided, and the Israelites went through the sea on dry ground, with a wall of water on their right and on their left.',
        visualPrompt: {
          id: 'vp-2-1',
          prompt: 'Moses standing on the shore, his staff outstretched towards the Red Sea as a powerful wind begins to churn the waters, which are starting to part, revealing a path of dry land. A wall of water is forming on either side. Dramatic, cinematic, and powerful.',
          aspectRatio: "16:9",
          styleTags: ["cinematic", "dramatic", "epic"]
        }
      },
      {
        id: 'scene-2-2',
        title: 'The Egyptian Pursuit',
        verses: [{ book: 'Exodus', chapter: 14, verseStart: 23, verseEnd: 25 }],
        narration: 'The Egyptians pursued them, and all Pharaoh’s horses and chariots and horsemen followed them into the sea.',
        visualPrompt: {
          id: 'vp-2-2',
          prompt: 'Pharaoh\'s army of chariots and horsemen charging down the path of dry land between the towering walls of water, in hot pursuit of the Israelites. A sense of impending doom and urgency.',
          aspectRatio: "16:9",
          styleTags: ["action", "historical", "tense"]
        }
      }
    ]
  },
  {
    id: 'luke-2',
    slug: 'luke-2',
    title: 'The Nativity',
    canonicalRefs: [{ book: 'Luke', chapter: 2, verseStart: 1, verseEnd: 20 }],
    canonicalText: 'In those days Caesar Augustus issued a decree that a census should be taken...',
    tags: ['Luke', 'Jesus', 'Nativity'],
    scenes: [
      {
        id: 'scene-3-1',
        title: 'No Room at the Inn',
        verses: [{ book: 'Luke', chapter: 2, verseStart: 6, verseEnd: 7 }],
        narration: 'While they were there, the time came for the baby to be born, and she gave birth to her firstborn, a son. She wrapped him in cloths and placed him in a manger, because there was no guest room available for them.',
        visualPrompt: {
          id: 'vp-3-1',
          prompt: 'A humble, quiet stable in Bethlehem at night. Mary gently holds the newborn Jesus, wrapped in cloths, while Joseph looks on with reverence. The scene is lit by a single, warm lantern and a divine glow from the child. Peaceful, serene, and holy.',
          aspectRatio: "4:3",
          styleTags: ["serene", "holy", "renaissance painting"]
        }
      },
      {
        id: 'scene-3-2',
        title: 'The Shepherds and the Angel',
        verses: [{ book: 'Luke', chapter: 2, verseStart: 8, verseEnd: 12 }],
        narration: 'An angel of the Lord appeared to them, and the glory of the Lord shone around them, and they were terrified. But the angel said to them, "Do not be afraid. I bring you good news that will cause great joy for all the people."',
        visualPrompt: {
          id: 'vp-3-2',
          prompt: 'On a dark hillside outside Bethlehem, a group of shepherds look up in awe and fear as a brilliant angel appears in the night sky, surrounded by a radiant, divine light. A flock of sheep are scattered around them.',
          aspectRatio: "16:9",
          styleTags: ["divine", "awe-inspiring", "night"]
        }
      }
    ]
  }
];
