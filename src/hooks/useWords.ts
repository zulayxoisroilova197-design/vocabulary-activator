import { useLiveQuery } from "dexie-react-hooks";
import { useMemo } from "react";
import { db } from "@/db";
import type { NewVocabWord, VocabWord } from "@/types";

export function useWords(searchTerm = "") {
  const words = useLiveQuery(
    () => db.words.orderBy("createdAt").reverse().toArray(),
    []
  );

  const filteredWords = useMemo(() => {
    if (!words) return undefined;

    const term = searchTerm.trim().toLowerCase();

    if (!term) return words;

    return words.filter(
      (w) =>
        w.english.toLowerCase().includes(term) ||
        w.uzbek.toLowerCase().includes(term) ||
        w.example.toLowerCase().includes(term)
    );
  }, [words, searchTerm]);

  return {
    words: filteredWords,
    isLoading: words === undefined,
    isEmpty: words !== undefined && words.length === 0,
  };
}

export async function addWord(word: NewVocabWord): Promise<number> {
  const now = Date.now();

  const id = await db.words.add({
    ...word,
    learned: false,
    createdAt: now,
    updatedAt: now,
    timesReviewed: 0,
  } as VocabWord);

  if (id === undefined) {
    throw new Error("Word ID was not created");
  }

  return id;
}

export async function updateWord(
  id: number,
  changes: Partial<VocabWord>
): Promise<void> {
  await db.words.update(id, {
    ...changes,
    updatedAt: Date.now(),
  });
}

export async function deleteWord(id: number): Promise<void> {
  await db.words.delete(id);
}

export async function toggleLearned(
  id: number,
  learned: boolean
): Promise<void> {
  await db.words.update(id, {
    learned,
    updatedAt: Date.now(),
  });
}