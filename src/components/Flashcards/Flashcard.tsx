import type { KeyboardEvent } from "react";
import { motion } from "framer-motion";
import {
  Check,
  RotateCw,
  Volume2,
} from "lucide-react";

import type { VocabWord } from "@/types";


interface FlashcardProps {
  word: VocabWord;
  isFlipped: boolean;
  onFlip: () => void;
}



function speak(text: string) {

  if (!("speechSynthesis" in window)) return;


  const utterance =
    new SpeechSynthesisUtterance(text);


  utterance.lang = "en-US";

  utterance.rate = 0.95;


  window.speechSynthesis.cancel();

  window.speechSynthesis.speak(
    utterance
  );

}




export function Flashcard({
  word,
  isFlipped,
  onFlip,
}: FlashcardProps) {



  function handleKeyDown(
    event: KeyboardEvent<HTMLDivElement>
  ) {


    if (
      event.key === "Enter" ||
      event.key === " "
    ) {

      event.preventDefault();

      onFlip();

    }


  }





  return (


    <div
      className="
        [perspective:1600px]
      "
    >



      <motion.div


        onClick={onFlip}


        onKeyDown={handleKeyDown}


        role="button"


        tabIndex={0}


        aria-label="Flip card"



        className="
          group
          relative
          h-80
          w-full
          cursor-pointer

          rounded-3xl

          border
          border-white/10

          bg-slate-900/70

          shadow-2xl

          backdrop-blur-2xl

          [transform-style:preserve-3d]

          sm:h-96
        "




        animate={{
          rotateY:
            isFlipped
            ?
            180
            :
            0,
        }}



        transition={{
          duration:0.55,
          ease:[0.22,1,0.36,1],
        }}



      >





        {/* glow */}

        <div
          className="
            absolute
            -right-10
            -top-10

            h-40
            w-40

            rounded-full

            bg-indigo-500/20

            blur-3xl
          "
        />






        {/* FRONT */}



        <div
          className="
            absolute
            inset-0

            flex
            flex-col
            items-center
            justify-center

            gap-5

            p-8

            [backface-visibility:hidden]
          "
        >



          <span
            className="
              rounded-full

              bg-indigo-500/20

              px-4
              py-1.5

              text-xs
              font-semibold

              uppercase
              tracking-wider

              text-indigo-300
            "
          >

            English

          </span>





          <h2
            className="
              text-center

              text-4xl

              font-bold

              tracking-tight

              text-white
            "
          >

            {word.english}

          </h2>







          <button

            onClick={(e)=>{

              e.stopPropagation();

              speak(word.english);

            }}



            className="
              flex
              items-center
              gap-2

              rounded-2xl

              border
              border-white/10

              bg-white/5

              px-4
              py-2

              text-sm

              text-slate-300

              transition-all

              hover:bg-indigo-500/20

              hover:text-white
            "

          >

            <Volume2 size={15}/>

            Listen

          </button>






          <p
            className="
              absolute
              bottom-6

              flex
              items-center
              gap-2

              text-xs

              text-slate-500
            "
          >

            <RotateCw size={13}/>

            Tap to flip

          </p>






          {word.learned && (

            <span

              className="
                absolute
                right-5
                top-5

                flex
                items-center
                gap-1

                rounded-full

                bg-emerald-500/20

                px-3
                py-1

                text-xs

                font-medium

                text-emerald-300
              "

            >

              <Check size={12}/>

              Learned

            </span>

          )}





        </div>








        {/* BACK */}



        <div
          className="
            absolute
            inset-0

            flex
            flex-col
            items-center
            justify-center

            gap-5

            p-8

            [backface-visibility:hidden]

            [transform:rotateY(180deg)]
          "
        >



          <span
            className="
              rounded-full

              bg-purple-500/20

              px-4
              py-1.5

              text-xs

              font-semibold

              uppercase

              tracking-wider

              text-purple-300
            "
          >

            Uzbek

          </span>





          <h2
            className="
              text-center

              text-3xl

              font-bold

              text-white
            "
          >

            {word.uzbek}

          </h2>







          <div
            className="
              flex
              items-center
              gap-3
              text-indigo-400
            "
          >

            <span
              className="
                h-px
                w-10
                bg-white/20
              "
            />

            ✦

            <span
              className="
                h-px
                w-10
                bg-white/20
              "
            />

          </div>







          <p
            className="
              max-w-sm

              text-center

              text-sm

              leading-relaxed

              text-slate-400
            "
          >

            {word.example}

          </p>





        </div>




      </motion.div>


    </div>


  );

}