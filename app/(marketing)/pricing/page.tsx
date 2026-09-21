import PricingCard from "@/app/components/PricingCard";

export default function PricingPage() {
  const pricingPlans = [
    {
      name: "FREE",
      price: "$0",
      features: [
        "Up to 3 team members",
        "Unlimited issues",
        "Basic issue tracking",
        "Email support",
        "Free forever",
      ],
    },
    {
      name: "PRO",
      price: "$10",
      features: [
        "Unlimited team members",
        "Unlimited issues",
        "Advanced issue tracking",
        "Priority support",
        "API access",
      ],
    },
    {
      name: "ENTERPRISE",
      price: "COMING SOON",
      features: [
        "Unlimited team members",
        "Unlimited issues",
        "Advanced issue tracking",
        "Dedicated support",
        "Custom integrations",
      ],
    },
  ];

  return (
    <main className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        {/* Page header */}
        <section className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-purple-400">
            Pricing
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-[-0.03em] text-white sm:text-5xl md:text-6xl">
            simple, transparent pricing.
            <span className="block text-purple-400">
              zero hidden charges.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-400 sm:text-xl">
            flexible plans for all. choose what suits you and your team.
          </p>
        </section>

        {/* Pricing cards */}
        <section className="mt-16 grid gap-6 md:grid-cols-3">
          {pricingPlans.map((plan) => (
            <PricingCard
              key={plan.name}
              name={plan.name}
              price={plan.price}
              features={plan.features} //the features array is listed as bullet points in the card component
            />
          ))}
        </section>
      </div>
    </main>
  );
}