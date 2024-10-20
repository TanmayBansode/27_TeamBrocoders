"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Projects() {
  const [content, setContent] = useState(""); // For fetching and setting the content
  const [currentLang, setCurrentLang] = useState("C++"); // Use useState to handle selected language

  // Map of languages to static doc paths
  const objectLangToStaticDocPath = {
    "C++": "https://google.github.io/styleguide/cppguide.html",
    "C#": "https://google.github.io/styleguide/csharp-style.html",
    Go: "https://google.github.io/styleguide/go/index.html",
    "HTML/CSS": "https://google.github.io/styleguide/htmlcssguide.html",
    JavaScript: "https://google.github.io/styleguide/jsguide.html",
    Java: "https://google.github.io/styleguide/javaguide.html",
    JSON: "https://google.github.io/styleguide/jsoncstyleguide.html",
    "Objective-C": "https://google.github.io/styleguide/objcguide.html",
    Python: "https://google.github.io/styleguide/pyguide.html",
  };

  // Fetch the selected language's documentation on language change
  useEffect(() => {
    if (currentLang) {
      fetch(objectLangToStaticDocPath[currentLang])
        .then((res) => res.text())
        .then((html) => {
          setContent(html);
        })
        .catch((err) => console.error("Error fetching documentation:", err));
    }
  }, [currentLang]); // Rerun effect when `currentLang` changes
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

      {/* Sidebar component */}
      <Sidebar focus="documentation" />
      <div className="flex-1 flex flex-col overflow-hidden bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        <label><h1>
          Select a language to view its documentation
          </h1>
        </label>
      <Select value={currentLang} onValueChange={setCurrentLang}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Language" />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(objectLangToStaticDocPath).map((lang) => (
            <SelectItem key={lang} value={lang}>
              {lang}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <iframe src={objectLangToStaticDocPath[currentLang]} style={{ 
        height:"10000vh", width: "100%",  border: 'none', // Optional: to remove the border
          overflowY: 'visible', // Hide scrollbars (for the iframe content)
        }}
          scrolling="yes" // Disables scrolling for older browsers
          seamless="seamless" // For modern browsers (HTML5)
    
        />
         </div>
      </div>
    </div>);
}
