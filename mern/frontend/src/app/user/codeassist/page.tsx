"use client";

import React, { useState, useRef, useEffect } from "react";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { MdOutlineAdd } from "react-icons/md";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaCodeCompare } from "react-icons/fa6";
import Header from "@/components/Header";
import { FaCode } from "react-icons/fa";

import CodeHighlighter from "@/components/CodeHighlighter";
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Sidebar from "@/components/Sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Activity,
  ChevronDown,
  Code,
  Copy,
  GitBranch,
  LayoutDashboard,
  Send,
  Settings,
  X,
  Moon,
  Sun,
  HelpCircle,
  Trash2,
  Save,
} from "lucide-react";
import Link from "next/link";

type CodeSnippet = {
  language: string;
  code: string;
  description: string;
  compareList: boolean;
  highlightedLines?: number[];
  documentation?: string;
};

type Message = {
  type: "user" | "assistant";
  content: string;
  codeSnippets?: CodeSnippet[];
};

const suggestedQueries = [
  "How do I create a React component?",
  "Explain async/await in JavaScript",
  "What's the difference between let and const?",
  "Show me how to use map in Python",
];

const assistantMessage: Message = {
  type: "assistant",
  content:
    'Here are some code snippets for a simple "Hello, World!" program in different languages:',
  codeSnippets: [
    {
      language: "cpp",
      highlightedLines: [5, 6, 7, 8, 9, 10, 11, 12],
      compareList: false,
      code: `#include <bits/stdc++.h>
      using namespace std;
      
      int search(int arr[], int N, int x)
      {
          for (int i = 0; i < N; i++)
              if (arr[i] == x)
                  return i;
          return -1;
      }
      
      // Driver code
      int main(void)
      {
          int arr[] = { 2, 3, 4, 10, 40 };
          int x = 10;
          int N = sizeof(arr) / sizeof(arr[0]);
      
          // Function call
          int result = search(arr, N, x);
          (result == -1)
              ? cout << "Element is not present in array"
              : cout << "Element is present at index " << result;
          return 0;
      }
      `,
      description: "Long but low level code",
    },
    {
      language: "python",
      description: "Simple but Interpreted output",
      compareList: false,
      highlightedLines: [5, 6, 7, 8, 9, 10, 11, 12],
      code: `# Python3 code to linearly search x in arr[].


def search(arr, N, x):

for i in range(0, N):
  if (arr[i] == x):
      return i
return -1


# Driver Code
if __name__ == "__main__":
arr = [2, 3, 4, 10, 40]
x = 10
N = len(arr)

# Function call
result = search(arr, N, x)
if(result == -1):
  print("Element is not present in array")
else:
  print("Element is present at index", result)
`,
    },
    {
      language: "javascript",
      highlightedLines: [5, 6, 7, 8, 9, 10, 11, 12],
      compareList: false,
      code: `
      // Javascript code to linearly search x in arr[].

function search(arr, n, x)
{
for (let i = 0; i < n; i++)
  if (arr[i] == x)
      return i;
return -1;
}

// Driver code

let arr = [ 2, 3, 4, 10, 40 ];
let x = 10;
let n = arr.length;

// Function call
let result = search(arr, n, x);
(result == -1)
  ? console.log("Element is not present in array")
  : console.log("Element is present at index " + result);

// This code is contributed by Manoj
`,
      description: "A complete JavaScript for linear search",
    },
  ],
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

    // Simulating API call
    setTimeout(() => {
      setMessages((prev) => [...prev, assistantMessage]);
      setLoading(false);
    }, 2000);
  };

  const clearChat = () => {
    setMessages([]);
    setSelectedSnippet(null);
  };

  const addToCompare = (index: number, action: boolean) => {
    
    if(!assistantMessage.codeSnippets) return;
    const snippet = assistantMessage.codeSnippets[index];
    
    if(action){
      setCompareList([...compareList, snippet]);
      snippet.compareList = true;
    } else {
      const newCompareList = compareList.filter((item) => item !== snippet);
      setCompareList(newCompareList);
      snippet.compareList = false;
    }

    
  }

  const handleCompare = () => { 
    setCompareWindow(true);
  }

  return (
    <div className={`flex h-screen`}>
      <style jsx global>{`
        /* Custom Scrollbar Styles */
        ::-webkit-scrollbar {
          width: 10px;
        }
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        ::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 5px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
        .dark ::-webkit-scrollbar-track {
          background: #2d3748;
        }
        .dark ::-webkit-scrollbar-thumb {
          background: #4a5568;
        }
        .dark ::-webkit-scrollbar-thumb:hover {
          background: #718096;
        }
      `}</style>

      <Sidebar focus="codeassist" />

      <div className="flex-1 flex flex-col overflow-hidden bg-gray-50 dark:bg-gray-900">
        <Header />

        {/* Chat Interface */}


        <div className="flex-1 overflow-hidden flex">
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-4"
          >
            {messages.length === 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Suggested Queries</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {suggestedQueries.map((query, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="justify-start"
                        onClick={() => setInput(query)}
                      >
                        {query}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <Card
                  className={`max-w-[70%] ${
                    message.type === "user"
                      ? "bg-primary text-primary-foreground"
                      : ""
                  }`}
                >
                  <CardContent className="p-3">
                    <p className="mb-2">{message.content}</p>
                    {message.codeSnippets && (
                      <div className="mt-4 space-y-4">
                        {message.codeSnippets.map((snippet, snippetIndex) => (
                          <Card key={snippetIndex} className="bg-muted">
                            <CardHeader className="p-3 d-flex justify-content-between">
                              <div className="col-lg-4">
                                <p>Code Version {snippetIndex + 1}</p>
                              </div>
                              <div className="col-lg-1">
                                <Button
                                  variant="secondary"
                                  size="sm"
                                  onClick={() => setSelectedSnippet(snippet)}
                                  className="bg-border"
                                >
                                  <FaCode />
                                </Button>

                                <Button
                                  variant="secondary"
                                  size="sm"
                                  onClick={() => setSelectedSnippet(snippet)}
                                  className="bg-border mx-2"
                                >
                                  <FaGithub />
                                </Button>
                                
                                {snippet.compareList? (
                                  <Button
                                  variant="secondary"
                                  size="sm"
                                  onClick={() => addToCompare(snippetIndex, false)}
                                  className="bg-border"
                                >

<FaCodeCompare />
                                </Button> 

                                  
                                 ) : ( <Button
                                  variant="secondary"
                                  size="sm"
                                  onClick={() => addToCompare(snippetIndex, true)}
                                  className="bg-border"
                                >
                                  <MdOutlineAdd />
                                </Button>) }
                                
                                
                              </div>
                            </CardHeader>
                          </Card>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <Card className="w-[70%]">
                  <CardContent className="p-4">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce"></div>
                      <div
                        className="w-3 h-3 bg-gray-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-3 h-3 bg-gray-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {!compareWindow? null : 
                      <div className="w-1/2 border-l border-gray-200 dark:border-gray-700 p-6 overflow-y-auto bg-white dark:bg-gray-800">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                          Code Comparison
                        </h3>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setCompareWindow(false)}
                          aria-label="Close comparison window"
                        >
                          <X className="h-5 w-5" />
                        </Button>
                      </div>
                    
                      <div className="space-y-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">Differences Summary</CardTitle>
                          </CardHeader>
                          <CardContent>
                            
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              The main differences are in the function implementations and variable naming conventions.
                            </p>
                          </CardContent>
                        </Card>
                    
                    
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">Recommended Action</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                              Based on the analysis, we recommend using Code 2 as it provides better performance and follows the project's coding standards more closely.
                            </p>
                            <div className="flex space-x-4">
                              <Button variant="default"   onClick={() => {setSelectedSnippet(compareList[1]); setCompareWindow(false)}}>
                                Use Code 2
                              </Button>
                              <Button variant="outline"   onClick={() => {setSelectedSnippet(compareList[0]); setCompareWindow(false)}}>
                                Keep Code 1
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

          }

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
                      <TabsTrigger value="documentation">
                        Documentation
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="code" className="p-4">
                      <CodeHighlighter
                        title="Code"
                        language={selectedSnippet.language}
                        code={selectedSnippet.code}
                        highlightedLines={selectedSnippet.highlightedLines? selectedSnippet.highlightedLines :  Array.from({ length: 10 }, (_, i) => i) }
                      />
                    </TabsContent>
                    <TabsContent value="documentation" className="p-4">
                      <p>
                        Documentation for given function in{" "}
                        {selectedSnippet.language} would be displayed here.
                      </p>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {compareList.length > 1? (
           <CardContent>
           <div className="grid grid-cols-4 gap-2">
               <Button
                 
                 variant="outline"
                 className="justify-start"
                 onClick={() => handleCompare()}
               >
                 Compare Selected Codes
               </Button>
           
           </div>
         </CardContent>
        ) : null}

       
        {/* Input Area */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
    
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <div className="flex-1 relative">
              <Input
                type="text"
                placeholder="Ask for code examples or explanations..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="pr-16"
                maxLength={500}
              />
              <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-400">
                {input.length}/500
              </span>
            </div>
            <Button type="submit" disabled={loading}>
              <Send className="h-4 w-4 mr-2" />
              Send
            </Button>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" onClick={clearChat}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Clear chat</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </form>
        </div>
      </div>
    </div>
  );
}
