'use client'; //because it has submit and form logic that needs client side access

import Link from "next/link";

import { useState } from "react";
import { useRouter } from "next/navigation";




export default function SigninPage() {


  const router = useRouter();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)

  async function HandleSubmit(event: React.SubmitEvent<HTMLFormElement>) {

    event.preventDefault();
    setError("")
    setLoading(true)

    const formData = new FormData(event.currentTarget); //reads values from your existing input

    const email = formData.get("email")
    const password = formData.get("password")

    try{
          const response = await fetch('/api/auth/signin',  {
            

      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }, 
      body: JSON.stringify({email, password})

    }
    )

    const data = await response.json()

    if (!response.ok) {
      setError(data.message ||  "unable to sign in");
      return;
    }

    router.push('/dashboard');
    router.refresh()
    } catch {
      setError("something went wrong, try again")

    } finally {
      setLoading(false)
    }



  }




  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">

        <div className="text-center">
          <Link
            href="/"
            className="text-2xl font-semibold tracking-tight text-white"
          >
            Quadratic
          </Link>

          <h1 className="mt-8 text-3xl font-bold tracking-tight text-white">
            Welcome back
          </h1>

          <p className="mt-3 text-sm text-zinc-400">
            Sign in to continue to your workspace.
          </p>
        </div>

        <form onSubmit={HandleSubmit} className="mt-8 space-y-5">

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-zinc-300"
            >
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 transition-colors focus:border-purple-500/50 focus:bg-white/[0.05]"
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-sm font-medium text-zinc-300"
              >
                Password
              </label>

              <span className="text-xs text-zinc-600">
                Forgot password?
              </span>
            </div>

            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 transition-colors focus:border-purple-500/50 focus:bg-white/[0.05]"
            />
          </div>

          {
            error &&(
              <p role="alert" className="text-sm text-red-400"
              >
                {error}

              </p>
            )
          }

          
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-purple-600 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-purple-500 cursor-pointer"
          >
            {loading? "signing in..." : "sign in" }
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-zinc-500">
          Do not have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-purple-400 transition-colors hover:text-purple-300"
          >
            Create one
          </Link>
        </p>
      </div>
    </main>
  );
}