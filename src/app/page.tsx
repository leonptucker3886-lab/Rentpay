"use client";

import { useState } from "react";

const MONEY_ITEMS = [
  { emoji: "💵", left: "8%", size: 24, duration: 6, delay: 0 },
  { emoji: "💵", left: "22%", size: 20, duration: 7, delay: 0.3 },
  { emoji: "🪙", left: "35%", size: 22, duration: 5.5, delay: 0.6 },
  { emoji: "💸", left: "48%", size: 26, duration: 6.5, delay: 0.9 },
  { emoji: "💵", left: "62%", size: 28, duration: 7, delay: 1.2 },
  { emoji: "🪙", left: "75%", size: 22, duration: 5.8, delay: 1.5 },
  { emoji: "💸", left: "88%", size: 24, duration: 6.2, delay: 1.8 },
];

export default function Home() {
  const [amount, setAmount] = useState("1500.00");
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: parseFloat(amount) }),
      });
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

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value) || value === "") {
      setAmount(value);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900">
      <div className="absolute inset-0 pointer-events-none z-0 hidden sm:block">
        {MONEY_ITEMS.map((item, i) => (
          <div
            key={i}
            className="money-fall"
            style={{
              left: item.left,
              fontSize: item.size,
              animationDuration: `${item.duration}s`,
              animationDelay: `${item.delay}s`,
            }}
          >
            {item.emoji}
          </div>
        ))}
      </div>

      <div className="w-full max-w-sm bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
        <div className="text-center mb-6">
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">Rent Payments</h1>
          <p className="text-amber-400 text-sm font-medium">Secure monthly payment portal</p>
        </div>

        <div className="mb-6">
          <label className="text-slate-400 text-xs font-medium mb-2 block">Payment Amount (USD)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xl text-slate-400">$</span>
            <input
              type="text"
              inputMode="decimal"
              value={amount}
              onChange={handleAmountChange}
              placeholder="1500.00"
              className="w-full bg-white/10 border border-white/20 rounded-xl py-3 pl-8 pr-10 text-2xl font-bold text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-all"
            />
          </div>
        </div>

        <button
          onClick={handleCheckout}
          disabled={loading || !amount || parseFloat(amount) <= 0}
          className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 disabled:from-slate-700 text-white font-bold py-4 rounded-xl text-lg uppercase tracking-wider transition-all shadow-lg"
        >
          {loading ? "Processing..." : `Pay $${amount || "0.00"}`}
        </button>

        <div className="flex items-center justify-center mt-6 text-slate-400 text-xs">
          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-8 0V6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H10z" />
          </svg>
          Secured by Stripe
        </div>
      </div>
    </main>
  );
}