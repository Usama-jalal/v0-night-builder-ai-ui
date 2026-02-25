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
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-2xl">
      <nav className="flex items-center justify-between h-14 px-6 max-w-5xl mx-auto">
        <div className="flex items-center gap-2.5">
          <Moon className="size-[18px] text-primary" />
          <span className="text-[15px] font-medium tracking-tight text-foreground">
            NightBuilder
          </span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2.5 rounded-lg px-1.5 py-1 hover:bg-secondary/50 transition-colors" aria-label="User menu">
              <span className="hidden sm:block text-[13px] text-muted-foreground">
                builder@night.dev
              </span>
              <Avatar className="size-7 border border-border/50">
                <AvatarFallback className="bg-secondary text-muted-foreground text-[11px] font-medium">
                  NB
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44 bg-card border-border/50">
            <DropdownMenuItem
              onClick={() => router.push("/")}
              className="text-muted-foreground hover:text-foreground cursor-pointer text-[13px]"
            >
              <LogOut className="size-3.5 mr-2" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </header>
  )
}
