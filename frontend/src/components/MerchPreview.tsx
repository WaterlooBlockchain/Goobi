import Link from 'next/link';


export default function MerchPreview() {
    return (
        <section className="py-8">
        <h2 className="text-3xl font-bold mb-4 text-yellow-400">Merchandise Preview</h2>
        {/* Add preview of merchandises here */}
        <Link href="/merch" passHref={true} legacyBehavior={true}>
          <div className="text-blue-500 hover:underline">View More Merchandises &#8594;</div>
        </Link>
      </section>
  
    )
}