import Link from "next/link";

export default function ParallelLayout({
    children,
    marketing,
    graph,
}:{
    children:React.ReactNode,
    marketing:React.ReactNode,
    graph:React.ReactNode,

}) {
    return (
        <div className="container mx-auto ">
            <nav className="mb-20 py-5">
                <ul className="flex gap-10">

                    <li>
                        <Link href="/graph">Graph</Link>
                    </li>
                    <li>
                        <Link href="/marketing">Marketing</Link>
                    </li>
                    <li>
                        <Link href="/branding">Branding</Link>
                    </li>
                    <li>
                        <Link href="/advertise">Advertise</Link>
                    </li>
                    <li>
                        <Link href="/marketing/settings">Settings</Link>
                    </li>
                    <li>
                        <Link href="/sales">Sales</Link>
                    </li>
                </ul>
            </nav>
            <div className="flex text-black">
            {marketing}
            {graph}
            {children}

            </div>
        </div>
    );
}