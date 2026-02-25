"use client"

import { useState } from "react"
import { TaskCard, type Task } from "@/components/task-card"
import { AddTaskDialog } from "@/components/add-task-dialog"

const initialTasks: Task[] = [
  { id: "1", title: "Design landing page mockups", status: "done", category: "design" },
  { id: "2", title: "Build authentication flow", status: "pending", category: "code" },
  { id: "3", title: "Set up database schema", status: "pending", category: "database" },
  { id: "4", title: "Write API documentation", status: "pending", category: "docs" },
  { id: "5", title: "Create onboarding screens", status: "done", category: "design" },
  { id: "6", title: "Deploy staging environment", status: "pending", category: "deploy" },
  { id: "7", title: "Implement dark mode toggle", status: "done", category: "code" },
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
          ? { ...t, status: t.status === "done" ? "pending" : "done" }
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
      category: "default",
    }
    setTasks((prev) => [newTask, ...prev])
  }

  return (
    <main className="flex-1 px-6 lg:px-10 py-12 lg:py-16 max-w-5xl mx-auto w-full">
      {/* Greeting */}
      <div className="mb-12">
        <h1 className="text-[28px] lg:text-[32px] font-semibold tracking-[-0.03em] text-foreground leading-tight text-balance">
          {"Good evening, builder \u{1F319}"}
        </h1>
        <p className="text-[14px] text-muted-foreground mt-2.5 leading-relaxed">
          {"Here's what you're building tonight."}
        </p>
      </div>

      {/* Daily completion */}
      <div className="mb-14 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-[12px] uppercase tracking-widest text-muted-foreground/50 font-medium">Daily progress</span>
          <span className="text-[13px] font-medium text-foreground/70 tabular-nums">
            {completedCount} of {totalCount}
          </span>
        </div>
        <div className="relative w-full h-1.5 rounded-full bg-secondary/60 overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 rounded-full transition-all duration-700 ease-out"
            style={{
              width: `${completionPercent}%`,
              background: "linear-gradient(90deg, oklch(0.68 0.14 280), oklch(0.62 0.16 260))",
            }}
          />
        </div>
      </div>

      {/* Section header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-baseline gap-3">
          <h2 className="text-[15px] font-medium text-foreground tracking-[-0.01em]">
            Tasks
          </h2>
          <span className="text-[12px] text-muted-foreground/40 tabular-nums">
            {totalCount}
          </span>
        </div>
        <AddTaskDialog onAdd={handleAdd} />
      </div>

      {/* Task list */}
      <div className="flex flex-col gap-2.5">
        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-28 text-center">
            <p className="text-[14px] text-muted-foreground/50">No tasks yet</p>
            <p className="text-[13px] text-muted-foreground/25 mt-2">
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
