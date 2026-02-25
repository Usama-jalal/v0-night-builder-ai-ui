"use client"

import { useState } from "react"
import { TaskCard, type Task } from "@/components/task-card"
import { AddTaskDialog } from "@/components/add-task-dialog"

const initialTasks: Task[] = [
  { id: "1", title: "Design landing page mockups", status: "done", progress: 100 },
  { id: "2", title: "Build authentication flow", status: "pending", progress: 65 },
  { id: "3", title: "Set up database schema", status: "pending", progress: 30 },
  { id: "4", title: "Write API documentation", status: "pending", progress: 10 },
  { id: "5", title: "Create onboarding screens", status: "done", progress: 100 },
]

export function DashboardContent() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)

  const completedCount = tasks.filter((t) => t.status === "done").length
  const totalCount = tasks.length
  const completionPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  const handleToggle = (id: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              status: t.status === "done" ? "pending" : "done",
              progress: t.status === "done" ? t.progress : 100,
            }
          : t
      )
    )
  }

  const handleDelete = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  const handleAdd = (title: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      status: "pending",
      progress: 0,
    }
    setTasks((prev) => [newTask, ...prev])
  }

  return (
    <div className="flex-1 px-6 md:px-8 py-10 md:py-14 max-w-5xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col gap-1.5 mb-14">
        <h1 className="text-[22px] md:text-[26px] font-semibold tracking-tight text-foreground">
          Good evening
        </h1>
        <p className="text-[13.5px] text-muted-foreground">
          {"Here's what you're building tonight."}
        </p>
      </div>

      {/* Metrics row */}
      <div className="flex items-center gap-10 mb-14 pb-10 border-b border-border/30">
        <div className="flex flex-col gap-1">
          <span className="text-[28px] font-semibold text-foreground tabular-nums leading-none">
            {totalCount}
          </span>
          <span className="text-[12px] text-muted-foreground/60 tracking-wide uppercase">
            Tasks
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[28px] font-semibold text-foreground tabular-nums leading-none">
            {completedCount}
          </span>
          <span className="text-[12px] text-muted-foreground/60 tracking-wide uppercase">
            Done
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[28px] font-semibold text-foreground tabular-nums leading-none">
            3
          </span>
          <span className="text-[12px] text-muted-foreground/60 tracking-wide uppercase">
            Streak
          </span>
        </div>
        <div className="flex-1" />
        <div className="hidden sm:flex flex-col items-end gap-2">
          <span className="text-[12px] text-muted-foreground/50 tabular-nums">
            {completionPercent}% complete
          </span>
          <div className="w-32 h-1 rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full rounded-full bg-primary/70 transition-all duration-700 ease-out"
              style={{ width: `${completionPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Task section */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[14px] font-medium text-foreground/80 tracking-wide">
          {"Tonight's tasks"}
        </h2>
        <AddTaskDialog onAdd={handleAdd} />
      </div>

      {/* Task list */}
      <div className="flex flex-col gap-1.5">
        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-[13px] text-muted-foreground/50">No tasks yet</p>
            <p className="text-[12px] text-muted-foreground/30 mt-1">
              Add your first task to start building
            </p>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  )
}
