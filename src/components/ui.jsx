export const WHATSAPP_URL = `https://wa.me/221770000000?text=${encodeURIComponent(
  'Bonjour LivrExpress, je souhaite commander une livraison.',
)}`

const VARIANTS = {
  clay: { base: 'bg-clay text-cream', layer: 'bg-charcoal' },
  moss: { base: 'bg-moss text-cream', layer: 'bg-clay' },
  dark: { base: 'bg-charcoal text-cream', layer: 'bg-moss' },
  ghost: { base: 'text-cream ring-1 ring-inset ring-cream/30', layer: 'bg-cream/15' },
}

export function MagneticButton({ href, variant = 'clay', className = '', children, ...props }) {
  const v = VARIANTS[variant]
  return (
    <a
      href={href}
      className={`btn-magnetic group relative inline-flex items-center justify-center overflow-hidden rounded-full px-7 py-4 text-sm font-semibold tracking-tight ${v.base} ${className}`}
      {...props}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-0 translate-y-full rounded-full transition-transform duration-500 ease-magnetic group-hover:translate-y-0 ${v.layer}`}
      />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </a>
  )
}

/* Découpe une phrase en mots animables (révélation style SplitText) */
export function SplitWords({ text, attr, className = '' }) {
  return text.split(' ').map((word, i) => (
    <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
      <span {...{ [attr]: '' }} className={`inline-block ${className}`}>
        {word}
      </span>
      {' '}
    </span>
  ))
}
