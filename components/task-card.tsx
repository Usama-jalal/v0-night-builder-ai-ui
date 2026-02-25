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
    <div className="group flex items-center gap-4 px-4 py-3.5 rounded-lg border border-border/30 bg-card/50 hover:bg-card/80 transition-colors">
      {/* Toggle */}
      <button
        onClick={() => onToggle(task.id)}
        className="flex-shrink-0 transition-colors"
        aria-label={isDone ? "Mark as pending" : "Mark as done"}
      >
        {isDone ? (
          <div className="flex items-center justify-center size-5 rounded-full bg-success/20 text-success">
            <Check className="size-3" strokeWidth={3} />
          </div>
        ) : (
          <Circle className="size-5 text-muted-foreground/40 hover:text-primary transition-colors" />
        )}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0 flex items-center gap-4">
        <span
          className={`text-[13.5px] truncate flex-1 ${
            isDone ? "line-through text-muted-foreground/50" : "text-foreground/90"
          }`}
        >
          {task.title}
        </span>

        {/* Inline progress */}
        <div className="hidden sm:flex items-center gap-2.5 flex-shrink-0">
          <div className="w-16 h-1 rounded-full bg-secondary overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isDone ? "bg-success/60" : "bg-primary/60"
              }`}
              style={{ width: `${displayProgress}%` }}
            />
          </div>
          <span className="text-[11px] text-muted-foreground/50 tabular-nums w-7 text-right">
            {displayProgress}%
          </span>
        </div>
      </div>

      {/* Actions */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded text-muted-foreground/40 hover:text-foreground"
            aria-label="Task options"
          >
            <MoreHorizontal className="size-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40 bg-card border-border/50">
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
