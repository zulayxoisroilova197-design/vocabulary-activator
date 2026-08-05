import { type FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";
import type { NewVocabWord, VocabWord } from "@/types";

interface WordFormProps {
  initialWord?: VocabWord;
  onSubmit: (word: NewVocabWord) => Promise<void> | void;
  onCancel: () => void;
}

interface FormErrors {
  english?: string;
  uzbek?: string;
  example?: string;
}

export function WordForm({ initialWord, onSubmit, onCancel }: WordFormProps) {
  const [english, setEnglish] = useState(initialWord?.english ?? "");
  const [uzbek, setUzbek] = useState(initialWord?.uzbek ?? "");
  const [example, setExample] = useState(initialWord?.example ?? "");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const nextErrors: FormErrors = {};
    if (!english.trim()) nextErrors.english = "Enter the English word.";
    if (!uzbek.trim()) nextErrors.uzbek = "Enter the Uzbek meaning.";
    if (!example.trim()) nextErrors.example = "Add an example sentence.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      await onSubmit({ english: english.trim(), uzbek: uzbek.trim(), example: example.trim() });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div>
        <label htmlFor="english" className="mb-1.5 block text-xs font-medium text-ink-muted">
          English word
        </label>
        <input
          id="english"
          value={english}
          onChange={(e) => setEnglish(e.target.value)}
          placeholder="e.g. resilient"
          className="input"
          autoFocus
        />
        {errors.english && <p className="mt-1.5 text-xs text-danger">{errors.english}</p>}
      </div>

      <div>
        <label htmlFor="uzbek" className="mb-1.5 block text-xs font-medium text-ink-muted">
          Uzbek meaning
        </label>
        <input
          id="uzbek"
          value={uzbek}
          onChange={(e) => setUzbek(e.target.value)}
          placeholder="e.g. chidamli, bardoshli"
          className="input"
        />
        {errors.uzbek && <p className="mt-1.5 text-xs text-danger">{errors.uzbek}</p>}
      </div>

      <div>
        <label htmlFor="example" className="mb-1.5 block text-xs font-medium text-ink-muted">
          Example sentence
        </label>
        <textarea
          id="example"
          value={example}
          onChange={(e) => setExample(e.target.value)}
          placeholder="Write a sentence that uses the word naturally."
          rows={3}
          className="input resize-none"
        />
        {errors.example && <p className="mt-1.5 text-xs text-danger">{errors.example}</p>}
      </div>

      <div className="mt-2 flex justify-end gap-3">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {initialWord ? "Save changes" : "Add word"}
        </Button>
      </div>
    </form>
  );
}
