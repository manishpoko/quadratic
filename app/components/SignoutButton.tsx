"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignoutButton() {

    const [loading, setLoading] = useState(false)
    const [error, setError]= useState("")

    const router = useRouter();


  async function HandleSignout() {

    setLoading(true)
    setError("")


    try {
      const response = await fetch("/api/auth/signout", {
        method: "POST",
      });

      if(!response.ok) {
        setError("unable to signout, try again");
        return ;
      }

      router.replace('/signin')
      router.refresh()



    } catch (error) {
        setError("something went wrong, try again")
    } finally {
        setLoading(false)
    }
  }

  return (
    <div>
        <button
        type="button"
        onClick={HandleSignout}
        disabled={loading}
        className="rounded-lg border-white/10 px-4 py-2 text-sm text-zinc-300 hover:bg-white/5 disabled:opacity-50"
        
        >
            {loading? "signing out..." : "sign out"}

        </button>

        {error && (
            <p role="alert" className="mt-2 text-sm text-red-400">
                {error}
            </p>
            )}



    </div>
  )
}
