import type { KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { Check, RotateCw, Volume2 } from "lucide-react";
import type { VocabWord } from "@/types";
import { classNames } from "@/lib/utils";

interface FlashcardProps {
  word: VocabWord;
  isFlipped: boolean;
  onFlip: () => void;
}

function speak(text: string) {
  if (!("speechSynthesis" in window)) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.95;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

export function Flashcard({ word, isFlipped, onFlip }: FlashcardProps) {
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onFlip();
    }
  }

  return (
    <div className="[perspective:1600px]">
      <motion.div
        onClick={onFlip}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label="Flip card"
        className="card relative block h-72 w-full cursor-pointer text-left [transform-style:preserve-3d] sm:h-80"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className={classNames(
            "absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 [backface-visibility:hidden]"
          )}
        >
          <span className="rounded-full bg-surface-raised px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-ink-faint">
            English
          </span>
          <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">{word.english}</h2>
          <button
            onClick={(e) => {
              e.stopPropagation();
              speak(word.english);
            }}
            aria-label="Pronounce word"
            className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs text-ink-muted transition-colors hover:border-accent/40 hover:text-accent"
          >
            <Volume2 size={13} />
            Listen
          </button>
          <p className="absolute bottom-5 flex items-center gap-1.5 text-[11px] text-ink-faint">
            <RotateCw size={11} />
            Tap to flip
          </p>
          {word.learned && (
            <span className="absolute right-5 top-5 flex items-center gap-1 rounded-full bg-success-soft px-2 py-0.5 text-[11px] font-medium text-success">
              <Check size={11} strokeWidth={3} />
              Learned
            </span>
          )}
        </div>

        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 [backface-visibility:hidden] [transform:rotateY(180deg)]"
        >
          <span className="rounded-full bg-accent-soft px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-accent">
            Uzbek
          </span>
          <h2 className="text-center font-display text-2xl font-semibold text-ink sm:text-3xl">{word.uzbek}</h2>
          <div className="mx-auto flex items-center gap-2 text-ink-faint" aria-hidden="true">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-border" />
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-border" />
          </div>
          <p className="max-w-sm text-center text-sm leading-relaxed text-ink-muted">{word.example}</p>
        </div>
      </motion.div>
    </div>
  );
}
