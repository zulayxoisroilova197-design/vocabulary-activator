import { BookOpen, Layers, ListChecks, Mic, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

import type { AppTab } from "@/types";


interface NavbarProps {
  activeTab: AppTab;
  onChangeTab: (tab: AppTab) => void;
}



const tabs: Array<{
  id: AppTab;
  label: string;
  icon: typeof BookOpen;
}> = [

  {
    id: "vocabulary",
    label: "Vocabulary",
    icon: BookOpen,
  },

  {
    id: "flashcards",
    label: "Flashcards",
    icon: Layers,
  },

  {
    id: "quiz",
    label: "Quiz",
    icon: ListChecks,
  },

  {
    id: "speaking",
    label: "Speaking",
    icon: Mic,
  },

];




export function Navbar({
  activeTab,
  onChangeTab,
}: NavbarProps) {


  return (

    <header
      className="
        sticky
        top-0
        z-40
        border-b
        border-white/10
        bg-slate-950/70
        backdrop-blur-xl
      "
    >


      <div
        className="
          mx-auto
          flex
          max-w-6xl
          items-center
          justify-between
          gap-4
          px-4
          py-3
          sm:px-6
          lg:px-8
        "
      >



        {/* Logo */}


        <div
          className="
            flex
            items-center
            gap-3
          "
        >


          <div
            className="
              flex
              h-10
              w-10
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

            <Sparkles
              size={20}
              className="text-white"
            />

          </div>



          <div className="hidden sm:block">

            <h1
              className="
                text-base
                font-bold
                tracking-tight
                text-white
              "
            >
              Vocabulary Activator
            </h1>


            <p
              className="
                text-xs
                text-slate-400
              "
            >
              Learn smarter every day
            </p>

          </div>


        </div>







        {/* Navigation */}



        <nav
          className="
            flex
            items-center
            gap-1
            rounded-2xl
            border
            border-white/10
            bg-white/5
            p-1
            backdrop-blur-xl
          "
        >



          {tabs.map(
            ({
              id,
              label,
              icon: Icon,
            }) => {


              const isActive =
                activeTab === id;



              return (


                <button

                  key={id}

                  onClick={() =>
                    onChangeTab(id)
                  }


                  className="
                    relative
                    flex
                    items-center
                    gap-2
                    rounded-xl
                    px-3
                    py-2
                    text-sm
                    font-medium
                    transition-all
                  "


                >


                  {isActive && (

                    <motion.span

                      layoutId="activeTab"

                      className="
                        absolute
                        inset-0
                        rounded-xl
                        bg-indigo-500
                        shadow-lg
                        shadow-indigo-500/30
                      "

                    />

                  )}



                  <Icon

                    size={16}

                    className={
                      isActive
                      ?
                      "relative z-10 text-white"
                      :
                      "relative z-10 text-slate-400"
                    }

                  />



                  <span
                    className={
                      isActive
                      ?
                      "relative z-10 hidden text-white sm:inline"
                      :
                      "relative z-10 hidden text-slate-400 sm:inline"
                    }
                  >

                    {label}

                  </span>



                </button>


              );

            }

          )}



        </nav>



      </div>


    </header>

  );

}