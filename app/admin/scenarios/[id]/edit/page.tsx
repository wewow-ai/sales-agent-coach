// app/admin/scenarios/[id]/edit/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function EditScenarioPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [transcript, setTranscript] = useState("");
  const [breakdown, setBreakdown] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/admin/scenarios/${id}`);
      if (!res.ok) {
        alert("Failed to fetch scenario.");
        return;
      }

      const data = await res.json();
      setTitle(data.title);
      setDescription(data.description);
      setTranscript(data.transcript);
      setBreakdown(data.breakdown);
      setLoading(false);
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const res = await fetch(`/api/admin/scenarios/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, transcript, breakdown }),
    });

    if (res.ok) {
      router.push("/admin/scenarios");
    } else {
      alert("Failed to update scenario.");
    }

    setSaving(false);
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Edit Scenario</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="transcript">Scenario</Label>
          <Textarea
            id="transcript"
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            rows={5}
          />
        </div>

        <div>
          <Label htmlFor="breakdown">Feedback</Label>
          <Textarea
            id="breakdown"
            value={breakdown}
            onChange={(e) => setBreakdown(e.target.value)}
            rows={5}
          />
        </div>

        <Button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Update Scenario"}
        </Button>
      </form>
    </main>
  );
}
