import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Check, Mic, RotateCcw, Shuffle, Square, X } from "lucide-react";
import { useWords } from "@/hooks/useWords";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { formatSeconds, transcriptContainsWord } from "@/lib/utils";
import type { VocabWord } from "@/types";

const MIN_SECONDS = 30;
const MAX_SECONDS = 60;

function pickRandomWord(words: VocabWord[], exclude?: VocabWord): VocabWord {
  const pool = exclude && words.length > 1 ? words.filter((w) => w.id !== exclude.id) : words;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function SpeakingPage() {
  const { words, isLoading, isEmpty } = useWords();
  const { isSupported, status, transcript, interimTranscript, errorMessage, start, stop, reset } =
    useSpeechRecognition();

  const [targetWord, setTargetWord] = useState<VocabWord | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (words && words.length > 0 && !targetWord) {
      setTargetWord(pickRandomWord(words));
    }
  }, [words, targetWord]);

  useEffect(() => {
    if (status === "listening") {
      setElapsedSeconds(0);
      intervalRef.current = setInterval(() => {
        setElapsedSeconds((prev) => {
          if (prev + 1 >= MAX_SECONDS) {
            stop();
            return MAX_SECONDS;
          }
          return prev + 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [status, stop]);

  function handleNewWord() {
    if (!words || words.length === 0) return;
    setTargetWord(pickRandomWord(words, targetWord ?? undefined));
    reset();
    setElapsedSeconds(0);
  }

  function handleRetrySameWord() {
    reset();
    setElapsedSeconds(0);
  }

  if (isLoading) {
    return <div className="card h-80 animate-pulse bg-surface-raised" />;
  }

  if (isEmpty) {
    return (
      <EmptyState
        icon={<Mic size={20} />}
        title="Add words to practice speaking"
        description="Speaking practice picks a random word from your vocabulary. Add a few words first to get started."
      />
    );
  }

  if (!isSupported) {
    return (
      <EmptyState
        icon={<AlertTriangle size={20} />}
        title="Speech recognition isn't available"
        description="Your browser doesn't support the Web Speech API. Try the latest version of Chrome or Edge on desktop or Android."
      />
    );
  }

  const usedTargetWord = targetWord ? transcriptContainsWord(transcript, targetWord.english) : false;
  const canFinishEarly = elapsedSeconds >= MIN_SECONDS;
  const progress = Math.min((elapsedSeconds / MAX_SECONDS) * 100, 100);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="w-full">
        <h1 className="font-display text-2xl font-semibold text-ink">Speaking practice</h1>
        <p className="mt-1 text-sm text-ink-muted">
          Speak for 30&ndash;60 seconds about the word below, then check how you did.
        </p>
      </div>

      {targetWord && (
        <div className="card flex w-full flex-col items-center gap-2 p-6 text-center">
          <span className="text-xs font-medium uppercase tracking-wide text-ink-faint">Your word</span>
          <h2 className="font-display text-3xl font-semibold text-accent">{targetWord.english}</h2>
          <p className="text-sm text-ink-muted">{targetWord.uzbek}</p>
        </div>
      )}

      <div className="relative flex h-40 w-40 items-center justify-center">
        <svg viewBox="0 0 120 120" className="absolute inset-0 -rotate-90">
          <circle cx="60" cy="60" r="52" fill="none" stroke="currentColor" strokeWidth="6" className="text-surface-raised" />
          <motion.circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
            className={progress >= (MIN_SECONDS / MAX_SECONDS) * 100 ? "text-success" : "text-accent"}
            strokeDasharray={2 * Math.PI * 52}
            animate={{ strokeDashoffset: 2 * Math.PI * 52 * (1 - progress / 100) }}
            transition={{ duration: 0.3, ease: "linear" }}
          />
        </svg>

        {status === "listening" && (
          <span className="absolute inline-flex h-16 w-16 rounded-full bg-accent/40 animate-pulseRing" aria-hidden="true" />
        )}

        <button
          onClick={status === "listening" ? stop : start}
          aria-label={status === "listening" ? "Stop recording" : "Start recording"}
          className={`relative flex h-16 w-16 items-center justify-center rounded-full text-bg transition-colors ${
            status === "listening" ? "bg-danger" : "bg-accent hover:bg-accent-hover"
          }`}
        >
          {status === "listening" ? <Square size={22} fill="currentColor" /> : <Mic size={24} />}
        </button>

        <span className="absolute -bottom-7 font-mono text-xs text-ink-muted">
          {formatSeconds(elapsedSeconds)} / {formatSeconds(MAX_SECONDS)}
        </span>
      </div>

      {status === "listening" && !canFinishEarly && (
        <p className="text-xs text-ink-faint">Keep going &mdash; speak for at least {MIN_SECONDS} seconds.</p>
      )}
      {status === "listening" && canFinishEarly && (
        <Button variant="secondary" onClick={stop}>
          Finish now
        </Button>
      )}

      {errorMessage && (
        <p className="flex items-center gap-1.5 text-xs text-danger">
          <AlertTriangle size={13} />
          Microphone error: {errorMessage}. Check your browser's microphone permissions.
        </p>
      )}

      {(status === "listening" || status === "finished") && (transcript || interimTranscript) && (
        <div className="card w-full p-5">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-ink-faint">Transcript</p>
          <p className="text-sm leading-relaxed text-ink">
            {transcript}
            <span className="text-ink-faint"> {interimTranscript}</span>
          </p>
        </div>
      )}

      {status === "finished" && (
        <div className="card w-full flex flex-col items-center gap-4 p-6 text-center">
          {usedTargetWord ? (
            <div className="flex items-center gap-2 rounded-full bg-success-soft px-4 py-1.5 text-sm font-medium text-success">
              <Check size={15} strokeWidth={2.5} />
              You used "{targetWord?.english}"
            </div>
          ) : (
            <div className="flex items-center gap-2 rounded-full bg-danger-soft px-4 py-1.5 text-sm font-medium text-danger">
              <X size={15} strokeWidth={2.5} />
              You didn't say "{targetWord?.english}"
            </div>
          )}
          {!transcript && <p className="text-sm text-ink-muted">No speech was detected. Try again closer to the microphone.</p>}

          <div className="flex flex-wrap justify-center gap-3">
            <Button variant="secondary" onClick={handleRetrySameWord} icon={<RotateCcw size={15} />}>
              Retry this word
            </Button>
            <Button onClick={handleNewWord} icon={<Shuffle size={15} />}>
              New word
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
