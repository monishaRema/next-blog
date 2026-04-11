export default function MarketingPage({children}:{children:React.ReactNode}) {
    return (
    <section className="bg-green-50 p-10 min-w-sm h-40">
        Marketing page
        {children}
    </section>
    );
}