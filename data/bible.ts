// A very small, mocked sample of Bible data.
// In a real application, this would come from an API or a full database.
export const bibleData: Record<string, Record<number, Record<number, string>>> = {
  "Genesis": {
    1: {
      1: "In the beginning God created the heavens and the earth.",
      2: "Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters.",
      3: "And God said, “Let there be light,” and there was light.",
      4: "God saw that the light was good, and he separated the light from the darkness.",
      5: "God called the light “day,” and the darkness he called “night.” And there was evening, and there was morning—the first day."
    }
  },
  "Exodus": {
    14: {
      21: "Then Moses stretched out his hand over the sea, and all that night the Lord drove the sea back with a strong east wind and turned it into dry land.",
      22: "The waters were divided, and the Israelites went through the sea on dry ground, with a wall of water on their right and on their left.",
      23: "The Egyptians pursued them, and all Pharaoh’s horses and chariots and horsemen followed them into the sea."
    }
  },
  "Luke": {
    2: {
      6: "While they were there, the time came for the baby to be born,",
      7: "and she gave birth to her firstborn, a son. She wrapped him in cloths and placed him in a manger, because there was no guest room available for them.",
      8: "And there were shepherds living out in the fields nearby, keeping watch over their flocks at night.",
      9: "An angel of the Lord appeared to them, and the glory of the Lord shone around them, and they were terrified.",
      10: "But the angel said to them, “Do not be afraid. I bring you good news that will cause great joy for all the people."
    }
  },
  "John": {
    1: {
        1: "In the beginning was the Word, and the Word was with God, and the Word was God.",
        2: "He was with God in the beginning.",
        3: "Through him all things were made; without him nothing was made that has been made.",
        4: "In him was life, and that life was the light of all mankind.",
        5: "The light shines in the darkness, and the darkness has not overcome it."
    }
  }
};

export const allBookNames = [
    "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel", 
    "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah", "Esther", "Job", "Psalms", "Proverbs", 
    "Ecclesiastes", "Song of Solomon", "Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel", 
    "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi", 
    "Matthew", "Mark", "Luke", "John", "Acts", "Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians", 
    "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians", "1 Timothy", "2 Timothy", "Titus", "Philemon", 
    "Hebrews", "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John", "Jude", "Revelation"
];