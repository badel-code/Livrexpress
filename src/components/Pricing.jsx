import { useEffect, useRef } from 'react'
import { Check, ArrowUpRight } from 'lucide-react'
import { gsap } from '../lib/gsap'
import { MagneticButton, WHATSAPP_URL } from './ui'

const PLANS = [
  {
    name: 'Essentiel',
    pitch: 'Pour vos envois ponctuels.',
    price: '1 500',
    unit: 'FCFA / course',
    features: ['Livraison partout à Dakar', 'Délai garanti de 60 min', 'Colis jusqu’à 5 kg', 'Suivi GPS en direct'],
    cta: 'Commander une course',
  },
  {
    name: 'Performance',
    pitch: 'Pour les commerçants et e-boutiques.',
    price: '25 000',
    unit: 'FCFA / mois',
    features: [
      '20 livraisons incluses',
      'Livreur prioritaire en 45 min',
      'Encaissement à la livraison',
      'Versement Wave programmé',
      'Support WhatsApp dédié',
    ],
    cta: 'Choisir Performance',
    featured: true,
  },
  {
    name: 'Entreprise',
    pitch: 'Pour les volumes importants.',
    price: 'Sur devis',
    unit: 'Tarif adapté à vos volumes',
    features: [
      'Livraisons illimitées',
      'Flotte de livreurs dédiée',
      'Banlieue : Rufisque, Keur Massar',
      'Rapports mensuels',
      'Gestionnaire de compte',
    ],
    cta: 'Parler à l’équipe',
  },
]

export default function Pricing() {
  const root = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-plan]', {
        y: 60,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: { trigger: '[data-plan-grid]', start: 'top 80%' },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section id="tarifs" ref={root} className="relative z-10 bg-cream px-4 py-28 md:px-8 md:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center md:mb-24">
          <span className="eyebrow mb-5 block text-clay">03 — Tarifs</span>
          <h2 className="text-moss">
            <span className="block font-display text-4xl font-bold tracking-tighter md:text-6xl">Un prix clair,</span>
            <span className="block font-serif text-5xl italic tracking-tight md:text-7xl">payé à la remise.</span>
          </h2>
        </div>

        <div data-plan-grid className="mx-auto grid max-w-md grid-cols-1 gap-6 lg:max-w-none lg:grid-cols-3 lg:items-center">
          {PLANS.map((plan) => (
            <article
              key={plan.name}
              data-plan
              className={`flex flex-col rounded-[2.5rem] p-8 md:p-10 ${
                plan.featured
                  ? 'bg-moss text-cream shadow-[0_40px_80px_-30px_rgba(46,64,54,0.7)] ring-2 ring-clay/60 ring-offset-4 ring-offset-cream lg:scale-105 lg:py-14'
                  : 'border border-moss/10 bg-cream text-moss'
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-bold tracking-tight">{plan.name}</h3>
                {plan.featured && (
                  <span className="eyebrow rounded-full bg-clay px-3 py-1.5 text-[10px] text-cream">Populaire</span>
                )}
              </div>
              <p className={`mt-2 text-sm ${plan.featured ? 'text-cream/65' : 'text-moss/60'}`}>{plan.pitch}</p>

              <p className="mt-8 font-display text-5xl font-bold tracking-tighter">{plan.price}</p>
              <p className={`eyebrow mt-2 ${plan.featured ? 'text-cream/55' : 'text-moss/50'}`}>{plan.unit}</p>

              <ul className={`my-9 space-y-3.5 border-t pt-8 ${plan.featured ? 'border-cream/15' : 'border-moss/10'}`}>
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <span
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                        plan.featured ? 'bg-clay text-cream' : 'bg-moss/10 text-moss'
                      }`}
                    >
                      <Check size={12} strokeWidth={3} />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <MagneticButton
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                variant={plan.featured ? 'clay' : 'dark'}
                className="mt-auto w-full"
              >
                {plan.cta}
                <ArrowUpRight size={16} strokeWidth={2.2} />
              </MagneticButton>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
