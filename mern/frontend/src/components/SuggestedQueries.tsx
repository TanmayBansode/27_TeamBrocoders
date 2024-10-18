// components/SuggestedQueries.tsx
import React from "react";
import { Button } from "@/components/ui/button";

const SuggestedQueries = ({ onSelect }: { onSelect: (query: string) => void }) => {
  const suggestedQueries = [
    "How do I create a React component?",
    "Explain async/await in JavaScript",
    "What's the difference between let and const?",
    "Show me how to use map in Python",
  ];

  return (
    <div>
      <h3>Suggested Queries</h3>
      {suggestedQueries.map((query, index) => (
        <Button key={index} variant="outline" onClick={() => onSelect(query)}>
          {query}
        </Button>
      ))}
    </div>
  );
};

export default SuggestedQueries;
