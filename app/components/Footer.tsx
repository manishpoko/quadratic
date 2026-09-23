import Link from "next/link";

export default function Footer() {

    return (
        <div>
            <div className="flex flex-col">
                <span>
                    <h1 className="text-4xl">Quadratic</h1>
                    <p className="">an issue tracking app.</p>
                </span>

                <span>
                    <Link href="/home" >product</Link>

                    <Link href="/features" >features</Link>
                    <Link href="/pricing" >pricing</Link>

                </span>

                <span>
                    <Link href="/faq">FAQs</Link>
                    <Link href="www.github.com/manishpoko/quadratic">GitHub</Link>
                    <Link href="/home">contact</Link>

                </span>
            </div>
        </div>
    )

}