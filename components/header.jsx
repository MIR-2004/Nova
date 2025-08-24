"use client"

import { SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { Button } from './ui/button'
import { useStoreUser } from '@/hooks/use-store-user'
import { BarLoader } from 'react-spinners'
import { Authenticated, Unauthenticated } from 'convex/react'
import { LayoutDashboard } from 'lucide-react'


const Header = () => {

  const path = usePathname();
  const { isLoading } = useStoreUser();

  const [active, setActive] = useState("home")
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = ["home", "features", "pricing", "contact"]
    const observers = sections.map((id) => {
      const el = document.getElementById(id)
      if (!el) return null
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id)
        },
        { root: null, threshold: 0.4 }
      )
      observer.observe(el)
      return observer
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [])

  const onNavClick = useCallback((id) => (e) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  if (path.includes("/editor")) {
    return null;
  }

  return (
    <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 text-nowrap w-full px-4">
      {/* Glow behind */}
      <div className="absolute inset-x-0 -top-4 mx-auto max-w-[900px] h-24 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl rounded-full pointer-events-none -z-10" />

      {/* Gradient frame + Glass container */}
      <div className={`mx-auto max-w-[900px] p-[1px] rounded-full transition-all duration-300 ${isScrolled ? 'bg-gradient-to-r from-blue-500/40 via-purple-500/40 to-cyan-500/40 shadow-2xl shadow-cyan-500/10' : 'bg-white/10'}`}>
        <div className={`backdrop-blur-xl rounded-full flex items-center justify-between gap-4 md:gap-8 transition-all duration-300 border ${isScrolled ? 'bg-black/30 border-white/20 px-6 py-2' : 'bg-white/10 border-white/20 px-8 py-3'}`}>
        {/* Logo */}
        <Link href="/" className="mr-10 md:mr-20">
          <h1 className='text-5xl font-bold font-sans bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-in'>nova</h1>
        </Link>

        {path === "/" && (
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="#features"
              onClick={onNavClick('features')}
              className={`interactive px-4 py-2 rounded-full font-medium transition-all duration-300 cursor-pointer ${active === 'features' ? 'text-cyan-300 bg-white/10' : 'text-white hover:text-cyan-300 hover:bg-white/10'}`}
            >
              Features
            </Link>
            <Link
              href="#pricing"
              onClick={onNavClick('pricing')}
              className={`interactive px-4 py-2 rounded-full font-medium transition-all duration-300 cursor-pointer ${active === 'pricing' ? 'text-cyan-300 bg-white/10' : 'text-white hover:text-cyan-300 hover:bg-white/10'}`}
            >
              Pricing
            </Link>
            <Link
              href="#contact"
              onClick={onNavClick('contact')}
              className={`interactive px-4 py-2 rounded-full font-medium transition-all duration-300 cursor-pointer ${active === 'contact' ? 'text-cyan-300 bg-white/10' : 'text-white hover:text-cyan-300 hover:bg-white/10'}`}
            >
              Contact
            </Link>
          </div>
        )}

        <div className='flex items-center gap-3 ml-10 md:ml-20'>
          <Unauthenticated>
            <SignInButton>
              <Button variant="glassGlow" className="interactive">
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton>
              <Button variant="hyper" className="interactive">Get Started</Button>
            </SignUpButton>
          </Unauthenticated>
          <Authenticated>

            <Link href="/dashboard">
              <Button variant="glassGlow" className="interactive hidden sm:flex">
                <LayoutDashboard className="h-4 w-4"/>
                <span className='hidden md:flex'>Dashboard</span>
              </Button>
            </Link>


            <UserButton appearance={{
              elements: {
                avatarBox: "w-8 h-8"
              }
            }} />
          </Authenticated>
        </div>

        </div>
      </div>
    </header>
  );
}


export default Header