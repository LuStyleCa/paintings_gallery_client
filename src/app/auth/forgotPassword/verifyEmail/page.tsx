"use client";

import { useState } from "react";
import { AuthService } from "@/app/services/AuthService";
import { useRouter } from "next/navigation";
import { useEmail } from "@/app/EmailContext";

export default function VerifyEmail() {
  const [email, setEmailInput] = useState("");
  const router = useRouter();
  const { setEmail } = useEmail();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const verifyEmail = async () => {
      const response = await AuthService.verifyEmail(email);
      if (response) {
        setEmail(email)
        router.push(`/auth/forgotPassword/verifyOtp`);
      }
    };

    verifyEmail();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={submit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Password Recovery
        </h2>
        <p className="mb-6 text-gray-600 text-sm text-center">
          Enter your email address. We&apos;ll send you a verification code to
          reset your password.
        </p>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email address
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmailInput(e.target.value)}
          className="mt-1 mb-4 w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Send Verification Code
        </button>
      </form>
    </div>
  );
}
