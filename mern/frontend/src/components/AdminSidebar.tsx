// components/Sidebar.tsx
import React from "react";
import Link from "next/link";
import { LayoutDashboard, Code, GitBranch, Activity, Settings } from "lucide-react";

const AdminSidebar = ({ focus }: { focus: string }) => {
  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
        <span className="text-2xl font-bold text-primary">CodeAssist</span>
      </div>
      <nav className="mt-6 space-y-1">
        <Link
          href="/admin"
          className={`flex items-center px-4 py-2 text-sm font-medium ${
            focus === "dashboard"
              ? "text-white bg-primary"
              : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          } rounded-md mx-2`}
        >
          <LayoutDashboard className="w-5 h-5 mr-3" />
          Dashboard
        </Link>
        <Link
          href="/admin/repository"
          className={`flex items-center px-4 py-2 text-sm font-medium ${
            focus === "repository"
              ? "text-white bg-primary"
              : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          } rounded-md mx-2`}
        >
          <Code className="w-5 h-5 mr-3" />
          Repositories
        </Link>
        <Link
          href="/admin/team"
          className={`flex items-center px-4 py-2 text-sm font-medium ${
            focus === "team"
              ? "text-white bg-primary"
              : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          } rounded-md mx-2`}
        >
          <GitBranch className="w-5 h-5 mr-3" />
          Team
        </Link>
        <Link
          href="/admin/analytics"
          className={`flex items-center px-4 py-2 text-sm font-medium ${
            focus === "analytics"
              ? "text-white bg-primary"
              : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          } rounded-md mx-2`}
        >
          <Activity className="w-5 h-5 mr-3" />
          Analytics
        </Link>
        <Link
          href="/admin/settings"
          className={`flex items-center px-4 py-2 text-sm font-medium ${
            focus === "settings"
              ? "text-white bg-primary"
              : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          } rounded-md mx-2`}
        >
          <Settings className="w-5 h-5 mr-3" />
          Settings
        </Link>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
