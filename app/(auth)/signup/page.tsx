import Link from "next/link";

export default function SignupPage() {
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
            Create your account
          </h1>

          <p className="mt-3 text-sm text-zinc-400">
            Start tracking your work with Quadratic.
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-zinc-300"
            >
              Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Your name"
              className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 transition-colors focus:border-purple-500/50 focus:bg-white/[0.05]"
            />
          </div>

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
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-zinc-300"
            >
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 transition-colors focus:border-purple-500/50 focus:bg-white/[0.05]"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-purple-600 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-purple-500"
          >
            Create account
          </button>
        </form>

        {/* //signin option */}
        <p className="mt-8 text-center text-sm text-zinc-500">
          Already have an account? {" "}
          <Link
            href="/signin"
            className="font-medium text-purple-400 transition-colors hover:text-purple-300"
          >
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}