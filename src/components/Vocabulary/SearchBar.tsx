import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}


export function SearchBar({
  value,
  onChange,
}: SearchBarProps) {


  return (

    <div className="relative">


      {/* Search icon */}

      <Search

        size={18}

        className="
          pointer-events-none
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-slate-400
        "

      />



      <input

        type="text"

        value={value}

        onChange={(event) =>
          onChange(event.target.value)
        }


        placeholder="
          Search words, meanings or examples...
        "


        aria-label="Search vocabulary"


        className="
          w-full
          rounded-2xl
          border
          border-white/10
          bg-white/5
          py-3
          pl-12
          pr-12
          text-sm
          text-white
          placeholder:text-slate-500
          outline-none
          backdrop-blur-xl
          transition-all

          focus:border-indigo-400/50
          focus:bg-white/10
          focus:ring-4
          focus:ring-indigo-500/10

        "

      />




      {value && (

        <button

          onClick={() =>
            onChange("")
          }


          aria-label="Clear search"


          className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            flex
            h-7
            w-7
            items-center
            justify-center
            rounded-full
            bg-white/10
            text-slate-400
            transition-all
            hover:bg-red-500/20
            hover:text-red-300
          "

        >

          <X size={15}/>

        </button>

      )}



    </div>

  );

}