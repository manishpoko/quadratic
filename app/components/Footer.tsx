import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#09090b]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 sm:grid-cols-3">
        {/* Brand */}
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-white">
            Quadratic
          </h2>

          <p className="mt-3 max-w-xs text-sm leading-6 text-zinc-400">
            A simple issue tracking app for modern teams.
          </p>
        </div>

        {/* Product */}
        <div>
          <h3 className="text-sm font-medium text-white">
            Product
          </h3>

          <nav className="mt-4 flex flex-col gap-3">
            <Link
              href="/features"
              className="text-sm text-zinc-400 transition-colors hover:text-white"
            >
              Features
            </Link>

            <Link
              href="/pricing"
              className="text-sm text-zinc-400 transition-colors hover:text-white"
            >
              Pricing
            </Link>

            <Link
              href="/faq"
              className="text-sm text-zinc-400 transition-colors hover:text-white"
            >
              FAQ
            </Link>
          </nav>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-sm font-medium text-white">
            Links
          </h3>

          <nav className="mt-4 flex flex-col gap-3">
            <a
              href="https://github.com/manishpoko/quadratic"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-400 transition-colors hover:text-white"
            >
              GitHub
            </a>

            <Link
              href="/"
              className="text-sm text-zinc-400 transition-colors hover:text-white"
            >
              Home
            </Link>
          </nav>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-6">
          <p className="text-sm text-zinc-500">
            © 2026 Quadratic. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}