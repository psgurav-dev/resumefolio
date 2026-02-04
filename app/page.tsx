import Hero from "@/components/hero";
import HowItWorks from "@/components/how-its-works";
import CustomNavbar from "@/components/navbar";

export default function Home() {

  const navItems = [
    { name: "Features", link: "#features" },
    { name: "Pricing", link: "#pricing" },
    { name: "About", link: "#about" }
  ]

  return (
    <div className="min-h-screen w-full relative">
      <CustomNavbar navItems={navItems} />
      <Hero />
      <HowItWorks />
    </div>
  );
}
