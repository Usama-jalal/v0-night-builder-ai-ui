import { LoginForm } from "@/components/login-form"
import { NightBackground } from "@/components/night-background"
import { Moon } from "lucide-react"

export default function LoginPage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden">
      {/* Ambient glow effects */}
      <div
        className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-20"
        style={{ background: "var(--primary)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[-15%] right-[-5%] w-[400px] h-[400px] rounded-full blur-[100px] opacity-15"
        style={{ background: "var(--accent)" }}
        aria-hidden="true"
      />

      {/* Starry night canvas */}
      <NightBackground />

      {/* Login card */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="flex flex-col items-center gap-8 p-8 md:p-10 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50 shadow-[0_0_60px_var(--glow)]">
          {/* Logo */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center justify-center size-14 rounded-xl bg-primary/10 border border-primary/20 shadow-[0_0_20px_var(--glow)]">
              <Moon className="size-7 text-primary" />
            </div>
            <div className="flex flex-col items-center gap-1">
              <h1 className="text-2xl font-bold tracking-tight text-foreground text-balance text-center">
                NightBuilder AI
              </h1>
              <p className="text-sm text-muted-foreground">
                Build your future at night
              </p>
            </div>
          </div>

          {/* Form */}
          <LoginForm />
        </div>

        {/* Bottom subtle text */}
        <p className="text-center text-xs text-muted-foreground/50 mt-6">
          Secured with end-to-end encryption
        </p>
      </div>
    </main>
  )
}
