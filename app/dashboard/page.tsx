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
    return <p className="p-4 text-black dark:text-white">Checking authentication...</p>;
  }

  if (status === "unauthenticated") {
    return <p className="p-4 text-black dark:text-white">Redirecting to login...</p>;
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
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-black dark:text-white">
            Email Notification Interface
          </h1>

          <button
            onClick={() => signOut()}
            className="px-3 py-1 border rounded-md text-sm 
                       text-black dark:text-white 
                       border-gray-400 dark:border-gray-600 
                       hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            Logout
          </button>
        </div>

        <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
          Logged in as: <strong className="text-black dark:text-white">{session?.user?.email}</strong>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block mb-1 font-medium text-black dark:text-gray-200">
              Recipient Email(s)
            </label>
            <input
              type="text"
              className="w-full border rounded-md px-3 py-2 text-sm 
                         text-black dark:text-white 
                         bg-white dark:bg-gray-700 
                         border-gray-300 dark:border-gray-600"
              placeholder="example1@gmail.com, example2@gmail.com"
              value={emails}
              onChange={(e) => setEmails(e.target.value)}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              You can enter multiple emails separated by commas.
            </p>
          </div>

          {/* Subject */}
          <div>
            <label className="block mb-1 font-medium text-black dark:text-gray-200">
              Subject
            </label>
            <input
              type="text"
              className="w-full border rounded-md px-3 py-2 text-sm
                         text-black dark:text-white 
                         bg-white dark:bg-gray-700 
                         border-gray-300 dark:border-gray-600"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          {/* Message */}
          <div>
            <label className="block mb-1 font-medium text-black dark:text-gray-200">
              Message
            </label>
            <textarea
              className="w-full border rounded-md px-3 py-2 text-sm 
                         text-black dark:text-white
                         bg-white dark:bg-gray-700 
                         border-gray-300 dark:border-gray-600"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="px-4 py-2 rounded-md border font-medium
                       text-black dark:text-white 
                       border-gray-400 dark:border-gray-600
                       hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            Send Email
          </button>
        </form>

        {statusMsg && (
          <p className="mt-4 text-sm text-black dark:text-white">
            {statusMsg}
          </p>
        )}
      </div>
    </main>
  );
}
