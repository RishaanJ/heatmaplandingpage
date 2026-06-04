"use client"

import { useState } from "react"
import { Play, X } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { cn } from "@/lib/utils"

interface HeroVideoDialogProps {
  videoSrc: string
  className?: string
}

export function HeroVideoDialog({ videoSrc, className }: HeroVideoDialogProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* ── Inline preview: muted autoplay loop ── */}
      <div className={cn("relative group cursor-pointer", className)} onClick={() => setOpen(true)}>
        <video
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          className="w-full rounded-2xl"
          aria-label="Product demo preview"
        />

        {/* Play overlay — fades in on hover */}
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/0 group-hover:bg-black/30 transition-all duration-200">
          <div className="opacity-0 group-hover:opacity-100 transition-all duration-200 scale-90 group-hover:scale-100">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/15 backdrop-blur-md border border-white/20 shadow-xl">
              <Play className="w-6 h-6 fill-white text-white ml-0.5" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Fullscreen dialog ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xl p-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="relative w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setOpen(false)}
                className="absolute -top-12 right-0 flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-colors duration-150"
                aria-label="Close video"
              >
                <X size={16} />
              </button>

              <video
                src={videoSrc}
                controls
                autoPlay
                className="w-full rounded-2xl border border-white/10 shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
