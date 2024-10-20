import React, { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";

export type Message = {
  type: "user" | "assistant";
  content: string;
  codeSnippets?: CodeSnippet[];
};

type CodeSnippet = {
  language: string;
  code: string;
  description: string;
};

const Chat = ({ messages }: { messages: Message[] }) => {
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.length === 0 ? (
        <div>Start a new conversation by asking a question</div>
      ) : (
        messages.map((message, index) => (
          <div key={index} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
            <Card className={`max-w-[70%] ${message.type === "user" ? "bg-primary text-primary-foreground" : ""}`}>
              <CardContent className="p-3">
                <p>{message.content}</p>
                {message.codeSnippets && message.codeSnippets.map((snippet, idx) => (
                  <Card key={idx} className="mt-4">
                    <CardContent>
                      <pre>{snippet.code}</pre>
                      <p>{snippet.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>
        ))
      )}

    </div>
  );
};

export default Chat;
