"use client"

import { useCallback, useEffect, useRef, useState } from "react"

export function useMousePosition({ disabled } = {}) {
	const [position, setPosition] = useState({ x: 0, y: 0 })
	const rafRef = useRef(0)
	const targetRef = useRef({ x: 0, y: 0 })

	const onMove = useCallback((e) => {
		targetRef.current = { x: e.clientX, y: e.clientY }
		if (!rafRef.current) {
			const step = () => {
				setPosition((prev) => ({
					x: prev.x + (targetRef.current.x - prev.x) * 0.2,
					y: prev.y + (targetRef.current.y - prev.y) * 0.2,
				}))
				rafRef.current = requestAnimationFrame(step)
			}
			rafRef.current = requestAnimationFrame(step)
		}
	}, [])

	useEffect(() => {
		if (disabled) return
		window.addEventListener("mousemove", onMove)
		return () => {
			window.removeEventListener("mousemove", onMove)
			if (rafRef.current) cancelAnimationFrame(rafRef.current)
			rafRef.current = 0
		}
	}, [disabled, onMove])

	return position
}

