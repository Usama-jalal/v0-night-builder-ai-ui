"use client"

import { CheckCircle2, Clock, MoreHorizontal, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
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

  return (
    <div
      className={`group relative flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 hover:shadow-[0_0_20px_var(--glow)] ${
        isDone
          ? "bg-surface/50 border-success/20"
          : "bg-card border-border/60 hover:border-primary/30"
      }`}
    >
      {/* Status toggle */}
      <button
        onClick={() => onToggle(task.id)}
        className={`flex-shrink-0 flex items-center justify-center size-10 rounded-lg transition-all ${
          isDone
            ? "bg-success/15 text-success"
            : "bg-secondary text-muted-foreground hover:text-primary hover:bg-primary/10"
        }`}
        aria-label={isDone ? "Mark as pending" : "Mark as done"}
      >
        {isDone ? (
          <CheckCircle2 className="size-5" />
        ) : (
          <Clock className="size-5" />
        )}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-2">
          <h3
            className={`font-medium text-sm truncate ${
              isDone ? "line-through text-muted-foreground" : "text-foreground"
            }`}
          >
            {task.title}
          </h3>
          <Badge
            variant="secondary"
            className={`text-[10px] px-2 py-0.5 font-medium uppercase tracking-wider shrink-0 ${
              isDone
                ? "bg-success/15 text-success border-success/20"
                : "bg-primary/10 text-primary border-primary/20"
            }`}
          >
            {isDone ? "Done" : "Pending"}
          </Badge>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isDone ? "bg-success" : "bg-primary"
              }`}
              style={{ width: `${isDone ? 100 : task.progress}%` }}
            />
          </div>
          <span className="text-xs text-muted-foreground tabular-nums">
            {isDone ? 100 : task.progress}%
          </span>
        </div>
      </div>

      {/* Actions */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground"
            aria-label="Task options"
          >
            <MoreHorizontal className="size-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-card border-border">
          <DropdownMenuItem
            onClick={() => onToggle(task.id)}
            className="text-muted-foreground hover:text-foreground cursor-pointer"
          >
            {isDone ? (
              <>
                <Clock className="size-4 mr-2" />
                Mark as pending
              </>
            ) : (
              <>
                <CheckCircle2 className="size-4 mr-2" />
                Mark as done
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onDelete(task.id)}
            className="text-destructive hover:text-destructive cursor-pointer"
          >
            <Trash2 className="size-4 mr-2" />
            Delete task
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
