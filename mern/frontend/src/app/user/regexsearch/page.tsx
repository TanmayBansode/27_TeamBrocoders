'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { Badge } from "@/components/ui/badge"
import Sidebar from '@/components/Sidebar' 
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import CodeHighlighter from '@/components/CodeHighlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { HelpCircle } from 'lucide-react'
import Link from 'next/link'

interface RegexResult {
  code: string,
  highlighted: number[],
  description?: string,
  language?: string
}

const RegexSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<RegexResult[]>([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulating API call
    setTimeout(() => {
      const results: RegexResult[] = [
        {
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
          description: "Matches a valid email address",
          highlighted: [2],
          language: 'javascript'
        },
        {
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
          description: "Matches a password with at least 8 characters, containing at least one letter and one number",
          highlighted: [4]
        },
        {
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
          description: "Matches a valid URL",
          highlighted: [3],
          language: 'javascript'
        }
      ]
      setSearchResults(results)
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}

<Sidebar focus="regexsearch" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">Regex Search</h1>
          <Button variant="ghost" size="icon">
            <HelpCircle className="h-5 w-5" />
          </Button>
        </header>

        {/* Search Interface */}
        <div className="flex-1 overflow-auto p-6">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Search for Regex Patterns</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="space-y-4">
                <Input
                  type="text"
                  placeholder="Describe the pattern you're looking for..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button type="submit" disabled={loading}>
                  {loading ? 'Searching...' : 'Search'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {searchResults.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Search Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {searchResults.map((result, index) => (
                    <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0 last:pb-0">
                      <CodeHighlighter code={result.code} language={result.language? result.language: 'javascript'} isRegex={true} highlightedLines={result.highlighted} title={ "Response " + (index+1)} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

        </div>
      </div>
    </div>
  )
}

export default RegexSearch