import Link from 'next/link';


export default function Merch() {
    return (
        <section className="py-8">
        <h2 className="text-3xl font-bold mb-4">Merchandise Preview</h2>
        {/* Add preview of merchandises here */}
        <Link href="/burn" passHref={true} legacyBehavior={true}>
          <div className="text-blue-500 hover:underline">View More Merchandises &#8594;</div>
        </Link>
      </section>
  
    )
}