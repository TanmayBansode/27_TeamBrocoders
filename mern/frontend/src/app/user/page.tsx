"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Plus, X, Code, GitCommit, GitPullRequest } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

const initialWidgets = [
    { id: "recent-activity", title: "Recent Activity" },
    { id: "project-stats", title: "Project Stats" },
    { id: "coding-streak", title: "Coding Streak" },
];

const activityData = [
    { name: "Mon", commits: 4, pullRequests: 1, codeReviews: 2 },
    { name: "Tue", commits: 3, pullRequests: 2, codeReviews: 3 },
    { name: "Wed", commits: 7, pullRequests: 3, codeReviews: 1 },
    { name: "Thu", commits: 5, pullRequests: 1, codeReviews: 4 },
    { name: "Fri", commits: 6, pullRequests: 2, codeReviews: 2 },
];

export default function Dashboard() {
    const [widgets, setWidgets] = useState(initialWidgets);
    const [newWidgetTitle, setNewWidgetTitle] = useState("");

    const onDragEnd = (result) => {
        if (!result.destination) return;
        const items = Array.from(widgets);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setWidgets(items);
    };

    const addWidget = () => {
        if (newWidgetTitle.trim() !== "") {
            setWidgets([
                ...widgets,
                { id: `widget-${Date.now()}`, title: newWidgetTitle },
            ]);
            setNewWidgetTitle("");
        }
    };

    const removeWidget = (id) => {
        setWidgets(widgets.filter((widget) => widget.id !== id));
    };

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

            {/* Main content container with vertical scrolling */}
            <div className="flex-1 flex flex-col overflow-hidden bg-gray-50 dark:bg-gray-900">
                <div className="p-6 space-y-6 overflow-y-auto">
                    <div className="flex flex-row justify-between">
                        <h1 className="text-3xl font-bold">Dashboard</h1>
                        <div className="flex items-center space-x-2">
                            <Input
                                type="text"
                                placeholder="New widget title"
                                value={newWidgetTitle}
                                onChange={(e) =>
                                    setNewWidgetTitle(e.target.value)
                                }
                                className="max-w-xs"
                            />
                            <Button onClick={addWidget}>
                                <Plus className="w-4 h-4 mr-2" />
                                Add Widget
                            </Button>
                        </div>
                    </div>

                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="widgets">
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className="space-y-4"
                                >
                                    {widgets.map((widget, index) => (
                                        <Draggable
                                            key={widget.id}
                                            draggableId={widget.id}
                                            index={index}
                                        >
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <Card>
                                                        <CardHeader className="flex flex-row items-center justify-between">
                                                            <CardTitle>
                                                                {widget.title}
                                                            </CardTitle>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() =>
                                                                    removeWidget(
                                                                        widget.id
                                                                    )
                                                                }
                                                            >
                                                                <X className="h-4 w-4" />
                                                            </Button>
                                                        </CardHeader>
                                                        <CardContent>
                                                            {widget.id ===
                                                                "recent-activity" && (
                                                                <div className="space-y-2">
                                                                    <div className="flex items-center space-x-2">
                                                                        <Code className="w-4 h-4" />
                                                                        <span>
                                                                            Updated
                                                                            main.js
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex items-center space-x-2">
                                                                        <GitCommit className="w-4 h-4" />
                                                                        <span>
                                                                            Committed
                                                                            3
                                                                            files
                                                                            to
                                                                            project-x
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex items-center space-x-2">
                                                                        <GitPullRequest className="w-4 h-4" />
                                                                        <span>
                                                                            Opened
                                                                            pull
                                                                            request
                                                                            #42
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            )}
                                                            {widget.id ===
                                                                "project-stats" && (
                                                                <div className="text-center">
                                                                    <div className="text-2xl font-bold">
                                                                        7
                                                                    </div>
                                                                    <div className="text-sm text-gray-500">
                                                                        Active
                                                                        Projects
                                                                    </div>
                                                                </div>
                                                            )}
                                                            {widget.id ===
                                                                "coding-streak" && (
                                                                <div className="h-[200px]">
                                                                    <ResponsiveContainer
                                                                        width="100%"
                                                                        height="100%"
                                                                    >
                                                                        <BarChart
                                                                            data={
                                                                                activityData
                                                                            }
                                                                        >
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
                                                            )}
                                                        </CardContent>
                                                    </Card>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
            </div>
        </div>
    );
}
