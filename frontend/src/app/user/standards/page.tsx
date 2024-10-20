'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Sidebar from '@/components/Sidebar'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Check, X } from 'lucide-react'


interface CodeSnippet {
    id: string
    title: string
    code: string
    language: string
  }
  
  interface CodingStandard {
    name: string
    description: string
    results: { [key: string]: boolean }
  }

export default function CodeComparisonPage() {
    const [snippets, setSnippets] = useState<CodeSnippet[]>([
        {
          id: 'snippet1',
          title: 'Original Code',
          code: `function calculateTotal(items) {
      var total = 0;
      for (var i = 0; i < items.length; i++) {
        total += items[i].price;
      }
      return total;
    }`,
          language: 'javascript'
        },
        {
          id: 'snippet2',
          title: 'Refactored Code',
          code: `const calculateTotal = (items) => {
      return items.reduce((total, item) => total + item.price, 0);
    }`,
          language: 'javascript'
        },
        {
          id: 'snippet3',
          title: 'Alternative Implementation',
          code: `function calculate_total(items):
        return sum(item['price'] for item in items)`,
          language: 'python'
        }
      ])
    
      const [codingStandards, setCodingStandards] = useState<CodingStandard[]>([
        {
          name: 'Naming Convention',
          description: 'Uses camelCase for functions and variables',
          results: { snippet1: true, snippet2: true, snippet3: false }
        },
        {
          name: 'Function Logic',
          description: 'Uses modern array methods',
          results: { snippet1: false, snippet2: true, snippet3: true }
        },
        {
          name: 'ES6+ Features',
          description: 'Uses arrow functions and const/let',
          results: { snippet1: false, snippet2: true, snippet3: false }
        },
        {
          name: 'Code Conciseness',
          description: 'Achieves the same result with fewer lines of code',
          results: { snippet1: false, snippet2: true, snippet3: true }
        }
      ])
    
      const [activeSnippets, setActiveSnippets] = useState<string[]>(['snippet1', 'snippet2'])
    
      const toggleSnippet = (snippetId: string) => {
        setActiveSnippets(prev => 
          prev.includes(snippetId) 
            ? prev.filter(id => id !== snippetId)
            : [...prev, snippetId].slice(-3)
        )
    }

  return (
    <div className="flex h-screen">
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

      <Sidebar focus='analytics' />


      <div className="flex-1 flex flex-col overflow-hidden bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Code Comparison</h1>
      
      <div className="flex space-x-4 mb-4">
        {snippets.map(snippet => (
          <Button
            key={snippet.id}
            variant={activeSnippets.includes(snippet.id) ? "default" : "outline"}
            onClick={() => toggleSnippet(snippet.id)}
          >
            {snippet.title}
          </Button>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Code Snippets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`grid gap-4 ${activeSnippets.length > 2 ? 'grid-cols-3' : 'grid-cols-2'}`}>
            {snippets.filter(s => activeSnippets.includes(s.id)).map(snippet => (
              <div key={snippet.id}>
                <h3 className="text-lg font-semibold mb-2">{snippet.title}</h3>
                <SyntaxHighlighter
                  language={snippet.language}
                  style={atomDark}
                  customStyle={{ margin: 0, borderRadius: '0.5rem' }}
                >
                  {snippet.code}
                </SyntaxHighlighter>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Coding Standards Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Standard</TableHead>
                <TableHead>Description</TableHead>
                {activeSnippets.map(snippetId => (
                  <TableHead key={snippetId} className="text-center">
                    {snippets.find(s => s.id === snippetId)?.title}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {codingStandards.map(standard => (
                <TableRow key={standard.name}>
                  <TableCell className="font-medium">{standard.name}</TableCell>
                  <TableCell>{standard.description}</TableCell>
                  {activeSnippets.map(snippetId => (
                    <TableCell key={snippetId} className="text-center">
                      {standard.results[snippetId] ? (
                        <Check className="inline-block text-green-500" />
                      ) : (
                        <X className="inline-block text-red-500" />
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
      </div>
    </div>
  )

}
