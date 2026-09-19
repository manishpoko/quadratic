import Link from "next/link";
import Button from "./ui/Button";

export default function HeroComponent() {
  return (
    <div className="">
      <section className=" items-center justify-between">
        <h1>issue tracking. simplified.</h1>
        <p>
          A minimal and elegant issue tracking tool for modern teams. Manage
          your projects with ease.
        </p>
      </section>
      <section className="flex px-6 gap-4 items-center justify-center">
        <Button href="/signin" variant="primary" size="md">Get Started</Button>
        <Link href="/faq">Learn More</Link>
      </section>
    </div>
  );
}
