"use client"

import * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { 
  Mail01Icon, 
  Call02Icon, 
  Location01Icon,
  SentIcon
} from "@hugeicons/core-free-icons"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast.success("Message sent! We'll get back to you soon.")
    }, 1500)
  }

  return (
    <main className="min-h-screen bg-[#FBFBFD] pt-24 pb-32">
      <div className="mx-auto max-w-7xl px-4">
        
        {/* Header Section */}
        <div className="max-w-3xl mb-24">
          <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-7xl mb-8">
            Contact Us
          </h1>
          <p className="text-xl font-medium text-muted-foreground leading-relaxed">
            Reach out to Nirvana Today for expert assistance! Explore our range of hemp products dedicated to promoting your wellness and enhancing your lifestyle.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* Contact Information */}
          <div className="space-y-16">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">We would love to speak with you.</h2>
              <p className="text-lg text-muted-foreground">Feel free to reach out and we'll contact you as soon as possible!</p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="size-14 rounded-2xl bg-white border border-black/[0.03] shadow-xs flex items-center justify-center shrink-0 transition-all group-hover:scale-105 group-hover:shadow-md">
                   <HugeiconsIcon icon={Location01Icon} className="size-6 text-primary" strokeWidth={2} />
                </div>
                <div className="space-y-1 pt-1">
                  <p className="font-bold text-foreground">Nirvana Today</p>
                  <p className="text-muted-foreground">P.O. Box 792<br/>Oldsmar, FL 34677</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="size-14 rounded-2xl bg-white border border-black/[0.03] shadow-xs flex items-center justify-center shrink-0 transition-all group-hover:scale-105 group-hover:shadow-md">
                   <HugeiconsIcon icon={Mail01Icon} className="size-6 text-primary" strokeWidth={2} />
                </div>
                <div className="space-y-1 pt-3">
                  <a href="mailto:sales@nirvanatoday.com" className="text-xl font-bold text-foreground hover:text-primary transition-colors">
                    sales@nirvanatoday.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="size-14 rounded-2xl bg-white border border-black/[0.03] shadow-xs flex items-center justify-center shrink-0 transition-all group-hover:scale-105 group-hover:shadow-md">
                   <HugeiconsIcon icon={Call02Icon} className="size-6 text-primary" strokeWidth={2} />
                </div>
                <div className="space-y-1 pt-3">
                  <a href="tel:7274872195" className="text-xl font-bold text-foreground hover:text-primary transition-colors">
                    727 487-2195
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-[2.5rem] border border-black/[0.03] shadow-[0_20px_50px_rgba(0,0,0,0.04)] p-8 sm:p-12">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label htmlFor="first_name" className="text-sm font-bold uppercase tracking-widest text-muted-foreground">First Name</Label>
                  <Input id="first_name" placeholder="First Name" required className="h-14 rounded-2xl bg-zinc-50/50 border-zinc-200" />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="last_name" className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Last Name</Label>
                  <Input id="last_name" placeholder="Last Name" required className="h-14 rounded-2xl bg-zinc-50/50 border-zinc-200" />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="email" className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Email</Label>
                <Input id="email" type="email" placeholder="Email Address" required className="h-14 rounded-2xl bg-zinc-50/50 border-zinc-200" />
              </div>

              <div className="space-y-3">
                <Label htmlFor="subject" className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Subject</Label>
                <Input id="subject" placeholder="Subject" required className="h-14 rounded-2xl bg-zinc-50/50 border-zinc-200" />
              </div>

              <div className="space-y-3">
                <Label htmlFor="message" className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Your Message</Label>
                <textarea 
                  id="message" 
                  placeholder="Your Message" 
                  required 
                  className="w-full min-h-[150px] rounded-2xl border border-zinc-200 bg-zinc-50/50 p-6 outline-none focus:ring-3 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium resize-none"
                />
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full h-16 rounded-full text-base font-bold shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Sending...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    Send Message
                    <HugeiconsIcon icon={SentIcon} className="size-5" />
                  </div>
                )}
              </Button>
            </form>
          </div>

        </div>
      </div>
    </main>
  )
}
