"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"

interface AddTaskDialogProps {
  onAdd: (title: string) => void
}

export function AddTaskDialog({ onAdd }: AddTaskDialogProps) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim()) {
      onAdd(title.trim())
      setTitle("")
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-9 px-4 text-[13px] font-medium border-border/30 bg-secondary/40 text-foreground/80 hover:bg-secondary/70 hover:text-foreground transition-colors"
        >
          <Plus className="size-4 mr-1.5" />
          Add Task
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-card border-border/30 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-foreground text-[16px] font-medium">
            New task
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-2">
          <Input
            placeholder="What are you building tonight?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="h-11 bg-secondary/50 border-border/30 text-foreground text-[14px] placeholder:text-muted-foreground/40 focus-visible:ring-1 focus-visible:ring-primary/30"
            autoFocus
          />
          <div className="flex justify-end gap-2.5">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setOpen(false)}
              className="text-[13px] text-muted-foreground hover:text-foreground"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={!title.trim()}
              className="text-[13px] bg-primary text-primary-foreground hover:bg-primary/85 px-5"
            >
              Add task
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
