"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { loginAction, registerAction } from "@/lib/actions/auth"
import Link from "next/link"
import { ViewIcon, ViewOffIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export function AuthForm({
  initialMode = "signup",
  className,
  ...props
}: { initialMode?: "login" | "signup" } & React.ComponentProps<"div">) {
  const [isLogin, setIsLogin] = useState(initialMode === "login")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [ageConfirmed, setAgeConfirmed] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(event.currentTarget)

    if (!isLogin) {
      const password = formData.get("password") as string
      const confirmPassword = formData.get("confirm-password") as string
      if (password !== confirmPassword) {
        setError("Passwords do not match.")
        setLoading(false)
        return
      }
    }

    const action = isLogin ? loginAction : registerAction
    const result = await action(formData)

    if (result?.error) {
      setError(result.error)
      setLoading(false)
    } else {
      router.push("/account")
      router.refresh()
    }
  }

  // Effect to handle "No" click - redirect or block
  function handleAgeDenied() {
    router.push("/") // Redirect back to home if they are too young
  }

  return (
    <div className={cn("flex flex-col gap-4 relative", className)} {...props}>
      {/* Age Verification Overlay */}
      {!ageConfirmed && (
        <AlertDialog open={!ageConfirmed}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Age Verification</AlertDialogTitle>
              <AlertDialogDescription className="text-base">
                Are you 21 or older? You must be of legal age to view this content and purchase our products.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-2">
              <AlertDialogCancel onClick={handleAgeDenied}>No, I am under 21</AlertDialogCancel>
              <AlertDialogAction onClick={() => setAgeConfirmed(true)}>Yes, I am 21+</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      <div>
        <Card className="overflow-hidden p-0 shadow-xl">
          <CardContent className="grid p-0 md:grid-cols-2">
            <form className="p-8" onSubmit={handleSubmit}>
              <FieldGroup>
                <div className="flex flex-col items-center gap-2 text-center mb-6">
                  <h1 className="text-3xl font-bold tracking-tight">
                    {isLogin ? "Welcome back" : "Join Nirvana Today"}
                  </h1>
                  <p className="text-sm text-balance text-muted-foreground">
                    {isLogin
                      ? "Enter your credentials to access your account"
                      : "Create an account to start your journey"}
                  </p>
                </div>

                {error && (
                  <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-xl border border-destructive/20 animate-in fade-in zoom-in duration-300">
                    {error}
                  </div>
                )}

                {!isLogin && (
                  <div className="grid grid-cols-2 gap-4">
                    <Field>
                      <FieldLabel htmlFor="firstName">First Name</FieldLabel>
                      <Input id="firstName" name="firstName" placeholder="Jane" required />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
                      <Input id="lastName" name="lastName" placeholder="Doe" required />
                    </Field>
                  </div>
                )}

                <Field>
                  <FieldLabel htmlFor="email">Email address</FieldLabel>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                  />
                </Field>

                <Field>
                  <div className="flex items-center justify-between">
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    {isLogin && (
                      <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                        Forgot?
                      </a>
                    )}
                  </div>
                  <div className="relative">
                    <Input 
                      id="password" 
                      name="password" 
                      type={showPassword ? "text" : "password"} 
                      required 
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      <HugeiconsIcon icon={showPassword ? ViewOffIcon : ViewIcon} className="size-4" />
                    </button>
                  </div>
                </Field>

                {!isLogin && (
                  <Field>
                    <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
                    <div className="relative">
                      <Input 
                        id="confirm-password" 
                        name="confirm-password" 
                        type={showPassword ? "text" : "password"} 
                        required 
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        <HugeiconsIcon icon={showPassword ? ViewOffIcon : ViewIcon} className="size-4" />
                      </button>
                    </div>
                  </Field>
                )}

                <Button type="submit" disabled={loading} className="w-full h-11 text-base font-semibold transition-all">
                  {loading ? "Please wait..." : (isLogin ? "Sign In" : "Create Account")}
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                  <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className="font-semibold text-primary underline underline-offset-4 hover:opacity-80 transition-opacity"
                  >
                    {isLogin ? "Sign up" : "Sign in"}
                  </button>
                </p>
              </FieldGroup>
            </form>

            <div className="relative hidden md:block overflow-hidden">
              <div className="absolute inset-0 z-10" />
              <img
                src="/Mesh.png"
                alt="Background"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute bottom-10 left-10 right-10 z-20 text-white">
                <blockquote className="space-y-2">
                  <p className="text-lg font-medium">
                    "The quality of products and the seamless shopping experience kept me coming back. Truly a premium brand."
                  </p>
                  <footer className="text-sm opacity-70">Sofia Davis</footer>
                </blockquote>
              </div>
            </div>
          </CardContent>
        </Card>
        <p className="px-4 text-center text-xs text-muted-foreground leading-relaxed mt-4">
          By clicking continue, you agree to our{" "}
          <Link href="/terms-conditions" className="underline underline-offset-4 hover:text-primary transition-colors">Terms of Service</Link>{" "}
          and{" "}
          <Link href="/privacy-policy" className="underline underline-offset-4 hover:text-primary transition-colors">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  )
}

