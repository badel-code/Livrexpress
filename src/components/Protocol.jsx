import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'

/* ---------- Visuel 1 : cercles concentriques en rotation ---------- */
function Orbit() {
  const rings = [
    { r: 150, dash: '2 10', width: 1.5 },
    { r: 118, dash: '40 14', width: 2 },
    { r: 86, dash: '4 6', width: 1.5 },
    { r: 54, dash: '70 20', width: 2.5 },
  ]
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden="true">
      {rings.map((ring, i) => (
        <g key={ring.r} data-orbit-ring>
          <circle
            cx="200"
            cy="200"
            r={ring.r}
            fill="none"
            stroke={i % 2 ? '#CC5833' : '#2E4036'}
            strokeOpacity={i % 2 ? 0.9 : 0.55}
            strokeWidth={ring.width}
            strokeDasharray={ring.dash}
            strokeLinecap="round"
          />
          <circle cx={200 + ring.r} cy="200" r={i % 2 ? 5 : 3.5} fill={i % 2 ? '#CC5833' : '#2E4036'} />
        </g>
      ))}
      <circle cx="200" cy="200" r="16" fill="#CC5833" />
      <circle cx="200" cy="200" r="28" fill="none" stroke="#CC5833" strokeOpacity="0.3" />
    </svg>
  )
}

/* ---------- Visuel 2 : laser de balayage sur grille de points ---------- */
const COLS = 16
const ROWS = 11
const DOTS = Array.from({ length: COLS * ROWS }, (_, i) => ({
  cx: 20 + (i % COLS) * 24,
  cy: 30 + Math.floor(i / COLS) * 24,
}))

function Scanner() {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="laser-trail" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#CC5833" stopOpacity="0" />
          <stop offset="1" stopColor="#CC5833" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      {DOTS.map((dot, i) => (
        <circle key={i} data-scan-dot cx={dot.cx} cy={dot.cy} r="2.6" fill="#F2F0E9" fillOpacity="0.2" />
      ))}
      <g data-laser>
        <rect x="0" y="-40" width="400" height="40" fill="url(#laser-trail)" />
        <rect x="0" y="-1.5" width="400" height="3" rx="1.5" fill="#CC5833" />
      </g>
    </svg>
  )
}

/* ---------- Visuel 3 : forme d'onde ECG ---------- */
function buildEcgPath() {
  const beat = (x) =>
    `L${x + 40} 150 L${x + 52} 138 L${x + 64} 150 L${x + 80} 150 L${x + 88} 166 L${x + 100} 50 L${x + 112} 232 L${x + 122} 150 L${x + 146} 150 L${x + 164} 128 L${x + 184} 150 L${x + 200} 150`
  return `M0 150 ${beat(0)} ${beat(200)}`
}
const ECG_PATH = buildEcgPath()

