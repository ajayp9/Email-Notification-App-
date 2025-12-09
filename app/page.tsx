"use client";

import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { status } = useSession();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");

  // shared fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // sign up extra field
  const [name, setName] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Redirect when logged in
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p className="p-4">Loading...</p>;
  }

  if (status === "authenticated") {
    return <p className="p-4">Redirecting...</p>;
  }

  // Handle email/password SIGN IN
  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/dashboard");
    }
  }

  // Handle email/password SIGN UP
  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Signup failed");
        setLoading(false);
        return;
      }

      // auto sign-in after successful sign-up
      const loginRes = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      setLoading(false);

      if (loginRes?.error) {
        setError("Account created, but login failed. Try sign in.");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
      setLoading(false);
    }
  }

  const isSignIn = activeTab === "signin";

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        {/* Tabs */}
        <div className="flex border-b mb-4">
          <button
            className={`flex-1 py-2 text-center font-semibold ${
              isSignIn
                ? "border-b-2 border-green-600"
                : "text-gray-500 border-b-2 border-transparent"
            }`}
            onClick={() => {
              setActiveTab("signin");
              setError(null);
            }}
          >
            Sign In
          </button>
          <button
            className={`flex-1 py-2 text-center font-semibold ${
              !isSignIn
                ? "border-b-2 border-green-600"
                : "text-gray-500 border-b-2 border-transparent"
            }`}
            onClick={() => {
              setActiveTab("signup");
              setError(null);
            }}
          >
            Sign Up
          </button>
        </div>

        {/* Forms */}
        {isSignIn ? (
          // SIGN IN FORM
          <form onSubmit={handleSignIn} className="space-y-3">
            <input
              type="email"
              placeholder="Email"
              className="w-full border rounded px-3 py-2 text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border rounded px-3 py-2 text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4" />
                <span>Remember me</span>
              </label>
              <button type="button" className="text-green-600 hover:underline">
                Forgot Password
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded text-sm font-medium"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        ) : (
          // SIGN UP FORM
          <form onSubmit={handleSignUp} className="space-y-3">
            <input
              type="text"
              placeholder="Name"
              className="w-full border rounded px-3 py-2 text-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full border rounded px-3 py-2 text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border rounded px-3 py-2 text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded text-sm font-medium"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>
        )}

        {/* Error message */}
        {error && (
          <p className="mt-3 text-sm text-red-600 text-center">{error}</p>
        )}

        {/* OR separator */}
        <div className="flex items-center my-4">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="mx-2 text-xs text-gray-500">or</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        {/* Social login buttons – all wired to providers */}
        <div className="grid grid-cols-2 gap-3">
          {/* Google */}
          <button
            type="button"
            className="flex items-center justify-center gap-2 border rounded py-2 text-sm"
            onClick={() => signIn("google")}
          >
            <span>🟥</span>
            <span>Google</span>
          </button>

          {/* Facebook */}
          <button
            type="button"
            className="flex items-center justify-center gap-2 border rounded py-2 text-sm"
            onClick={() => signIn("facebook")}
          >
            <span>📘</span>
            <span>Facebook</span>
          </button>

          {/* LinkedIn */}
          <button
            type="button"
            className="flex items-center justify-center gap-2 border rounded py-2 text-sm"
            onClick={() => signIn("linkedin")}
          >
            <span>🔗</span>
            <span>LinkedIn</span>
          </button>

          {/* GitHub */}
          <button
            type="button"
            className="flex items-center justify-center gap-2 border rounded py-2 text-sm"
            onClick={() => signIn("github")}
          >
            <span>🐱</span>
            <span>GitHub</span>
          </button>
        </div>

        <p className="mt-4 text-[11px] text-center text-gray-500">
          By creating this account, you agree to our Privacy Policy &amp; Cookie
          Policy.
        </p>
      </div>
    </main>
  );
}
