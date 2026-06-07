"use client";

import { useState } from "react";

const CASCADE_ITEMS = [
  { emoji: "💵", left: "5%", size: 28, duration: 5, delay: 0 },
  { emoji: "💸", left: "15%", size: 32, duration: 6, delay: 0.5 },
  { emoji: "💵", left: "28%", size: 24, duration: 4.5, delay: 1 },
  { emoji: "🪙", left: "42%", size: 26, duration: 6.5, delay: 1.5 },
  { emoji: "💵", left: "55%", size: 30, duration: 5.2, delay: 2 },
  { emoji: "💸", left: "68%", size: 28, duration: 5.8, delay: 2.5 },
  { emoji: "💵", left: "78%", size: 32, duration: 6.2, delay: 3 },
  { emoji: "🪙", left: "90%", size: 24, duration: 4.8, delay: 3.5 },
  { emoji: "💵", left: "10%", size: 26, duration: 5.5, delay: 4 },
  { emoji: "💸", left: "35%", size: 30, duration: 6, delay: 4.5 },
  { emoji: "💵", left: "60%", size: 28, duration: 5, delay: 5 },
  { emoji: "🪙", left: "85%", size: 26, duration: 5.5, delay: 5.5 },
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
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 flex items-center justify-center relative overflow-hidden">
      {CASCADE_ITEMS.map((item) => (
        <div
          key={`${item.emoji}-${item.left}`}
          className="cascade-item"
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

      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-amber-500 rounded-full mix-blur-5xl animate-pulse" style={{ animationDuration: "8s" }} />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-600 rounded-full mix-blur-5xl animate-pulse" style={{ animationDuration: "10s" }} />
      </div>

      <div className="relative z-10 w-full max-w-md px-4">
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-3 tracking-tight">
            Rent Payments
          </h1>
          <p className="text-amber-400 text-lg font-medium">Secure monthly payment portal</p>
        </div>

        <div className="glass-morphism rounded-3xl p-8 shadow-2xl transition-all duration-500 hover:shadow-amber-500/20">
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mr-3 pulse-dot">
              <span className="text-2xl">🏠</span>
            </div>
            <h2 className="text-2xl font-bold text-white">Monthly Rent</h2>
          </div>

          <div className="mb-6">
            <label className="text-slate-400 text-sm font-medium mb-2 block">Payment Amount (USD)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-slate-400">$</span>
              <input
                type="text"
                value={amount}
                onChange={handleAmountChange}
                placeholder="0.00"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-10 pr-4 text-3xl font-bold text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 transition-all"
              />
            </div>
          </div>

          <button
            onClick={handleCheckout}
            disabled={loading || !amount || parseFloat(amount) <= 0}
            className="w-full relative overflow-hidden bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 hover:from-amber-500 hover:via-orange-500 hover:to-red-500 disabled:from-slate-700 disabled:to-slate-800 text-white font-bold py-5 rounded-2xl text-lg uppercase tracking-wider transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-xl hover:shadow-amber-500/30 group"
          >
            <span className="relative z-10 flex items-center justify-center">
              {loading ? "Processing..." : `Pay $${amount || "0.00"}`}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          <div className="flex items-center justify-center mt-6 text-slate-400">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-8 0V6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H10z" />
            </svg>
            <span className="text-sm font-medium">Secured by Stripe</span>
          </div>
        </div>

        <div className="text-center mt-8 text-slate-500 text-xs">
          Payments processed securely. Questions? Contact support
        </div>
      </div>
    </main>
  );
}