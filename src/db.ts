import Dexie, { type EntityTable } from "dexie";
import type { VocabWord } from "./types";

class VocabularyDatabase extends Dexie {
  words!: EntityTable<VocabWord, "id">;

  constructor() {
    super("VocabularyActivatorDB");

    this.version(1).stores({
      words: "++id, english, learned, createdAt",
    });
  }
}

export const db = new VocabularyDatabase();

export async function seedIfEmpty(): Promise<void> {
  const count = await db.words.count();
  if (count > 0) return;

  const now = Date.now();
  const starterWords: Array<Omit<VocabWord, "id">> = [
    {
      english: "resilient",
      uzbek: "chidamli, bardoshli",
      example: "Despite the setbacks, she remained resilient and kept working toward her goal.",
      learned: false,
      createdAt: now,
      updatedAt: now,
      timesReviewed: 0,
    },
    {
      english: "abundant",
      uzbek: "mo'l-ko'l, sershovqin",
      example: "The region has abundant natural resources, including fertile soil and clean water.",
      learned: false,
      createdAt: now,
      updatedAt: now,
      timesReviewed: 0,
    },
    {
      english: "curious",
      uzbek: "qiziquvchan",
      example: "The curious child asked her teacher dozens of questions after class.",
      learned: false,
      createdAt: now,
      updatedAt: now,
      timesReviewed: 0,
    },
    {
      english: "deliberate",
      uzbek: "ataylab, ongli ravishda qilingan",
      example: "He took a deliberate pause before answering the difficult question.",
      learned: false,
      createdAt: now,
      updatedAt: now,
      timesReviewed: 0,
    },
    {
      english: "genuine",
      uzbek: "haqiqiy, samimiy",
      example: "Her genuine interest in his work made the conversation feel warm.",
      learned: false,
      createdAt: now,
      updatedAt: now,
      timesReviewed: 0,
    },
    {
      english: "perspective",
      uzbek: "nuqtai nazar, qarash",
      example: "Traveling abroad gave him a new perspective on his own culture.",
      learned: false,
      createdAt: now,
      updatedAt: now,
      timesReviewed: 0,
    },
  ];

  await db.words.bulkAdd(starterWords as VocabWord[]);
}
