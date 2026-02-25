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
    // Simulate login
    await new Promise((r) => setTimeout(r, 800))
    setIsLoading(false)
    router.push("/dashboard")
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-2">
        <Label htmlFor="email" className="text-muted-foreground text-sm">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="h-12 bg-secondary border-border text-foreground placeholder:text-muted-foreground/50 focus-visible:ring-primary/50 focus-visible:border-primary/50"
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password" className="text-muted-foreground text-sm">
            Password
          </Label>
          <button
            type="button"
            className="text-xs text-primary hover:text-primary/80 transition-colors"
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
            className="h-12 bg-secondary border-border text-foreground placeholder:text-muted-foreground/50 pr-12 focus-visible:ring-primary/50 focus-visible:border-primary/50"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
          </button>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="h-12 bg-primary text-primary-foreground hover:bg-primary/90 transition-all font-medium text-sm tracking-wide mt-2 shadow-[0_0_20px_var(--glow)] hover:shadow-[0_0_30px_var(--glow-strong)]"
      >
        {isLoading ? (
          <div className="size-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
        ) : (
          <>
            Sign In
            <ArrowRight className="size-4 ml-2" />
          </>
        )}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        {"Don't have an account? "}
        <button type="button" className="text-primary hover:text-primary/80 transition-colors font-medium">
          Sign up
        </button>
      </p>
    </form>
  )
}
