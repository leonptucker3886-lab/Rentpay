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
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 flex items-center justify-center relative overflow-hidden">
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

          <div className="bg-white/5 rounded-2xl p-6 mb-6 border border-white/10">
            <div className="flex justify-between items-center">
              <span className="text-slate-300 font-medium text-lg">Amount Due</span>
              <span className="text-4xl font-black bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                $1,500.00
              </span>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full relative overflow-hidden bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 hover:from-amber-500 hover:via-orange-500 hover:to-red-500 disabled:from-slate-700 disabled:to-slate-800 text-white font-bold py-5 rounded-2xl text-lg uppercase tracking-wider transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-xl hover:shadow-amber-500/30 group"
          >
            <span className="relative z-10 flex items-center justify-center">
              {loading ? "Processing..." : "Complete Payment"}
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