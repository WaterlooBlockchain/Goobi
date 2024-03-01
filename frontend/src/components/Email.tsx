

export default function Email() {

    const handleSubmit = async () => {
        const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement;
        const email = emailInput ? emailInput.value : () => { alert('Empty email!'); return;} ;
        const res = await fetch('/api/email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });
        if (res.status === 200) {
            alert('Email submitted successfully');
        } else if (res.status === 400) {
            alert('Email already submitted');
        } else {
            alert('Internal server error');
        }

    };


    return (
        <section className="py-8 m-auto">
        <h2 className="text-3xl font-bold mb-4">Submit Email to Claim</h2>
        <div className="flex">
        <input
        type="email"
        placeholder="username@uwaterloo.ca"
        pattern="[A-Za-z0-9._%+-]+@uwaterloo\.ca"
        className="rounded-l-md px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 flex-1 text-black"
        required // Ensure that the field is not empty
        />
      <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-r-md" onClick={handleSubmit}>
        Submit
      </button>
        </div>
      </section>
    )
}