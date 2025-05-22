"use client";

import { useState } from "react";
import { AuthService } from "@/app/services/AuthService";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/AuthContext";
// import { UserModel } from "@/app/models/User-model";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
//   const [user, setUser] = useState<UserModel | null>(null);
  const router = useRouter();
  const { login } = useAuth();

  const handleRedirectToAdminPage = () => {
    router.push("/pages/admin");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }
    const userData = await AuthService.login(email, password);
    login(userData);
    if (userData.role === "ADMIN") {
      handleRedirectToAdminPage();
    }

    // setUser(userData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {error && (
          <div className="text-red-500 mb-4 text-sm text-center">{error}</div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring focus:border-blue-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring focus:border-blue-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Log In
        </button>
        <p className="flex justify-center mt-6 text-sm cursor-pointer hover:underline">Forgot password</p>  
      </form>

      
    </div>
  );
}
