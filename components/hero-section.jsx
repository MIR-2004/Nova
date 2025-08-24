"use client"

import { motion } from "framer-motion"
import { useEffect, useMemo, useRef, useState } from "react"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { useMousePosition } from "@/hooks/use-mouse-position"

function useGlitchText(text) {
	const [glitch, setGlitch] = useState(text)
	useEffect(() => {
		let frame = 0
		const chars = "█▓▒░/\\|<>-_=+*#"
		const id = setInterval(() => {
			frame += 1
			if (frame > 10) {
				setGlitch(text)
				clearInterval(id)
				return
			}
			const scrambled = text
				.split("")
				.map((c, i) => (Math.random() < 0.2 ? chars[Math.floor(Math.random() * chars.length)] : c))
				.join("")
			setGlitch(scrambled)
		}, 60)
		return () => clearInterval(id)
	}, [text])
	return glitch
}

export default function HeroSection() {
	const { setNode, isIntersecting } = useIntersectionObserver({ threshold: 0.2 })
	const glitchTitle = useGlitchText("The Future of Image Creation")
	const glitchSubtitle = useGlitchText("Design at quantum speed with AI.")
	const mouse = useMousePosition()

	const tilt = useMemo(() => {
		const centerX = typeof window !== "undefined" ? window.innerWidth / 2 : 0
		const centerY = typeof window !== "undefined" ? window.innerHeight / 2 : 0
		const dx = (mouse.x - centerX) / centerX
		const dy = (mouse.y - centerY) / centerY
		return { rotateX: dy * -6, rotateY: dx * 6 }
	}, [mouse.x, mouse.y])

	return (
		<section id="home" ref={setNode} className="relative pt-20 h-screen flex items-center justify-center text-white overflow-hidden">
			<div className="absolute inset-0 -z-10">
				<div className="absolute -top-24 -left-24 w-[40rem] h-[40rem] bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full blur-3xl opacity-20 animate-pulse" />
				<div className="absolute -bottom-24 -right-24 w-[40rem] h-[40rem] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full blur-3xl opacity-20 animate-pulse" />
			</div>

			<motion.div
				initial={{ opacity: 0, y: 40 }}
				animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
				transition={{ duration: 0.8, ease: "easeOut" }}
				className="text-center px-6"
			>
				<h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
					<span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
						{glitchTitle}
					</span>
				</h1>
				<p className="mt-6 text-lg md:text-2xl text-white/80 max-w-3xl mx-auto">
					{glitchSubtitle}
				</p>

				<div className="mt-10 flex items-center justify-center gap-4">
					<button 
						onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
						className="interactive inline-flex items-center cursor-pointer justify-center rounded-full bg-white/10 border border-white/20 backdrop-blur-lg hover:scale-105 hover:shadow-2xl transition-transform px-6 py-3 text-white"
					>
						Experience the Magic
					</button>
					<button 
						onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
						className="interactive inline-flex cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 hover:scale-105 hover:shadow-2xl transition-transform px-6 py-3 text-white"
					>
						Explore Features
					</button>
				</div>

				<motion.div
					initial={{ opacity: 0, scale: 0.95 }}
					animate={isIntersecting ? { opacity: 1, scale: 1 } : {}}
					transition={{ delay: 0.3, duration: 0.8 }}
					className="mt-16"
					style={{ perspective: 1000 }}
				>
					<motion.div
						style={{ transformStyle: "preserve-3d" }}
						animate={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY }}
						transition={{ type: "spring", stiffness: 120, damping: 20 }}
						className="relative mx-auto w-[90vw] max-w-4xl h-72 md:h-96 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg overflow-hidden"
					>
						<motion.div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10" animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 4, repeat: Infinity }} />
						<div className="absolute inset-0 grid grid-cols-3 gap-2 p-4">
							<div className="rounded-lg bg-white/5 border border-white/10"/>
							<div className="rounded-lg bg-white/5 border border-white/10" />
							<div className="rounded-lg bg-white/5 border border-white/10" />
							<div className="col-span-2 rounded-lg bg-white/5 border border-white/10" />
							<div className="rounded-lg bg-white/5 border border-white/10" />
							<div className="rounded-lg bg-white/5 border border-white/10" />
							<div className="col-span-3 rounded-lg bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 border border-white/10 h-16 md:h-24" />
						</div>
					</motion.div>
				</motion.div>
			</motion.div>
		</section>
	)
}

