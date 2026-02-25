"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, ArrowRight } from "lucide-react"

export function LoginForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 600))
    setIsLoading(false)
    router.push("/dashboard")
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
      <div className="flex flex-col gap-2">
        <Label htmlFor="email" className="text-[13px] text-muted-foreground font-normal">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="h-11 bg-secondary/60 border-border/50 text-foreground placeholder:text-muted-foreground/40 focus-visible:ring-1 focus-visible:ring-primary/30 focus-visible:border-primary/30 transition-colors"
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password" className="text-[13px] text-muted-foreground font-normal">
            Password
          </Label>
          <button
            type="button"
            className="text-[12px] text-muted-foreground/60 hover:text-foreground transition-colors"
          >
            Forgot password?
          </button>
        </div>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="h-11 bg-secondary/60 border-border/50 text-foreground placeholder:text-muted-foreground/40 pr-11 focus-visible:ring-1 focus-visible:ring-primary/30 focus-visible:border-primary/30 transition-colors"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-foreground transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="h-11 bg-primary text-primary-foreground hover:bg-primary/85 font-medium text-[13px] tracking-wide mt-3 transition-all shadow-[0_0_24px_var(--glow)] hover:shadow-[0_0_32px_var(--glow-strong)]"
      >
        {isLoading ? (
          <div className="size-4 border-2 border-primary-foreground/20 border-t-primary-foreground rounded-full animate-spin" />
        ) : (
          <>
            Sign in
            <ArrowRight className="size-3.5 ml-2" />
          </>
        )}
      </Button>

      <p className="text-center text-[13px] text-muted-foreground/50 mt-1">
        {"Don't have an account? "}
        <button type="button" className="text-foreground/70 hover:text-foreground transition-colors">
          Sign up
        </button>
      </p>
    </form>
  )
}
