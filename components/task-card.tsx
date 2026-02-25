"use client"

import { Check, Circle, MoreHorizontal, Trash2, RotateCcw } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export interface Task {
  id: string
  title: string
  status: "pending" | "done"
  progress: number
}

interface TaskCardProps {
  task: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function TaskCard({ task, onToggle, onDelete }: TaskCardProps) {
  const isDone = task.status === "done"
  const displayProgress = isDone ? 100 : task.progress

  return (
    <div className="group flex items-center gap-4 px-4 py-4 rounded-xl border border-border/20 bg-card/40 hover:bg-card/70 hover:border-border/40 transition-all duration-200">
      {/* Toggle */}
      <button
        onClick={() => onToggle(task.id)}
        className="flex-shrink-0 transition-colors"
        aria-label={isDone ? "Mark as pending" : "Mark as done"}
      >
        {isDone ? (
          <div className="flex items-center justify-center size-5 rounded-full bg-success/15 text-success ring-1 ring-success/20">
            <Check className="size-3" strokeWidth={2.5} />
          </div>
        ) : (
          <Circle className="size-5 text-muted-foreground/30 hover:text-primary/60 transition-colors" />
        )}
      </button>

      {/* Title */}
      <span
        className={`text-[14px] truncate flex-1 transition-colors ${
          isDone ? "line-through text-muted-foreground/40" : "text-foreground/85"
        }`}
      >
        {task.title}
      </span>

      {/* Inline progress */}
      <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
        <div className="w-20 h-1 rounded-full bg-secondary/80 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isDone ? "bg-success/50" : "bg-primary/50"
            }`}
            style={{ width: `${displayProgress}%` }}
          />
        </div>
        <span className="text-[11px] text-muted-foreground/40 tabular-nums w-8 text-right">
          {displayProgress}%
        </span>
      </div>

      {/* Actions */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded text-muted-foreground/30 hover:text-foreground"
            aria-label="Task options"
          >
            <MoreHorizontal className="size-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40 bg-card border-border/40">
          <DropdownMenuItem
            onClick={() => onToggle(task.id)}
            className="text-[13px] text-muted-foreground hover:text-foreground cursor-pointer"
          >
            {isDone ? (
              <>
                <RotateCcw className="size-3.5 mr-2" />
                Mark pending
              </>
            ) : (
              <>
                <Check className="size-3.5 mr-2" />
                Mark done
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onDelete(task.id)}
            className="text-[13px] text-destructive hover:text-destructive cursor-pointer"
          >
            <Trash2 className="size-3.5 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
