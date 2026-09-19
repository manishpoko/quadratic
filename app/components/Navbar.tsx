import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full border-b border-white/10 bg-[#0b0a0f]">
      <div className="mx-auto flex h-16 items-center justify-between px-6">
        <Link
          className="text-lg font-semibold tracking-tight text-white"
          href="/"
        >
          Quadratic
        </Link>

        <div className="hidden md:flex items-center gap-8 md-flex">
          <Link
            className="text-sm text-zinc-400 transition-colors hover:text-white"
            href="/features"
          >
            Features
          </Link>
          <Link
            className="text-sm text-zinc-400 transition-colors hover:text-white"
            href="/pricing"
          >
            Pricing
          </Link>
          <Link
            className="text-sm text-zinc-400 transition-colors hover:text-white"
            href="/faq"
          >
            FAQ
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            className="text-sm text-zinc-400 transition-colors hover:text-white"
            href="/signin"
          >
            Sign in
          </Link>
          <Link
            className="rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-500"
            href="/signup"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