function Pulse() {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" aria-hidden="true">
      {[60, 110, 150, 190, 240].map((y) => (
        <line key={y} x1="0" x2="400" y1={y} y2={y} stroke="#F2F0E9" strokeOpacity="0.06" />
      ))}
      <path d={ECG_PATH} fill="none" stroke="#F2F0E9" strokeOpacity="0.1" strokeWidth="2" />
      <path
        data-ecg
        d={ECG_PATH}
        fill="none"
        stroke="#CC5833"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/* ---------- Section ---------- */

const STEPS = [
  {
    n: '01',
    title: 'Vous commandez.',
    desc: 'Une adresse de retrait, une adresse de livraison. Par WhatsApp, téléphone ou en ligne, en 30 secondes.',
    Visual: Orbit,
    theme: 'bg-cream text-moss border border-moss/10',
    sub: 'text-moss/65',
  },
  {
    n: '02',
    title: 'Nous récupérons.',
    desc: 'Notre système assigne le livreur le plus proche. Il est chez vous en moins de 15 minutes.',
    Visual: Scanner,
    theme: 'bg-moss text-cream',
    sub: 'text-cream/65',
  },
  {
    n: '03',
    title: 'C’est livré.',
    desc: 'Suivi en direct jusqu’à la porte. Paiement à la remise et confirmation instantanée.',
    Visual: Pulse,
    theme: 'bg-charcoal text-cream',
    sub: 'text-cream/60',
  },
]

export default function Protocol() {
  const root = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('[data-stack-card]')
      const last = cards[cards.length - 1]

      // Empilement : chaque carte est épinglée, la suivante glisse par-dessus
      cards.forEach((card, i) => {
        if (card === last) return
        ScrollTrigger.create({
          trigger: card,
          start: 'top top',
          endTrigger: last,
          end: 'top top',
          pin: true,
          pinSpacing: false,
        })
        gsap.to(card.querySelector('[data-stack-inner]'), {
          scale: 0.9,
          filter: 'blur(20px)',
          opacity: 0.5,
          ease: 'none',
          scrollTrigger: { trigger: cards[i + 1], start: 'top bottom', end: 'top top', scrub: true },
        })
      })

      // Visuel 1 : rotation lente, sens alterné
      gsap.utils.toArray('[data-orbit-ring]').forEach((ring, i) => {
        gsap.to(ring, {
          rotation: i % 2 ? -360 : 360,
          svgOrigin: '200 200',
          duration: 24 + i * 10,
          ease: 'none',
          repeat: -1,
        })
      })

      // Visuel 2 : balayage laser, les points s'allument au passage
      const laser = root.current.querySelector('[data-laser]')
      const dots = gsap.utils.toArray('[data-scan-dot]')
      gsap.fromTo(
        laser,
        { y: 20 },
        {
          y: 280,
          duration: 2.8,
          ease: 'power2.inOut',
          repeat: -1,
          yoyo: true,
          onUpdate() {
            const y = gsap.getProperty(laser, 'y')
            dots.forEach((dot) => {
              const near = Math.abs(dot.cy.baseVal.value - y) < 14
              dot.setAttribute('fill', near ? '#CC5833' : '#F2F0E9')
              dot.setAttribute('fill-opacity', near ? '1' : '0.2')
            })
          },
        },
      )

      // Visuel 3 : tracé ECG
      const ecg = root.current.querySelector('[data-ecg]')
      const length = ecg.getTotalLength()
      gsap.fromTo(
        ecg,
        { strokeDasharray: length, strokeDashoffset: length },
        { strokeDashoffset: -length, duration: 3.2, ease: 'none', repeat: -1 },
      )
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section id="methode" ref={root} className="relative bg-cream">
      <div className="mx-auto max-w-7xl px-6 pb-10 pt-28 md:px-12 md:pt-40">
        <span className="eyebrow mb-5 block text-clay">02 — La méthode</span>
        <h2 className="text-moss">
          <span className="block font-display text-4xl font-bold tracking-tighter md:text-6xl">Trois étapes.</span>
          <span className="block font-serif text-5xl italic tracking-tight md:text-7xl">Zéro friction.</span>
        </h2>
      </div>

      {STEPS.map(({ n, title, desc, Visual, theme, sub }, i) => (
        <div
          key={n}
          data-stack-card
          className="flex h-[100dvh] items-center justify-center px-4 py-6 md:px-8 md:py-10"
          style={{ zIndex: i + 1, position: 'relative' }}
        >
          <div
            data-stack-inner
            className={`grid h-full w-full max-w-6xl grid-cols-1 grid-rows-[minmax(0,1fr)_auto] gap-6 overflow-hidden rounded-[3rem] p-8 shadow-[0_40px_80px_-40px_rgba(26,26,26,0.5)] md:grid-cols-2 md:grid-rows-1 md:items-center md:p-14 ${theme}`}
          >
            <div className="order-2 md:order-1">
              <span className="eyebrow block opacity-60">Étape {n} / 03</span>
              <h3 className="mt-4 font-display text-4xl font-bold tracking-tighter md:text-6xl lg:text-7xl">
                {title}
              </h3>
              <p className={`mt-5 max-w-md text-base leading-relaxed md:text-lg ${sub}`}>{desc}</p>
            </div>
            <div className="order-1 flex min-h-0 min-w-0 items-center justify-center md:order-2 md:h-full">
              <div className="h-full max-h-[440px] w-full max-w-[440px]">
                <Visual />
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}
