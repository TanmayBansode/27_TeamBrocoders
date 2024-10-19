"use client";

import { useEffect, useState } from "react"; // Import useEffect and useState
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Badge,
  GitBranch,
  GitCommit,
  GitFork,
  Github,
  Search,
  Star,
} from "lucide-react";
import Link from "next/link";
import AdminSidebar from "@/components/AdminSidebar";
import {
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip";
import { Tooltip } from "recharts";
import { Checkbox } from "@/components/ui/checkbox"; // Replace with your library path

export default function AdminRepo() {
  const [isHovered, setIsHovered] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRepos, setSelectedRepos] = useState<Set<number>>(new Set()); // State for selected repositories
  const GITHUB_TOKEN = "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";
  const org = "sdscoeptest"; // Replace with your GitHub organization name
  const [logs, setLogs] = useState<string[]>([]);
  const [console, setConsole] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  interface Commit {
    sha: string;
    commit: {
      message: string;
    };
    html_url: string;
  }

  interface Repository {
    id: number;
    name: string;
    description: string;
    commits: Commit[];
    status: string;
  }

  // type RepoCardProps = {
  //   repo: Repo
  //   isSelected: boolean
  //   onSelectRepo: (id: number) => void
  // }

  const statusColors = {
    active: "bg-green-500",
    inactive: "bg-yellow-500",
    archived: "bg-gray-500",
  };

  const LoadingDots = () => {
    return (
      <div className="loading-dots">
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </div>
    );
  };

  const handleGenerateEmbeddings = () => {
    // Clear previous logs
    setConsole(true);
    setIsGenerating(true);
    setLogs([]);

    // Simulate steps of the process with logs
    setLogs((prevLogs) => [...prevLogs, "Starting the embedding process..."]);

    setTimeout(() => {
      setLogs((prevLogs) => [...prevLogs, "Cloning the repositories..."]);
    }, 1000);

    setTimeout(() => {
      setLogs((prevLogs) => [...prevLogs, "Extraction completed."]);
    }, 3000);

    setTimeout(() => {
      setLogs((prevLogs) => [
        ...prevLogs,
        "Embedding generation in progress...",
      ]);
    }, 5000);

    setTimeout(() => {
      setLogs((prevLogs) => [...prevLogs, "Embeddings generation completed!"]);
    }, 7000);
    setIsGenerating(false);
  };

  async function fetchGitHubData(org: string) {
    setLoading(true);
    const response = await fetch(`https://api.github.com/orgs/${org}/repos`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });
    const repos = await response.json();

    if (!Array.isArray(repos)) {
      console.error("Expected repos to be an array", repos);
      setLoading(false);
      return [];
    }

    const reposWithCommits = await Promise.all(
      repos.map(async (repo: Repository) => {
        const commitsResponse = await fetch(
          `https://api.github.com/repos/${org}/${repo.name}/commits`,
          {
            headers: {
              Authorization: `token ${GITHUB_TOKEN}`,
            },
          }
        );
        const commits = await commitsResponse.json();
        return {
          ...repo,
          commits: commits.slice(0, 5), // Get the latest 5 commits
        };
      })
    );

    setLoading(false);
    return reposWithCommits;
  }

  useEffect(() => {
    const getRepositories = async () => {
      const repos = await fetchGitHubData(org);
      setRepositories(repos);
    };
    getRepositories();
  }, [org]);

  const filteredRepositories = repositories.filter((repo) =>
    repo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectRepo = (id: number) => {
    const newSelectedRepos = new Set(selectedRepos);
    if (newSelectedRepos.has(id)) {
      newSelectedRepos.delete(id);
    } else {
      newSelectedRepos.add(id);
    }
    setSelectedRepos(newSelectedRepos);
  };

  const handleDeleteSelected = () => {
    // Logic to delete selected repositories
    const reposToDelete = Array.from(selectedRepos);
    // Perform deletion logic (e.g., API call to delete repos)
    console.log("Deleting repositories with IDs:", reposToDelete);
    // Reset selection after deletion
    setSelectedRepos(new Set());
  };

  const handleOpenSelected = () => {
    // Logic to open selected repositories
    const reposToOpen = Array.from(selectedRepos);
    reposToOpen.forEach((id) => {
      const repo = repositories.find((repo) => repo.id === id);
      if (repo) {
        window.open(repo.html_url, "_blank");
      }
    });
    // Reset selection after opening
    setSelectedRepos(new Set());
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
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
        .loading-dots {
          display: inline-block;
          width: 8px;
          height: 8px;
          margin-right: 4px;
          border-radius: 50%;
          background-color: #4a5568; /* Color of loading dots */
          animation: loading 1s infinite ease-in-out;
        }

        @keyframes loading {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.5);
          }
          100% {
            transform: scale(1);
          }
        }

        /* Large Checkbox Styles */
        .custom-checkbox {
          width: 24px; /* Adjust width */
          height: 24px; /* Adjust height */
        }
        .spinner {
          border: 2px solid transparent;
          border-top: 2px solid #4caf50;
          border-right: 2px solid #4caf50;
        }
      `}</style>
      <AdminSidebar focus="repository" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <span className="text-2xl font-semibold text-gray-800 dark:text-white">
              Dashboard
            </span>
          </div>
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">John Doe</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      john@example.com
                    </p>
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

        {/* Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
          <div className="container mx-auto px-6 py-8">
            {/* Search Bar */}
            <div className="relative mb-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                className="pl-10 pr-4 py-2 w-full rounded-full border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent"
                placeholder="Search repositories, users, or documentation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Recent Repositories Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                All Repositories
              </h2>
              <div>
                <Button
                  onClick={handleGenerateEmbeddings}
                  className="bg-green-600 mr-2 text-white"
                  variant="primary"
                >
                  Generate Embeddings
                </Button>

                <Button
                  onClick={handleDeleteSelected}
                  className="mr-2"
                  variant="destructive"
                >
                  Delete Embeddings
                </Button>

                <Button
                  onClick={handleDeleteSelected}
                  disabled={selectedRepos.size === 0}
                  variant="destructive"
                >
                  Delete Selected
                </Button>
              </div>
            </div>

            {/* Recent Repositories */}
            <div className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {filteredRepositories.length > 0 ? (
                  filteredRepositories.map((repo) => (
                    <Card
                      className="relative"
                      // onMouseEnter={() => setIsHovered(true)}
                      // onMouseLeave={() => setIsHovered(false)}
                      key={repo.id}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Github className="h-5 w-5" />
                            <h3 className="font-bold text-lg">{repo.name}</h3>
                            <Badge
                              variant="outline"
                              className={`${
                                statusColors[repo.status]
                              } text-white`}
                            >
                              {repo.status}
                            </Badge>
                          </div>
                          <Checkbox
                            checked={selectedRepos.has(repo.id)}
                            onCheckedChange={() => handleSelectRepo(repo.id)}
                            aria-label={`Select ${repo.name} repository`}
                          />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-2">
                          {repo.description}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                          <span className="flex items-center">
                            <Star className="h-4 w-4 mr-1" />
                            {repo.stargazers_count}
                          </span>
                          <span className="flex items-center">
                            <GitFork className="h-4 w-4 mr-1" />
                            {repo.forks_count}
                          </span>
                          <span className="flex items-center">
                            <GitBranch className="h-4 w-4 mr-1" />
                            {repo.open_issues_count} issues
                          </span>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm">
                            Latest Commit:
                          </h4>
                          {repo.commits[0] ? (
                            <div className="flex items-start space-x-2">
                              <GitCommit className="h-4 w-4 mt-1 flex-shrink-0" />
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Link
                                      href={repo.commits[0].html_url}
                                      className="text-sm text-blue-500 hover:underline truncate block"
                                      target="_blank"
                                    >
                                      {repo.commits[0].commit.message}
                                    </Link>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>{repo.commits[0].commit.message}</p>
                                    <p className="text-xs text-muted-foreground">
                                      Click to view on GitHub
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          ) : (
                            <LoadingDots /> // Call the loading component
                          )}
                        </div>
                      </CardContent>
                      <CardFooter className="pt-2 justify-between">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={repo.html_url} target="_blank">
                            View on GitHub
                          </Link>
                        </Button>
                        <div className="flex space-x-2">
                          {repo.downloaded ? (
                            <span className="text-green-500 text-xl">🟢</span> // Green circle for success
                          ) : (
                            <span className="text-red-500 text-xl">🔴</span> // Red circle for failure
                          )}
                        </div>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <p>No repositories found.</p>
                )}
              </div>
            </div>
            {/* Log Console */}
            {console && (
              <div className="fixed bottom-0 left-0 right-0 bg-black text-green-400 p-4 h-48 shadow-lg console-style">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-yellow-500">
                    Console Logs
                  </h3>
                  <div>
                    <span className="text-sm text-gray-400 mr-10">
                      • Terminal
                    </span>
                    <button
                      onClick={() => setConsole(false)}
                      className="text-red-400 bg-transparent hover:bg-red-500 hover:text-white font-semibold py-1 px-2 border border-red-400 hover:border-transparent rounded"
                    >
                      Close
                    </button>
                  </div>
                </div>
                <div className="border-t border-gray-600 mt-2 pt-2">
                  <div className="flex items-center mb-1">
                    <span className="text-indigo-300">user@server:~$</span>
                    <div className="ml-2">
                      {/* Loading spinner while generating logs */}
                      {isGenerating && (
                        <div className="spinner animate-spin rounded-full h-4 w-4 border-b-2 border-green-500 ml-2"></div>
                      )}
                    </div>
                  </div>
                  <div className="mt-2 space-y-1 max-h-40 overflow-y-auto custom-scrollbar">
                    {logs.length > 0 ? (
                      logs.map((log, index) => (
                        <div key={index} className="text-sm text-green-400">
                          <span className="text-gray-600">{index + 1}:</span>{" "}
                          {log}
                        </div>
                      ))
                    ) : (
                      <div className="text-sm text-gray-400">No logs yet.</div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
