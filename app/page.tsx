//import Image from "next/image";

import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <>
    <Navbar/>
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">

      <main className="" >
        <div className="text-4xl font-extrabold text-teal-300"> hello quadratic world!</div>
      </main>
    </div>
    </>

  );
}
