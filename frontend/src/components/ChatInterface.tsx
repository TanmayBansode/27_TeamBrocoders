import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CodeHighlighter from "@/components/CodeHighlighter";
import CodeComparison from "@/components/CodeComparison";
import Markdown from "markdown-to-jsx";
import { Message } from "@/components/Chat";
import Suggestions from "@/components/Suggestions";
import Messages from "@/components/Messages";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { CodeSnippet } from "@/lib/types";

const ChatInterface = ({
    chatContainerRef,
    messages,
    loading,
    compareWindow,
    setCompareWindow,
    selectedSnippet,
    setSelectedSnippet,
    compareList,
    setInput,
    assistantMessage,
    setCompareList,
}: {
    chatContainerRef: React.RefObject<HTMLDivElement>;
    messages: Message[];
    loading: boolean;
    compareWindow: boolean;
    setCompareWindow: (arg0: boolean) => void;
    selectedSnippet: CodeSnippet | null;
    setSelectedSnippet: (arg0: CodeSnippet) => void;
    compareList: CodeSnippet[];
    setInput: (value: string) => void;
    assistantMessage: Message;
    setCompareList: (arg0: CodeSnippet[]) => void;
}) => {
    return (
        <div className="flex-1 overflow-hidden flex">
            <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-4 space-y-4"
            >
                {messages.length === 0 && <Suggestions setInput={setInput} />}
                <Messages
                    assistantMessage={assistantMessage}
                    messages={messages}
                    compareList={compareList}
                    setCompareList={setCompareList}
                    setSelectedSnippet={setSelectedSnippet}
                />
                {loading && (
                    <div className="flex justify-start">
                        <Card className="w-[70%]">
                            <CardContent className="p-4">
                                <div className="flex space-x-2">
                                    <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce"></div>
                                    <div
                                        className="w-3 h-3 bg-gray-500 rounded-full animate-bounce"
                                        style={{
                                            animationDelay: "0.2s",
                                        }}
                                    ></div>
                                    <div
                                        className="w-3 h-3 bg-gray-500 rounded-full animate-bounce"
                                        style={{
                                            animationDelay: "0.4s",
                                        }}
                                    ></div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>

            {!compareWindow ? null : (
                <CodeComparison
                    compareList={compareList}
                    setCompareWindow={setCompareWindow}
                    setSelectedSnippet={setSelectedSnippet}
                />
            )}

            {selectedSnippet && (
                <div className="w-1/2 border-l border-gray-200 dark:border-gray-700 p-4 overflow-y-auto bg-white dark:bg-gray-800">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">
                            {selectedSnippet.language} Snippet
                        </h3>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSelectedSnippet(null)}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                    <Card>
                        <CardContent className="p-0">
                            <Tabs defaultValue="code" className="w-full">
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="code">Code</TabsTrigger>
                                    <TabsTrigger
                                        value="explanation"
                                        onClick={async () => {
                                            if (!selectedSnippet.explanation) {
                                                console.log(selectedSnippet);

                                                let response = await fetch(
                                                    "http://localhost:5000/explain-code",
                                                    {
                                                        method: "POST",
                                                        headers: {
                                                            "Content-Type":
                                                                "application/json",
                                                        },
                                                        body: JSON.stringify({
                                                            file_slug:
                                                                selectedSnippet.file_path,
                                                        }),
                                                    }
                                                );
                                                response =
                                                    await response.json();

                                                const newSnippet: CodeSnippet =
                                                    {
                                                        ...selectedSnippet,
                                                        explanation:
                                                            response.explanation,
                                                    };
                                                setSelectedSnippet(newSnippet);
                                            }
                                        }}
                                    >
                                        Explaination
                                    </TabsTrigger>
                                </TabsList>
                                <TabsContent value="code" className="p-4">
                                    <CodeHighlighter
                                        title="Code"
                                        language={selectedSnippet.language}
                                        code={selectedSnippet.code}
                                        highlightedLines={
                                            selectedSnippet.highlightedLines
                                                ? selectedSnippet.highlightedLines
                                                : Array.from(
                                                      { length: 10 },
                                                      (_, i) => i
                                                  )
                                        }
                                    />
                                </TabsContent>
                                <TabsContent
                                    value="explanation"
                                    className="p-4"
                                >
                                    <Markdown>
                                        {String(
                                            selectedSnippet.explanation ||
                                                "Generating explanation..."
                                        )}
                                    </Markdown>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default ChatInterface;
