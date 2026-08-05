export interface VocabWord {
  id?: number;
  english: string;
  uzbek: string;
  example: string;
  learned: boolean;
  createdAt: number;
  updatedAt: number;
  timesReviewed: number;
}

export type NewVocabWord = Pick<VocabWord, "english" | "uzbek" | "example">;

export type AppTab = "vocabulary" | "flashcards" | "quiz" | "speaking";

export interface QuizQuestion {
  word: VocabWord;
  options: string[];
  correctIndex: number;
}

export type QuizAnswerState = "unanswered" | "correct" | "incorrect";

export type SpeechRecognitionStatus = "idle" | "listening" | "finished" | "unsupported" | "error";
