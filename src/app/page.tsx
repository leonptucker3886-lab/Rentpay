"use client";

import { useId, useState } from "react";

const BILLS = [
  { emoji: "💵", left: "5%", size: 28, duration: 4, delay: 0 },
  { emoji: "💸", left: "15%", size: 32, duration: 5.5, delay: 1 },
  { emoji: "💵", left: "28%", size: 24, duration: 4.8, delay: 2.3 },
  { emoji: "🪙", left: "42%", size: 26, duration: 6, delay: 0.5 },
  { emoji: "💵", left: "55%", size: 30, duration: 5, delay: 3.1 },
  { emoji: "💸", left: "68%", size: 28, duration: 4.2, delay: 1.7 },
  { emoji: "💵", left: "78%", size: 32, duration: 5.8, delay: 2.8 },
  { emoji: "🪙", left: "90%", size: 24, duration: 4.5, delay: 0.9 },
  { emoji: "💵", left: "10%", size: 26, duration: 6.2, delay: 3.5 },
  { emoji: "💸", left: "35%", size: 30, duration: 4.7, delay: 1.2 },
  { emoji: "💵", left: "60%", size: 28, duration: 5.3, delay: 2 },
  { emoji: "🪙", left: "85%", size: 26, duration: 4.9, delay: 3.8 },
];

export default function Home() {
  const uid = useId();

  return (
    <main className="min-h-screen bg-neutral-950 flex items-center justify-center relative overflow-hidden">
      {}
      {BILLS.map((bill) => (
        <div
          key={`${uid}-${bill.emoji}-${bill.left}`}
          className="bill"
          style={{
            left: bill.left,
            fontSize: bill.size,
            animationDuration: `${bill.duration}s, 2s`,
            animationDelay: `${bill.delay}s, ${bill.delay * 0.3}s`,
          }}
        >
          {bill.emoji}
        </div>
      ))}

      {}
      <div className="w-full max-w-md px-4 relative z-10">
        {}
        <h1
          className="graffiti-title text-6xl md:text-7xl font-black text-center mb-2 leading-tight"
          style={{
            fontFamily: "'Arial Black', 'Impact', sans-serif",
            color: "#ff0055",
          }}
        >
          RENT PAYMENTS
        </h1>

        {}
        <p className="text-center text-neutral-400 italic mb-8 text-lg tracking-wide">
          by Leon-LinkedIn
        </p>

        {}
        <div className="bg-neutral-900/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border-2 border-neutral-700 relative">
          {}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-yellow-300 text-black font-black px-6 py-1 rounded-full text-sm uppercase tracking-widest rotate-[-2deg] shadow-lg">
            Due the 1st of every month
          </div>

          <h2 className="text-2xl font-bold text-white text-center mb-1 mt-2">
            Pay Your Rent
          </h2>
          <p className="text-neutral-400 text-center text-sm mb-6">
            Monthly rent payment — secure checkout via Stripe
          </p>

          <div className="flex justify-between items-center py-4 border-b-2 border-dashed border-neutral-600">
            <span className="text-neutral-300 font-medium">Monthly Rent</span>
            <span className="text-3xl font-black text-yellow-400">
              $1,500.00
            </span>
          </div>

          <ClientPayButton />

          <p className="text-center text-neutral-500 text-xs mt-4">
            🔒 Secured by Stripe
          </p>
        </div>
      </div>
    </main>
  );
}

function ClientPayButton() {
  "use client";
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="w-full mt-6 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 disabled:from-neutral-600 disabled:to-neutral-700 text-black font-black py-4 rounded-xl text-lg uppercase tracking-widest transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg hover:shadow-yellow-500/30"
    >
      {loading ? "Loading..." : "💵 Pay Rent"}
    </button>
  );
}