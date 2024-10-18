"use client";

import { useEffect, useState } from "react"; // Import useEffect and useState
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Activity,
  ChevronDown,
  GitBranch,
  GitCommit,
  GitPullRequest,
  Home,
  LayoutDashboard,
  Search,
  Settings,
  Users,
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {

  const [searchTerm, setSearchTerm] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const GITHUB_TOKEN = "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";
  const org = "sdscoeptest"; // Replace with your GitHub organization name
 
  // Function to fetch GitHub data
  interface Commit {
    sha: string;            // The SHA of the commit
    commit: {
      message: string;     // The commit message
    };
    html_url: string;      // URL to view the commit on GitHub
  }
  
  interface Repository {
    id: number;               // Unique identifier for the repository
    name: string;             // Name of the repository
    description: string;      // Description of the repository
    commits: Commit[];        // Array of commits related to the repository
  }
  
  async function fetchGitHubData(org: string) {
    const response = await fetch(`https://api.github.com/orgs/${org}/repos`,{headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
    },});
    const repos = await response.json();
    const ans = await fetch('https://api.github.com/repos/sdscoeptest/rustsearch/commits',{headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
    },});
    console.log(ans);
// Ensure repos is an array
if (!Array.isArray(repos)) {
  console.error("Expected repos to be an array", repos);
  return []; // Return an empty array if not
}
    const reposWithCommits = await Promise.all(
      repos.map(async (repo: Repository) => {
        const commitsResponse = await fetch(`https://api.github.com/repos/${org}/${repo.name}/commits`,{headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },});
        const commits = await commitsResponse.json();
        return {
          ...repo,
          commits: commits.slice(0, 5), // Get the latest 5 commits
        };
      })
    );

    return reposWithCommits;
  }

  // useEffect to fetch data on component mount
  useEffect(() => {
    const getRepositories = async () => {
      const repos = await fetchGitHubData(org);
      setRepositories(repos);
    };
    getRepositories();
  }, [org]);

  const filteredRepositories = repositories.filter(repo =>
    repo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700">
          <span className="text-2xl font-bold text-gray-800 dark:text-white">AdminPanel</span>
        </div>
        <nav className="mt-6">
          <Link href="#" className="flex items-center px-6 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
            <LayoutDashboard className="w-5 h-5 mr-3" />
            Dashboard
          </Link>
          <Link href="#" className="flex items-center px-6 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
            <GitBranch className="w-5 h-5 mr-3" />
            Repositories
          </Link>
          <Link href="#" className="flex items-center px-6 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
            <Users className="w-5 h-5 mr-3" />
            Team
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
            <span className="text-2xl font-semibold text-gray-800 dark:text-white">Dashboard</span>
          </div>
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    {/* <AvatarImage src="/placeholder-user.jpg" alt="@johndoe" /> */}
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

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Repositories</CardTitle>
                  <GitBranch className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{repositories.length}</div>
                  <p className="text-xs text-muted-foreground">+10% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">573</div>
                  <p className="text-xs text-muted-foreground">+2.5% from last week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pull Requests</CardTitle>
                  <GitPullRequest className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">12 merged, 8 open, 4 closed</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Commits</CardTitle>
                  <GitCommit className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,542</div>
                  <p className="text-xs text-muted-foreground">-5% from last month</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Repositories */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Recent Repositories</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {filteredRepositories.length > 0 ? (
                  filteredRepositories.map((repo) => (
                    <Card key={repo.id}>
                      <CardHeader>
                        <CardTitle>{repo.name}</CardTitle>
                        <p className="text-2xl text-muted-foreground font-bold">{repo.description}</p>
                      </CardHeader>
                      <CardContent>
                        <h4 className="text-sm font-medium mb-2">Latest Commits:</h4>
                        <ul className="space-y-1">
                          {/* {repo.commits.map((commit) => ( */}
                             {/* <li key={commit.sha} className="text-sm"> */}
                              <Link href={repo.commits[0].html_url} className="text-blue-500 hover:underline">
                                See Commit 
                              </Link>
                              <br />
                              Count:{repo.commits.length}
                             {/* </li> */}
                           {/* ))} */}
                        </ul>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p className="text-muted-foreground">No repositories found for this organization.</p>
                )}
              </div>
            </div>

            {/* Activity Feed */}
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Recent Activity</h2>
            <Card>
              <CardContent className="p-0">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {[
                    { user: "Alice", action: "pushed to", repo: "next-app", time: "2 hours ago" },
                    { user: "Bob", action: "opened a pull request in", repo: "react-dashboard", time: "4 hours ago" },
                    { user: "Charlie", action: "commented on", repo: "node-api", time: "1 day ago" },
                    { user: "David", action: "merged a pull request in", repo: "next-app", time: "2 days ago" },
                  ].map((activity, index) => (
                    <li key={index} className="px-4 py-3">
                      <p className="text-sm">
                        <span className="font-semibold">{activity.user}</span> {activity.action}{" "}
                        <span className="font-semibold">{activity.repo}</span>
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

          </div>
        </main>
      </div>
    </div>
  );
}
