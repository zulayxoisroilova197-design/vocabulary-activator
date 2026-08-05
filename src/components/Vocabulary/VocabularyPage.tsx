import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { BookOpen, Plus } from "lucide-react";
import { useWords, addWord, updateWord, deleteWord, toggleLearned } from "@/hooks/useWords";
import { SearchBar } from "@/components/Vocabulary/SearchBar";
import { WordCard } from "@/components/Vocabulary/WordCard";
import { WordForm } from "@/components/Vocabulary/WordForm";
import { Modal } from "@/components/ui/Modal";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import type { NewVocabWord, VocabWord } from "@/types";

export function VocabularyPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { words, isLoading, isEmpty } = useWords(searchTerm);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingWord, setEditingWord] = useState<VocabWord | null>(null);
  const [wordPendingDelete, setWordPendingDelete] = useState<VocabWord | null>(null);

  function openAddForm() {
    setEditingWord(null);
    setIsFormOpen(true);
  }

  function openEditForm(word: VocabWord) {
    setEditingWord(word);
    setIsFormOpen(true);
  }

  function closeForm() {
    setIsFormOpen(false);
    setEditingWord(null);
  }

  async function handleSubmit(word: NewVocabWord) {
    if (editingWord?.id) {
      await updateWord(editingWord.id, word);
    } else {
      await addWord(word);
    }
    closeForm();
  }

  async function handleConfirmDelete() {
    if (wordPendingDelete?.id) {
      await deleteWord(wordPendingDelete.id);
    }
    setWordPendingDelete(null);
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink">My vocabulary</h1>
          <p className="mt-1 text-sm text-ink-muted">
            {words ? `${words.length} word${words.length === 1 ? "" : "s"}` : "Loading..."}
          </p>
        </div>
        <Button onClick={openAddForm} icon={<Plus size={16} strokeWidth={2.5} />}>
          Add word
        </Button>
      </div>

      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      {isLoading && (
        <div className="grid gap-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="card h-20 animate-pulse bg-surface-raised" />
          ))}
        </div>
      )}

      {!isLoading && isEmpty && searchTerm === "" && (
        <EmptyState
          icon={<BookOpen size={20} />}
          title="No words yet"
          description="Start building your vocabulary by adding your first English word with its Uzbek meaning and an example sentence."
          action={
            <Button onClick={openAddForm} icon={<Plus size={16} strokeWidth={2.5} />} className="mt-1">
              Add your first word
            </Button>
          }
        />
      )}

      {!isLoading && words && words.length === 0 && searchTerm !== "" && (
        <EmptyState
          icon={<BookOpen size={20} />}
          title="No matches"
          description={`Nothing matches "${searchTerm}". Try a different search term.`}
        />
      )}

      <div className="flex flex-col gap-3">
        <AnimatePresence initial={false} mode="popLayout">
          {words?.map((word) => (
            <WordCard
              key={word.id}
              word={word}
              onEdit={() => openEditForm(word)}
              onDelete={() => setWordPendingDelete(word)}
              onToggleLearned={() => word.id && toggleLearned(word.id, !word.learned)}
            />
          ))}
        </AnimatePresence>
      </div>

      <Modal isOpen={isFormOpen} onClose={closeForm} title={editingWord ? "Edit word" : "Add a new word"}>
        <WordForm initialWord={editingWord ?? undefined} onSubmit={handleSubmit} onCancel={closeForm} />
      </Modal>

      <ConfirmDialog
        isOpen={wordPendingDelete !== null}
        title="Delete word"
        message={`Are you sure you want to delete "${wordPendingDelete?.english}"? This cannot be undone.`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setWordPendingDelete(null)}
      />
    </div>
  );
}
