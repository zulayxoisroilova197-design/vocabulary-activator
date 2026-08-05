import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, Layers, Shuffle } from "lucide-react";
import { useWords, toggleLearned } from "@/hooks/useWords";
import { Flashcard } from "@/components/Flashcards/Flashcard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { shuffleArray } from "@/lib/utils";
import type { VocabWord } from "@/types";

export function FlashcardsPage() {
  const { words, isLoading, isEmpty } = useWords();
  const [order, setOrder] = useState<VocabWord[]>([]);
  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (words) {
      setOrder(words);
      setIndex((current) => Math.min(current, Math.max(words.length - 1, 0)));
    }
  }, [words]);

  const currentWord = order[index];

  function goTo(newIndex: number, dir: 1 | -1) {
    if (order.length === 0) return;
    setDirection(dir);
    setIsFlipped(false);
    setIndex((newIndex + order.length) % order.length);
  }

  function handleShuffle() {
    setOrder((current) => shuffleArray(current));
    setIndex(0);
    setIsFlipped(false);
    setDirection(1);
  }

  if (isLoading) {
    return <div className="card h-80 animate-pulse bg-surface-raised" />;
  }

  if (isEmpty) {
    return (
      <EmptyState
        icon={<Layers size={20} />}
        title="Nothing to review yet"
        description="Add some words in the Vocabulary tab first, then come back to practice with flashcards."
      />
    );
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-ink">Flashcards</h1>
        <span className="font-mono text-xs text-ink-muted">
          {index + 1} / {order.length}
        </span>
      </div>

      <div className="w-full max-w-md">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentWord?.id}
            custom={direction}
            initial={{ opacity: 0, x: 24 * direction }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 * direction }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            {currentWord && (
              <Flashcard word={currentWord} isFlipped={isFlipped} onFlip={() => setIsFlipped((f) => !f)} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => goTo(index - 1, -1)}
          aria-label="Previous card"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-ink-muted transition-colors hover:border-accent/40 hover:text-accent"
        >
          <ChevronLeft size={18} />
        </button>

        <Button
          variant={currentWord?.learned ? "secondary" : "primary"}
          icon={<Check size={16} strokeWidth={2.5} />}
          onClick={() => currentWord?.id && toggleLearned(currentWord.id, !currentWord.learned)}
        >
          {currentWord?.learned ? "Learned" : "Mark as learned"}
        </Button>

        <button
          onClick={() => goTo(index + 1, 1)}
          aria-label="Next card"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-ink-muted transition-colors hover:border-accent/40 hover:text-accent"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <button
        onClick={handleShuffle}
        className="flex items-center gap-1.5 text-xs font-medium text-ink-muted transition-colors hover:text-accent"
      >
        <Shuffle size={13} />
        Shuffle deck
      </button>
    </div>
  );
}
