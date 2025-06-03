"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function NewScenarioPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [transcript, setTranscript] = useState("");
  const [breakdown, setBreakdown] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/admin/scenarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        transcript,
        breakdown,
      }),
    });

    if (res.ok) {
      router.push("/admin/scenarios");
    } else {
      alert("Failed to create scenario.");
    }

    setLoading(false);
  };

  return (
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Create New Scenario</h1>

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

        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Scenario"}
        </Button>
      </form>
    </main>
  );
}
