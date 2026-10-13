import { useEffect, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { MagneticButton, WHATSAPP_URL } from './ui'

const LINKS = [
  { href: '#service', label: 'Service' },
  { href: '#methode', label: 'Méthode' },
  { href: '#tarifs', label: 'Tarifs' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  // Transparente sur le hero, puis verre dépoli une fois le hero dépassé
  useEffect(() => {
    const hero = document.getElementById('hero')
    if (!hero) return
    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting), {
      rootMargin: '-88px 0px 0px 0px',
    })
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav
        className={`flex w-full max-w-3xl items-center justify-between gap-6 rounded-full border py-2 pl-6 pr-2 transition-all duration-500 ease-magnetic ${
          scrolled
            ? 'border-moss/10 bg-cream/60 text-moss shadow-[0_10px_40px_-15px_rgba(26,26,26,0.25)] backdrop-blur-xl'
            : 'border-transparent bg-transparent text-cream'
        }`}
      >
        <a href="#hero" className="lift font-display text-lg font-bold tracking-tighter">
          Livr<span className="text-clay">Express</span>
        </a>

        <ul className="hidden items-center gap-7 text-sm font-medium md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="lift opacity-75 hover:opacity-100">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <MagneticButton href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="px-5 py-3">
          Commander
          <ArrowUpRight size={16} strokeWidth={2.2} />
        </MagneticButton>
      </nav>
    </header>
  )
}
