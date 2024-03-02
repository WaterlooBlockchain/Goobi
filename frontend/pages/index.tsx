import Header from "../components/Header";
import Hero from "../components/Hero";
import Email from "../components/Email";
import MerchPreview from "../components/MerchPreview";
import EventsPreview from "../components/EventsPreview";

export default function Home() {
  console
  return (
    <main className="w-full min-h-screen bg-black">
      <Header />
      <div className="container mx-auto px-auto py-12"> {/* Adjust padding */}
        {/* Introduction of the token */}
        <Hero/>
        {/* Preview of merchandises */}
        <MerchPreview/>
        {/* Preview of events */}
        <EventsPreview/>
      </div>
    </main>
  );
}