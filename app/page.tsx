import { LoginForm } from "@/components/login-form"
import { NightBackground } from "@/components/night-background"

export default function LoginPage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden">
      {/* Layered ambient glows for depth */}
      <div
        className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-[180px] opacity-[0.06]"
        style={{ background: "oklch(0.55 0.18 280)" }}
        aria-hidden="true"
      />
      <div
        className="absolute top-[60%] left-[30%] -translate-x-1/2 w-[400px] h-[400px] rounded-full blur-[160px] opacity-[0.04]"
        style={{ background: "oklch(0.50 0.14 250)" }}
        aria-hidden="true"
      />

      {/* Horizon line glow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[1px] opacity-[0.06]"
        style={{ background: "linear-gradient(90deg, transparent 10%, oklch(0.68 0.14 280) 50%, transparent 90%)" }}
        aria-hidden="true"
      />

      <NightBackground />

      <div className="relative z-10 w-full max-w-[380px] mx-6 flex flex-col items-center">
        {/* Moon icon branding */}
        <div className="relative mb-8">
          {/* Moon glow ring */}
          <div
            className="absolute inset-0 rounded-full blur-xl opacity-30 scale-[2.2]"
            style={{ background: "oklch(0.68 0.14 280)" }}
            aria-hidden="true"
          />
          <div className="relative size-14 rounded-full bg-background border border-border/80 flex items-center justify-center">
            {/* Custom moon SVG for stronger branding */}
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              className="text-primary"
              aria-hidden="true"
            >
              <path
                d="M21.752 15.002A9.718 9.718 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                fill="currentColor"
                opacity="0.15"
              />
              <path
                d="M21.752 15.002A9.718 9.718 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Brand copy */}
        <h1 className="text-[22px] font-semibold tracking-[-0.02em] text-foreground mb-2">
          NightBuilder
        </h1>
        <p className="text-[13px] text-muted-foreground/70 tracking-wide mb-14 text-center leading-relaxed max-w-[260px]">
          The quiet hours are yours. Sign in and build.
        </p>

        {/* Form */}
        <LoginForm />

        {/* Footer */}
        <div className="flex items-center gap-3 mt-14">
          <div className="h-[1px] w-8 bg-border/40" />
          <p className="text-[11px] text-muted-foreground/30 tracking-[0.08em] uppercase">
            Built for the night
          </p>
          <div className="h-[1px] w-8 bg-border/40" />
        </div>
      </div>
    </main>
  )
}
