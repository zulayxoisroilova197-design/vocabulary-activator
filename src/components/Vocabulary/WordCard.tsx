import { motion } from "framer-motion";
import { Check, Pencil, Trash2, BookOpen } from "lucide-react";

import type { VocabWord } from "@/types";

interface WordCardProps {
  word: VocabWord;
  onEdit: () => void;
  onDelete: () => void;
  onToggleLearned: () => void;
}


export function WordCard({
  word,
  onEdit,
  onDelete,
  onToggleLearned,
}: WordCardProps) {


  return (

    <motion.div

      layout

      initial={{
        opacity: 0,
        y: 15,
        scale: 0.97,
      }}

      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}

      exit={{
        opacity: 0,
        y: -15,
      }}

      whileHover={{
        y: -4,
      }}

      transition={{
        duration: 0.25,
      }}


      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-white/5
        p-5
        backdrop-blur-xl
        shadow-xl
        transition
      "

    >


      {/* glow */}

      <div
        className="
          absolute
          -right-10
          -top-10
          h-32
          w-32
          rounded-full
          bg-indigo-500/20
          blur-3xl
          opacity-0
          transition
          group-hover:opacity-100
        "
      />




      <div className="
        relative
        flex
        flex-col
        gap-4
      ">



        <div className="flex items-start justify-between gap-3">


          <div className="min-w-0">


            <div className="
              flex
              flex-wrap
              items-center
              gap-2
            ">


              <div className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                bg-indigo-500/20
              ">

                <BookOpen
                  size={18}
                  className="text-indigo-300"
                />

              </div>



              <h3 className="
                text-lg
                font-bold
                text-white
              ">

                {word.english}

              </h3>



              {word.learned && (

                <span
                  className="
                    inline-flex
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

                  <Check
                    size={12}
                    strokeWidth={3}
                  />

                  Learned

                </span>

              )}


            </div>



            <p className="
              mt-3
              text-base
              text-slate-300
            ">

              {word.uzbek}

            </p>



            {word.example && (

              <p className="
                mt-3
                rounded-2xl
                bg-black/20
                p-3
                text-sm
                leading-relaxed
                text-slate-400
              ">

                "{word.example}"

              </p>

            )}



          </div>


        </div>






        <div className="
          flex
          items-center
          justify-end
          gap-2
        ">



          {/* learned */}

          <button

            onClick={onToggleLearned}

            title={
              word.learned
              ?
              "Mark as not learned"
              :
              "Mark as learned"
            }


            className={`
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-2xl
              border
              transition-all

              ${
                word.learned

                ?

                `
                border-emerald-400/30
                bg-emerald-500/20
                text-emerald-300
                `

                :

                `
                border-white/10
                bg-white/5
                text-slate-400
                hover:bg-emerald-500/20
                hover:text-emerald-300
                `
              }

            `}

          >

            <Check size={17}/>

          </button>





          {/* edit */}

          <button

            onClick={onEdit}

            title="Edit word"

            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-2xl
              border
              border-white/10
              bg-white/5
              text-slate-400
              transition-all
              hover:border-indigo-400/40
              hover:bg-indigo-500/20
              hover:text-indigo-300
            "

          >

            <Pencil size={16}/>

          </button>







          {/* delete */}

          <button

            onClick={onDelete}

            title="Delete word"

            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-2xl
              border
              border-white/10
              bg-white/5
              text-slate-400
              transition-all
              hover:border-red-400/40
              hover:bg-red-500/20
              hover:text-red-300
            "

          >

            <Trash2 size={16}/>

          </button>



        </div>



      </div>


    </motion.div>

  );

}