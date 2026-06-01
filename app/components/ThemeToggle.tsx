"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { flushSync } from "react-dom"

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => setMounted(true), [])

  const isDark = mounted ? resolvedTheme === "dark" : false

  const toggle = useCallback(() => {
    const button = buttonRef.current
    if (!button) return

    const nextTheme = isDark ? "light" : "dark"
    const vw = window.visualViewport?.width ?? window.innerWidth
    const vh = window.visualViewport?.height ?? window.innerHeight
    const { top, left, width, height } = button.getBoundingClientRect()
    const cx = left + width / 2
    const cy = top + height / 2
    const maxRadius = Math.hypot(Math.max(cx, vw - cx), Math.max(cy, vh - cy))

    const applyTheme = () => setTheme(nextTheme)

    if (typeof document.startViewTransition !== "function") {
      applyTheme()
      return
    }

    const clipFrom = `circle(0px at ${cx}px ${cy}px)`
    const clipTo = `circle(${maxRadius}px at ${cx}px ${cy}px)`

    const root = document.documentElement
    root.style.setProperty("--magicui-theme-vt-clip-from", clipFrom)

    const transition = document.startViewTransition(() => {
      flushSync(applyTheme)
    })

    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [clipFrom, clipTo] },
        {
          duration: 500,
          easing: "ease-in-out",
          fill: "forwards",
          pseudoElement: "::view-transition-new(root)",
        }
      )
    })

    transition.finished.finally(() => {
      root.style.removeProperty("--magicui-theme-vt-clip-from")
    })
  }, [isDark, setTheme])

  if (!mounted) return <div className="w-8 h-8" />

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={toggle}
      aria-label="Toggle theme"
      className="w-8 h-8 flex items-center justify-center rounded-lg text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/[0.07] transition-colors duration-150"
    >
      {isDark ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  )
}
