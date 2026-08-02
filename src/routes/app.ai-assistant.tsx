import { createFileRoute } from "@tanstack/react-router";
import { Bot, Send, Sparkles, User } from "lucide-react";
import { useState } from "react";

import { PageHeader } from "@/components/app/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/ai-assistant")({
  head: () => ({
    meta: [
      { title: "AI Safety Assistant — SentinelQHSE™" },
      { name: "description", content: "Ask the AI safety assistant about incidents, permits, procedures and regulations." },
      { property: "og:title", content: "AI Safety Assistant — SentinelQHSE™" },
      { property: "og:description", content: "Conversational safety intelligence for your operations." },
    ],
  }),
  component: AssistantPage,
});

type Msg = { role: "user" | "assistant"; text: string };

const SUGGESTIONS = [
  "Summarise the open critical incidents at Flow Station A",
  "What are the PPE requirements for hot work?",
  "Draft a toolbox talk on lifting operations",
  "Which corrective actions are overdue this week?",
  "Explain the permit-to-work escalation process",
];

const CANNED =
  "Based on the last 90 days of operational data, Flow Station A carries the highest residual risk: 7 open incidents, a safety score of 68, and a heat-stress risk index of 82%. The dominant contributors are extended 12-hour shifts during peak ambient temperature and four late permit closures. Recommended actions: reschedule non-critical hot work outside 12:00–16:00, add a hydration and rotation checkpoint to the shift handover, and re-verify permit closure discipline with the supervisory team this week.";

function AssistantPage() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      text: "I'm your SentinelQHSE safety assistant. I have context on your incidents, inspections, audits and corrective actions. What would you like to review?",
    },
  ]);
  const [input, setInput] = useState("");

  const send = (text: string) => {
    const value = text.trim();
    if (!value) return;
    setMessages((m) => [...m, { role: "user", text: value }, { role: "assistant", text: CANNED }]);
    setInput("");
  };

  return (
    <>
      <PageHeader
        title="AI Safety Assistant"
        description="Grounded in your organization's incidents, procedures and regulatory library."
      />

      <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
        <Card className="flex h-[620px] flex-col shadow-card">
          <CardHeader className="border-b">
            <CardTitle className="flex items-center gap-2 text-base">
              <Bot className="h-4 w-4 text-primary" /> Conversation
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 space-y-4 overflow-y-auto py-5">
            {messages.map((m, i) => (
              <div key={i} className={cn("flex gap-3", m.role === "user" && "flex-row-reverse")}>
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                    m.role === "user" ? "bg-secondary" : "bg-primary/10",
                  )}
                >
                  {m.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4 text-primary" />}
                </div>
                <div
                  className={cn(
                    "max-w-[80%] rounded-xl border px-3.5 py-2.5 text-sm leading-relaxed",
                    m.role === "user" ? "bg-secondary" : "bg-card",
                  )}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </CardContent>
          <div className="border-t p-3">
            <form
              className="flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about incidents, permits, procedures or regulations…"
              />
              <Button type="submit" size="icon" aria-label="Send message">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Sparkles className="h-4 w-4 text-primary" /> Suggested prompts
            </CardTitle>
            <CardDescription>Common questions from QHSE teams</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="w-full rounded-lg border p-3 text-left text-sm transition-colors hover:bg-accent/10"
              >
                {s}
              </button>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
