"use client"

import { useSearchParams } from "next/navigation"
import { AuthForm } from "@/components/custom/auth/auth-form"

export default function AuthPage() {
    const searchParams = useSearchParams()
    const mode = searchParams.get("mode") === "login" ? "login" : "signup"

    return (
        <div className="flex min-h-svh flex-col items-center justify-center bg-muted/30 p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-4xl">
                <AuthForm initialMode={mode} />
            </div>
        </div>
    )
}