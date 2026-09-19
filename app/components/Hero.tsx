import Button from "./ui/Button";

export default function HeroComponent() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6">
    <div className="mx-auto w-full max-w-4xl text-center">
      <section className=" flex flex-col items-center">
          <h1 className="text-5xl font-bold tracking-[-0.04em] text-white sm:text-6xl md:text-7xl lg:text-8xl">
            issue tracking.{" "}
            <span className="text-purple-400">simplified.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-400 sm:text-xl sm:leading-9">
          A minimal and elegant issue tracking tool for modern teams. Manage
          your projects with ease.
        </p>
      </section>


      <section className="mt-10 flex items-center justify-center gap-4">
        <Button href="/signin" variant="primary" size="lg">Get Started</Button>
        <Button href="/faq" variant="secondary" size="lg">Learn More</Button>
      </section>
    </div>

    </div>
  );
}
