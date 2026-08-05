import { useCallback, useEffect, useRef, useState } from "react";
import type { SpeechRecognitionStatus } from "@/types";

function getSpeechRecognitionCtor(): SpeechRecognitionConstructor | null {
  if (typeof window === "undefined") return null;
  return window.SpeechRecognition ?? window.webkitSpeechRecognition ?? null;
}

interface UseSpeechRecognitionResult {
  isSupported: boolean;
  status: SpeechRecognitionStatus;
  transcript: string;
  interimTranscript: string;
  errorMessage: string | null;
  start: () => void;
  stop: () => void;
  reset: () => void;
}

export function useSpeechRecognition(): UseSpeechRecognitionResult {
  const RecognitionCtor = getSpeechRecognitionCtor();
  const isSupported = RecognitionCtor !== null;

  const [status, setStatus] = useState<SpeechRecognitionStatus>(isSupported ? "idle" : "unsupported");
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const finalTranscriptRef = useRef("");

  useEffect(() => {
    return () => {
      recognitionRef.current?.abort();
    };
  }, []);

  const start = useCallback(() => {
    if (!RecognitionCtor) {
      setStatus("unsupported");
      return;
    }

    finalTranscriptRef.current = "";
    setTranscript("");
    setInterimTranscript("");
    setErrorMessage(null);

    const recognition = new RecognitionCtor();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setStatus("listening");
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const text = result[0]?.transcript ?? "";
        if (result.isFinal) {
          finalTranscriptRef.current += `${text} `;
        } else {
          interim += text;
        }
      }
      setTranscript(finalTranscriptRef.current.trim());
      setInterimTranscript(interim.trim());
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      if (event.error === "no-speech" || event.error === "aborted") return;
      setErrorMessage(event.error);
      setStatus("error");
    };

    recognition.onend = () => {
      setStatus((current) => (current === "error" ? current : "finished"));
      setInterimTranscript("");
    };

    recognitionRef.current = recognition;
    recognition.start();
  }, [RecognitionCtor]);

  const stop = useCallback(() => {
    recognitionRef.current?.stop();
  }, []);

  const reset = useCallback(() => {
    finalTranscriptRef.current = "";
    setTranscript("");
    setInterimTranscript("");
    setErrorMessage(null);
    setStatus(isSupported ? "idle" : "unsupported");
  }, [isSupported]);

  return { isSupported, status, transcript, interimTranscript, errorMessage, start, stop, reset };
}
