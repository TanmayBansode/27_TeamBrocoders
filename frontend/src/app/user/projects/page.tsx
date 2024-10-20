'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Plus, X, Code, GitCommit, GitPullRequest } from 'lucide-react'
import Sidebar from '@/components/Sidebar'

const initialColumns = {
    todo: {
      id: 'todo',
      title: 'To Do',
      tasks: [
        { id: 'task-1', content: 'Implement user authentication' },
        { id: 'task-2', content: 'Design landing page' },
      ],
    },
    inProgress: {
      id: 'inProgress',
      title: 'In Progress',
      tasks: [
        { id: 'task-3', content: 'Develop API endpoints' },
      ],
    },
    done: {
      id: 'done',
      title: 'Done',
      tasks: [
        { id: 'task-4', content: 'Set up project repository' },
      ],
    },
  }


export default function Projects() {
    const [columns, setColumns] = useState(initialColumns)
    const [newTask, setNewTask] = useState('')
  
    const onDragEnd = (result) => {
      const { source, destination } = result
      if (!destination) return
  
      if (source.droppableId === destination.droppableId) {
        const column = columns[source.droppableId]
        const newTasks = Array.from(column.tasks)
        const [reorderedItem] = newTasks.splice(source.index, 1)
        newTasks.splice(destination.index, 0, reorderedItem)
        setColumns({
          ...columns,
          [source.droppableId]: {
            ...column,
            tasks: newTasks,
          },
        })
      } else {
        const sourceColumn = columns[source.droppableId]
        const destColumn = columns[destination.droppableId]
        const sourceTasks = Array.from(sourceColumn.tasks)
        const destTasks = Array.from(destColumn.tasks)
        const [movedItem] = sourceTasks.splice(source.index, 1)
        destTasks.splice(destination.index, 0, movedItem)
        setColumns({
          ...columns,
          [source.droppableId]: {
            ...sourceColumn,
            tasks: sourceTasks,
          },
          [destination.droppableId]: {
            ...destColumn,
            tasks: destTasks,
          },
        })
      }
    }
  
    const addTask = () => {
      if (newTask.trim() !== '') {
        const todoColumn = columns.todo
        const newTaskItem = { id: `task-${Date.now()}`, content: newTask }
        setColumns({
          ...columns,
          todo: {
            ...todoColumn,
            tasks: [...todoColumn.tasks, newTaskItem],
          },
        })
        setNewTask('')
      }
    }
  
    const removeTask = (columnId, taskId) => {
      const column = columns[columnId]
      const newTasks = column.tasks.filter(task => task.id !== taskId)
      setColumns({
        ...columns,
        [columnId]: {
          ...column,
          tasks: newTasks,
        },
      })
    }

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

      <Sidebar focus='projects' />

      {/* Main content container with vertical scrolling */}
      <div className="flex-1 flex flex-col overflow-hidden bg-gray-50 dark:bg-gray-900">
      <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Projects</h1>
      
      <div className="flex items-center space-x-2 mb-4">
        <Input
          type="text"
          placeholder="New task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="max-w-xs"
        />
        <Button onClick={addTask}>
          <Plus className="w-4 h-4 mr-2" />
          Add Task
        </Button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.values(columns).map((column) => (
            <div key={column.id}>
              <Card>
                <CardHeader>
                  <CardTitle>{column.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Droppable droppableId={column.id}>
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                        {column.tasks.map((task, index) => (
                          <Draggable key={task.id} draggableId={task.id} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="bg-muted p-2 rounded-md flex justify-between items-center"
                              >
                                <span>{task.content}</span>
                                <Button variant="ghost" size="icon" onClick={() => removeTask(column.id, task.id)}>
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
      </div>
    </div>
  )
}
