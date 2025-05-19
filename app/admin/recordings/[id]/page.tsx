"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Recording = {
  id: string;
  createdAt: string;
  audioUrl?: string | null;
  transcript?: { role: string; text: string }[];
  agent: { name?: string; email: string };
  scenario: { title: string };
};

export default function RecordingDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [recording, setRecording] = useState<Recording | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id || typeof id !== "string") return;

    fetch(`/api/recordings/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => setRecording(data))
      .catch((err) => {
        console.error(err);
        router.replace("/admin/recordings");
      })
      .finally(() => setLoading(false));
  }, [id, router]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!recording) return null;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Recording Details</h1>

      <p>
        <strong>Agent:</strong> {recording.agent.name || recording.agent.email}
      </p>
      <p>
        <strong>Scenario:</strong> {recording.scenario.title}
      </p>
      <p>
        <strong>Created At:</strong>{" "}
        {new Date(recording.createdAt).toLocaleString()}
      </p>

      {recording.audioUrl && (
        <div className="mt-4">
          <audio controls>
            <source src={recording.audioUrl} type="audio/mpeg" />
          </audio>
        </div>
      )}

      {recording.transcript && (
        <div className="mt-6 bg-gray-50 p-4 rounded">
          <h2 className="text-lg font-semibold mb-2">Transcript</h2>
          <div className="whitespace-pre-wrap text-sm">
            {recording.transcript.map((msg, idx) => (
              <p key={idx}>
                <strong>[{msg.role}]</strong> {msg.text}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
