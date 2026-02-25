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
          variant="ghost"
          className="h-8 px-3 text-[13px] text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
        >
          <Plus className="size-3.5 mr-1.5" />
          Add task
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-card border-border/50 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-foreground text-[15px] font-medium">
            New task
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-1">
          <Input
            placeholder="What are you building tonight?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="h-10 bg-secondary/60 border-border/50 text-foreground text-[13px] placeholder:text-muted-foreground/40 focus-visible:ring-1 focus-visible:ring-primary/30"
            autoFocus
          />
          <div className="flex justify-end gap-2">
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
              className="text-[13px] bg-primary text-primary-foreground hover:bg-primary/85"
            >
              Add
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
