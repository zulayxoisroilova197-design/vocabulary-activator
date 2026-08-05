import { type ReactNode, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}



export function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {


  useEffect(() => {

    if (!isOpen) return;


    const handleKeyDown = (
      event: KeyboardEvent
    ) => {

      if (event.key === "Escape") {
        onClose();
      }

    };


    document.addEventListener(
      "keydown",
      handleKeyDown
    );


    document.body.style.overflow = "hidden";


    return () => {

      document.removeEventListener(
        "keydown",
        handleKeyDown
      );


      document.body.style.overflow = "";

    };


  }, [isOpen, onClose]);





  return (

    <AnimatePresence>


      {isOpen && (


        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-end
            justify-center
            p-0

            sm:items-center
            sm:p-4
          "
        >



          {/* Overlay */}


          <motion.div

            className="
              absolute
              inset-0
              bg-black/70
              backdrop-blur-md
            "


            initial={{
              opacity: 0,
            }}


            animate={{
              opacity: 1,
            }}


            exit={{
              opacity: 0,
            }}


            onClick={onClose}

          />






          {/* Modal */}


          <motion.div


            role="dialog"

            aria-modal="true"

            aria-labelledby="modal-title"



            className="
              relative
              w-full
              max-w-md

              overflow-hidden

              rounded-t-3xl

              border
              border-white/10

              bg-slate-900/90

              p-6

              shadow-2xl

              backdrop-blur-2xl


              sm:rounded-3xl
            "




            initial={{
              opacity: 0,
              y: 30,
              scale: 0.96,
            }}


            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}


            exit={{
              opacity: 0,
              y: 20,
              scale: 0.96,
            }}



            transition={{
              duration: 0.25,
              ease: "easeOut",
            }}


          >




            {/* Glow */}

            <div
              className="
                pointer-events-none
                absolute
                -right-20
                -top-20
                h-48
                w-48
                rounded-full
                bg-indigo-500/20
                blur-3xl
              "
            />






            <div
              className="
                relative
                mb-6
                flex
                items-center
                justify-between
              "
            >


              <h2

                id="modal-title"

                className="
                  text-xl
                  font-bold
                  text-white
                "

              >

                {title}

              </h2>




              <button

                onClick={onClose}

                aria-label="Close dialog"


                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center

                  rounded-xl

                  border
                  border-white/10

                  bg-white/5

                  text-slate-400

                  transition-all

                  hover:bg-red-500/20

                  hover:text-red-300
                "

              >

                <X size={18}/>

              </button>



            </div>





            <div className="relative">

              {children}

            </div>





          </motion.div>



        </div>


      )}


    </AnimatePresence>

  );

}