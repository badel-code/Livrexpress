import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsap'
import { SplitWords } from './ui'

/* ---------- Carte 1 : Mélangeur diagnostique ---------- */

const ROUTES = [
  { id: 'a', zone: 'Zone 01', from: 'Plateau', to: 'Almadies', minutes: 38, km: '14,2' },
  { id: 'b', zone: 'Zone 02', from: 'Médina', to: 'Ouakam', minutes: 27, km: '8,6' },
  { id: 'c', zone: 'Zone 03', from: 'Parcelles', to: 'Mermoz', minutes: 44, km: '11,9' },
]

function Shuffler() {
  const [stack, setStack] = useState(ROUTES)

  useEffect(() => {
    const id = setInterval(() => {
      setStack((prev) => {
        const next = [...prev]
        next.unshift(next.pop())
        return next
      })
    }, 3000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative h-full w-full">
      {ROUTES.map((route) => {
        const pos = stack.findIndex((r) => r.id === route.id)
        return (
          <div
            key={route.id}
            className="absolute inset-x-5 top-1/2 rounded-[1.5rem] border border-moss/10 bg-cream p-5 shadow-[0_14px_30px_-12px_rgba(46,64,54,0.35)] transition-all duration-700 ease-elastic"
            style={{
              transform: `translateY(calc(-50% + ${pos * -16}px)) scale(${1 - pos * 0.06})`,
              zIndex: ROUTES.length - pos,
              opacity: 1 - pos * 0.28,
            }}
          >
            <div className="flex items-center justify-between">
              <span className="eyebrow text-moss/50">{route.zone}</span>
              <span className="eyebrow text-clay">{route.km} km</span>
            </div>
            <p className="mt-3 font-display text-lg font-semibold tracking-tight text-moss">
              {route.from} <span className="text-clay">→</span> {route.to}
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-moss/10">
                <div
                  className="h-full rounded-full bg-moss"
                  style={{ width: `${(route.minutes / 60) * 100}%` }}
                />
              </div>
              <span className="font-mono text-xs font-medium text-moss">{route.minutes} min</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ---------- Carte 2 : Machine à écrire télémétrie ---------- */

const FEED = [
  'Livreur #A12 assigné — Moussa D.',
  'Colis récupéré · Rue Mohamed V, Plateau',
  'Position 14.6928° N, 17.4467° O · Corniche',
  'Arrivée estimée dans 12 min',
  'Colis remis · confirmation envoyée',
]

const clock = () =>
  new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })

function Typewriter() {
  const [lines, setLines] = useState([])
  const [current, setCurrent] = useState('')

  useEffect(() => {
    let message = 0
    let char = 0
    let uid = 0
    let timer

    const tick = () => {
      const text = FEED[message]
      if (char <= text.length) {
        setCurrent(text.slice(0, char))
        char += 1
        timer = setTimeout(tick, 28 + Math.random() * 45)
      } else {
        const line = { id: uid++, time: clock(), text }
        setLines((prev) => [...prev, line].slice(-3))
        setCurrent('')
        char = 0
        message = (message + 1) % FEED.length
        timer = setTimeout(tick, 650)
      }
    }

    timer = setTimeout(tick, 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex h-full w-full flex-col rounded-[1.5rem] bg-charcoal p-5 font-mono text-[12px] leading-relaxed text-cream/85">
      <div className="mb-4 flex items-center justify-between border-b border-cream/10 pb-3">
        <span className="eyebrow flex items-center gap-2 text-cream/70">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-clay opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-clay" />
          </span>
          Flux en direct
        </span>
        <span className="text-[10px] text-cream/40">LX-2048</span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-end gap-1.5 overflow-hidden">
        {lines.map((line) => (
          <p key={line.id} className="truncate text-cream/45">
            <span className="text-cream/30">[{line.time}]</span> {line.text}
          </p>
        ))}
        <p className="min-h-[1.5em] break-words">
          <span className="text-clay">&gt;</span> {current}
          <span className="caret-blink ml-0.5 inline-block h-[1.05em] w-[0.55em] translate-y-[0.15em] rounded-[2px] bg-clay" />
        </p>
      </div>
    </div>
  )
}

/* ---------- Carte 3 : Planificateur protocole curseur ---------- */

const DAYS = ['L', 'M', 'M', 'J', 'V', 'S', 'D']
const DAY_NAMES = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
const SEQUENCE = [2, 4, 0] // Mercredi, Vendredi, Lundi

function Scheduler() {
  const root = useRef(null)

  useEffect(() => {
    let ctx
    let resizeTimer

    const build = () => {
      ctx?.revert()
      ctx = gsap.context(() => {
        const el = root.current
        const box = el.getBoundingClientRect()
        const cells = gsap.utils.toArray('[data-day]', el)
        const save = el.querySelector('[data-save]')
        const cursor = el.querySelector('[data-cursor]')
        const status = el.querySelector('[data-status]')

        // Position du bout de la flèche (3px, 2px dans le SVG) sur le centre de la cible
        const target = (node) => {
          const r = node.getBoundingClientRect()
          return { x: r.left - box.left + r.width / 2 - 3, y: r.top - box.top + r.height / 2 - 2 }
        }
        const rest = { x: box.width * 0.62, y: box.height * 0.58 }

        gsap.set(cursor, { ...rest, opacity: 0 })
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.4, defaults: { ease: 'power2.inOut' } })

        SEQUENCE.forEach((dayIndex) => {
          const cell = cells[dayIndex]
          const onCell = target(cell)
          const onSave = target(save)

          tl.set(cursor, rest)
            .call(() => {
              status.textContent = 'Choisir un jour'
              status.style.color = ''
            })
            .to(cursor, { opacity: 1, duration: 0.3 })
            .to(cursor, { x: onCell.x, y: onCell.y, duration: 0.9 })
            .to(cursor, { scale: 0.85, duration: 0.12, yoyo: true, repeat: 1 })
            .to(cell, { scale: 0.95, duration: 0.12, yoyo: true, repeat: 1 }, '<')
            .to(cell, { backgroundColor: '#CC5833', color: '#F2F0E9', duration: 0.25 }, '<')
            .call(() => {
              status.textContent = DAY_NAMES[dayIndex]
            })
            .to(cursor, { x: onSave.x, y: onSave.y, duration: 0.8 }, '+=0.35')
            .to(cursor, { scale: 0.85, duration: 0.12, yoyo: true, repeat: 1 })
            .to(save, { scale: 0.95, duration: 0.12, yoyo: true, repeat: 1 }, '<')
            .call(() => {
              status.textContent = `Enregistré · ${DAY_NAMES[dayIndex]}`
              status.style.color = '#CC5833'
            })
            .to(cursor, { opacity: 0, duration: 0.35 }, '+=0.25')
            .to(cell, { backgroundColor: 'rgba(46, 64, 54, 0.06)', color: '#2E4036', duration: 0.4 }, '+=0.6')
        })
      }, root)
    }

    build()
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(build, 200)
    }
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      clearTimeout(resizeTimer)
      ctx?.revert()
    }
  }, [])

  return (
    <div ref={root} className="relative flex h-full w-full flex-col justify-between p-5">
      <div className="flex items-center justify-between">
        <span className="eyebrow text-moss/50">Versement Wave</span>
        <span data-status className="eyebrow text-right text-moss transition-colors">
          Choisir un jour
        </span>
      </div>

      <div className="grid grid-cols-7 gap-1.5">
        {DAYS.map((day, i) => (
          <div
            key={i}
            data-day
            className="flex aspect-square items-center justify-center rounded-xl bg-moss/[0.06] font-mono text-xs font-medium text-moss"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between rounded-[1.25rem] border border-moss/10 px-4 py-3">
        <div>
          <p className="eyebrow text-moss/50">À reverser</p>
          <p className="font-display text-lg font-semibold tracking-tight text-moss">184 500 FCFA</p>
        </div>
        <span data-save className="rounded-full bg-moss px-4 py-2 text-xs font-semibold text-cream">
          Sauvegarder
        </span>
      </div>

      <svg
        data-cursor
        className="pointer-events-none absolute left-0 top-0 h-6 w-6 drop-shadow-md"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          d="M3 2v17l4.6-4.3 3.2 6.8 2.8-1.3-3.2-6.7H17L3 2z"
          fill="#1A1A1A"
          stroke="#F2F0E9"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

/* ---------- Section ---------- */

const CARDS = [
  {
    title: 'Moins de 60 minutes',
    desc: 'Partout à Dakar, un livreur part dans les 15 minutes et remet votre colis en moins d’une heure.',
    Artifact: Shuffler,
  },
  {
    title: 'Suivi GPS en temps réel',
    desc: 'Chaque étape de la course s’affiche en direct, du retrait jusqu’à la remise en main propre.',
    Artifact: Typewriter,
  },
  {
    title: 'Payez à la livraison',
    desc: 'Wave, Orange Money ou espèces. Vos encaissements reversés le jour de votre choix.',
    Artifact: Scheduler,
  },
]

export default function Features() {
  const root = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-features-word]', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: { trigger: root.current, start: 'top 75%' },
      })
      gsap.from('[data-feature]', {
        y: 60,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: { trigger: '[data-feature-grid]', start: 'top 80%' },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section id="service" ref={root} className="px-4 py-24 md:px-8 md:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-3xl text-moss">
            <span className="eyebrow mb-5 block text-clay">01 — Le service</span>
            <span className="block font-display text-4xl font-bold tracking-tighter md:text-6xl">
              <SplitWords text="Trois promesses," attr="data-features-word" />
            </span>
            <span className="block font-serif text-5xl italic tracking-tight md:text-7xl">
              <SplitWords text="tenues chaque jour." attr="data-features-word" />
            </span>
          </h2>
          <p className="max-w-sm text-moss/70">
            Pas de cartes marketing : voici ce que vivent nos clients à chaque course, en direct.
          </p>
        </div>

        <div data-feature-grid className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {CARDS.map(({ title, desc, Artifact }, i) => (
            <article
              key={title}
              data-feature
              className="flex flex-col rounded-[2rem] border border-moss/10 bg-cream p-3 shadow-[0_30px_60px_-30px_rgba(46,64,54,0.45)]"
            >
              <div className="relative h-72 overflow-hidden rounded-[1.75rem] bg-moss/[0.04]">
                <Artifact />
              </div>
              <div className="flex flex-1 flex-col px-4 pb-5 pt-6">
                <span className="eyebrow text-moss/40">0{i + 1}</span>
                <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-moss">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-moss/65">{desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
