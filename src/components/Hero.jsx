import { useEffect, useRef } from 'react'
import { ArrowUpRight, ArrowDown } from 'lucide-react'
import { gsap } from '../lib/gsap'
import { MagneticButton, WHATSAPP_URL } from './ui'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?auto=format&fit=crop&w=2400&q=80'

const STATS = [
  { value: '15 000+', label: 'Courses livrées' },
  { value: '38 min', label: 'Délai moyen' },
  { value: '7j/7', label: '7h — 23h' },
]

export default function Hero() {
  const root = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-hero-bg]', { scale: 1.15, duration: 2.6, ease: 'power3.out' })
      gsap.from('[data-hero]', {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        stagger: 0.08,
        delay: 0.2,
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      ref={root}
      className="relative flex h-[100dvh] min-h-[620px] items-end overflow-hidden bg-charcoal"
    >
      <img
        data-hero-bg
        src={HERO_IMAGE}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-moss/85 to-moss/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/60 to-transparent" />

      <div className="relative z-10 w-full px-6 pb-14 md:px-12 md:pb-20 lg:px-20">
        <p
          data-hero
          className="eyebrow mb-7 inline-flex items-center gap-2.5 rounded-full border border-cream/15 bg-cream/5 px-4 py-2 text-cream/80 backdrop-blur-md"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-clay" />
          Dakar · 14.69° N<span className="hidden sm:inline"> — Livraison 7j/7</span>
        </p>

        <h1 className="max-w-5xl text-cream">
          <span data-hero className="block font-display text-2xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            LivrExpress est le
          </span>
          <span
            data-hero
            className="-ml-1 block font-serif text-[4.5rem] font-medium italic leading-[0.9] tracking-tight sm:text-[7.5rem] md:text-[10rem] lg:text-[12rem]"
          >
            Raccourci.
          </span>
        </h1>

        <div className="mt-8 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p data-hero className="text-base leading-relaxed text-cream/75 md:text-lg">
              Colis, documents et repas livrés en moins de 60 minutes, du Plateau aux Almadies. Suivi en
              direct, paiement Wave ou Orange Money à la remise.
            </p>
            <div data-hero className="mt-8 flex flex-wrap items-center gap-3">
              <MagneticButton href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                Commander une livraison
                <ArrowUpRight size={18} strokeWidth={2.2} />
              </MagneticButton>
              <MagneticButton href="#methode" variant="ghost">
                Voir la méthode
                <ArrowDown size={16} strokeWidth={2.2} />
              </MagneticButton>
            </div>
          </div>

          <dl data-hero className="grid grid-cols-3 gap-6 border-t border-cream/15 pt-6 lg:min-w-[420px]">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse gap-1">
                <dt className="eyebrow text-[10px] text-cream/50 sm:text-[11px]">{stat.label}</dt>
                <dd className="font-display text-2xl font-semibold tracking-tight text-cream md:text-3xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
