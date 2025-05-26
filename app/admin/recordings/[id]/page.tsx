"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "@/components/translations-context";

type Recording = {
  id: string;
  createdAt: string;
  audioUrl?: string | null;
  transcript?: { role: string; text: string }[];
  agent: { name?: string; email: string };
  scenario: { title: string };
  feedback?: string | null;
};

export default function RecordingDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [recording, setRecording] = useState<Recording | null>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslations();

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

  if (loading) return <div className="p-6">{t("common.loading")}</div>;
  if (!recording) return null;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{t("recording.title")}</h1>

      <p>
        <strong>{t("recording.agent")}:</strong>{" "}
        {recording.agent.name || recording.agent.email}
      </p>
      <p>
        <strong>{t("recording.scenario")}:</strong> {recording.scenario.title}
      </p>
      <p>
        <strong>{t("recording.createdAt")}:</strong>{" "}
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
          <h2 className="text-lg font-semibold mb-2">
            {t("recording.transcript")}
          </h2>
          <div className="whitespace-pre-wrap text-sm">
            {recording.transcript.map((msg, idx) => (
              <p key={idx}>
                <strong>[{msg.role}]</strong> {msg.text}
              </p>
            ))}
          </div>
        </div>
      )}
      {recording.feedback && (
        <div className="mt-6 bg-blue-50 p-4 rounded">
          <h2 className="text-lg font-semibold mb-2">
            {t("recording.feedback")}
          </h2>
          <p className="whitespace-pre-wrap text-sm">{recording.feedback}</p>
        </div>
      )}
    </div>
  );
}
