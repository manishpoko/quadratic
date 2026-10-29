import { getCurrentUser } from "../lib/auth";

import SignoutButton from "../components/SignoutButton";

import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }) {
  const currentUser = await getCurrentUser(); //protecting the route, only authenticated user allowed (checked using session)

  if (!currentUser) {
    redirect("/signin");
  }

  return (
    <div>
      <header className="flex justify-end border-b border-white/10 p-4">
        <SignoutButton />
      </header>
      {children}
    </div>
  );
}
