import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { BookOpen, Plus } from "lucide-react";

import {
  useWords,
  addWord,
  updateWord,
  deleteWord,
  toggleLearned,
} from "@/hooks/useWords";

import { SearchBar } from "@/components/Vocabulary/SearchBar";
import { WordCard } from "@/components/Vocabulary/WordCard";
import { WordForm } from "@/components/Vocabulary/WordForm";

import { Modal } from "@/components/ui/Modal";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";

import type {
  NewVocabWord,
  VocabWord,
  WordLevel,
} from "@/types";




const topics = [
  "All",
  "Daily Life",
  "Education",
  "Technology",
  "Work",
  "Travel",
  "Health",
  "Food",
  "Nature",
];



const levels: Array<WordLevel | "All"> = [
  "All",
  "A1",
  "A2",
  "B1",
  "B2",
  "C1",
  "C2",
];






export function VocabularyPage() {


  const [searchTerm, setSearchTerm] =
    useState("");


  const [selectedTopic, setSelectedTopic] =
    useState("All");


  const [selectedLevel, setSelectedLevel] =
    useState<WordLevel | "All">("All");




  const {
    words,
    isLoading,
    isEmpty,
  } = useWords(searchTerm);




  const [isFormOpen, setIsFormOpen] =
    useState(false);



  const [editingWord, setEditingWord] =
    useState<VocabWord | null>(null);



  const [wordPendingDelete, setWordPendingDelete] =
    useState<VocabWord | null>(null);






  const filteredWords =
    words?.filter((word) => {


      const topicMatch =
        selectedTopic === "All" ||
        word.topic === selectedTopic;



      const levelMatch =
        selectedLevel === "All" ||
        word.level === selectedLevel;



      return topicMatch && levelMatch;


    }) ?? [];








  function openAddForm() {

    setEditingWord(null);

    setIsFormOpen(true);

  }






  function openEditForm(word: VocabWord) {

    setEditingWord(word);

    setIsFormOpen(true);

  }






  function closeForm() {

    setIsFormOpen(false);

    setEditingWord(null);

  }







  async function handleSubmit(
    word: NewVocabWord
  ) {


    if (editingWord?.id) {


      await updateWord(
        editingWord.id,
        word
      );


    } else {


      await addWord(word);


    }



    closeForm();

  }








  async function handleConfirmDelete() {


    if (wordPendingDelete?.id) {


      await deleteWord(
        wordPendingDelete.id
      );


    }


    setWordPendingDelete(null);

  }








  return (

    <div className="flex flex-col gap-6">



      <div className="
        flex
        flex-col
        gap-4
        sm:flex-row
        sm:items-center
        sm:justify-between
      ">


        <div>


          <h1 className="
            text-3xl
            font-bold
            text-white
          ">
            My Vocabulary
          </h1>



          <p className="
            mt-1
            text-sm
            text-slate-400
          ">
            {filteredWords.length} words
          </p>


        </div>





        <Button

          onClick={openAddForm}

          icon={
            <Plus size={17}/>
          }

        >

          Add word

        </Button>


      </div>







      <div className="space-y-3">


        <p className="
          text-xs
          font-semibold
          uppercase
          text-slate-400
        ">
          Topics
        </p>



        <div className="
          flex
          flex-wrap
          gap-2
        ">


          {topics.map((topic)=>(


            <button


              key={topic}


              onClick={() =>
                setSelectedTopic(topic)
              }


              className={`
                rounded-xl
                px-4
                py-2
                text-sm
                transition-all

                ${
                  selectedTopic === topic

                  ?

                  `
                  bg-indigo-500
                  text-white
                  `

                  :

                  `
                  border
                  border-white/10
                  bg-white/5
                  text-slate-300
                  hover:bg-white/10
                  `
                }
              `}


            >

              {topic}


            </button>


          ))}



        </div>


      </div>









      <div className="space-y-3">


        <p className="
          text-xs
          font-semibold
          uppercase
          text-slate-400
        ">
          Level
        </p>




        <div className="
          flex
          flex-wrap
          gap-2
        ">


          {levels.map((level)=>(


            <button


              key={level}


              onClick={() =>
                setSelectedLevel(level)
              }



              className={`
                rounded-xl
                px-4
                py-2
                text-sm
                font-medium
                transition-all

                ${
                  selectedLevel === level

                  ?

                  `
                  bg-purple-600
                  text-white
                  `

                  :

                  `
                  border
                  border-white/10
                  bg-white/5
                  text-slate-300
                  hover:bg-white/10
                  `
                }

              `}


            >

              {level}


            </button>


          ))}



        </div>


      </div>








      <SearchBar

        value={searchTerm}

        onChange={setSearchTerm}

      />








      {isLoading && (

        <div className="
          h-24
          rounded-3xl
          bg-white/5
          animate-pulse
        " />

      )}







      {!isLoading && isEmpty && (

        <EmptyState

          icon={
            <BookOpen size={20}/>
          }

          title="No words yet"

          description="Start building your vocabulary."

          action={

            <Button

              onClick={openAddForm}

              icon={
                <Plus size={16}/>
              }

            >

              Add first word

            </Button>

          }

        />

      )}








      {!isLoading &&
        filteredWords.length === 0 &&
        !isEmpty && (

        <EmptyState

          icon={
            <BookOpen size={20}/>
          }

          title="No words found"

          description="Try another filter."

        />

      )}








      <div className="
        flex
        flex-col
        gap-4
      ">


        <AnimatePresence>


          {filteredWords.map((word)=>(


            <WordCard

              key={word.id}

              word={word}


              onEdit={() =>
                openEditForm(word)
              }


              onDelete={() =>
                setWordPendingDelete(word)
              }


              onToggleLearned={() =>

                word.id &&
                toggleLearned(
                  word.id,
                  !word.learned
                )

              }


            />


          ))}


        </AnimatePresence>


      </div>









      <Modal

        isOpen={isFormOpen}

        onClose={closeForm}

        title={
          editingWord
          ? "Edit word"
          : "Add new word"
        }

      >


        <WordForm

          initialWord={
            editingWord ?? undefined
          }

          onSubmit={handleSubmit}

          onCancel={closeForm}

        />


      </Modal>









      <ConfirmDialog

        isOpen={
          wordPendingDelete !== null
        }

        title="Delete word"


        message={
          `Delete "${wordPendingDelete?.english}"?`
        }


        onConfirm={
          handleConfirmDelete
        }


        onCancel={() =>
          setWordPendingDelete(null)
        }


      />


    </div>

  );

}