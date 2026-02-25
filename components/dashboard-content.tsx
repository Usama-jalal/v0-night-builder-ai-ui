"use client"

import useSWR from "swr"
import { TaskCard, type Task } from "@/components/task-card"
import { AddTaskDialog } from "@/components/add-task-dialog"
import { Loader2 } from "lucide-react"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function DashboardContent() {
  const { data: tasks, error, isLoading, mutate } = useSWR<Task[]>("/api/tasks", fetcher)

  const completedCount = tasks?.filter((t) => t.status === "done").length ?? 0
  const totalCount = tasks?.length ?? 0
  const completionPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  const handleToggle = async (id: string) => {
    if (!tasks) return
    const task = tasks.find((t) => t.id === id)
    if (!task) return

    const newStatus = task.status === "done" ? "pending" : "done"

    // Optimistic update
    mutate(
      tasks.map((t) => (t.id === id ? { ...t, status: newStatus } : t)),
      false
    )

    await fetch("/api/tasks", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: newStatus }),
    })

    mutate()
  }

  const handleDelete = async (id: string) => {
    if (!tasks) return

    // Optimistic update
    mutate(
      tasks.filter((t) => t.id !== id),
      false
    )

    await fetch(`/api/tasks?id=${id}`, { method: "DELETE" })
    mutate()
  }

  const handleAdd = async (title: string) => {
    const tempTask: Task = {
      id: `temp-${Date.now()}`,
      title,
      status: "pending",
      category: "default",
    }

    // Optimistic update
    mutate(tasks ? [tempTask, ...tasks] : [tempTask], false)

    await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    })

    mutate()
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
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-28 text-center">
            <Loader2 className="size-5 text-primary/50 animate-spin" />
            <p className="text-[13px] text-muted-foreground/40 mt-4">Loading tasks...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-28 text-center">
            <p className="text-[14px] text-destructive/70">Failed to load tasks</p>
            <p className="text-[13px] text-muted-foreground/40 mt-2">
              Check your Supabase connection and try again
            </p>
          </div>
        ) : !tasks || tasks.length === 0 ? (
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
