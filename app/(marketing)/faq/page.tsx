export default function FAQPage() {
  const faqs = [
    {
      question: "What is Quadratic?",
      answer:
        "Quadratic is a simple issue tracking platform built for teams that want to organize, track, and manage their work without unnecessary complexity.",
    },
    {
      question: "How do I create an account?",
      answer:
        "You can create an account by clicking the Get Started button in the navigation bar and completing the signup process.",
    },
    {
      question: "Is Quadratic free to use?",
      answer:
        "Yes. Quadratic's core issue tracking features are available for free. A Pro plan is also planned for teams that need additional capabilities.",
    },
    {
      question: "What can I use Quadratic for?",
      answer:
        "Quadratic can be used to create, organize, prioritize, and track issues throughout your development workflow.",
    },
    {
      question: "Can I manage my team's issues?",
      answer:
        "Yes. Quadratic is designed around issue tracking so you can keep your team's work organized in one focused workspace.",
    },
    {
      question: "What technologies does Quadratic use?",
      answer:
        "Quadratic is built with Next.js, TypeScript, Tailwind CSS, and PostgreSQL. Authentication and application logic are implemented directly without relying on an ORM or hosted authentication service.",
    },
  ];

  return (
    <main className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <section className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-purple-400">
            FAQ
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-[-0.03em] text-white sm:text-5xl md:text-6xl">
            questions?
            <span className="block text-purple-400">we have answers.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-400 sm:text-xl">
            Everything you need to know about Quadratic and how it works.
          </p>
        </section>

        {/* FAQ list */}
        <section className="mx-auto mt-16 max-w-3xl">
          <div className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.03] px-6">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left">
                  <span className="text-base font-medium text-white sm:text-lg">
                    {faq.question}
                  </span>

                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition-transform duration-200 group-open:rotate-45">
                    +
                  </span>
                </summary>

                <p className="mt-4 max-w-2xl pr-10 text-sm leading-7 text-zinc-400 sm:text-base">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
