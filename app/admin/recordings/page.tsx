"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Recording = {
  id: string;
  createdAt: string;
  audioUrl?: string | null;
  transcript?: { role: string; text: string }[];
  agent: { name?: string; email: string };
  scenario: { title: string };
};

export default function RecordingsPage() {
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/recordings")
      .then((res) => res.json())
      .then((data) => setRecordings(data))
      .catch((err) => console.error("Error loading recordings", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Recordings</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid gap-4">
          {recordings.map((rec) => {
            const date = new Date(rec.createdAt).toLocaleString();
            return (
              <Link
                key={rec.id}
                href={`/admin/recordings/${rec.id}`}
                className="block p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p>
                      <strong>Agent:</strong>{" "}
                      {rec.agent.name || rec.agent.email}
                    </p>
                    <p>
                      <strong>Scenario:</strong> {rec.scenario.title}
                    </p>
                    <p className="text-sm text-gray-500">{date}</p>
                  </div>
                  {rec.audioUrl && (
                    <audio controls className="mt-2">
                      <source src={rec.audioUrl} type="audio/mpeg" />
                    </audio>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
