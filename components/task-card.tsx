"use client"

import { Check, MoreHorizontal, Trash2, RotateCcw, FileText, Code, Database, Palette, Globe, Layers } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const iconMap: Record<string, React.ElementType> = {
  design: Palette,
  code: Code,
  database: Database,
  docs: FileText,
  deploy: Globe,
  default: Layers,
}

export interface Task {
  id: string
  title: string
  status: "pending" | "done"
  category?: string
}

interface TaskCardProps {
  task: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function TaskCard({ task, onToggle, onDelete }: TaskCardProps) {
  const isDone = task.status === "done"
  const Icon = iconMap[task.category ?? "default"] || iconMap.default

  return (
    <div
      className={`
        group relative flex items-center gap-4 px-5 py-4 rounded-xl
        border transition-all duration-300 cursor-default
        ${isDone
          ? "border-border/10 bg-card/20"
          : "border-border/20 bg-card/50 hover:border-primary/20 hover:bg-card/70"
        }
      `}
      style={{
        boxShadow: isDone ? "none" : undefined,
      }}
      onMouseEnter={(e) => {
        if (!isDone) {
          e.currentTarget.style.boxShadow = "0 0 20px 0 oklch(0.68 0.14 280 / 0.06), 0 0 40px 0 oklch(0.68 0.14 280 / 0.03)"
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none"
      }}
    >
      {/* Icon */}
      <div
        className={`flex-shrink-0 flex items-center justify-center size-9 rounded-lg transition-colors duration-300 ${
          isDone
            ? "bg-success/8 text-success/40"
            : "bg-primary/8 text-primary/60 group-hover:bg-primary/12 group-hover:text-primary/80"
        }`}
      >
        <Icon className="size-4" strokeWidth={1.8} />
      </div>

      {/* Title */}
      <span
        className={`flex-1 text-[14px] leading-snug truncate transition-colors duration-200 ${
          isDone ? "line-through text-muted-foreground/30" : "text-foreground/90"
        }`}
      >
        {task.title}
      </span>

      {/* Status badge */}
      <button
        onClick={() => onToggle(task.id)}
        className="flex-shrink-0"
        aria-label={isDone ? "Mark as pending" : "Mark as done"}
      >
        {isDone ? (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium tracking-wide uppercase bg-success/10 text-success/70 border border-success/10 transition-colors hover:bg-success/15 hover:text-success/90">
            <Check className="size-3" strokeWidth={2.5} />
            Done
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium tracking-wide uppercase bg-primary/8 text-muted-foreground/50 border border-border/20 transition-colors hover:bg-primary/15 hover:text-primary/80 hover:border-primary/20">
            Pending
          </span>
        )}
      </button>

      {/* Actions */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1.5 rounded-lg text-muted-foreground/25 hover:text-foreground/70 hover:bg-secondary/50"
            aria-label="Task options"
          >
            <MoreHorizontal className="size-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40 bg-card border-border/30">
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
