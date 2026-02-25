"use client"

import { useState } from "react"
import { Target, Flame, CheckCircle2 } from "lucide-react"
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
    <div className="flex-1 px-4 md:px-6 py-8 max-w-6xl mx-auto w-full">
      {/* Welcome section */}
      <div className="flex flex-col gap-1 mb-8">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground text-balance">
          Good evening, builder
        </h1>
        <p className="text-muted-foreground text-sm">
          {"Here's what you're building tonight. Stay focused."}
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border/60">
          <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10">
            <Target className="size-5 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground tabular-nums">{totalCount}</p>
            <p className="text-xs text-muted-foreground">Total tasks</p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border/60">
          <div className="flex items-center justify-center size-10 rounded-lg bg-success/10">
            <CheckCircle2 className="size-5 text-success" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground tabular-nums">{completedCount}</p>
            <p className="text-xs text-muted-foreground">Completed</p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border/60">
          <div className="flex items-center justify-center size-10 rounded-lg bg-accent/10">
            <Flame className="size-5 text-accent" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground tabular-nums">3</p>
            <p className="text-xs text-muted-foreground">Day streak</p>
          </div>
        </div>
      </div>

      {/* Daily progress */}
      <div className="p-5 rounded-xl bg-card border border-border/60 mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-medium text-foreground">Daily completion</h2>
          <span className="text-sm font-semibold text-primary tabular-nums">{completionPercent}%</span>
        </div>
        <div className="h-2.5 rounded-full bg-secondary overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-700 ease-out shadow-[0_0_10px_var(--glow)]"
            style={{ width: `${completionPercent}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {completedCount} of {totalCount} tasks completed tonight
        </p>
      </div>

      {/* Today's Focus section */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-semibold text-foreground">{"Today's Focus"}</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Your tasks for tonight&apos;s session
          </p>
        </div>
        <AddTaskDialog onAdd={handleAdd} />
      </div>

      {/* Task list */}
      <div className="flex flex-col gap-3">
        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="size-12 rounded-xl bg-secondary flex items-center justify-center mb-4">
              <Target className="size-6 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">No tasks yet</p>
            <p className="text-xs text-muted-foreground/60 mt-1">
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
