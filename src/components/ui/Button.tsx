import type { ButtonHTMLAttributes, ReactNode } from "react";
import { motion } from "framer-motion";

import { classNames } from "@/lib/utils";


type Variant =
  | "primary"
  | "secondary"
  | "ghost"
  | "danger";


interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {

  variant?: Variant;
  icon?: ReactNode;

}



const variantClass: Record<Variant, string> = {


  primary: `
    bg-gradient-to-r
    from-indigo-500
    to-purple-600
    text-white
    shadow-lg
    shadow-indigo-500/30
    hover:shadow-indigo-500/50
  `,


  secondary: `
    border
    border-white/10
    bg-white/5
    text-white
    hover:bg-white/10
  `,


  ghost: `
    bg-transparent
    text-slate-300
    hover:bg-white/10
  `,


  danger: `
    bg-red-500/20
    text-red-300
    border
    border-red-400/20
    hover:bg-red-500/30
  `,

};





export function Button({

  variant = "primary",

  icon,

  children,

  className,

  ...rest

}: ButtonProps) {


  return (


    <motion.button


      whileHover={{
        scale: 1.03,
      }}


      whileTap={{
        scale: 0.97,
      }}



      className={classNames(

        `
        inline-flex
        items-center
        justify-center
        gap-2

        rounded-2xl

        px-5
        py-2.5

        text-sm
        font-semibold

        transition-all

        border
        border-transparent

        disabled:pointer-events-none
        disabled:opacity-50

        `,


        variantClass[variant],

        className

      )}


      {...rest}


    >


      {icon && (

        <span className="flex items-center">

          {icon}

        </span>

      )}



      {children}



    </motion.button>


  );

}