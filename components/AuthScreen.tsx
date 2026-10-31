
"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase";

export function AuthScreen() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const supabase = createClient();

  async function sendOtp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
      },
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setOtpSent(true);
    setMessage("OTP sent! Check your email inbox.");
  }

  async function verifyOtp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: "email",
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Login successful!");
  }

  return (
    <main className="flex min-h-dvh items-center justify-center bg-canvas px-4">
      <div className="w-full max-w-md rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-ink">Worker Saathi</h1>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to access your worker support dashboard.
          </p>
        </div>

        {!otpSent ? (
          <form onSubmit={sendOtp} className="space-y-4">
            <label className="block text-sm font-medium text-ink">
              Email address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={verifyOtp} className="space-y-4">
            <p className="text-sm text-gray-600">
              Enter the OTP sent to {email}
            </p>
            <input
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        )}

        {message && (
          <p className="mt-4 text-center text-sm text-gray-600">
            {message}
          </p>
        )}
      </div>
    </main>
  );
}
