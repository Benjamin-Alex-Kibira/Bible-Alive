// In a real application, this data would come from a comprehensive Bible API.
// This mock structure simulates a full Bible with multiple versions.

// Structure of the Bible: Book -> Number of Chapters
export const bibleStructure: Record<string, number[]> = {
  "Genesis": Array.from({ length: 50 }, (_, i) => i + 1), "Exodus": Array.from({ length: 40 }, (_, i) => i + 1),
  "Leviticus": Array.from({ length: 27 }, (_, i) => i + 1), "Numbers": Array.from({ length: 36 }, (_, i) => i + 1),
  "Deuteronomy": Array.from({ length: 34 }, (_, i) => i + 1), "Joshua": Array.from({ length: 24 }, (_, i) => i + 1),
  "Judges": Array.from({ length: 21 }, (_, i) => i + 1), "Ruth": Array.from({ length: 4 }, (_, i) => i + 1),
  "1 Samuel": Array.from({ length: 31 }, (_, i) => i + 1), "2 Samuel": Array.from({ length: 24 }, (_, i) => i + 1),
  "1 Kings": Array.from({ length: 22 }, (_, i) => i + 1), "2 Kings": Array.from({ length: 25 }, (_, i) => i + 1),
  "1 Chronicles": Array.from({ length: 29 }, (_, i) => i + 1), "2 Chronicles": Array.from({ length: 36 }, (_, i) => i + 1),
  "Ezra": Array.from({ length: 10 }, (_, i) => i + 1), "Nehemiah": Array.from({ length: 13 }, (_, i) => i + 1),
  "Esther": Array.from({ length: 10 }, (_, i) => i + 1), "Job": Array.from({ length: 42 }, (_, i) => i + 1),
  "Psalms": Array.from({ length: 150 }, (_, i) => i + 1), "Proverbs": Array.from({ length: 31 }, (_, i) => i + 1),
  "Ecclesiastes": Array.from({ length: 12 }, (_, i) => i + 1), "Song of Solomon": Array.from({ length: 8 }, (_, i) => i + 1),
  "Isaiah": Array.from({ length: 66 }, (_, i) => i + 1), "Jeremiah": Array.from({ length: 52 }, (_, i) => i + 1),
  "Lamentations": Array.from({ length: 5 }, (_, i) => i + 1), "Ezekiel": Array.from({ length: 48 }, (_, i) => i + 1),
  "Daniel": Array.from({ length: 12 }, (_, i) => i + 1), "Hosea": Array.from({ length: 14 }, (_, i) => i + 1),
  "Joel": Array.from({ length: 3 }, (_, i) => i + 1), "Amos": Array.from({ length: 9 }, (_, i) => i + 1),
  "Obadiah": Array.from({ length: 1 }, (_, i) => i + 1), "Jonah": Array.from({ length: 4 }, (_, i) => i + 1),
  "Micah": Array.from({ length: 7 }, (_, i) => i + 1), "Nahum": Array.from({ length: 3 }, (_, i) => i + 1),
  "Habakkuk": Array.from({ length: 3 }, (_, i) => i + 1), "Zephaniah": Array.from({ length: 3 }, (_, i) => i + 1),
  "Haggai": Array.from({ length: 2 }, (_, i) => i + 1), "Zechariah": Array.from({ length: 14 }, (_, i) => i + 1),
  "Malachi": Array.from({ length: 4 }, (_, i) => i + 1), "Matthew": Array.from({ length: 28 }, (_, i) => i + 1),
  "Mark": Array.from({ length: 16 }, (_, i) => i + 1), "Luke": Array.from({ length: 24 }, (_, i) => i + 1),
  "John": Array.from({ length: 21 }, (_, i) => i + 1), "Acts": Array.from({ length: 28 }, (_, i) => i + 1),
  "Romans": Array.from({ length: 16 }, (_, i) => i + 1), "1 Corinthians": Array.from({ length: 16 }, (_, i) => i + 1),
  "2 Corinthians": Array.from({ length: 13 }, (_, i) => i + 1), "Galatians": Array.from({ length: 6 }, (_, i) => i + 1),
  "Ephesians": Array.from({ length: 6 }, (_, i) => i + 1), "Philippians": Array.from({ length: 4 }, (_, i) => i + 1),
  "Colossians": Array.from({ length: 4 }, (_, i) => i + 1), "1 Thessalonians": Array.from({ length: 5 }, (_, i) => i + 1),
  "2 Thessalonians": Array.from({ length: 3 }, (_, i) => i + 1), "1 Timothy": Array.from({ length: 6 }, (_, i) => i + 1),
  "2 Timothy": Array.from({ length: 4 }, (_, i) => i + 1), "Titus": Array.from({ length: 3 }, (_, i) => i + 1),
  "Philemon": Array.from({ length: 1 }, (_, i) => i + 1), "Hebrews": Array.from({ length: 13 }, (_, i) => i + 1),
  "James": Array.from({ length: 5 }, (_, i) => i + 1), "1 Peter": Array.from({ length: 5 }, (_, i) => i + 1),
  "2 Peter": Array.from({ length: 3 }, (_, i) => i + 1), "1 John": Array.from({ length: 5 }, (_, i) => i + 1),
  "2 John": Array.from({ length: 1 }, (_, i) => i + 1), "3 John": Array.from({ length: 1 }, (_, i) => i + 1),
  "Jude": Array.from({ length: 1 }, (_, i) => i + 1), "Revelation": Array.from({ length: 22 }, (_, i) => i + 1),
};

