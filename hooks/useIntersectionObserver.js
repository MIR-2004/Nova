"use client"

import { useEffect, useRef, useState } from "react"

export function useIntersectionObserver(options = {}) {
  const { root = null, rootMargin = "0px", threshold = 0.3 } = options
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { root, rootMargin, threshold }
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [root, rootMargin, threshold])

  return { ref, isVisible }
}


