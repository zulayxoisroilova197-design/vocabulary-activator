import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Navbar } from "@/components/Layout/Navbar";
import { VocabularyPage } from "@/components/Vocabulary/VocabularyPage";
import { FlashcardsPage } from "@/components/Flashcards/FlashcardsPage";
import { QuizPage } from "@/components/Quiz/QuizPage";
import { SpeakingPage } from "@/components/Speaking/SpeakingPage";
import { seedIfEmpty } from "@/db";
import type { AppTab } from "@/types";

const pageComponents: Record<AppTab, React.ComponentType> = {
  vocabulary: VocabularyPage,
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
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">

      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute right-1/4 top-40 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl" />
      </div>


      <Navbar 
        activeTab={activeTab} 
        onChangeTab={setActiveTab} 
      />


      <main className="
        relative
        mx-auto
        max-w-6xl
        px-4
        py-8
        sm:px-6
        lg:px-8
      ">

        <AnimatePresence mode="wait">

          <motion.div
            key={activeTab}

            initial={{
              opacity: 0,
              y: 20,
              scale: 0.98
            }}

            animate={{
              opacity: 1,
              y: 0,
              scale: 1
            }}

            exit={{
              opacity: 0,
              y: -20,
              scale: 0.98
            }}

            transition={{
              duration: 0.35,
              ease: "easeOut"
            }}

          >

            <ActivePage />

          </motion.div>

        </AnimatePresence>

      </main>

    </div>
  );
}