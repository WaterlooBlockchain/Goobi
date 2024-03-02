import Link from 'next/link';

export default function Events() {
    return (
        <section className="py-8">
      <h2 className="text-3xl font-bold mb-4 text-yellow-400">Events Preview</h2>
      {/* Add preview of events here */}
      <Link href="/events" passHref={true} legacyBehavior={true}>
        <div className="text-blue-500 hover:underline">View More Events &#8594;</div>
      </Link>
    </section>
    )
}