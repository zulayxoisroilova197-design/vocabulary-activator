import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Layers,
  Shuffle,
} from "lucide-react";

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

      setIndex((current) =>
        Math.min(
          current,
          Math.max(words.length - 1, 0)
        )
      );

    }

  }, [words]);




  const currentWord = order[index];




  function goTo(
    newIndex: number,
    dir: 1 | -1
  ) {

    if (order.length === 0) return;

    setDirection(dir);

    setIsFlipped(false);

    setIndex(
      (newIndex + order.length) %
      order.length
    );

  }





  function handleShuffle() {

    setOrder((current) =>
      shuffleArray(current)
    );

    setIndex(0);

    setIsFlipped(false);

    setDirection(1);

  }





  if (isLoading) {

    return (

      <div
        className="
          h-80
          rounded-3xl
          border
          border-white/10
          bg-white/5
          animate-pulse
        "
      />

    );

  }





  if (isEmpty) {

    return (

      <EmptyState

        icon={<Layers size={22}/>}

        title="Nothing to review yet"

        description="
        Add some words in Vocabulary first,
        then practice with flashcards.
        "

      />

    );

  }





  return (

    <div
      className="
        flex
        flex-col
        items-center
        gap-7
      "
    >




      {/* Header */}


      <div
        className="
          flex
          w-full
          items-center
          justify-between
        "
      >


        <div className="flex items-center gap-3">


          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-br
              from-indigo-500
              to-purple-600
              shadow-lg
              shadow-indigo-500/30
            "
          >

            <Layers
              size={22}
              className="text-white"
            />

          </div>




          <div>

            <h1
              className="
                text-3xl
                font-bold
                text-white
              "
            >
              Flashcards
            </h1>


            <p
              className="
                text-sm
                text-slate-400
              "
            >
              Practice and remember faster
            </p>

          </div>


        </div>





        <span
          className="
            rounded-full
            border
            border-white/10
            bg-white/5
            px-4
            py-2
            text-xs
            font-medium
            text-slate-300
          "
        >

          {index + 1} / {order.length}

        </span>


      </div>








      {/* Card */}



      <div className="w-full max-w-md">


        <AnimatePresence
          mode="wait"
          custom={direction}
        >



          <motion.div

            key={currentWord?.id}

            custom={direction}

            initial={{
              opacity:0,
              x:24 * direction
            }}

            animate={{
              opacity:1,
              x:0
            }}

            exit={{
              opacity:0,
              x:-24 * direction
            }}

            transition={{
              duration:0.25
            }}

          >


            {currentWord && (

              <Flashcard

                word={currentWord}

                isFlipped={isFlipped}

                onFlip={() =>
                  setIsFlipped(
                    (f)=>!f
                  )
                }

              />

            )}


          </motion.div>


        </AnimatePresence>


      </div>








      {/* Controls */}



      <div
        className="
          flex
          items-center
          gap-3
        "
      >


        <button

          onClick={() =>
            goTo(index - 1, -1)
          }


          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            border
            border-white/10
            bg-white/5
            text-slate-400
            transition-all
            hover:bg-white/10
            hover:text-white
          "

        >

          <ChevronLeft size={20}/>

        </button>





        <Button

          variant={
            currentWord?.learned
            ?
            "secondary"
            :
            "primary"
          }


          icon={
            <Check
              size={16}
              strokeWidth={2.5}
            />
          }


          onClick={() =>
            currentWord?.id &&
            toggleLearned(
              currentWord.id,
              !currentWord.learned
            )
          }

        >

          {
            currentWord?.learned
            ?
            "Learned"
            :
            "Mark learned"
          }


        </Button>






        <button

          onClick={() =>
            goTo(index + 1, 1)
          }


          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            border
            border-white/10
            bg-white/5
            text-slate-400
            transition-all
            hover:bg-white/10
            hover:text-white
          "

        >

          <ChevronRight size={20}/>

        </button>



      </div>









      <button

        onClick={handleShuffle}

        className="
          flex
          items-center
          gap-2
          rounded-full
          border
          border-white/10
          bg-white/5
          px-4
          py-2
          text-xs
          font-medium
          text-slate-400
          transition-all
          hover:bg-white/10
          hover:text-white
        "

      >

        <Shuffle size={14}/>

        Shuffle deck

      </button>





    </div>

  );

}