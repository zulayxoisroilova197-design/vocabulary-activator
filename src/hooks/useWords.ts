import { useEffect, useState } from "react";
import { db } from "@/db";
import type { NewVocabWord, VocabWord } from "@/types";



export function useWords(searchTerm = "") {


  const [words, setWords] =
    useState<VocabWord[]>([]);


  const [isLoading, setIsLoading] =
    useState(true);




  async function loadWords() {


    setIsLoading(true);



    let result =
      await db.words
        .orderBy("createdAt")
        .reverse()
        .toArray();




    if (searchTerm.trim()) {


      const search =
        searchTerm.toLowerCase();



      result =
        result.filter((word) =>


          word.english
            .toLowerCase()
            .includes(search)

          ||

          word.uzbek
            .toLowerCase()
            .includes(search)

          ||

          word.example
            .toLowerCase()
            .includes(search)


        );


    }



    setWords(result);


    setIsLoading(false);


  }






  useEffect(() => {


    loadWords();



  }, [searchTerm]);






  return {

    words,

    isLoading,

    isEmpty:
      !isLoading &&
      words.length === 0,


    refresh:
      loadWords,

  };


}









export async function addWord(
  word: NewVocabWord
) {


  const now =
    Date.now();



  await db.words.add({

    ...word,

    learned: false,

    createdAt: now,

    updatedAt: now,

    timesReviewed: 0,

  });



}









export async function updateWord(
  id: number,
  word: NewVocabWord
) {


  await db.words.update(

    id,

    {

      ...word,

      updatedAt:
        Date.now(),

    }

  );


}









export async function deleteWord(
  id: number
) {


  await db.words.delete(id);


}









export async function toggleLearned(
  id: number,
  learned: boolean
) {


  await db.words.update(

    id,

    {

      learned,

      updatedAt:
        Date.now(),

    }

  );


}