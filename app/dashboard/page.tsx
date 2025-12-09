"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [emails, setEmails] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p className="p-4">Checking authentication...</p>;
  }

  if (status === "unauthenticated") {
    return <p className="p-4">Redirecting to login...</p>;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatusMsg(null);

    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emails, subject, message }),
    });

    const data = await res.json();
    if (res.ok) {
      setStatusMsg("Emails sent successfully!");
      setEmails("");
      setSubject("");
      setMessage("");
    } else {
      setStatusMsg(data.error || "Failed to send emails");
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Email Notification Interface</h1>
          <button
            onClick={() => signOut()}
            className="px-3 py-1 border rounded-md text-sm"
          >
            Logout
          </button>
        </div>

        <p className="mb-4 text-sm text-gray-600">
          Logged in as: <strong>{session?.user?.email}</strong>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">
              Recipient Email(s)
            </label>
            <input
              type="text"
              className="w-full border rounded-md px-3 py-2 text-sm"
              placeholder="example1@gmail.com, example2@gmail.com"
              value={emails}
              onChange={(e) => setEmails(e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-1">
              You can enter multiple emails separated by commas.
            </p>
          </div>

          <div>
            <label className="block mb-1 font-medium">Subject</label>
            <input
              type="text"
              className="w-full border rounded-md px-3 py-2 text-sm"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Message</label>
            <textarea
              className="w-full border rounded-md px-3 py-2 text-sm"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 rounded-md border font-medium"
          >
            Send Email
          </button>
        </form>

        {statusMsg && <p className="mt-4 text-sm">{statusMsg}</p>}
      </div>
    </main>
  );
}
