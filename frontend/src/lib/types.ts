type CodeSnippet = {
  language: string;
  code: string;
  description: string;
  compareList: boolean;
  highlightedLines?: number[];
  explanation?: string;
  index: number;
  file_path: string;
};

type Message = {
  type: "user" | "assistant";
  content: string;
  codeSnippets?: CodeSnippet[];
};

export type { CodeSnippet, Message };