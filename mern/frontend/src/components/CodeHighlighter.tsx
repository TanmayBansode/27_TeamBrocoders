import React, { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, EyeOff, Copy, Check } from 'lucide-react'

interface CodeHighlighterProps {
  code: string
  language: string
  highlightedLines: number[]
  title?: string
}

const CodeHighlighter: React.FC<CodeHighlighterProps> = ({ code, language, highlightedLines, title }) => {
  const [isCodeVisible, setIsCodeVisible] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  const lineProps = (lineNumber: number) => {
    const style: React.CSSProperties = {}
    if (highlightedLines.includes(lineNumber)) {
      style.backgroundColor = 'rgba(255, 255, 0, 0.2)'
    } else if (!isCodeVisible) {
      style.filter = 'blur(4px)'
    }
    return { style }
  }

  const toggleCodeVisibility = () => {
    setIsCodeVisible((prev) => !prev)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code).then(() => {
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    })
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg font-semibold">{title || 'Code Snippet'}</CardTitle>
          <Badge variant="secondary" className="mt-1">
            {language}
          </Badge>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="icon" onClick={toggleCodeVisibility}>
            {isCodeVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
          <Button variant="outline" size="icon" onClick={copyToClipboard}>
            {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <SyntaxHighlighter
            language={language}
            style={atomDark}
            wrapLines={true}
            showLineNumbers={true}
            lineProps={lineProps}
            customStyle={{
              margin: 0,
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
            }}
          >
            {code}
          </SyntaxHighlighter>
          {!isCodeVisible && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 rounded-md">
              <Button onClick={toggleCodeVisibility}>
              View Complete Code
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default CodeHighlighter