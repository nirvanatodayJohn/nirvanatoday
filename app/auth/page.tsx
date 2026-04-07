"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { AuthForm } from "@/components/custom/auth/auth-form"

function AuthPageContent() {
  const searchParams = useSearchParams()
  const mode = searchParams.get("mode") === "login" ? "login" : "signup"

  return <AuthForm initialMode={mode} />
}

function AuthFallback() {
  return (
    <div className="w-full max-w-sm md:max-w-4xl">
      <div className="min-h-115 rounded-3xl border border-border/50 bg-background/90" />
    </div>
  )
}

export default function AuthPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted/30 p-6 md:p-10">
      <Suspense fallback={<AuthFallback />}>
        <div className="w-full max-w-sm md:max-w-4xl">
          <AuthPageContent />
        </div>
      </Suspense>
    </div>
  )
}