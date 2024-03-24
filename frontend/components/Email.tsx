"use client";

import { useCallback, useState } from "react";

export default function Email() {
    const [statusText, setStatusText] = useState('');

    const handleSubmit = useCallback(async () => {
        const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement;
        const email = emailInput ? emailInput.value : () => { alert('Empty email!'); return;} ;
        try {
            const res = await fetch('/api/getVerified', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            console.log(res);
            setStatusText(res.statusText);
        }catch(err: any){
            console.log(err.toString())
        }

    }, []);


    return (
        <section className="py-8 m-auto">
        <h2 className="text-center text-3xl font-bold mb-4 text-yellow-400">Submit Email to Claim</h2>
        <div className="flex mx-8">
        <input
        type="email"
        placeholder="username@uwaterloo.ca"
        className="rounded-l-md px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 flex-1 text-black"
        required // Ensure that the field is not empty
        />
      <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-r-md" onClick={handleSubmit}>
        Submit
      </button>
        </div>
        <p className="text-yellow-400 text-center py-2">{statusText}</p>
      </section>
    )
}