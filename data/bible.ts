// In a real application, this data would come from a comprehensive Bible API.
// This mock structure simulates a full Bible with multiple versions.

// Structure of the Bible: Book -> Number of Chapters
const bibleStructure: Record<string, number[]> = {
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
const getVerseCount = (book: string, chapter: number): number => {
    if (book === "Psalms" && chapter === 119) return 176;
    return 25 + ( (chapter * 3 + book.length) % 20); // Pseudo-random verse count
}

type BibleData = Record<string, Record<string, Record<number, Record<number, { text: string; contextualMeaning?: string }>>>>;

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
// FIX: Add an explicit type to help TypeScript understand the structure of specificVerses
// and prevent incorrect type inference that causes errors in the for...in loop.
const specificVerses: Record<string, Record<string, Record<string, string>>> = {
  "Genesis": { 1: { 1: "In the beginning God created the heavens and the earth.", 2: "Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters.", 3: "And God said, “Let there be light,” and there was light.", 4: "God saw that the light was good, and he separated the light from the darkness.", 5: "God called the light “day,” and the darkness he called “night.” And there was evening, and there was morning—the first day." } },
  "Exodus": { 14: { 21: "Then Moses stretched out his hand over the sea, and all that night the Lord drove the sea back with a strong east wind and turned it into dry land.", 22: "The waters were divided, and the Israelites went through the sea on dry ground, with a wall of water on their right and on their left.", 23: "The Egyptians pursued them, and all Pharaoh’s horses and chariots and horsemen followed them into the sea." } },
  "Luke": { 2: { 6: "While they were there, the time came for the baby to be born,", 7: "and she gave birth to her firstborn, a son. She wrapped him in cloths and placed him in a manger, because there was no guest room available for them.", 8: "And there were shepherds living out in the fields nearby, keeping watch over their flocks at night.", 9: "An angel of the Lord appeared to them, and the glory of the Lord shone around them, and they were terrified.", 10: "But the angel said to them, “Do not be afraid. I bring you good news that will cause great joy for all the people." } },
  "John": { 1: { 1: "In the beginning was the Word, and the Word was with God, and the Word was God.", 2: "He was with God in the beginning.", 3: "Through him all things were made; without him nothing was made that has been made.", 4: "In him was life, and that life was the light of all mankind.", 5: "The light shines in the darkness, and the darkness has not overcome it." } },
  "Revelation": { 3: { 8: "I know your deeds. See, I have placed before you an open door that no one can shut. I know that you have little strength, yet you have kept my word and have not denied my name." } }
};

// FIX: The loops are simplified by removing complex and incorrect type assertions,
// which is possible now that `specificVerses` has an explicit type.
for (const book in specificVerses) {
    for (const chapter in specificVerses[book]) {
        for (const verse in specificVerses[book][chapter]) {
            const text = specificVerses[book][chapter][verse];
            bibleData["KJV"][book][parseInt(chapter)][parseInt(verse)] = { text };
            bibleData["Literal & Contextual"][book][parseInt(chapter)][parseInt(verse)] = {
                text,
                contextualMeaning: `For ${book} ${chapter}:${verse}, the original text emphasizes [mock detail, e.g., the continuous nature of an action]. This suggests a powerful, ongoing divine presence rather than a single event. The cultural context of an 'open door' in Revelation refers to an opportunity for mission and witness that is divinely granted and cannot be thwarted by human opposition.`
            };
        }
    }
}


export const allBookNames = Object.keys(bibleStructure);