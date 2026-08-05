import { motion } from "framer-motion";
import { Check, Pencil, Trash2 } from "lucide-react";
import type { VocabWord } from "@/types";
import { classNames } from "@/lib/utils";

interface WordCardProps {
  word: VocabWord;
  onEdit: () => void;
  onDelete: () => void;
  onToggleLearned: () => void;
}

export function WordCard({ word, onEdit, onDelete, onToggleLearned }: WordCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.18 }}
      className="card flex flex-col gap-3 p-4 sm:flex-row sm:items-start sm:justify-between sm:gap-4"
    >
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-display text-base font-semibold text-ink">{word.english}</h3>
          <span className="text-ink-faint">&mdash;</span>
          <span className="text-sm text-ink-muted">{word.uzbek}</span>
          {word.learned && (
            <span className="inline-flex items-center gap-1 rounded-full bg-success-soft px-2 py-0.5 text-[11px] font-medium text-success">
              <Check size={11} strokeWidth={3} />
              Learned
            </span>
          )}
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{word.example}</p>
      </div>

      <div className="flex shrink-0 items-center gap-1 self-end sm:self-start">
        <button
          onClick={onToggleLearned}
          aria-pressed={word.learned}
          title={word.learned ? "Mark as not learned" : "Mark as learned"}
          className={classNames(
            "flex h-8 w-8 items-center justify-center rounded-lg border transition-colors",
            word.learned
              ? "border-success/30 bg-success-soft text-success"
              : "border-border text-ink-faint hover:border-success/30 hover:text-success"
          )}
        >
          <Check size={15} strokeWidth={2.5} />
        </button>
        <button
          onClick={onEdit}
          title="Edit word"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-ink-faint transition-colors hover:border-accent/30 hover:text-accent"
        >
          <Pencil size={14} strokeWidth={2.25} />
        </button>
        <button
          onClick={onDelete}
          title="Delete word"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-ink-faint transition-colors hover:border-danger/30 hover:text-danger"
        >
          <Trash2 size={14} strokeWidth={2.25} />
        </button>
      </div>
    </motion.div>
  );
}
