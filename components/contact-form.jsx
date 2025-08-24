"use client"

import { useCallback, useMemo, useState } from "react"

export default function ContactForm() {
	const [email, setEmail] = useState("")
	const [message, setMessage] = useState("")
	const [touched, setTouched] = useState({ email: false, message: false })
	const [submitted, setSubmitted] = useState(false)

	const emailValid = useMemo(() => /.+@.+\..+/.test(email), [email])
	const messageValid = useMemo(() => message.trim().length >= 10, [message])
	const canSubmit = emailValid && messageValid

	const onSubmit = useCallback((e) => {
		e.preventDefault()
		setTouched({ email: true, message: true })
		if (!canSubmit) return
		setSubmitted(true)
		setTimeout(() => {
			setEmail("")
			setMessage("")
			setSubmitted(false)
		}, 1000)
	}, [canSubmit])

	return (
		<form onSubmit={onSubmit} className="space-y-4">
			<input
				type="email"
				placeholder="you@domain.com"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				onBlur={() => setTouched((t) => ({ ...t, email: true }))}
				className={`w-full rounded-xl bg-white/5 border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${touched.email && !emailValid ? "border-red-500/50" : "border-white/10"}`}
			/>
			{touched.email && !emailValid && <p className="text-red-400 text-sm">Enter a valid email.</p>}
			<textarea
				placeholder="Tell us about your project"
				rows={4}
				value={message}
				onChange={(e) => setMessage(e.target.value)}
				onBlur={() => setTouched((t) => ({ ...t, message: true }))}
				className={`w-full rounded-xl bg-white/5 border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${touched.message && !messageValid ? "border-red-500/50" : "border-white/10"}`}
			/>
			{touched.message && !messageValid && <p className="text-red-400 text-sm">Minimum 10 characters.</p>}
			<button
				type="submit"
				disabled={!canSubmit || submitted}
				className={`interactive w-full rounded-full px-6 py-3 transition-transform ${canSubmit ? "bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 hover:scale-105 " : "bg-white/10 text-white/60"}`}
			>
				{submitted ? "Sending..." : "Unleash Power"}
			</button>
		</form>
	)
}

