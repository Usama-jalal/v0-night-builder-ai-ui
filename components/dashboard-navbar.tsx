"use client"

import { Moon, LogOut } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

export function DashboardNavbar() {
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-background/70 backdrop-blur-xl">
      <nav className="flex items-center justify-between h-16 px-6 lg:px-10 max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div
              className="absolute inset-0 rounded-full blur-md opacity-20 scale-150"
              style={{ background: "oklch(0.68 0.14 280)" }}
              aria-hidden="true"
            />
            <Moon className="relative size-[18px] text-primary" />
          </div>
          <span className="text-[15px] font-semibold tracking-[-0.01em] text-foreground">
            NightBuilder AI
          </span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="flex items-center gap-2.5 rounded-full px-1 py-1 hover:bg-secondary/40 transition-colors"
              aria-label="User menu"
            >
              <Avatar className="size-8 border border-border/40">
                <AvatarFallback className="bg-secondary text-muted-foreground text-[11px] font-medium">
                  NB
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-44 bg-card border-border/40">
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-muted-foreground hover:text-foreground cursor-pointer text-[13px]"
            >
              <LogOut className="size-3.5 mr-2" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
      <div className="h-px bg-border/30" />
    </header>
  )
}
