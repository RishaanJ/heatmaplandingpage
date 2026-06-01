"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { flushSync } from "react-dom"
import { cn } from "@/lib/utils"

type TransitionVariant = "circle" | "square" | "triangle" | "diamond" | "hexagon" | "rectangle" | "star"

interface AnimatedThemeTogglerProps extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number
  variant?: TransitionVariant
  fromCenter?: boolean
}

function polygonCollapsed(cx: number, cy: number, vertexCount: number): string {
  const pairs = Array.from({ length: vertexCount }, () => `${cx}px ${cy}px`).join(", ")
  return `polygon(${pairs})`
}

function getClipPaths(
  variant: TransitionVariant,
  cx: number, cy: number,
  maxRadius: number,
  vw: number, vh: number
): [string, string] {
  switch (variant) {
    case "circle":
      return [`circle(0px at ${cx}px ${cy}px)`, `circle(${maxRadius}px at ${cx}px ${cy}px)`]
    case "square": {
      const h = Math.max(cx, vw - cx), v = Math.max(cy, vh - cy)
      const s = Math.max(h, v) * 1.05
      const end = [`${cx-s}px ${cy-s}px`,`${cx+s}px ${cy-s}px`,`${cx+s}px ${cy+s}px`,`${cx-s}px ${cy+s}px`].join(", ")
      return [polygonCollapsed(cx, cy, 4), `polygon(${end})`]
    }
    case "diamond": {
      const R = maxRadius * Math.SQRT2
      const end = [`${cx}px ${cy-R}px`,`${cx+R}px ${cy}px`,`${cx}px ${cy+R}px`,`${cx-R}px ${cy}px`].join(", ")
      return [polygonCollapsed(cx, cy, 4), `polygon(${end})`]
    }
    default:
      return [`circle(0px at ${cx}px ${cy}px)`, `circle(${maxRadius}px at ${cx}px ${cy}px)`]
  }
}

export const AnimatedThemeToggler = ({
  className,
  duration = 500,
  variant = "circle",
  fromCenter = false,
  ...props
}: AnimatedThemeTogglerProps) => {
  const [isDark, setIsDark] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const update = () => setIsDark(document.documentElement.classList.contains("dark"))
    update()
    const obs = new MutationObserver(update)
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    return () => obs.disconnect()
  }, [])

  const toggleTheme = useCallback(() => {
    const button = buttonRef.current
    if (!button) return

    const vw = window.visualViewport?.width ?? window.innerWidth
    const vh = window.visualViewport?.height ?? window.innerHeight
    let x: number, y: number
    if (fromCenter) { x = vw / 2; y = vh / 2 }
    else {
      const r = button.getBoundingClientRect()
      x = r.left + r.width / 2
      y = r.top + r.height / 2
    }
    const maxRadius = Math.hypot(Math.max(x, vw - x), Math.max(y, vh - y))

    const applyTheme = () => {
      const newDark = !isDark
      setIsDark(newDark)
      document.documentElement.classList.toggle("dark")
      localStorage.setItem("theme", newDark ? "dark" : "light")
    }

    if (typeof document.startViewTransition !== "function") { applyTheme(); return }

    const clipPath = getClipPaths(variant, x, y, maxRadius, vw, vh)
    const root = document.documentElement
    root.dataset.magicuiThemeVt = "active"
    root.style.setProperty("--magicui-theme-toggle-vt-duration", `${duration}ms`)
    root.style.setProperty("--magicui-theme-vt-clip-from", clipPath[0])
    const cleanup = () => {
      delete root.dataset.magicuiThemeVt
      root.style.removeProperty("--magicui-theme-toggle-vt-duration")
      root.style.removeProperty("--magicui-theme-vt-clip-from")
    }

    const transition = document.startViewTransition(() => { flushSync(applyTheme) })
    transition?.finished?.finally?.(cleanup)
    transition?.ready?.then(() => {
      document.documentElement.animate({ clipPath }, {
        duration,
        easing: "ease-in-out",
        fill: "forwards",
        pseudoElement: "::view-transition-new(root)",
      })
    })
  }, [variant, fromCenter, duration, isDark])

  return (
    <button
      type="button"
      ref={buttonRef}
      onClick={toggleTheme}
      className={cn(
        "w-8 h-8 flex items-center justify-center rounded-lg",
        "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white",
        "hover:bg-neutral-100 dark:hover:bg-white/[0.07]",
        "transition-colors duration-150",
        className
      )}
      {...props}
    >
      {isDark ? <Sun size={15} /> : <Moon size={15} />}
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
