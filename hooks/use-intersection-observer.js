"use client"

import { useCallback, useEffect, useRef, useState } from "react"

export function useIntersectionObserver({ root = null, rootMargin = "0px", threshold = 0.2 } = {}) {
	const ref = useRef(null)
	const [isIntersecting, setIsIntersecting] = useState(false)

	const setNode = useCallback((node) => {
		ref.current = node
	}, [])

	useEffect(() => {
		const element = ref.current
		if (!element) return
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) setIsIntersecting(true)
				})
			},
			{ root, rootMargin, threshold }
		)
		observer.observe(element)
		return () => observer.disconnect()
	}, [root, rootMargin, threshold])

	return { setNode, isIntersecting }
}

