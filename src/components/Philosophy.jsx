import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { SplitWords } from './ui'

const TEXTURE =
  'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=2000&q=80'

export default function Philosophy() {
  const root = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-parallax]',
        { yPercent: -12 },
        {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      )

      const reveal = (selector, trigger) =>
        gsap.from(selector, {
          yPercent: 110,
          opacity: 0,
          duration: 1.1,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: { trigger, start: 'top 80%' },
        })

      reveal('[data-word-common]', '[data-statement-common]')
      reveal('[data-word-ours]', '[data-statement-ours]')
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="relative overflow-hidden bg-charcoal px-6 py-32 text-cream md:px-12 md:py-48">
      <div aria-hidden="true" className="absolute inset-[-15%_0] opacity-[0.18]">
        <img data-parallax src={TEXTURE} alt="" loading="lazy" className="h-full w-full object-cover" />
      </div>
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal/40 to-charcoal" />

      <div className="relative mx-auto max-w-6xl">
        <span className="eyebrow mb-12 block text-clay">Le manifeste</span>

        <p data-statement-common className="max-w-2xl text-lg leading-relaxed text-cream/55 md:text-2xl">
          <SplitWords
            text="La plupart des services de livraison se concentrent sur : le volume de courses."
            attr="data-word-common"
          />
        </p>

        <div data-statement-ours className="mt-14 md:mt-20">
          <p className="font-display text-xl font-semibold tracking-tight text-cream/80 md:text-3xl">
            <SplitWords text="Nous nous concentrons sur :" attr="data-word-ours" />
          </p>
          <p className="mt-2 font-serif text-[3.25rem] font-medium italic leading-[0.95] tracking-tight sm:text-7xl md:text-[7.5rem] lg:text-[9rem]">
            <SplitWords text="chaque" attr="data-word-ours" />
            <SplitWords text="minute" attr="data-word-ours" className="text-clay" />
            <SplitWords text="de votre colis." attr="data-word-ours" />
          </p>
        </div>
      </div>
    </section>
  )
}
