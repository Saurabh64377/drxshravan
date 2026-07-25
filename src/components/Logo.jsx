import { HeartPulse, Leaf, Pill } from 'lucide-react'

export default function Logo({ compact = false, inverse = false }) {
  return (
    <a href="/#home" className="group flex min-w-0 items-center gap-3.5 outline-none focus-visible:rounded-xl focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2" aria-label="Buddha Medical & General Store home">
      <span className="relative grid h-[52px] w-[52px] shrink-0 place-items-center rounded-[18px] bg-white shadow-[0_14px_34px_rgba(37,99,235,.18)] ring-1 ring-slate-200/70 transition-transform duration-300 group-hover:-rotate-2 group-hover:scale-[1.03]">
        <span className="absolute inset-1 rounded-full bg-gradient-to-br from-blue-50 via-white to-emerald-50" />
        <HeartPulse className="relative h-7 w-7 text-blue-600" strokeWidth={2.4} />
        <Pill className="absolute -right-1 top-2 h-4 w-4 rotate-45 rounded-full text-emerald-500" strokeWidth={2.5} />
        <Leaf className="absolute bottom-1 left-2 h-3.5 w-3.5 text-emerald-500" strokeWidth={2.4} />
      </span>
      {!compact && (
        <span className="min-w-0 leading-tight">
          <span className={`block whitespace-nowrap text-[15px] font-bold tracking-[-.035em] sm:text-base ${inverse ? 'text-white' : 'text-slate-950'}`}>
            Buddha Medical
          </span>
          <span className={`mt-1 block whitespace-nowrap text-[9px] font-bold uppercase tracking-[.13em] sm:text-[10px] sm:tracking-[.17em] ${inverse ? 'text-slate-400' : 'text-slate-500'}`}>
            Medical & General Store
          </span>
        </span>
      )}
    </a>
  )
}
