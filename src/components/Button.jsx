export function Button({ children, href, variant = 'primary', className = '', ...props }) {
  const variants = {
    primary:
      'bg-blue-600 text-white hover:bg-blue-700 hover:-translate-y-0.5',
    secondary:
      'bg-white text-slate-900 ring-1 ring-slate-200 hover:-translate-y-0.5 hover:ring-blue-200',
    green:
      'bg-emerald-500 text-white hover:bg-emerald-600 hover:-translate-y-0.5',
    ghost:
      'bg-blue-50 text-blue-700 hover:bg-blue-100',
  }

  const classes = `inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-full px-5 py-3 text-sm font-bold transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${variants[variant]} ${className}`

  if (href) {
    return (
      <a className={classes} href={href} {...props}>
        <span className="relative z-10">{children}</span>
      </a>
    )
  }

  return (
    <button className={classes} type="button" {...props}>
      <span className="relative z-10">{children}</span>
    </button>
  )
}
