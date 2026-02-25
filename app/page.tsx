import { LoginForm } from "@/components/login-form"
import { NightBackground } from "@/components/night-background"
import { Moon } from "lucide-react"

export default function LoginPage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden">
      {/* Single subtle ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[200px] opacity-[0.07]"
        style={{ background: "var(--primary)" }}
        aria-hidden="true"
      />

      <NightBackground />

      <div className="relative z-10 w-full max-w-[400px] mx-6">
        {/* Logo */}
        <div className="flex flex-col items-center gap-6 mb-12">
          <div className="flex items-center justify-center size-11 rounded-lg bg-primary/8 border border-border/60">
            <Moon className="size-5 text-primary" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-xl font-semibold tracking-tight text-foreground">
              NightBuilder AI
            </h1>
            <p className="text-[13px] text-muted-foreground tracking-wide">
              Build your future at night
            </p>
          </div>
        </div>

        {/* Form */}
        <LoginForm />

        <p className="text-center text-[11px] text-muted-foreground/40 mt-10 tracking-wide">
          Secured with end-to-end encryption
        </p>
      </div>
    </main>
  )
}
