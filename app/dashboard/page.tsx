
export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">

        {/* Dashboard header */}
        <section className="flex items-center justify-between border-b border-white/10 pb-6">
          <h1 className="text-2xl font-bold tracking-tight">
            Quadratic
          </h1>

          <p className="text-sm text-zinc-400">
            Dashboard
          </p>
        </section>

        <main className="mt-10">

          {/* Page heading */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">
                My issues
              </h2>

              <p className="mt-2 text-sm text-zinc-400">
                Track your work and keep things moving.
              </p>
            </div>
          </div>

          {/* Issue statistics */}
          <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm text-zinc-400">All issues</p>
              <h3 className="mt-3 text-3xl font-bold">0</h3>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm text-zinc-400">In progress</p>
              <h3 className="mt-3 text-3xl font-bold">0</h3>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm text-zinc-400">Completed</p>
              <h3 className="mt-3 text-3xl font-bold">0</h3>
            </div>

          </section>

          {/* Recent issues */}
          <section className="mt-10">

            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                Recent issues
              </h2>

              <button
                type="button"
                className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-purple-500"
              >
                + New issue
              </button>
            </div>

            {/* Empty state */}
            <div className="mt-5 flex flex-col items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-6 py-16 text-center">

              <h3 className="text-lg font-medium">
                No issues yet
              </h3>

              <p className="mt-2 text-sm text-zinc-400">
                Create your first issue to get started.
              </p>

            </div>

          </section>

        </main>
      </div>
    </div>
  );
}
