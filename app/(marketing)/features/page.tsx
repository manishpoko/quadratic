export default function FeaturesPage() {
  return (
    <main className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <section className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-purple-400">
            Features
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-[-0.03em] text-white sm:text-5xl md:text-6xl">
            think Linear,
            <span className="block text-purple-400">
              but minimal.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-400 sm:text-xl">
            Quadratic gives modern teams a simple place to track issues,
            organize work, and keep projects moving.
          </p>
        </section>

        <section className="mt-16 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition-colors hover:border-purple-500/30 hover:bg-white/[0.05]">
            <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
              01
            </div>

            <h2 className="text-xl font-semibold text-white">
              Simple issue tracking
            </h2>

            <p className="mt-3 leading-7 text-zinc-400">
              Create, prioritize, update, and manage issues without
              unnecessary complexity.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition-colors hover:border-purple-500/30 hover:bg-white/[0.05]">
            <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
              02
            </div>

            <h2 className="text-xl font-semibold text-white">
              Focused workspace
            </h2>

            <p className="mt-3 leading-7 text-zinc-400">
              Keep your work organized in a clean, distraction-free
              workspace built around your issues.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition-colors hover:border-purple-500/30 hover:bg-white/[0.05]">
            <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
              03
            </div>

            <h2 className="text-xl font-semibold text-white">
              Built for speed
            </h2>

            <p className="mt-3 leading-7 text-zinc-400">
              Quickly find what matters and move from issue to resolution
              without getting buried in your workflow.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}