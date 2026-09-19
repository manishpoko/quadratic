import React from "react"


type ButtonProps = {
    variant ?: "primary" | "secondary" | "danger";
    size ?: "sm" | "md" | "lg" ;
    href ?: string;
    children: React.ReactNode
    

}

export default function Button({
    variant =  "primary",
    size =  "md",
    href,
    children
}: ButtonProps) {

    let classes = "";


    if(variant === "primary") {
        classes = "bg-purple-600 text-white"
    }

    if(variant === "secondary") {
        classes = "border border-white/10 text-zinc-300";
    }

    if(variant === "danger") {
        classes = "bg-red-600 text-white";
    }

    let buttonSize = "";

    if(size === "sm") {
        buttonSize = "h-8 px-3 text-xs rounded-md"

    }

    if(size === "md") {
        buttonSize = "h-10 px-4 py-2 text-sm rounded-md"
    }

    if(size === "lg") {
        buttonSize = "h-12 px-6 py-3 text-base rounded-lg"
    }


    return (
        <button className= { ` ${classes} ${buttonSize} cursor-pointer ` }>{children} </button>
    )

}