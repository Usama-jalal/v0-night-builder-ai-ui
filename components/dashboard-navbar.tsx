"use client"

import { Moon, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DashboardNavbar() {
  const router = useRouter()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-card/80 backdrop-blur-xl">
      <nav className="flex items-center justify-between h-16 px-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center size-9 rounded-lg bg-primary/10 border border-primary/20">
            <Moon className="size-5 text-primary" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-foreground">
            NightBuilder AI
          </span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 rounded-lg px-2 py-1.5 hover:bg-secondary/80 transition-colors" aria-label="User menu">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-sm font-medium text-foreground">Night Builder</span>
                <span className="text-xs text-muted-foreground">builder@night.dev</span>
              </div>
              <Avatar className="size-9 border border-border">
                <AvatarFallback className="bg-primary/15 text-primary text-sm font-medium">
                  NB
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-card border-border">
            <DropdownMenuItem
              onClick={() => router.push("/")}
              className="text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <LogOut className="size-4 mr-2" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </header>
  )
}
