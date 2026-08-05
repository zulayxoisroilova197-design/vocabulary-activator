import { type FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";

import type {
  NewVocabWord,
  VocabWord,
  WordLevel,
} from "@/types";


interface WordFormProps {
  initialWord?: VocabWord;
  onSubmit: (word: NewVocabWord) => Promise<void> | void;
  onCancel: () => void;
}


interface FormErrors {
  english?: string;
  uzbek?: string;
  example?: string;
}



const topics = [
  "Daily Life",
  "Education",
  "Technology",
  "Work",
  "Travel",
  "Health",
  "Food",
  "Nature",
];


const levels: WordLevel[] = [
  "A1",
  "A2",
  "B1",
  "B2",
  "C1",
  "C2",
];





export function WordForm({
  initialWord,
  onSubmit,
  onCancel,
}: WordFormProps) {


  const [english, setEnglish] =
    useState(initialWord?.english ?? "");


  const [uzbek, setUzbek] =
    useState(initialWord?.uzbek ?? "");


  const [example, setExample] =
    useState(initialWord?.example ?? "");



  const [topic, setTopic] =
    useState(
      initialWord?.topic ?? "Daily Life"
    );


  const [level, setLevel] =
    useState<WordLevel>(
      initialWord?.level ?? "B1"
    );



  const [errors, setErrors] =
    useState<FormErrors>({});


  const [isSubmitting, setIsSubmitting] =
    useState(false);







  async function handleSubmit(
    event: FormEvent
  ) {


    event.preventDefault();



    const nextErrors: FormErrors = {};



    if (!english.trim())
      nextErrors.english =
        "Enter the English word.";


    if (!uzbek.trim())
      nextErrors.uzbek =
        "Enter the Uzbek meaning.";


    if (!example.trim())
      nextErrors.example =
        "Add an example sentence.";



    setErrors(nextErrors);



    if (
      Object.keys(nextErrors).length
    ) return;





    setIsSubmitting(true);



    try {


      await onSubmit({

        english: english.trim(),

        uzbek: uzbek.trim(),

        example: example.trim(),

        topic,

        level,

      });



    } finally {


      setIsSubmitting(false);


    }


  }








  const inputClass = `
    w-full
    rounded-2xl
    border
    border-white/10
    bg-white/5
    px-4
    py-3
    text-sm
    text-white
    outline-none
    transition

    placeholder:text-slate-500

    focus:border-indigo-400/50
    focus:bg-white/10
  `;







  return (


    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5"
    >




      <div>

        <label className="
          mb-2
          block
          text-sm
          text-slate-300
        ">
          English word
        </label>


        <input

          value={english}

          onChange={(e)=>
            setEnglish(e.target.value)
          }

          placeholder="example: sophisticated"

          className={inputClass}

        />


        {errors.english && (

          <p className="mt-2 text-xs text-red-300">
            {errors.english}
          </p>

        )}

      </div>






      <div>

        <label className="
          mb-2
          block
          text-sm
          text-slate-300
        ">
          Uzbek meaning
        </label>


        <input

          value={uzbek}

          onChange={(e)=>
            setUzbek(e.target.value)
          }

          placeholder="example: murakkab"

          className={inputClass}

        />

      </div>








      <div className="grid grid-cols-2 gap-3">


        <div>

          <label className="
            mb-2
            block
            text-sm
            text-slate-300
          ">
            Topic
          </label>


          <select

            value={topic}

            onChange={(e)=>
              setTopic(e.target.value)
            }

            className={inputClass}

          >

            {topics.map((item)=>(

              <option
                key={item}
                value={item}
                className="bg-slate-900"
              >
                {item}
              </option>

            ))}

          </select>


        </div>







        <div>

          <label className="
            mb-2
            block
            text-sm
            text-slate-300
          ">
            Level
          </label>


          <select

            value={level}

            onChange={(e)=>
              setLevel(
                e.target.value as WordLevel
              )
            }


            className={inputClass}

          >

            {levels.map((item)=>(

              <option

                key={item}

                value={item}

                className="bg-slate-900"

              >

                {item}

              </option>

            ))}


          </select>


        </div>


      </div>







      <div>


        <label className="
          mb-2
          block
          text-sm
          text-slate-300
        ">
          Example sentence
        </label>



        <textarea

          value={example}

          onChange={(e)=>
            setExample(e.target.value)
          }

          rows={3}

          placeholder="Example sentence"

          className={`${inputClass} resize-none`}

        />



      </div>









      <div className="
        flex
        justify-end
        gap-3
      ">


        <Button

          type="button"

          variant="secondary"

          onClick={onCancel}

        >
          Cancel
        </Button>





        <Button

          type="submit"

          disabled={isSubmitting}

        >

          {initialWord
            ? "Save changes"
            : "Add word"}

        </Button>


      </div>



    </form>


  );

}