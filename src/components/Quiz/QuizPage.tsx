import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Check, ListChecks, RotateCcw, X } from "lucide-react";
import { useWords } from "@/hooks/useWords";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { pickRandom, shuffleArray, classNames } from "@/lib/utils";
import type { QuizAnswerState, QuizQuestion, VocabWord } from "@/types";

const QUESTIONS_PER_ROUND = 10;
const MIN_WORDS_REQUIRED = 4;

function buildQuestions(words: VocabWord[]): QuizQuestion[] {
  const questionWords = shuffleArray(words).slice(0, Math.min(QUESTIONS_PER_ROUND, words.length));

  return questionWords.map((word) => {
    const distractors = pickRandom(words, 3, word).map((w) => w.uzbek);
    const options = shuffleArray([word.uzbek, ...distractors]);
    return {
      word,
      options,
      correctIndex: options.indexOf(word.uzbek),
    };
  });
}

export function QuizPage() {
  const { words, isLoading, isEmpty } = useWords();
  const [questions, setQuestions] = useState<QuizQuestion[] | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answerState, setAnswerState] = useState<QuizAnswerState>("unanswered");
  const [score, setScore] = useState(0);

  const hasEnoughWords = (words?.length ?? 0) >= MIN_WORDS_REQUIRED;

  const currentQuestion = questions?.[currentIndex];
  const isLastQuestion = questions ? currentIndex === questions.length - 1 : false;
  const isFinished = questions !== null && currentIndex >= questions.length;

  function startQuiz() {
    if (!words) return;
    setQuestions(buildQuestions(words));
    setCurrentIndex(0);
    setSelectedOption(null);
    setAnswerState("unanswered");
    setScore(0);
  }

  function selectOption(optionIndex: number) {
    if (!currentQuestion || answerState !== "unanswered") return;
    const isCorrect = optionIndex === currentQuestion.correctIndex;
    setSelectedOption(optionIndex);
    setAnswerState(isCorrect ? "correct" : "incorrect");
    if (isCorrect) setScore((s) => s + 1);
  }

  function nextQuestion() {
    setSelectedOption(null);
    setAnswerState("unanswered");
    setCurrentIndex((i) => i + 1);
  }

  const scorePercentage = useMemo(() => {
    if (!questions || questions.length === 0) return 0;
    return Math.round((score / questions.length) * 100);
  }, [score, questions]);

  if (isLoading) {
    return <div className="card h-80 animate-pulse bg-surface-raised" />;
  }

  if (isEmpty || !hasEnoughWords) {
    return (
      <EmptyState
        icon={<ListChecks size={20} />}
        title="Add more words to start a quiz"
        description={`You need at least ${MIN_WORDS_REQUIRED} words in your vocabulary to generate a multiple-choice quiz. You currently have ${
          words?.length ?? 0
        }.`}
      />
    );
  }

  if (!questions) {
    return (
      <div className="flex flex-col items-center gap-6 py-10">
        <h1 className="font-display text-2xl font-semibold text-ink">Vocabulary quiz</h1>
        <p className="max-w-sm text-center text-sm text-ink-muted">
          Answer {Math.min(QUESTIONS_PER_ROUND, words?.length ?? 0)} multiple-choice questions about the
          Uzbek meaning of your English words.
        </p>
        <Button onClick={startQuiz}>Start quiz</Button>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="card flex flex-col items-center gap-4 px-6 py-14 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-soft text-2xl font-display font-semibold text-accent">
          {scorePercentage}%
        </div>
        <h2 className="font-display text-xl font-semibold text-ink">Quiz complete</h2>
        <p className="text-sm text-ink-muted">
          You scored {score} out of {questions.length}.
        </p>
        <Button onClick={startQuiz} icon={<RotateCcw size={15} />}>
          Restart quiz
        </Button>
      </div>
    );
  }

  if (!currentQuestion) return null;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-ink-muted">
          Question {currentIndex + 1} / {questions.length}
        </span>
        <span className="font-mono text-xs text-ink-muted">Score: {score}</span>
      </div>

      <div className="h-1 w-full overflow-hidden rounded-full bg-surface-raised">
        <motion.div
          className="h-full bg-accent"
          initial={false}
          animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="card p-6 sm:p-8">
        <p className="mb-1 text-xs font-medium uppercase tracking-wide text-ink-faint">
          What does this word mean?
        </p>
        <h2 className="mb-6 font-display text-2xl font-semibold text-ink sm:text-3xl">
          {currentQuestion.word.english}
        </h2>

        <div className="grid gap-2.5">
          {currentQuestion.options.map((option, i) => {
            const isSelected = selectedOption === i;
            const isCorrectOption = i === currentQuestion.correctIndex;
            const showResult = answerState !== "unanswered";

            return (
              <button
                key={i}
                onClick={() => selectOption(i)}
                disabled={showResult}
                className={classNames(
                  "flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition-colors",
                  !showResult && "border-border bg-surface-raised hover:border-accent/40",
                  showResult && isCorrectOption && "border-success/40 bg-success-soft text-success",
                  showResult && isSelected && !isCorrectOption && "border-danger/40 bg-danger-soft text-danger",
                  showResult && !isSelected && !isCorrectOption && "border-border opacity-50"
                )}
              >
                <span>{option}</span>
                {showResult && isCorrectOption && <Check size={16} strokeWidth={2.5} />}
                {showResult && isSelected && !isCorrectOption && <X size={16} strokeWidth={2.5} />}
              </button>
            );
          })}
        </div>

        {answerState !== "unanswered" && (
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-ink-muted">
              {answerState === "correct" ? "Correct!" : "Not quite — check the highlighted answer."}
            </p>
            <Button onClick={nextQuestion}>{isLastQuestion ? "See results" : "Next question"}</Button>
          </div>
        )}
      </div>
    </div>
  );
}
