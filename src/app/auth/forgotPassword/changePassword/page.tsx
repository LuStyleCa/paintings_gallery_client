"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "@/app/services/AuthService";
import { useEmail } from "@/app/EmailContext";

export default function ChangePasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { email, setEmail } = useEmail();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    const changePassword = async () => {
      const response = await AuthService.changePassword(password, confirmPassword, email);
      if (response && email) {
        setEmail("");
        router.push("/auth/login/");
      } else {
        setError("Failed to change password.");
      }
    };

    changePassword();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={submit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Reset Your Password
        </h2>
        <p className="mb-6 text-gray-600 text-sm text-center">
          Enter your new password below.
        </p>

        {error && (
          <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
        )}

        <label className="block text-sm font-medium text-gray-700">
          New Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 mb-4 w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <label className="block text-sm font-medium text-gray-700">
          Confirm New Password
        </label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="mt-1 mb-6 w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Change Password
        </button>
      </form>
    </div>
  );
}
