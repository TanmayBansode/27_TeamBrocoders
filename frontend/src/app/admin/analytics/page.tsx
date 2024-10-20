'use client'

import React, { Suspense, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Plus, X, Code, GitCommit, GitPullRequest } from 'lucide-react'
import Sidebar from '@/components/Sidebar'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, PieChart, Pie, Cell, Legend } from 'recharts'
import AdminSidebar from '@/components/AdminSidebar'


const lineChartData = [
    { name: 'Jan', commits: 400, pullRequests: 240, codeReviews: 240 },
    { name: 'Feb', commits: 300, pullRequests: 139, codeReviews: 221 },
    { name: 'Mar', commits: 200, pullRequests: 980, codeReviews: 229 },
    { name: 'Apr', commits: 278, pullRequests: 390, codeReviews: 200 },
    { name: 'May', commits: 189, pullRequests: 480, codeReviews: 218 },
    { name: 'Jun', commits: 239, pullRequests: 380, codeReviews: 250 },
    { name: 'Jul', commits: 349, pullRequests: 430, codeReviews: 210 },
  ]
  
  const barChartData = [
    { name: 'Project A', lines: 4000, bugs: 24 },
    { name: 'Project B', lines: 3000, bugs: 18 },
    { name: 'Project C', lines: 2000, bugs: 29 },
    { name: 'Project D', lines: 2780, bugs: 39 },
    { name: 'Project E', lines: 1890, bugs: 48 },
    { name: 'Project F', lines: 2390, bugs: 38 },
    { name: 'Project G', lines: 3490, bugs: 43 },
  ]
  
  const pieChartData = [
    { name: 'JavaScript', value: 400 },
    { name: 'Python', value: 300 },
    { name: 'Java', value: 300 },
    { name: 'C++', value: 200 },
  ]
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export default function Projects() {
    const [timeRange, setTimeRange] = useState('7d')

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

      <AdminSidebar focus='analytics' />

      {/* Make the content scrollable */}
      <Suspense fallback={<p>Loading...</p>}>
      <div className="flex-1 flex flex-col overflow-hidden bg-gray-50 dark:bg-gray-900">
        <div className="flex-1 p-6 space-y-6 overflow-y-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Analytics</h1>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Activity Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={lineChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="commits" stroke="#8884d8" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="pullRequests" stroke="#82ca9d" />
                      <Line type="monotone" dataKey="codeReviews" stroke="#ffc658" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Project Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                      <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="lines" fill="#8884d8" />
                      <Bar yAxisId="right" dataKey="bugs" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Language Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      </Suspense>
    </div>
  )
}
