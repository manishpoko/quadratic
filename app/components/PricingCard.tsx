import Link from "next/link";

type PricingCardProps = {
  name: string;
  price: string;
  features: string[];
};

export default function PricingCard({
  name,
  price,
  features,
}: PricingCardProps) {
  return (
    <article className="flex min-h-[520px] flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-8">
      {/* Plan name */}
      <h2 className="text-lg font-semibold tracking-wide text-white">{name}</h2>

      {/* Price */}
      <div className="mt-6 flex items-baseline gap-2">
        <span className="text-4xl font-bold tracking-tight text-white">
          {price}
        </span>

        {price !== "COMING SOON" && (
          <span className="text-sm text-zinc-500">/ month</span>
        )}
      </div>

      {/* Short description */}
      <p className="mt-4 text-sm leading-6 text-zinc-400">
        {name === "FREE" && "Everything you need to start tracking your work."}

        {name === "PRO" && "More power and flexibility for growing teams."}

        {name === "ENTERPRISE" &&
          "Advanced features and support for larger teams."}
      </p>

      {/* Features */}
      <ul className="mt-8 space-y-4">
        {features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-3 text-sm text-zinc-300"
          >
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-xs text-purple-400">
              ✓
            </span>

            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* Button */}

      <div className="mt-auto pt-8">
        {price === "COMING SOON" ? (
          <button
            type="button"
            disabled
            className="block w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-center text-sm font-medium text-white transition-colors hover:border-purple-500/40 hover:bg-purple-500/10"
          >
            Coming Soon
          </button>
        ) : (
          <Link
            href="/signup"
            className="block w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-center text-sm font-medium text-white transition-colors hover:border-purple-500/40 hover:bg-purple-500/10"
          >
            Get Started
          </Link>
        )}
      </div>
    </article>
  );
}
