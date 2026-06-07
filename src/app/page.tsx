"use client";

import { useState } from "react";

export default function Home() {
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-900 flex items-center justify-center">
      <div className="w-full max-w-md px-4">
        <div className="bg-neutral-800 rounded-2xl p-8 shadow-xl border border-neutral-700">
          <h1 className="text-3xl font-semibold text-white mb-2">
            Rent Payment
          </h1>
          <p className="text-neutral-400 mb-6">
            Pay your monthly rent securely with Stripe.
          </p>

          <div className="flex justify-between items-center py-4 border-b border-neutral-700">
            <span className="text-neutral-300">Monthly Rent</span>
            <span className="text-2xl font-semibold text-white">
              $1,500.00
            </span>
          </div>

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-neutral-600 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-colors"
          >
            {loading ? "Loading..." : "Pay Rent"}
          </button>

          <p className="text-center text-neutral-500 text-sm mt-4">
            Secured by Stripe
          </p>
        </div>
      </div>
    </main>
  );
}