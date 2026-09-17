'use client' //because this is real time, and needs client side rendering (similar to date and time)

//import { useState, useEffect } from "react" 

export  function Timestamp() {
    
    
    const    year = new Date().getFullYear()
    

    if(year === null) {
        return null
    } 
    return <>{year}</>

}
