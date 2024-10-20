"use client";
import React, { useState, useRef, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import CustomScrollbarsStyle from "@/components/CustomScrollbarsStyle";
import Header from "@/components/HeaderComponent";
import ChatInterface from "@/components/ChatInterface";
import CompareCard from "@/components/CompareCard";
import InputArea from "@/components/InputArea";

import type { Message, CodeSnippet } from "@/lib/types";

const extensionToLanguage: object = {
    cpp: "cpp",
    py: "python",
    js: "javascript",
    jsx: "javascript",
    ts: "typescript",
    java: "java",
    html: "html",
    css: "css",
    scss: "scss",
    sql: "sql",
    go: "go",
};

export default function EnhancedUserDashboard() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [compareWindow, setCompareWindow] = useState(false);
    const [selectedSnippet, setSelectedSnippet] = useState<CodeSnippet | null>(
        null
    );
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const [assistantMessage, setAssistantMessage] = useState<Message>({
        content: "",
        type: "assistant",
        codeSnippets: [],
    });
    const [compareList, setCompareList] = useState<CodeSnippet[]>([]);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop =
                chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage: Message = { type: "user", content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            k: 3,
            query: input,
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            redirect: "follow",
        };

        let getCodeSnippetsFiles = await fetch(
            "http://127.0.0.1:5000/search-file",
            { ...requestOptions, body: raw }
        );
        getCodeSnippetsFiles = await getCodeSnippetsFiles.json();

        if (getCodeSnippetsFiles.error) {
            const assistantMessage: Message = {
                type: "assistant",
                content: `Sorry, I couldn't find any code snippets for ${input}`,
            };
            setMessages((prev) => [...prev, assistantMessage]);
            setLoading(false);

            return;
        }

        getCodeSnippetsFiles = getCodeSnippetsFiles.results;

        const codeSnippets = await Promise.all(
            getCodeSnippetsFiles.map(
                async (file: string, i: Number): Promise<CodeSnippet> => {
                    const myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");

                    const raw = JSON.stringify({
                        file_slug: file,
                        query: input,
                    });

                    const requestOptions = {
                        method: "POST",
                        headers: myHeaders,
                        body: raw,
                        redirect: "follow",
                    };

                    const response = await fetch(
                        "http://127.0.0.1:5000/highlight-code",
                        requestOptions
                    );

                    const data = await response.json();
                    const { start, end, content } = data;
                    console.log({ start, end, content });

                    return {
                        highlightedLines: new Array(end - start + 1)
                            .fill(0)
                            .map((_, i) => i + start),
                        code: content,
                        compareList: false,
                        language: extensionToLanguage[file.split(".").at(-1)],
                        description: "",
                        index: Number(i),
                        file_path: file,
                    };
                }
            )
        );

        const assistantMessage: Message = {
            type: "assistant",
            content: `Here are some code snippets for ${input}`,
            codeSnippets: codeSnippets,
        };

        setMessages((prev) => [...prev, assistantMessage]);
        setAssistantMessage(assistantMessage);
        setLoading(false);
    };

    const clearChat = () => {
        setMessages([]);
        setSelectedSnippet(null);
    };

    return (
        <div className={`flex h-screen`}>
            <CustomScrollbarsStyle />
            <Sidebar focus="nl-search" />

            <div className="flex-1 flex flex-col overflow-hidden bg-gray-50 dark:bg-gray-900">
                <Header clearChat={clearChat} />

                <ChatInterface
                    chatContainerRef={chatContainerRef}
                    messages={messages}
                    loading={loading}
                    compareWindow={compareWindow}
                    setCompareWindow={setCompareWindow}
                    selectedSnippet={selectedSnippet}
                    setSelectedSnippet={setSelectedSnippet}
                    compareList={compareList}
                    setInput={setInput}
                    assistantMessage={assistantMessage}
                    setCompareList={setCompareList}
                />

                <CompareCard
                    compareList={compareList}
                    setCompareWindow={setCompareWindow}
                />

                <InputArea
                    handleSubmit={handleSubmit}
                    input={input}
                    setInput={setInput}
                    loading={loading}
                />
            </div>
        </div>
    );
}
