import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Email from "@/components/Email";
import Merch from "@/components/MerchPreview";
import Events from "@/components/EventsPreview";


export default function Home() {
  return (
    <main className="w-full h-screen bg-black m-auto px-8 my-4">
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