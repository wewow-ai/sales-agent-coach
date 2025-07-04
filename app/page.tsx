"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useWebRTCAudioSession from "@/hooks/use-webrtc";
import { tools } from "@/lib/tools";
import { Welcome } from "@/components/welcome";
import { VoiceSelector } from "@/components/voice-select";
import { BroadcastButton } from "@/components/broadcast-button";
import { StatusDisplay } from "@/components/status";
import { TokenUsageDisplay } from "@/components/token-usage";
import { MessageControls } from "@/components/message-controls";
import { ToolsEducation } from "@/components/tools-education";
import { TextInput } from "@/components/text-input";
import { motion } from "framer-motion";
import { useToolsFunctions } from "@/hooks/use-tools";
import { ScriptSelector } from "@/components/script-select"; // Import the new ScriptSelector

interface Scenario {
  id: string;
  title: string;
  description: string;
  transcript: string;
  breakdown: string;
  createdAt: string;
  updatedAt: string;
  createdBy: {
    name: string;
  };
}

const App: React.FC = () => {
  // Get session to check authentication
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();

  // If the session is loading or there is no session, redirect to login
  useEffect(() => {
    if (sessionStatus === "loading") return; // Don't redirect while checking session
    if (!session) {
      router.push("/auth/signin"); // Redirect to login if no session
    }
  }, [session, sessionStatus, router]);

  // State for voice selection
  const [voice, setVoice] = useState("ash");
  // State for script selection
  const [selectedScript, setSelectedScript] = useState<string | null>(null);
  // State for available scripts
  const [scripts, setScripts] = useState<Scenario[]>([]);

  // Fetch scripts from the API
  useEffect(() => {
    const fetchScripts = async () => {
      try {
        const res = await fetch("/api/scenarios");
        if (res.ok) {
          const data: Scenario[] = await res.json();
          setScripts(data);
          // Optionally set the first script as default
          if (data.length > 0) {
            setSelectedScript(data[0].id);
          }
        } else {
          console.error("Failed to fetch scripts:", res.statusText);
        }
      } catch (error) {
        console.error("Error fetching scripts:", error);
      }
    };
    fetchScripts();
  }, []);

  // WebRTC Audio Session Hook
  // You might want to pass selectedScript to useWebRTCAudioSession if it needs it
  const {
    status,
    isSessionActive,
    registerFunction,
    handleStartStopClick,
    msgs,
    conversation,
    sendTextMessage,
  } = useWebRTCAudioSession(voice, selectedScript, tools); // Consider adding selectedScript here

  // Get all tools functions
  const toolsFunctions = useToolsFunctions();

  useEffect(() => {
    // Register all functions by iterating over the object
    Object.entries(toolsFunctions).forEach(([name, func]) => {
      const functionNames: Record<string, string> = {
        timeFunction: "getCurrentTime",
        backgroundFunction: "changeBackgroundColor",
        partyFunction: "partyMode",
        launchWebsite: "launchWebsite",
        copyToClipboard: "copyToClipboard",
        scrapeWebsite: "scrapeWebsite",
      };

      registerFunction(functionNames[name], func);
    });
  }, [registerFunction, toolsFunctions]);

  return (
    <main className="h-full">
      <motion.div
        className="container flex flex-col items-center justify-center mx-auto max-w-3xl my-20 p-12 border rounded-lg shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Welcome />

        <motion.div
          className="w-full max-w-md bg-card text-card-foreground rounded-xl border shadow-sm p-6 space-y-4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <VoiceSelector value={voice} onValueChange={setVoice} />

          {/* New Script Selector */}
          {scripts.length > 0 && selectedScript !== null && (
            <ScriptSelector
              value={selectedScript}
              onValueChange={setSelectedScript}
              scripts={scripts}
            />
          )}

          <div className="flex flex-col items-center gap-4">
            <BroadcastButton
              isSessionActive={isSessionActive}
              onClick={handleStartStopClick}
            />
          </div>
          {msgs.length > 4 && <TokenUsageDisplay messages={msgs} />}
          {status && (
            <motion.div
              className="w-full flex flex-col gap-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <MessageControls conversation={conversation} msgs={msgs} />
              <TextInput
                onSubmit={sendTextMessage}
                disabled={!isSessionActive}
              />
            </motion.div>
          )}
        </motion.div>

        {status && <StatusDisplay status={status} />}
        <div className="w-full flex flex-col items-center gap-4">
          <ToolsEducation />
        </div>
      </motion.div>
    </main>
  );
};

export default App;
