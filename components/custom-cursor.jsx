"use client"

import { useEffect, useMemo, useRef, useState, useCallback } from "react"

const isTouchDevice = () =>
	typeof window !== "undefined" &&
	(window.matchMedia?.("(pointer: coarse)").matches ||
	 "ontouchstart" in window)

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

export default function CustomCursor({ hoverScale = 1.75 }) {
	const [isEnabled, setIsEnabled] = useState(false)
	const [position, setPosition] = useState({ x: 0, y: 0 })
	const [isHoveringInteractive, setIsHoveringInteractive] = useState(false)
	const rafRef = useRef(0)
	const targetRef = useRef({ x: 0, y: 0 })

	useEffect(() => {
		if (isTouchDevice()) {
			setIsEnabled(false)
			return
		}
		setIsEnabled(true)
	}, [])

	const onMouseMove = useCallback((e) => {
		// Smooth follow using lerp inside rAF
		targetRef.current = { x: e.clientX, y: e.clientY }
		if (!rafRef.current) {
			const step = () => {
				setPosition((prev) => {
					const dx = targetRef.current.x - prev.x
					const dy = targetRef.current.y - prev.y
					return { x: prev.x + dx * 0.2, y: prev.y + dy * 0.2 }
				})
				rafRef.current = requestAnimationFrame(step)
			}
			rafRef.current = requestAnimationFrame(step)
		}
	}, [])

	useEffect(() => {
		if (!isEnabled) return
		const hoverSelectors = 'a, button, [role="button"], .interactive, .card'
		const handleOver = (e) => {
			if (e.target.closest(hoverSelectors)) setIsHoveringInteractive(true)
		}
		const handleOut = (e) => {
			if (e.target.closest(hoverSelectors)) setIsHoveringInteractive(false)
		}
		window.addEventListener("mousemove", onMouseMove)
		document.addEventListener("mouseover", handleOver)
		document.addEventListener("mouseout", handleOut)
		return () => {
			window.removeEventListener("mousemove", onMouseMove)
			document.removeEventListener("mouseover", handleOver)
			document.removeEventListener("mouseout", handleOut)
			if (rafRef.current) cancelAnimationFrame(rafRef.current)
			rafRef.current = 0
		}
	}, [isEnabled, onMouseMove])

	const style = useMemo(() => {
		const scale = isHoveringInteractive ? hoverScale : 1
		return {
			transform: `translate3d(${clamp(position.x - 10, -9999, 9999)}px, ${clamp(
				position.y - 10,
				-9999,
				9999
			)}px, 0) scale(${scale})`,
		}
	}, [position, isHoveringInteractive, hoverScale])

	if (!isEnabled) return null

	return (
		<div
			className="fixed z-[60] w-5 h-5 bg-blue-500 rounded-full pointer-events-none mix-blend-screen opacity-70 transition-transform duration-150"
			style={style}
		/>
	)
}

