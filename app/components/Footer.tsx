import Link from "next/link";

export default function Footer() {

    return (
        <div>
            <div className=" border-2 flex gap-6 items-center justify-around mt-2 mb-2 sticky">
                <span>
                    <h1 className="text-2xl justify-around">Quadratic</h1>
                    <p className="">an issue tracking app.</p>
                </span>

                <span className="flex flex-col">
                    <Link href="/home" >product</Link>

                    <Link href="/features" >features</Link>
                    <Link href="/pricing" >pricing</Link>

                </span>

                <span className="flex flex-col ">
                    <Link href="/faq">FAQs</Link>
                    <Link href="www.github.com/manishpoko/quadratic">GitHub</Link>
                    <Link href="/home">contact</Link>

                </span>
            </div>
        </div>
    )

}