// A very rough approximation of verses per chapter
export const getVerseCount = (book: string, chapter: number): number => {
    if (book === "Psalms" && chapter === 119) return 176;
    return 25 + ( (chapter * 3 + book.length) % 20); // Pseudo-random verse count
}

type BibleData = Record<string, Record<string, Record<number, Record<number, { text: string; contextualMeaning?: string; commentary?: { source: string; text: string } }>>>>;

const generateFullBibleData = (): BibleData => {
    const data: BibleData = { "KJV": {}, "Literal & Contextual": {} };
    for (const book in bibleStructure) {
        data["KJV"][book] = {};
        data["Literal & Contextual"][book] = {};
        for (const chapter of bibleStructure[book]) {
            data["KJV"][book][chapter] = {};
            data["Literal & Contextual"][book][chapter] = {};
            const verseCount = getVerseCount(book, chapter);
            for (let verse = 1; verse <= verseCount; verse++) {
                const placeholderText = `This is the placeholder text for ${book} ${chapter}:${verse} (KJV).`;
                data["KJV"][book][chapter][verse] = { text: placeholderText };

                const placeholderContext = `This is the mock contextual meaning for ${book} ${chapter}:${verse}. It explains the original Hebrew/Greek, cultural context, and literary significance to guide AI generation.`;
                 data["Literal & Contextual"][book][chapter][verse] = {
                    text: `This is the placeholder text for ${book} ${chapter}:${verse} (Literal).`,
                    contextualMeaning: placeholderContext
                };
            }
        }
    }
    return data;
};

export const bibleData: BibleData = generateFullBibleData();

// --- Merge specific, hand-written verses back into the generated data ---
const specificVerses: Record<string, Record<string, Record<string, any>>> = {
  "Genesis": { 1: { 1: { text: "In the beginning God created the heavens and the earth." }}},
  "Exodus": { 14: { 21: { text: "Then Moses stretched out his hand over the sea, and all that night the Lord drove the sea back with a strong east wind and turned it into dry land." }}},
  "Luke": { 2: { 7: { text: "and she gave birth to her firstborn, a son. She wrapped him in cloths and placed him in a manger, because there was no guest room available for them." }}},
  "John": { 1: { 1: { text: "In the beginning was the Word, and the Word was with God, and the Word was God." }}},
  "Revelation": {
    1: {
      9: {
        text: "I, John, your brother and companion in the suffering and kingdom and patient endurance that are ours in Jesus, was on the island of Patmos because of the word of God and the testimony of Jesus.",
        contextualMeaning: "This verse establishes the author (Apostle John), his circumstances (exiled to Patmos, a Roman penal colony, for his faith), and his solidarity with his audience ('your brother and companion in suffering'). The core idea is faithfulness amidst persecution. The vision that follows is a divine revelation given to him in this state of endurance.",
        commentary: {
            source: "John Gill's Exposition",
            text: "He describes himself by his name, John, a name common to many, but well known to these churches... he calls himself their brother, not in a natural, but in a spiritual relation... also their companion in tribulation; for as they had tribulation in the world, so had he... and particularly he was in the isle that is called Patmos; which is one of the islands of the Sporades, in the Icarian sea..."
        }
      }
    },
    3: {
      8: {
        text: "I know your deeds. See, I have placed before you an open door that no one can shut. I know that you have little strength, yet you have kept my word and have not denied my name.",
        contextualMeaning: "Spoken to the church in Philadelphia, this verse is a promise of divine opportunity. The 'open door' in this cultural context signifies an unhindered chance to evangelize and spread the Gospel. Despite the church's 'little strength' (likely meaning small numbers or lack of political influence), their faithfulness is rewarded with a divine commission that no human authority can revoke.",
        commentary: {
            source: "Matthew Henry's Commentary",
            text: "The church of Philadelphia is commended. Though this church was not in a place of much wealth, power, and influence, yet they had kept God's word. Their works were known and approved. Christ puts the keys of the house of David in his hand, the government of the church. He now gives a promise of perseverance. He sets before them an open door of opportunity, both for the preaching of the gospel and for their own entrance into heaven, a door that none can shut."
        }
      }
    }
  }
};

for (const book in specificVerses) {
    for (const chapter in specificVerses[book]) {
        for (const verse in specificVerses[book][chapter]) {
            const verseData = specificVerses[book][chapter][verse];
            const chapNum = parseInt(chapter);
            const verseNum = parseInt(verse);
            // KJV just gets the text
            bibleData["KJV"][book][chapNum][verseNum] = { text: verseData.text };
            // Literal & Contextual gets everything
            bibleData["Literal & Contextual"][book][chapNum][verseNum] = {
                text: verseData.text, // In a real app, this could be a more literal translation
                contextualMeaning: verseData.contextualMeaning,
                commentary: verseData.commentary
            };
        }
    }
}

export const allBookNames = Object.keys(bibleStructure);