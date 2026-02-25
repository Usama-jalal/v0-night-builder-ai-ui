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
    <main className="flex-1 px-6 lg:px-10 py-12 lg:py-16 max-w-6xl mx-auto w-full">
      {/* Greeting */}
      <div className="mb-10">
        <h1 className="text-[28px] lg:text-[32px] font-semibold tracking-[-0.025em] text-foreground leading-tight">
          {"Good evening, builder \u{1F319}"}
        </h1>
        <p className="text-[14px] text-muted-foreground mt-2">
          {"Here's what you're building tonight."}
        </p>
      </div>

      {/* Daily completion progress */}
      <div className="mb-12 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-[13px] text-muted-foreground">Daily progress</span>
          <span className="text-[13px] font-medium text-foreground tabular-nums">
            {completedCount}/{totalCount} tasks
          </span>
        </div>
        <div className="relative w-full h-2 rounded-full bg-secondary/80 overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 rounded-full transition-all duration-700 ease-out"
            style={{
              width: `${completionPercent}%`,
              background: "linear-gradient(90deg, oklch(0.68 0.14 280), oklch(0.60 0.16 260))",
            }}
          />
          {/* Subtle glow on progress tip */}
          <div
            className="absolute top-1/2 -translate-y-1/2 size-4 rounded-full blur-md opacity-40 transition-all duration-700"
            style={{
              left: `calc(${completionPercent}% - 8px)`,
              background: "oklch(0.68 0.14 280)",
            }}
            aria-hidden="true"
          />
        </div>
        <span className="text-[12px] text-muted-foreground/50">
          {completionPercent}% complete
        </span>
      </div>

      {/* Task section header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[15px] font-medium text-foreground tracking-[-0.01em]">
          Tasks
        </h2>
        <AddTaskDialog onAdd={handleAdd} />
      </div>

      {/* Task list */}
      <div className="flex flex-col gap-2">
        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-[14px] text-muted-foreground/60">No tasks yet</p>
            <p className="text-[13px] text-muted-foreground/30 mt-1.5">
              Add your first task to start building tonight
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
    </main>
  )
}
