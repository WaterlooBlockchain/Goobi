export default function Email() {
    return (
        <section className="py-8">
        <h2 className="text-3xl font-bold mb-4">Submit Email to Claim</h2>
        <div className="flex">
        <input
        type="email"
        placeholder="yourename@uwaterloo.ca"
        pattern="\b[A-Za-z0-9._%+-]+@uwaterloo\.ca\b"
        className="rounded-l-md px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 flex-1"
        required // Ensure that the field is not empty
      />
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r-md">
        Submit
      </button>
        </div>
      </section>
    )
}