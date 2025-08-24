"use client"

import { useEffect, useState } from "react"

export function useAnimatedCounter(target = 0, duration = 1500, isActive = true) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!isActive) return
    let raf
    let start
    const step = (ts) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      setValue(Math.floor(target * progress))
      if (progress < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target, duration, isActive])

  return value
}


