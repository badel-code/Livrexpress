import { ArrowUpRight, MapPin, Phone, Mail, MessageCircle } from 'lucide-react'
import { MagneticButton, WHATSAPP_URL } from './ui'

const NAV = [
  { href: '#service', label: 'Le service' },
  { href: '#methode', label: 'La méthode' },
  { href: '#tarifs', label: 'Tarifs' },
]

const CONTACT = [
  { icon: MessageCircle, label: 'WhatsApp', href: WHATSAPP_URL, external: true },
  { icon: Phone, label: '+221 77 000 00 00', href: 'tel:+221770000000' },
  { icon: Mail, label: 'contact@livrexpress.sn', href: 'mailto:contact@livrexpress.sn' },
  { icon: MapPin, label: 'Av. Cheikh Anta Diop, Dakar' },
]

const LEGAL = ['Mentions légales', 'Confidentialité', 'Conditions générales']

const YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer id="contact" className="relative z-10 -mt-16 rounded-t-[4rem] bg-charcoal px-6 pb-10 pt-20 text-cream md:px-12 md:pt-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1.2fr_1fr]">
          <div>
            <a href="#hero" className="lift font-display text-3xl font-bold tracking-tighter">
              Livr<span className="text-clay">Express</span>
            </a>
            <p className="mt-4 max-w-xs font-serif text-2xl italic leading-snug text-cream/70">
              Le raccourci entre vous et tout Dakar.
            </p>
            <MagneticButton href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="mt-8">
              Commander une livraison
              <ArrowUpRight size={16} strokeWidth={2.2} />
            </MagneticButton>
          </div>

          <nav aria-label="Navigation du pied de page">
            <h4 className="eyebrow mb-6 text-cream/40">Navigation</h4>
            <ul className="space-y-3">
              {NAV.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="lift text-cream/75 hover:text-cream">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h4 className="eyebrow mb-6 text-cream/40">Contact</h4>
            <ul className="space-y-3">
              {CONTACT.map(({ icon: Icon, label, href, external }) => (
                <li key={label} className="flex items-center gap-3 text-cream/75">
                  <Icon size={16} strokeWidth={1.8} className="shrink-0 text-clay" />
                  {href ? (
                    <a
                      href={href}
                      className="lift hover:text-cream"
                      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
                    >
                      {label}
                    </a>
                  ) : (
                    <span>{label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="eyebrow mb-6 text-cream/40">Légal</h4>
            <ul className="space-y-3">
              {LEGAL.map((item) => (
                <li key={item}>
                  <a href="#contact" className="lift text-cream/75 hover:text-cream">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-6 border-t border-cream/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="inline-flex items-center gap-3 self-start rounded-full border border-cream/10 bg-cream/5 px-4 py-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="eyebrow text-cream/70">Système opérationnel · 42 livreurs en ligne</span>
          </div>
          <p className="font-mono text-xs text-cream/40">
            © {YEAR} LivrExpress · Dakar, Sénégal
          </p>
        </div>
      </div>
    </footer>
  )
}
