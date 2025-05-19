export async function saveRecording({
  scenarioId,
  transcript,
}: {
  scenarioId: string;
  transcript: { role: string; text: string; timestamp: string }[];
}) {
  if (!transcript || transcript.length === 0) return;

  try {
    const res = await fetch("/api/recordings/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        scenarioId,
        transcript,
      }),
    });

    if (!res.ok) {
      throw new Error(`Failed to save recording: ${res.statusText}`);
    }
  } catch (err) {
    console.error("Error saving recording:", err);
  }
}