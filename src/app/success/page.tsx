import Link from "next/link";

export default function Success() {
  return (
    <main className="min-h-screen bg-neutral-900 flex items-center justify-center">
      <div className="w-full max-w-md px-4 text-center">
        <div className="bg-neutral-800 rounded-2xl p-8 shadow-xl border border-neutral-700">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-semibold text-white mb-2">
            Payment Successful
          </h1>
          <p className="text-neutral-400 mb-6">
            Your rent payment has been processed successfully.
          </p>
          <Link
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </main>
  );
}