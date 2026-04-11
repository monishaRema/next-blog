import { Navbar } from "@/components/layout/navbar";


export default function MarketingLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar></Navbar>

      {children}
    </>
  );
}
