"use client"

import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Activity, ChevronDown, Code, Copy, GitBranch, LayoutDashboard, Send, Settings, X } from "lucide-react"
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

export default function EnhancedUserDashboard() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedSnippet, setSelectedSnippet] = useState<CodeSnippet | null>(null)

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

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700">
          <span className="text-2xl font-bold text-gray-800 dark:text-white">CodeAssist</span>
        </div>
        <nav className="mt-6">
          <Link href="#" className="flex items-center px-6 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
            <LayoutDashboard className="w-5 h-5 mr-3" />
            Dashboard
          </Link>
          <Link href="#" className="flex items-center px-6 py-2 text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-700">
            <Code className="w-5 h-5 mr-3" />
            Code Assistant
          </Link>
          <Link href="#" className="flex items-center px-6 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
            <GitBranch className="w-5 h-5 mr-3" />
            My Projects
          </Link>
          <Link href="#" className="flex items-center px-6 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
            <Activity className="w-5 h-5 mr-3" />
            Analytics
          </Link>
          <Link href="#" className="flex items-center px-6 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
            <Settings className="w-5 h-5 mr-3" />
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <span className="text-2xl font-semibold text-gray-800 dark:text-white">Code Assistant</span>
          </div>
          <div className="flex items-center">
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
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] ${message.type === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'} rounded-lg p-3`}>
                  <p className="mb-2">{message.content}</p>
                  {message.codeSnippets && (
                    <div className="mt-4 space-y-4">
                      {message.codeSnippets.map((snippet, snippetIndex) => (
                        <div key={snippetIndex} className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                          <p className="text-sm mb-2">{snippet.description}</p>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedSnippet(snippet)}
                            className="mr-2"
                          >
                            View {snippet.language} code
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <Card className="w-[70%]">
                  <CardContent className="p-4">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px] mt-2" />
                    <Skeleton className="h-4 w-[150px] mt-2" />
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
          {selectedSnippet && (
            <div className="w-1/2 border-l border-gray-200 dark:border-gray-700 p-4 overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">{selectedSnippet.language} Snippet</h3>
                <Button variant="ghost" size="sm" onClick={() => setSelectedSnippet(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <Card>
                <CardContent className="p-0">
                  <Tabs defaultValue="code" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="code">Code</TabsTrigger>
                      <TabsTrigger value="documentation">Documentation</TabsTrigger>
                    </TabsList>
                    <TabsContent value="code" className="p-4">
                      <div className="relative">
                        <SyntaxHighlighter language={selectedSnippet.language} style={tomorrow}>
                          {selectedSnippet.code}
                        </SyntaxHighlighter>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => copyToClipboard(selectedSnippet.code)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </TabsContent>
                    <TabsContent value="documentation" className="p-4">
                      <p>Documentation functionality would be implemented here.</p>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <Input
              type="text"
              placeholder="Ask for code examples or explanations..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={loading}>
              <Send className="h-4 w-4 mr-2" />
              Send
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}