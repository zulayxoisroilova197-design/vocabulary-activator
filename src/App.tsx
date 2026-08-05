import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Navbar } from "@/components/Layout/Navbar";
import { VocabularyPage } from "@/components/Vocabulary/VocabularyPage";
import { FlashcardsPage } from "@/components/Flashcards/FlashcardsPage";
import { QuizPage } from "@/components/Quiz/QuizPage";
import { SpeakingPage } from "@/components/Speaking/SpeakingPage";
import { seedIfEmpty } from "@/db";
import type { AppTab } from "@/types";

const pageComponents: Record<AppTab, React.ComponentType> = {  vocabulary: VocabularyPage,
  flashcards: FlashcardsPage,
  quiz: QuizPage,
  speaking: SpeakingPage,
};

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>("vocabulary");

  useEffect(() => {
    seedIfEmpty();
  }, []);

  const ActivePage = pageComponents[activeTab];

  return (
    <div className="min-h-screen bg-bg">
      <Navbar activeTab={activeTab} onChangeTab={setActiveTab} />
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <ActivePage />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
