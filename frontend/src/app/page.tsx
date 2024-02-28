import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Email from "@/components/Email";
import Merch from "@/components/Merch";
import Events from "@/components/Events";


export default function Home() {
  return (
    <main className="w-full h-screen bg-white">
    <Header />
    <div className="container mx-auto">
    {/* Introduction of the token */}
    <Hero/>
    {/* Submitting email to claim */}
    <Email/>
    {/* Preview of merchandises */}
    <Merch/>
    {/* Preview of events */}  
    <Events/>
    </div>
    </main>
    )
}