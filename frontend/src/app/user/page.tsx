"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

import Sidebar from "@/components/Sidebar";

import { Code, GitCommit, GitPullRequest } from "lucide-react";
import Header from "@/components/Header";

const activityData = [
    { name: "Mon", commits: 4, pullRequests: 1, codeReviews: 2 },
    { name: "Tue", commits: 3, pullRequests: 2, codeReviews: 3 },
    { name: "Wed", commits: 7, pullRequests: 3, codeReviews: 1 },
    { name: "Thu", commits: 5, pullRequests: 1, codeReviews: 4 },
    { name: "Fri", commits: 6, pullRequests: 2, codeReviews: 2 },
];

export default function Dashboard() {
    return (
        <div className={`flex h-screen`}>
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

            <Sidebar focus="dashboard" />

            <div className="flex-1 flex flex-col overflow-hidden bg-gray-50 dark:bg-gray-900">
                <Header />
                <div className="p-6 space-y-6 overflow-y-auto">
                    <div className="space-y-4 flex flex-col">
                        <div className="flex flex-row md:flex-row md:space-x-4 space-y-4 md:space-y-0 w-full  ">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <CardTitle>Project Status</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold">
                                            7
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            Active Projects
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <CardTitle>Recent Activity</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <Code className="w-4 h-4" />
                                            <span>Updated main.js</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <GitCommit className="w-4 h-4" />
                                            <span>
                                                Committed 3 files to project-x
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <GitPullRequest className="w-4 h-4" />
                                            <span>Opened pull request #42</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle>Activity</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[200px]">
                                    <ResponsiveContainer
                                        width="100%"
                                        height="100%"
                                    >
                                        <BarChart data={activityData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Bar
                                                dataKey="commits"
                                                fill="#8884d8"
                                            />
                                            <Bar
                                                dataKey="pullRequests"
                                                fill="#82ca9d"
                                            />
                                            <Bar
                                                dataKey="codeReviews"
                                                fill="#ffc658"
                                            />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
