"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
      {/* Email */}
      <div className="flex flex-col gap-2.5">
        <label
          htmlFor="email"
          className="text-[12px] font-medium tracking-[0.04em] uppercase text-muted-foreground/60"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          className="h-12 w-full rounded-lg bg-secondary/40 border border-border/40 px-4 text-[14px] text-foreground placeholder:text-muted-foreground/30 outline-none transition-all duration-200 focus:border-primary/40 focus:bg-secondary/60 focus:shadow-[0_0_0_3px_var(--glow)]"
        />
      </div>

      {/* Password */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="text-[12px] font-medium tracking-[0.04em] uppercase text-muted-foreground/60"
          >
            Password
          </label>
          <button
            type="button"
            className="text-[12px] text-muted-foreground/40 hover:text-primary/80 transition-colors duration-200"
          >
            Forgot?
          </button>
        </div>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            className="h-12 w-full rounded-lg bg-secondary/40 border border-border/40 px-4 pr-12 text-[14px] text-foreground placeholder:text-muted-foreground/30 outline-none transition-all duration-200 focus:border-primary/40 focus:bg-secondary/60 focus:shadow-[0_0_0_3px_var(--glow)]"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/30 hover:text-muted-foreground/60 transition-colors duration-200"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="size-[18px]" /> : <Eye className="size-[18px]" />}
          </button>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="group relative h-12 w-full rounded-lg bg-primary text-primary-foreground font-medium text-[13px] tracking-[0.02em] mt-2 transition-all duration-300 hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
      >
        {/* Subtle shimmer on hover */}
        <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" aria-hidden="true" />
        {/* Glow underneath */}
        <span
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[60%] h-8 blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-300 rounded-full"
          style={{ background: "var(--primary)" }}
          aria-hidden="true"
        />
        <span className="relative flex items-center justify-center gap-2">
          {isLoading ? (
            <span className="size-4 border-2 border-primary-foreground/20 border-t-primary-foreground rounded-full animate-spin" />
          ) : (
            <>
              Continue
              <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </>
          )}
        </span>
      </button>

      {/* Sign up link */}
      <p className="text-center text-[13px] text-muted-foreground/40 mt-1">
        {"New here? "}
        <button
          type="button"
          className="text-primary/70 hover:text-primary transition-colors duration-200"
        >
          Create an account
        </button>
      </p>
    </form>
  )
}
