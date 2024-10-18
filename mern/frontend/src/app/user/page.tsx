'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Activity, ChevronDown, Code, Copy, GitBranch, LayoutDashboard, Send, Settings, X, Moon, Sun, HelpCircle, Trash2, Save } from "lucide-react"
import Link from "next/link"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'

type CodeSnippet = {
  language: string
  code: string
  description: string
}

type Message = {
  type: 'user' | 'assistant'
  content: string
  codeSnippets?: CodeSnippet[]
}

const suggestedQueries = [
  "How do I create a React component?",
  "Explain async/await in JavaScript",
  "What's the difference between let and const?",
  "Show me how to use map in Python"
]

export default function EnhancedUserDashboard() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedSnippet, setSelectedSnippet] = useState<CodeSnippet | null>(null)
  const [darkMode, setDarkMode] = useState(false)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = { type: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    // Simulating API call
    setTimeout(() => {
      const assistantMessage: Message = {
        type: 'assistant',
        content: 'Here are some code snippets for a simple "Hello, World!" program in different languages:',
        codeSnippets: [
          {
            language: 'javascript',
            code: 'console.log("Hello, World!");',
            description: 'A simple JavaScript console log statement.'
          },
          {
            language: 'python',
            code: 'print("Hello, World!")',
            description: 'A Python print function to display text.'
          },
          {
            language: 'java',
            code: 'public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
            description: 'A complete Java class with a main method to print text.'
          }
        ]
      }
      setMessages(prev => [...prev, assistantMessage])
      setLoading(false)
    }, 2000)
  }

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code)
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  const clearChat = () => {
    setMessages([])
    setSelectedSnippet(null)
  }

  const saveSnippet = (snippet: CodeSnippet) => {
    // In a real application, this would save to a database or local storage
    console.log('Saving snippet:', snippet)
    // For demo purposes, we'll just show an alert
    alert('Snippet saved successfully!')
  }

  return (
    <div className={`flex h-screen ${darkMode ? 'dark' : ''}`}>
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

      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
          <span className="text-2xl font-bold text-primary">CodeAssist</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
                  {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle {darkMode ? 'light' : 'dark'} mode</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <nav className="mt-6 space-y-1">
          <Link href="#" className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md mx-2">
            <LayoutDashboard className="w-5 h-5 mr-3" />
            Dashboard
          </Link>
          <Link href="#" className="flex items-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-md mx-2">
            <Code className="w-5 h-5 mr-3" />
            Code Assistant
          </Link>
          <Link href="#" className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md mx-2">
            <GitBranch className="w-5 h-5 mr-3" />
            My Projects
          </Link>
          <Link href="#" className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md mx-2">
            <Activity className="w-5 h-5 mr-3" />
            Analytics
          </Link>
          <Link href="#" className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md mx-2">
            <Settings className="w-5 h-5 mr-3" />
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <span className="text-2xl font-semibold text-gray-800 dark:text-white">Code Assistant</span>
          </div>
          <div className="flex items-center space-x-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon">
                    <HelpCircle className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Get help</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-user.jpg" alt="@johndoe" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">John Doe</p>
                    <p className="text-xs leading-none text-muted-foreground">john@example.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Chat Interface */}
        <div className="flex-1 overflow-hidden flex">
          <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Suggested Queries</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-2">
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
              <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <Card className={`max-w-[70%] ${message.type === 'user' ? 'bg-primary text-primary-foreground' : ''}`}>
                  <CardContent className="p-3">
                    <p className="mb-2">{message.content}</p>
                    {message.codeSnippets && (
                      <div className="mt-4 space-y-4">
                        {message.codeSnippets.map((snippet, snippetIndex) => (
                          <Card key={snippetIndex} className="bg-muted">
                            <CardHeader className="p-3">
                              <CardTitle className="text-sm">{snippet.description}</CardTitle>
                            </CardHeader>
                            <CardContent className="p-3 pt-0">
                              <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => setSelectedSnippet(snippet)}
                                className="w-full mb-2"
                              >
                                View {snippet.language} code
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => saveSnippet(snippet)}
                                className="w-full"
                              >
                                <Save className="h-4 w-4 mr-2" />
                                Save Snippet
                              </Button>
                            </CardContent>
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
                      <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
          {selectedSnippet && (
            <div className="w-1/2 border-l border-gray-200 dark:border-gray-700 p-4 overflow-y-auto bg-white dark:bg-gray-800">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">{selectedSnippet.language} Snippet</h3>
                <Button variant="ghost" size="icon" onClick={() => setSelectedSnippet(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <Card>
                <CardContent className="p-0">
                  <Tabs defaultValue="code" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="code">Code</TabsTrigger>
                      <TabsTrigger  value="documentation">Documentation</TabsTrigger>
                    </TabsList>
                    <TabsContent value="code" className="p-4">
                      <div className="relative">
                        <SyntaxHighlighter language={selectedSnippet.language} style={tomorrow}>
                          {selectedSnippet.code}
                        </SyntaxHighlighter>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="absolute top-2 right-2"
                          onClick={() => copyToClipboard(selectedSnippet.code)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </TabsContent>
                    <TabsContent value="documentation" className="p-4">
                      <p>Documentation for {selectedSnippet.language} would be displayed here.</p>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

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
  )
}

