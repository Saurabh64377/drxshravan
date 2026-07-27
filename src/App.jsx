import { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import { animate, AnimatePresence, motion, useInView, useMotionValue, useScroll, useTransform } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import {
  ArrowRight,
  BadgePlus,
  CalendarCheck2,
  ChevronDown,
  ChevronUp,
  CircleDollarSign,
  Clock3,
  ExternalLink,
  HeartPulse,
  Home,
  Leaf,
  MapPin,
  MessageCircle,
  Phone,
  Pill,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
  Target,
  TestTubes,
  Wifi,
  X,
} from 'lucide-react'
import { FaGoogle, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import Logo from './components/Logo'
import { Button } from './components/Button'
import ConsultationModal from './components/ConsultationModal'
import { Reveal, Section } from './components/Section'
import {
  clinic,
  emergencyBanner,
  facilities,
  faqs,
  gallery,
  heroHighlights,
  navLinks,
  quickStats,
  services,
  testimonials,
  wellnessTips,
  whyChoose,
} from './data/site'

const phoneHref = `tel:${clinic.phonePrimary.replace(/\s/g, '')}`
const whatsappHref = `https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent(
  `Namaste ${clinic.name}, I want to book a consultation.`,
)}`

function SEO({ title, description }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="theme-color" content="#2563EB" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'MedicalBusiness',
          name: clinic.name,
          founder: clinic.owner,
          address: clinic.address,
          telephone: [clinic.phonePrimary, clinic.phoneSecondary],
          openingHours: 'Mo-Su 08:00-21:30',
          medicalSpecialty: ['Pharmacy', 'PrimaryCare'],
        })}
      </script>
    </Helmet>
  )
}

function PageTransition({ children }) {
  const location = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  )
}

function LoadingScreen() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 900)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[120] grid place-items-center bg-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 190, damping: 18 }}
            className="text-center"
          >
            <div className="mx-auto mb-5 w-fit rounded-full bg-blue-50 p-4">
              <Logo compact />
            </div>
            <div className="h-2 w-56 overflow-hidden rounded-full bg-slate-100">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-blue-600 to-emerald-500"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
              />
            </div>
            <p className="mt-4 text-sm font-bold text-slate-500">Preparing premium healthcare experience…</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function NavItems({ mobile = false, onNavigate }) {
  return (
    <>
      {navLinks.map((item, index) => {
        return (
          <motion.a
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={
              mobile
                ? 'group relative flex min-h-14 items-center justify-between overflow-hidden rounded-2xl px-4 py-3.5 text-lg font-bold tracking-[-.02em] outline-none transition-colors text-slate-700 hover:text-slate-950 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                : 'group relative isolate flex h-11 items-center rounded-full px-3 text-[13px] font-bold tracking-[-.01em] outline-none transition-colors text-slate-600 hover:text-slate-950 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
            }
            whileHover={mobile ? { x: 4 } : { y: -1 }}
            whileTap={{ scale: 0.97 }}
          >
            {mobile && <span className="mr-4 text-xs font-bold tracking-[.12em] text-slate-400">0{index + 1}</span>}
            <span className={mobile ? 'mr-auto' : ''}>{item.label}</span>
            {mobile ? (
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 text-slate-300" />
            ) : (
              <span className="absolute inset-x-3 bottom-1.5 h-0.5 origin-left rounded-full bg-gradient-to-r from-blue-600 to-emerald-500 transition-transform duration-300 scale-x-0 group-hover:scale-x-100" />
            )}
          </motion.a>
        )
      })}
    </>
  )
}

function Navbar({ onBook }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuRef = useRef(null)
  const menuButtonRef = useRef(null)
  const location = useLocation()
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  useEffect(() => {
    if (!open) return undefined

    const previousOverflow = document.body.style.overflow
    const previouslyFocused = document.activeElement
    const desktopQuery = window.matchMedia('(min-width: 1280px)')
    document.body.style.overflow = 'hidden'

    const focusFrame = window.requestAnimationFrame(() => {
      menuRef.current?.querySelector('a')?.focus()
    })

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        return
      }

      if (event.key !== 'Tab' || !menuRef.current) return
      const focusable = Array.from(menuRef.current.querySelectorAll('a, button:not([disabled])'))
      const firstItem = focusable[0]
      const lastItem = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === firstItem) {
        event.preventDefault()
        lastItem?.focus()
      } else if (!event.shiftKey && document.activeElement === lastItem) {
        event.preventDefault()
        firstItem?.focus()
      }
    }

    const onDesktopChange = (event) => {
      if (event.matches) setOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    desktopQuery.addEventListener('change', onDesktopChange)
    return () => {
      window.cancelAnimationFrame(focusFrame)
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
      desktopQuery.removeEventListener('change', onDesktopChange)
      previouslyFocused?.focus?.()
    }
  }, [open])

  return (
    <>
      <motion.div className="fixed left-0 top-0 z-[90] h-[3px] w-full origin-left bg-gradient-to-r from-blue-600 via-sky-500 to-emerald-500" style={{ scaleX: scrollYProgress }} />
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-[80] border-b transition-[background-color,border-color,box-shadow,backdrop-filter] duration-[380ms] ${
          scrolled
            ? 'border-slate-200/75 bg-white/95 shadow-[0_14px_48px_rgba(15,23,42,.09)] backdrop-blur-2xl'
            : 'border-transparent bg-white/20 shadow-none backdrop-blur-md'
        }`}
      >
        <div className={`mx-auto flex h-[76px] max-w-[1280px] items-center justify-between gap-4 px-4 transition-[height] duration-[380ms] sm:px-6 lg:px-8 ${scrolled ? 'xl:h-[72px]' : 'xl:h-[84px]'}`}>
          <div className="min-w-0 shrink-0">
            <Logo />
          </div>

          <nav className="hidden items-center gap-0.5 rounded-full border border-white/60 bg-white/45 p-1.5 shadow-[0_8px_30px_rgba(15,23,42,.04)] backdrop-blur-xl xl:flex" aria-label="Primary navigation">
            <NavItems onNavigate={() => setOpen(false)} />
          </nav>

          <motion.button
            type="button"
            onClick={onBook}
            className="premium-cta relative hidden min-h-12 shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 px-5 py-3 text-sm font-bold text-white outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 xl:inline-flex"
            whileHover={{ y: -2, scale: 1.015 }}
            whileTap={{ scale: 0.96 }}
          >
            <CalendarCheck2 className="relative z-10 h-4 w-4" />
            <span className="relative z-10">Book Consultation</span>
          </motion.button>

          <motion.button
            ref={menuButtonRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/80 bg-white/85 text-slate-950 shadow-[0_10px_30px_rgba(15,23,42,.1)] outline-none backdrop-blur-xl focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 xl:hidden"
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            whileTap={{ scale: 0.92 }}
          >
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            <span className="relative h-5 w-6">
              <motion.span className="absolute left-0 top-1 h-0.5 w-6 rounded-full bg-current" animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} transition={{ duration: 0.25 }} />
              <motion.span className="absolute left-0 top-[9px] h-0.5 rounded-full bg-current" animate={open ? { opacity: 0, x: 8, width: 0 } : { opacity: 1, x: 0, width: 18 }} transition={{ duration: 0.2 }} />
              <motion.span className="absolute bottom-1 left-0 h-0.5 w-6 rounded-full bg-current" animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} transition={{ duration: 0.25 }} />
            </span>
          </motion.button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-navigation"
            className="fixed inset-0 z-[75] xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
          >
            <button type="button" className="absolute inset-0 h-full w-full cursor-default bg-slate-950/35 backdrop-blur-sm" onClick={() => setOpen(false)} aria-label="Close navigation menu" />
            <motion.div
              ref={menuRef}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              className="absolute inset-y-0 right-0 flex w-full max-w-[440px] flex-col overflow-y-auto border-l border-white/70 bg-[linear-gradient(160deg,rgba(255,255,255,.98),rgba(239,246,255,.98))] px-5 pb-6 pt-24 shadow-[-24px_0_80px_rgba(15,23,42,.18)] sm:px-7"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 34 }}
            >
              <div className="mb-6 border-b border-slate-200 pb-5">
                <p className="text-[11px] font-bold uppercase tracking-[.12em] text-blue-600">Navigate our clinic</p>
                <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">Trusted healthcare and pharmacy support, all in one place.</p>
              </div>

              <nav className="grid gap-1.5" aria-label="Mobile navigation links">
                <NavItems mobile onNavigate={() => setOpen(false)} />
              </nav>

              <div className="mt-auto pt-8">
                <motion.button
                  type="button"
                  onClick={() => {
                    setOpen(false)
                    onBook()
                  }}
                  className="premium-cta relative inline-flex min-h-14 w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 px-6 py-3.5 text-sm font-bold text-white outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <CalendarCheck2 className="relative z-10 h-5 w-5" />
                  <span className="relative z-10">Book Consultation</span>
                </motion.button>
                <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-200 pt-5 text-xs font-semibold text-slate-500">
                  <span>Open daily</span>
                  <span className="h-1 w-1 rounded-full bg-emerald-500" />
                  <span>{clinic.hours.split('·')[1]?.trim()}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function AnimatedStatValue({ value }) {
  const valueRef = useRef(null)
  const isInView = useInView(valueRef, { once: true, margin: '-40px' })
  const match = value.match(/^([\d,]+)(.*)$/)
  const [, leadingValue = '0', suffix = ''] = match ?? []
  const hasNumericValue = Boolean(match)
  const numericValue = hasNumericValue ? Number.parseInt(leadingValue.replace(/,/g, ''), 10) : 0
  const count = useMotionValue(0)
  const displayValue = useTransform(count, (latest) => `${Math.round(latest).toLocaleString('en-IN')}${suffix}`)

  useEffect(() => {
    if (!isInView || !hasNumericValue) return undefined
    const controls = animate(count, numericValue, { duration: 1.5, ease: [0.22, 1, 0.36, 1] })
    return () => controls.stop()
  }, [count, hasNumericValue, isInView, numericValue])

  if (!match) return <motion.span ref={valueRef}>{value}</motion.span>
  return <motion.span ref={valueRef}>{displayValue}</motion.span>
}

function Hero({ onBook }) {
  const trustIcons = [ShieldCheck, Pill, TestTubes, HeartPulse]
  const statIcons = [HeartPulse, Pill, Clock3, ShieldCheck]

  return (
    <section id="home" className="hero-shell mesh-bg relative isolate overflow-hidden pb-12 pt-28 sm:pb-16 sm:pt-32 lg:flex lg:min-h-[min(900px,calc(100svh-18px))] lg:flex-col lg:justify-center lg:pb-10 lg:pt-28">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(112deg,rgba(255,255,255,.9),rgba(255,255,255,.18)_48%,rgba(255,255,255,.52))]" />
      <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px bg-gradient-to-b from-transparent via-blue-100/60 to-transparent lg:block" />
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-blue-300/20 blur-[82px] css-blob-1" />
      <div className="pointer-events-none absolute right-[-5%] top-20 h-80 w-80 rounded-full bg-emerald-300/20 blur-[90px] css-blob-2" />
      <div className="pointer-events-none absolute bottom-16 left-[43%] hidden h-40 w-40 rounded-full bg-sky-200/30 blur-[60px] lg:block css-blob-3" />
      <div className="hero-orbit hero-orbit-one pointer-events-none absolute left-[8%] top-[30%] hidden h-3 w-3 rounded-full bg-blue-400/50 lg:block" />
      <div className="hero-orbit hero-orbit-two pointer-events-none absolute right-[9%] top-[22%] hidden h-2 w-2 rounded-full bg-emerald-400/60 lg:block" />

      <div className="relative mx-auto grid w-full max-w-[1320px] items-center gap-10 px-4 sm:px-6 md:gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(390px,.9fr)] lg:gap-8 lg:px-8 xl:grid-cols-[1.02fr_.98fr] xl:gap-14">
        <div className="relative z-10 max-w-[600px] lg:pl-2 xl:pl-5">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -2 }}
            className="mb-5 inline-flex max-w-full items-center gap-2.5 rounded-full border border-blue-100/90 bg-white/70 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.12em] text-slate-600 shadow-[0_10px_35px_rgba(37,99,235,.08)] backdrop-blur-xl sm:text-[11px]"
          >
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-blue-600 text-white shadow-[0_5px_14px_rgba(37,99,235,.25)]">
              <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2.4} />
            </span>
            <span className="truncate">Trusted healthcare · Prithvipal Garh</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[590px] text-[clamp(2.55rem,4.25vw,3.65rem)] font-bold leading-[1.13] tracking-[-.052em] text-slate-950 sm:text-[clamp(3rem,4.5vw,3.8rem)] lg:text-[clamp(3.05rem,4vw,3.7rem)]"
          >
            <span className="block">Healthcare that feels</span>
            <span className="block bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 bg-clip-text text-transparent">personal, trusted.</span>
            <span className="block">Always close to home.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-[540px] text-[15px] leading-7 text-slate-500 sm:mt-6 sm:text-[17px] sm:leading-8"
          >
            Quality medicines, thoughtful guidance, and essential checkups from a healthcare team that knows your family. Calm, clear care—all in one place.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap"
          >
            <motion.button
              type="button"
              onClick={onBook}
              className="premium-cta relative inline-flex min-h-14 items-center justify-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 px-7 py-3.5 text-sm font-bold text-white outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              whileHover={{ y: -3, scale: 1.01 }}
              whileTap={{ scale: 0.97 }}
            >
              <CalendarCheck2 className="relative z-10 h-5 w-5" />
              <span className="relative z-10">Book Consultation</span>
              <ArrowRight className="relative z-10 h-4 w-4" />
            </motion.button>
            <motion.a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex min-h-14 items-center justify-center gap-2.5 rounded-full border border-slate-200/90 bg-white/75 px-7 py-3.5 text-sm font-bold text-slate-700 outline-none backdrop-blur-xl transition-colors hover:border-emerald-300 hover:bg-emerald-50/85 hover:text-emerald-700 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="grid h-7 w-7 place-items-center rounded-full bg-emerald-50 text-emerald-600 transition-colors group-hover:bg-emerald-500 group-hover:text-white">
                <FaWhatsapp className="h-4 w-4" />
              </span>
              WhatsApp Consultation
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.38 }}
            className="mt-7 grid max-w-[590px] grid-cols-2 gap-x-4 gap-y-3 border-t border-slate-200/80 pt-5 sm:mt-8 sm:flex sm:flex-wrap sm:gap-x-5 sm:gap-y-3"
            aria-label="Clinic trust indicators"
          >
            {heroHighlights.map((item, index) => {
              const Icon = trustIcons[index]
              return (
                <motion.span key={item} className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 sm:text-xs" whileHover={{ x: 2, color: '#1d4ed8' }}>
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-blue-50/90 text-blue-600 ring-1 ring-blue-100/80">
                    <Icon className="h-3 w-3" />
                  </span>
                  {item}
                </motion.span>
              )
            })}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 34 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ opacity: { duration: 0.8, delay: 0.15 }, x: { duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] } }}
          className="hero-illustration relative mx-auto w-full max-w-[510px] lg:max-w-[500px] lg:justify-self-end xl:max-w-[530px] css-float-y"
        >
          <div className="hero-illustration-glow absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-blue-300/35 via-sky-200/15 to-emerald-300/35 blur-3xl" />
          <div className="glass-card relative overflow-visible rounded-[2.2rem] border-white/80 p-3.5 shadow-[0_35px_90px_rgba(37,99,235,.14)] sm:p-5">
            <div className="relative rounded-[1.8rem] bg-gradient-to-br from-white via-blue-50 to-emerald-50 p-4 sm:p-5">
              <div className="relative mx-auto aspect-[4/4.25] max-w-[440px] overflow-hidden rounded-[1.8rem] bg-white shadow-[0_20px_60px_rgba(15,23,42,.12)] ring-1 ring-white">
                <img src="./sarvan4.png" alt="drx.Sarvan Paswan" className='w-full h-full object-contain' />
                {/* <div className="absolute inset-x-10 top-9 h-48 rounded-full bg-gradient-to-br from-blue-500 to-sky-400 opacity-95" /> */}
                {/* <div className="absolute left-1/2 top-[17%] h-[27%] w-[27%] -translate-x-1/2 rounded-full bg-[#f8d7c6] shadow-inner" /> */}
                {/* <div className="absolute left-1/2 top-[41%] h-[58%] w-[61%] -translate-x-1/2 rounded-t-[6rem] bg-white shadow-[0_-20px_60px_rgba(37,99,235,.16)] ring-1 ring-blue-100" /> */}
                {/* <div className="absolute left-[38%] top-[34%] h-[20%] w-[24%] rounded-b-[3rem] bg-[#f8d7c6]" /> */}
                {/* <div className="absolute left-1/2 top-[57%] h-[35%] w-[45%] -translate-x-1/2 rounded-[2rem] bg-blue-600" /> */}
                {/* <div className="absolute left-1/2 top-[60%] h-[28%] w-[28%] -translate-x-1/2 rounded-full border-[clamp(10px,1.5vw,18px)] border-white/90" /> */}
              <div className="absolute left-4 bottom-20 rounded-2xl bg-white/95 p-3 shadow-xl ring-1 ring-slate-100 css-float-card-1">
                  {/* <HeartPulse className="h-6 w-6 text-rose-500" /> */}
                   <Stethoscope  className="h-9 w-9 text-black-500" />
                </div>
               
                <div className="absolute left-4 top-20 rounded-2xl bg-white/95 p-3 shadow-xl ring-1 ring-slate-100 css-float-card-1">
                  <HeartPulse className="h-8 w-8 text-rose-500" />
                </div>
                <div className="absolute bottom-12 right-4 rounded-2xl bg-white/95 p-3 shadow-xl ring-1 ring-slate-100 css-float-card-2">
                  <Pill className="h-6 w-6 text-emerald-500" />
                </div>
                <div className="absolute right-6 top-12 rounded-2xl bg-white/95 p-3 shadow-xl ring-1 ring-slate-100 css-float-card-rotate">
                  <TestTubes className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="relative mx-auto mt-4 flex max-w-[440px] items-center justify-between gap-3 rounded-2xl border border-white/80 bg-white/75 px-4 py-3 shadow-sm backdrop-blur-xl">
                <div className="flex items-center gap-2.5">
                  <span className="grid h-8 w-8 place-items-center rounded-xl bg-emerald-50 text-emerald-600"><ShieldCheck className="h-4 w-4" /></span>
                  <span><span className="block text-[10px] font-bold uppercase tracking-[.15em] text-slate-400">Care you can trust</span><span className="block text-xs font-bold text-slate-700">Open daily · 8 AM – 9:30 PM</span></span>
                </div>
                <span className="hidden rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-blue-700 sm:inline-flex">Local care</span>
              </div>
            </div>
          </div>
          <motion.div className="absolute -bottom-5 -left-3 hidden items-center gap-2 rounded-2xl border border-white/90 bg-white/90 px-3 py-2.5 text-xs font-bold text-slate-700 shadow-[0_16px_40px_rgba(15,23,42,.12)] backdrop-blur-xl sm:flex" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
            <span className="grid h-7 w-7 place-items-center rounded-xl bg-blue-50 text-blue-600"><HeartPulse className="h-4 w-4" /></span>
            <span><span className="block text-[10px] font-semibold text-slate-400">Family-first</span><span>Health support</span></span>
          </motion.div>
        </motion.div>
      </div>

      <div className="relative mx-auto mt-10 grid w-full max-w-[1320px] gap-3 px-4 sm:grid-cols-2 sm:gap-4 sm:px-6 lg:mt-8 lg:grid-cols-4 lg:px-8">
        {quickStats.map((stat, index) => {
          const Icon = statIcons[index]
          return (
            <Reveal key={stat.label} delay={index * 0.07}>
              <motion.div
                className="group flex h-full items-center gap-3 rounded-[20px] border border-white/90 bg-white/62 p-3.5 shadow-[0_18px_50px_rgba(15,23,42,.06)] backdrop-blur-xl sm:gap-4 sm:p-4"
                whileHover={{ y: -6, boxShadow: '0 24px 60px rgba(37,99,235,.13)' }}
                transition={{ type: 'spring', stiffness: 320, damping: 24 }}
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-blue-50 to-emerald-50 text-blue-600 ring-1 ring-blue-100 transition-transform duration-300 group-hover:scale-105 sm:h-11 sm:w-11">
                  <Icon className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xl font-bold tracking-[-.04em] text-slate-950 sm:text-2xl"><AnimatedStatValue value={stat.value} /></p>
                  <p className="mt-0.5 text-[11px] font-semibold text-slate-500 sm:text-xs">{stat.label}</p>
                </div>
              </motion.div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}

function EmergencyBanner() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 px-3 py-3 text-white sm:px-4 sm:py-4">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(37,99,235,.15),transparent_50%),radial-gradient(circle_at_70%_50%,rgba(34,197,94,.1),transparent_50%)]" />
      <div className="pointer-events-none absolute -left-20 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:gap-4 sm:text-left">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 ring-1 ring-emerald-500/25 sm:h-9 sm:w-9 sm:rounded-xl">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-emerald-400 pulse-ring sm:h-2.5 sm:w-2.5" />
          </span>
          <p className="text-[12px] font-semibold tracking-[-.01em] text-white/90 sm:text-[13px] sm:font-bold">{emergencyBanner.title}</p>
        </div>
        <a href={phoneHref} className="premium-cta group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 px-5 py-2.5 text-[13px] font-bold text-white transition-all hover:-translate-y-0.5 sm:px-6 sm:py-3 sm:text-sm">
          <span className="relative z-10">{emergencyBanner.action}</span>
          <Phone className="relative z-10 h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </a>
      </div>
    </div>
  )
}

function ServicesSection() {
  return (
    <Section id="services" eyebrow="Clinical pharmacy services" title="Everyday healthcare, designed with premium attention." subtitle="From essential medicines to basic checkups, each service is structured for clarity, speed, hygiene, and patient confidence.">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, index) => {
          const Icon = service.icon
          return (
            <Reveal key={service.title} delay={index * 0.04}>
              <div className="group relative h-full overflow-hidden rounded-[24px] bg-gradient-to-br from-blue-100/80 via-emerald-100/60 to-sky-100/80 p-px transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_28px_70px_rgba(37,99,235,.16)]">
                <div className="h-full rounded-[23px] bg-white/95 p-6 backdrop-blur-sm">
                  <div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-blue-50 to-emerald-50 text-blue-600 ring-1 ring-blue-100/80 transition-all duration-300 group-hover:scale-110 group-hover:from-blue-600 group-hover:to-sky-500 group-hover:text-white group-hover:shadow-[0_12px_28px_rgba(37,99,235,.25)] group-hover:ring-0">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-[15px] font-bold leading-[1.25] tracking-[-.02em] text-slate-950 sm:text-xl">{service.title}</h3>
                  <p className="mt-3 text-[15px] leading-7 text-slate-500">{service.description}</p>
                  <div className="mt-5 flex items-center gap-1.5 text-[13px] font-bold text-blue-600 opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <span>Learn more</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}

function AboutSection() {
  return (
    <Section id="about" className="section-alt-bg" eyebrow="About the clinic" title="A trusted medical store with the calm feel of a private clinic." subtitle="Built around personal relationships, clear medicine guidance, and compassionate support for local families.">
      <div className="relative grid items-stretch gap-8 lg:grid-cols-[1fr_1.1fr]">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -left-20 top-[10%] h-64 w-64 rounded-full bg-blue-300/15 blur-[80px] css-about-blob-1" />
        <div className="pointer-events-none absolute -right-16 bottom-[15%] h-56 w-56 rounded-full bg-emerald-300/15 blur-[70px] css-about-blob-2" />

        {/* ── Left: Doctor Profile ── */}
        <Reveal>
          <div className="glass-card relative h-full overflow-hidden rounded-[28px] p-px shadow-[0_28px_80px_rgba(37,99,235,.1)]">
            <div className="flex h-full flex-col rounded-[27px] bg-gradient-to-br from-white via-blue-50/40 to-emerald-50/30">
              {/* Doctor Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-[27px]">
                <img src="./sarvan3.png" alt={clinic.owner} className="h-full w-full object-contain" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-5 right-5">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[.12em] text-black ring-1 ring-white/25 backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> 
                    Healthcare Professional
                  </div>
                </div>
              </div>

              {/* Doctor Info */}
              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <h3 className="text-xl font-bold leading-[1.15] tracking-[-.03em] text-slate-950 sm:text-2xl sm:tracking-[-.04em] lg:text-3xl">{clinic.owner}</h3>
                <p className="mt-1.5 text-[15px] font-medium text-blue-600">{clinic.qualification}</p>
                <p className="mt-4 text-[15px] leading-7 text-slate-500">
                  Dedicated healthcare professional committed to providing reliable medicine guidance and compassionate care to families in Prithvipal Garh and surrounding areas.
                </p>

                {/* Stats */}
                <div className="mt-auto grid grid-cols-3 gap-3 pt-6">
                  {[
                    ['4+', 'Years Exp.'],
                    ['500+', 'Patients'],
                    ['4.9', 'Rating'],
                  ].map(([value, label]) => (
                    <div key={label} className="rounded-xl border border-slate-200/60 bg-white/80 p-3 text-center transition-all duration-300 hover:border-blue-200/60 hover:shadow-[0_8px_24px_rgba(37,99,235,.06)]">
                      <p className="text-base font-bold tracking-[-.02em] text-blue-600 sm:text-lg">{value}</p>
                      <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[.08em] text-slate-400">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── Right: Story & Purpose ── */}
        <Reveal delay={0.08}>
          <div className="glass-card relative h-full overflow-hidden rounded-[28px] p-px shadow-[0_28px_80px_rgba(37,99,235,.1)]">
            <div className="flex h-full flex-col rounded-[27px] bg-gradient-to-br from-white via-blue-50/40 to-emerald-50/30 p-6 sm:p-8">
              <div className="mb-2">
                <h3 className="text-lg font-bold tracking-[-.03em] text-slate-950 sm:text-2xl sm:tracking-[-.04em]">Our Story & Purpose</h3>
                <p className="mt-1.5 text-[15px] text-slate-500">What drives our commitment to the community.</p>
              </div>

              <div className="mt-4 flex flex-1 flex-col gap-3">
                {[
                  [Stethoscope, 'Clinic Story', 'Buddha Medical & General Store serves Prithvipal Garh with a refined blend of pharmacy access and basic healthcare support. The experience is intentionally simple: listen carefully, guide clearly, and help patients choose the right next step.'],
                  [HeartPulse, 'Mission', 'To make reliable medicines, basic checkups, and practical healthcare guidance accessible to every local family.'],
                  [Target, 'Vision', 'To become the most trusted local healthcare destination in Prithvipal Garh through ethical service, cleanliness, availability, and long-term patient relationships.'],
                  [Sparkles, 'Healthcare Philosophy', 'Care should feel professional, understandable, respectful, and human—especially when patients visit with uncertainty.'],
                ].map(([Icon, title, text], index) => (
                  <motion.div key={title} whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 400, damping: 28 }} className="group flex items-start gap-4 rounded-2xl border border-white/80 bg-white/70 p-4 shadow-[0_8px_28px_rgba(15,23,42,.03)] backdrop-blur-xl transition-all duration-300 hover:border-blue-200/60 hover:shadow-[0_16px_44px_rgba(37,99,235,.07)]">
                    <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-blue-50 to-emerald-50 text-blue-600 ring-1 ring-blue-100/80 transition-all duration-300 group-hover:from-blue-600 group-hover:to-sky-500 group-hover:text-white group-hover:ring-0 group-hover:shadow-[0_6px_16px_rgba(37,99,235,.18)]">
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold tracking-[-.02em] text-slate-950">{title}</h4>
                      <p className="mt-1 text-[14px] leading-6 text-slate-500">{text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}

function WhyChooseSection() {
  return (
    <Section id="why-us" eyebrow="Why patients trust us" title="Care that feels personal, dependable, and beautifully organized." subtitle="A strong local reputation is built one thoughtful patient interaction at a time.">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {whyChoose.map((item, index) => {
          const Icon = item.icon
          return (
            <Reveal key={item.title} delay={index * 0.05}>
              <div className="group h-full rounded-[24px] border border-slate-200/80 bg-white/80 p-6 shadow-[0_16px_50px_rgba(15,23,42,.05)] backdrop-blur-sm transition-all duration-350 hover:-translate-y-1.5 hover:border-blue-200/80 hover:shadow-[0_24px_60px_rgba(37,99,235,.12)]">
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-blue-50 to-emerald-50 text-blue-600 ring-1 ring-blue-100/80 transition-all duration-300 group-hover:scale-110 group-hover:from-blue-600 group-hover:to-sky-500 group-hover:text-white group-hover:ring-0 group-hover:shadow-[0_10px_24px_rgba(37,99,235,.22)]">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-[15px] font-bold leading-[1.25] tracking-[-.02em] text-slate-950 sm:text-xl">{item.title}</h3>
                <p className="mt-3 text-[15px] leading-7 text-slate-500">{item.text}</p>
              </div>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}

function FacilitiesSection() {
  const swiperRef = useRef(null)
  const facilityIcons = [Pill, HeartPulse, TestTubes, Wifi, Stethoscope, BadgePlus, CircleDollarSign, Phone, Pill, HeartPulse, TestTubes, Wifi]
  return (
    <Section id="facilities" className="section-alt-bg" eyebrow="Clinic facilities" title="Modern essentials for fast, comfortable visits." subtitle="Everything is arranged to keep your visit simple — from medicine inquiries to checkups and patient guidance.">
      <div className="relative px-8 sm:px-12 lg:px-14">
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          modules={[Autoplay, Navigation]}
          autoplay={{ delay: 2200, disableOnInteraction: false, pauseOnMouseEnter: true }}
          navigation={{
            prevEl: '.facilities-prev',
            nextEl: '.facilities-next',
          }}
          spaceBetween={16}
          loop
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="pb-2"
        >
          {facilities.map((item, index) => {
            const Icon = facilityIcons[index] ?? Sparkles
            return (
              <SwiperSlide key={item.title} className="!h-auto">
                <div className="group h-full rounded-[22px] border border-slate-200/70 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,.04)] transition-all duration-400 hover:-translate-y-1.5 hover:border-blue-200/60 hover:shadow-[0_24px_60px_rgba(37,99,235,.1)]">
                  <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-blue-50 to-emerald-50 text-blue-600 ring-1 ring-blue-100/80 transition-all duration-400 group-hover:scale-110 group-hover:from-blue-600 group-hover:to-sky-500 group-hover:text-white group-hover:ring-0 group-hover:shadow-[0_10px_24px_rgba(37,99,235,.22)]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-[17px] font-bold tracking-[-.025em] text-slate-950">{item.title}</h3>
                  <p className="mt-2 text-[14px] leading-6 text-slate-500">{item.desc}</p>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>

        {/* Navigation Arrows */}
        <button type="button" className="facilities-prev absolute -left-1 top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-slate-200/80 bg-white transition-all duration-300 hover:-translate-y-1/2 hover:border-blue-200 sm:-left-3 sm:h-11 sm:w-11 lg:-left-5 lg:h-12 lg:w-12" aria-label="Previous">
          <svg className="h-4 w-4 text-slate-600 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button type="button" className="facilities-next absolute -right-1 top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-slate-200/80 bg-white transition-all duration-300 hover:-translate-y-1/2 hover:border-blue-200 sm:-right-3 sm:h-11 sm:w-11 lg:-right-5 lg:h-12 lg:w-12" aria-label="Next">
          <svg className="h-4 w-4 text-slate-600 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </Section>
  )
}

function ProcessSection() {
  const steps = [
    { icon: Phone, title: 'Reach Out', desc: 'Call or WhatsApp us to share your concern and preferred timing.', color: 'blue' },
    { icon: CalendarCheck2, title: 'Confirm Slot', desc: 'We help you choose the right consultation slot and share next steps.', color: 'sky' },
    { icon: MapPin, title: 'Visit Us', desc: 'Arrive at the clinic at your confirmed time for a warm welcome.', color: 'emerald' },
    { icon: Stethoscope, title: 'Consultation', desc: 'Discuss your concern with clear guidance and practical advice.', color: 'teal' },
    { icon: Pill, title: 'Get Support', desc: 'Receive medicine, instructions, or follow-up direction.', color: 'green' },
  ]

  return (
    <Section
      id="process"
      eyebrow="Appointment process"
      title="Book your visit in a calm, simple flow."
      subtitle="Call, walk in, or send a message — each step is designed to feel clear, fast, and reassuring for patients and families."
    >
      {/* Desktop: Horizontal timeline */}
      <div className="relative mt-8 hidden lg:block">
        {/* Connecting line */}
        <div className="absolute left-[calc(10%+24px)] right-[calc(10%+24px)] top-[52px] h-[2px] bg-gradient-to-r from-blue-300 via-emerald-300 to-green-300" />

        <div className="grid grid-cols-5 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <Reveal key={step.title} delay={index * 0.1}>
                <div className="group relative flex flex-col items-center text-center">
                  {/* Outer glow on hover */}
                  <div className="absolute inset-0 -m-4 rounded-full bg-blue-400/0 transition-all duration-500 group-hover:bg-blue-400/5" />
                  
                  {/* Circle node */}
                  <div className="relative z-10 grid h-28 w-28 place-items-center rounded-full border-2 border-slate-200/80 bg-white shadow-[0_20px_60px_rgba(15,23,42,.07)] transition-all duration-500 group-hover:-translate-y-3 group-hover:border-blue-400/60 group-hover:shadow-[0_32px_80px_rgba(37,99,235,.15)]">
                    <div className="grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-slate-50 to-blue-50 transition-all duration-500 group-hover:from-blue-600 group-hover:to-sky-500 group-hover:scale-110">
                      <Icon className="h-8 w-8 text-blue-600 transition-colors duration-500 group-hover:text-white" />
                    </div>
                    {/* Step number */}
                    <span className="absolute -right-0.5 -top-0.5 grid h-8 w-8 place-items-center rounded-full bg-blue-600 text-xs font-bold text-white shadow-[0_4px_12px_rgba(37,99,235,.3)] transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-700">
                      {index + 1}
                    </span>
                  </div>

                  {/* Text below */}
                  <div className="mt-7 px-1">
                    <h3 className="text-[15px] font-bold tracking-[-.02em] text-slate-950 transition-colors duration-300 group-hover:text-blue-700 sm:text-lg sm:tracking-[-.03em]">{step.title}</h3>
                    <p className="mt-2 text-[14px] leading-6 text-slate-500">{step.desc}</p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>

      {/* Mobile: Vertical cards */}
      <div className="mt-6 space-y-3 lg:hidden">
        {steps.map((step, index) => {
          const Icon = step.icon
          return (
            <Reveal key={step.title} delay={index * 0.06}>
              <div className="group relative flex items-center gap-4 overflow-hidden rounded-[20px] border border-slate-200/80 bg-white p-4 shadow-[0_8px_32px_rgba(15,23,42,.04)] transition-all duration-400 hover:border-blue-200/60 hover:shadow-[0_16px_48px_rgba(37,99,235,.08)]">
                {/* Step number stripe */}
                <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-500 to-emerald-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                
                <div className="relative shrink-0">
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-blue-50 to-emerald-50 transition-all duration-400 group-hover:from-blue-600 group-hover:to-sky-500">
                    <Icon className="h-5 w-5 text-blue-600 transition-colors duration-400 group-hover:text-white" />
                  </div>
                  <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-blue-600 text-[9px] font-bold text-white shadow-md">
                    {index + 1}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-[15px] font-bold tracking-[-.02em] text-slate-950">{step.title}</h3>
                  <p className="mt-0.5 text-[13px] leading-5 text-slate-500">{step.desc}</p>
                </div>
                <svg className="h-4 w-4 shrink-0 text-slate-300 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </div>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}

function TestimonialsSection() {
  return (
    <Section id="testimonials" eyebrow="Patient testimonials" title="What our patients say about us." subtitle="Real experiences from local families who trust us for their everyday healthcare needs.">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        pagination={{ el: '.testimonials-dots', clickable: true }}
        spaceBetween={16}
        loop
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="testimonials-swiper"
      >
        {testimonials.map((item) => (
          <SwiperSlide key={item.name} className="!h-auto">
            <div className="group h-full rounded-[24px] border border-slate-200/70 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,.04)] transition-all duration-400 hover:-translate-y-1 hover:border-blue-200/60 hover:shadow-[0_24px_60px_rgba(37,99,235,.1)]">
              {/* Stars */}
              <div className="flex text-amber-400">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>

              {/* Quote */}
              <div className="mt-4 flex-1">
                <Quote className="h-7 w-7 text-blue-200 transition-colors duration-300 group-hover:text-blue-300" />
                <p className="mt-2 text-[15px] leading-7 text-slate-600">{item.text}</p>
              </div>

              {/* Author */}
              <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-5">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-blue-600 to-sky-500 text-sm font-bold text-white shadow-[0_4px_12px_rgba(37,99,235,.2)]">
                  {item.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-bold tracking-[-.01em] text-slate-950">{item.name}</h3>
                  <p className="text-[12px] text-slate-400">Verified Patient</p>
                </div>
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-600 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">
                  <FaGoogle className="h-3.5 w-3.5" />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Dots outside the Swiper */}
      <div className="testimonials-dots mt-8 flex justify-center" />
    </Section>
  )
}

function GallerySection() {
  const [active, setActive] = useState(null)
  return (
    <Section id="gallery" eyebrow="Photo gallery" title="A visual preview of a clean, organized clinic environment." subtitle="Premium placeholders are included and ready to be replaced with original clinic photographs.">
      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
        {gallery.map((item, index) => (
          <button key={item.title} type="button" onClick={() => setActive(item)} className="group mb-5 block w-full overflow-hidden rounded-[28px] border border-slate-200/60 bg-white shadow-[0_8px_32px_rgba(15,23,42,.06)] transition-all duration-400 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(37,99,235,.12)]">
            <div className={`${index % 2 ? 'h-80' : 'h-64'} relative overflow-hidden`}>
              <img src={item.image} alt={item.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
              <div className="relative flex h-full flex-col justify-end p-6">
                <p className="text-xs font-bold uppercase tracking-[.12em] text-white/70">Clinic image</p>
                <h3 className="mt-1 text-[15px] font-bold leading-[1.25] tracking-[-.02em] text-white sm:text-xl">{item.title}</h3>
                <div className="mt-3 flex items-center gap-1.5 text-[13px] font-bold text-white/80 transition-colors group-hover:text-white">
                  <span>View</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
      <AnimatePresence>
        {active && (
          <motion.div className="fixed inset-0 z-[95] grid place-items-center bg-slate-950/80 p-4 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActive(null)}>
            <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} className="relative w-full max-w-4xl  rounded-[32px] bg-white shadow-[0_40px_100px_rgba(15,23,42,.4)]">
              <button className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-blue-400 backdrop-blur-sm ring-1 ring-slate-200 transition-all hover:bg-blue-500 hover:shadow-lg" type="button" onClick={() => setActive(null)} aria-label="Close gallery"><X className="h-5 w-5 text-white" /></button>
              <img src={active.image} alt={active.title} className="h-auto w-full object-cover" />
              <div className="p-6">
                <p className="text-xs font-bold uppercase tracking-[.12em] text-slate-400">Clinic photograph</p>
                <h3 className="mt-1 text-lg font-bold tracking-[-.03em] text-slate-950 sm:text-2xl sm:tracking-[-.04em]">{active.title}</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  )
}

function WellnessSection() {
  const tipIcons = [Pill, HeartPulse, Leaf, Wifi]
  return (
    <Section id="wellness" className="section-alt-bg" eyebrow="Health tips & wellness" title="Practical health awareness for everyday families." subtitle="Helpful, simple, and local-first wellness guidance.">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {wellnessTips.map((tip, index) => {
          const Icon = tipIcons[index] ?? Sparkles
          return (
            <Reveal key={tip.title} delay={index * 0.05}>
              <article className="group h-full overflow-hidden rounded-[24px] bg-gradient-to-br from-blue-100/50 via-white to-emerald-100/50 p-px transition-all duration-400 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(37,99,235,.1)]">
                <div className="h-full rounded-[23px] bg-white/95 p-6 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-blue-50 to-emerald-50 text-blue-600 ring-1 ring-blue-100/80 transition-all duration-300 group-hover:from-blue-600 group-hover:to-sky-500 group-hover:text-white group-hover:ring-0">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-[.12em] text-blue-700 ring-1 ring-blue-100/80">{tip.category}</span>
                  </div>
                  <h3 className="mt-5 text-[15px] font-bold leading-[1.25] tracking-[-.02em] text-slate-950 sm:text-xl">{tip.title}</h3>
                  <p className="mt-3 text-[15px] leading-7 text-slate-500">{tip.excerpt}</p>
                </div>
              </article>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}

function FAQSection() {
  const [open, setOpen] = useState(0)
  return (
    <Section id="faq" eyebrow="FAQ" title="Answers before you visit." subtitle="Clear information helps patients feel prepared and confident.">
      <div className="mx-auto max-w-3xl space-y-4">
        {faqs.map((faq, index) => (
          <div key={faq.question} className={`group overflow-hidden rounded-[22px] border transition-all duration-350 ${open === index ? 'border-blue-200/80 bg-white/95 shadow-[0_20px_50px_rgba(37,99,235,.08)] backdrop-blur-sm' : 'border-slate-200/80 bg-white/80 backdrop-blur-sm hover:border-blue-200/60 hover:shadow-[0_16px_40px_rgba(15,23,42,.05)]'}`}>
            <button type="button" onClick={() => setOpen(open === index ? null : index)} className="flex w-full items-center justify-between gap-4 p-5 text-left">
              <div className="flex items-center gap-3">
                <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl transition-all duration-300 ${open === index ? 'bg-gradient-to-br from-blue-600 to-sky-500 text-white shadow-[0_8px_20px_rgba(37,99,235,.2)]' : 'bg-gradient-to-br from-blue-50 to-emerald-50 text-blue-600 ring-1 ring-blue-100/80'}`}>
                  <span className="text-xs font-bold">{String(index + 1).padStart(2, '0')}</span>
                </span>
                <span className="text-[15px] font-bold leading-[1.3] tracking-[-.015em] text-slate-950 sm:text-lg">{faq.question}</span>
              </div>
              <motion.span animate={{ rotate: open === index ? 180 : 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
                <ChevronDown className={`h-5 w-5 shrink-0 transition-colors ${open === index ? 'text-blue-600' : 'text-slate-400'}`} />
              </motion.span>
            </button>
            <AnimatePresence>
              {open === index && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
                  <div className="border-t border-slate-100 px-5 pb-5 pt-4">
                    <p className="text-[15px] leading-7 text-slate-500">{faq.answer}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </Section>
  )
}

function ConsultationSection({ onBook }) {
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(clinic.address)}`
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(clinic.location)}&output=embed`

  const contactItems = [
    { icon: MapPin, label: 'Visit Us', value: clinic.address, href: directionsUrl, external: true },
    { icon: Phone, label: 'Call Us', value: clinic.phonePrimary, href: phoneHref },
    { icon: MessageCircle, label: 'WhatsApp', value: 'Chat with us instantly', href: whatsappHref, external: true },
    { icon: Clock3, label: 'Opening Hours', value: clinic.hours },
  ]

  return (
    <Section id="consultation" className="section-alt-bg" eyebrow="Get in touch" title="Book a visit or reach out to us." subtitle="We're here to help with medicines, checkups, and health guidance.">
      <div className="grid items-stretch gap-5 sm:gap-6 lg:grid-cols-[1fr_1.1fr]">
        {/* Left: Contact Information */}
        <Reveal>
          <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/70 bg-white/90 p-4 shadow-[0_20px_56px_rgba(15,23,42,.06)] backdrop-blur-sm sm:rounded-[24px] sm:p-6 lg:p-8">
            <div className="mb-4 sm:mb-6">
              <h3 className="text-lg font-bold tracking-[-.03em] text-slate-950 sm:text-2xl">Contact Information</h3>
              <p className="mt-1 text-[13px] text-slate-500 sm:text-[15px]">Reach us directly or visit the clinic.</p>
            </div>

            <div className="space-y-2">
              {contactItems.map((item) => {
                const Icon = item.icon
                const Wrapper = item.href ? 'a' : 'div'
                const wrapperProps = item.href ? { href: item.href, target: item.external ? '_blank' : undefined, rel: item.external ? 'noreferrer' : undefined } : {}

                return (
                  <div key={item.label}>
                    <Wrapper {...wrapperProps} className={`group flex items-start gap-2.5 rounded-xl bg-slate-50/80 p-3 transition-all duration-300 hover:bg-blue-50/60 sm:items-center sm:gap-4 sm:rounded-2xl sm:p-4 ${item.href ? 'cursor-pointer' : ''}`}>
                      <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-blue-50 to-emerald-50 text-blue-600 ring-1 ring-blue-100/80 transition-all duration-300 group-hover:from-blue-600 group-hover:to-sky-500 group-hover:text-white group-hover:ring-0 group-hover:shadow-[0_8px_20px_rgba(37,99,235,.2)] sm:mt-0 sm:h-10 sm:w-10 sm:rounded-xl">
                        <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-bold uppercase tracking-[.1em] text-slate-400 sm:text-[11px]">{item.label}</p>
                        <p className="mt-0.5 break-words text-[12px] font-semibold leading-snug text-slate-700 transition-colors group-hover:text-blue-700 sm:text-[14px]">{item.value}</p>
                      </div>
                      {item.href && <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 text-slate-300 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-blue-500 sm:mt-0 sm:h-4 sm:w-4" />}
                    </Wrapper>
                  </div>
                )
              })}
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5 sm:mt-5 sm:gap-2">
              {['Licensed Healthcare', 'Genuine Medicines', 'Trusted Local Clinic'].map((badge) => (
                <span key={badge} className="inline-flex items-center gap-1 rounded-full bg-blue-50/80 px-2 py-1 text-[9px] font-bold tracking-[.02em] text-blue-700 ring-1 ring-blue-100/80 sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-[11px]">
                  <ShieldCheck className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Right: Map */}
        <Reveal delay={0.08}>
          <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/70 bg-white/90 p-4 shadow-[0_20px_56px_rgba(15,23,42,.06)] backdrop-blur-sm sm:rounded-[24px] sm:p-6 lg:p-8">
            <div className="mb-3 sm:mb-5">
              <h3 className="text-lg font-bold tracking-[-.03em] text-slate-950 sm:text-2xl">Find Us</h3>
              <p className="mt-1 text-[13px] text-slate-500 sm:text-[15px]">Located at Prithvipal Garh, Uttar Pradesh.</p>
            </div>

            <div className="flex-1 overflow-hidden rounded-xl border border-slate-200/80 sm:rounded-2xl">
              <iframe title="Google map for Buddha Medical & General Store" src={mapSrc} className="h-[200px] w-full sm:h-[260px] lg:h-full lg:min-h-[300px]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>

            <a href={directionsUrl} target="_blank" rel="noreferrer" className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-slate-50 p-2.5 text-[13px] font-semibold text-slate-700 ring-1 ring-slate-200 transition-all duration-300 hover:bg-blue-50 hover:text-blue-700 hover:ring-blue-200 sm:mt-4 sm:p-3 sm:text-sm">
              <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Get Directions
            </a>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,.12),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(34,197,94,.08),transparent_40%)]" />
      <div className="pointer-events-none absolute -left-32 top-0 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-64 w-64 rounded-full bg-emerald-500/5 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo inverse />
          <p className="mt-5 max-w-sm text-[15px] leading-7 text-slate-400">Premium local healthcare and pharmacy support by {clinic.owner}, serving Prithvipal Garh families with trust and care.</p>
          <div className="mt-6 flex gap-3">
            {[
              [whatsappHref, FaWhatsapp, 'WhatsApp', 'hover:bg-emerald-500 hover:shadow-[0_8px_24px_rgba(34,197,94,.3)]'],
              ['#home', FaInstagram, 'Instagram', 'hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 hover:shadow-[0_8px_24px_rgba(168,85,247,.3)]'],
              ['#contact', FaGoogle, 'Google', 'hover:bg-blue-600 hover:shadow-[0_8px_24px_rgba(37,99,235,.3)]'],
            ].map(([href, Icon, label, hoverClass]) => (
              <a key={label} href={href} className={`grid h-10 w-10 place-items-center rounded-xl bg-white/8 text-slate-400 ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:text-white ${hoverClass}`} aria-label={label}>
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-[.1em] text-slate-300">Quick Links</h3>
          <div className="mt-4 grid gap-2.5 text-[15px] leading-6 text-slate-400">
            {navLinks.slice(0, 6).map((link) => (
              <a key={link.href} href={link.href} className="transition-colors hover:text-white">{link.label}</a>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-[.1em] text-slate-300">Services</h3>
          <div className="mt-4 grid gap-2.5 text-[15px] leading-6 text-slate-400">
            {services.slice(0, 6).map((service) => (
              <span key={service.title} className="transition-colors">{service.title}</span>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-[.1em] text-slate-300">Contact</h3>
          <div className="mt-4 grid gap-2.5 text-[15px] leading-6 text-slate-400">
            <span>{clinic.hours}</span>
            <span>{clinic.location}</span>
            <a href={phoneHref} className="transition-colors hover:text-white">{clinic.phonePrimary}</a>
            <a href={whatsappHref} className="transition-colors hover:text-emerald-400">WhatsApp</a>
            <Link to="/privacy-policy" className="transition-colors hover:text-white">Privacy Policy</Link>
            <Link to="/terms-and-conditions" className="transition-colors hover:text-white">Terms & Conditions</Link>
          </div>
        </div>
      </div>
      <div className="premium-divider relative mx-auto mt-12 max-w-7xl" />
      <div className="relative mx-auto mt-6 flex max-w-7xl flex-col items-center justify-between gap-2 text-sm text-slate-500 sm:flex-row sm:text-left">
        <span>© {new Date().getFullYear()} {clinic.name}. All rights reserved.</span>
        <span>
          Made By{' '}
          <a
            href="https://instagram.com/_____saurabh_.x"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-blue-400 transition-colors hover:text-blue-300"
            style={{ textDecoration: 'underline', textDecorationColor: 'white' }}
          >
            Saurabh Agrahari
          </a>
        </span>
      </div>
    </footer>
  )
}

function FloatingActions({ onBook }) {
  const [topVisible, setTopVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setTopVisible(window.scrollY > 700)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <div className="pointer-events-none fixed bottom-4 right-3 z-50 flex flex-col items-center gap-2 sm:bottom-6 sm:right-5 sm:gap-2.5">
      <AnimatePresence>
        {topVisible && (
          <motion.button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="pointer-events-auto grid h-9 w-9 place-items-center rounded-full bg-white text-slate-950 shadow-lg ring-1 ring-slate-200/80 backdrop-blur-sm sm:h-10 sm:w-10"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            aria-label="Scroll to top"
          >
            <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5" />
          </motion.button>
        )}
      </AnimatePresence>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        className="pointer-events-auto grid h-10 w-10 place-items-center rounded-full bg-emerald-500 text-white shadow-lg transition-transform hover:scale-105 sm:h-11 sm:w-11"
        aria-label="WhatsApp clinic"
      >
        <FaWhatsapp className="h-5 w-5 sm:h-[22px] sm:w-[22px]" />
      </a>
      <a
        href={phoneHref}
        className="pointer-events-auto grid h-10 w-10 place-items-center rounded-full bg-blue-600 text-white shadow-lg transition-transform hover:scale-105 sm:h-11 sm:w-11"
        aria-label="Call clinic"
      >
        <Phone className="h-5 w-5 sm:h-[22px] sm:w-[22px]" />
      </a>
    </div>
  )
}

function HomePage({ onBook }) {
  return (
    <>
                <SEO title={`${clinic.name} | Premium Clinic & Pharmacy in Prithvipal Garh`} description="Trusted medicines, consultation, BP and sugar checkups, nebulizer service, and local healthcare support at Buddha Medical store, Prithvipal Garh, Uttar Pradesh 273157." />
      <Hero onBook={onBook} />
      <EmergencyBanner />
       <AboutSection />
      <ServicesSection />
     
      <WhyChooseSection />
      <FacilitiesSection />
      <ProcessSection />
      <TestimonialsSection />
      <GallerySection />
      <WellnessSection />
      <FAQSection />
      <ConsultationSection onBook={onBook} />
    </>
  )
}

function LegalPage({ type }) {
  const isPrivacy = type === 'privacy'
  return (
    <>
      <SEO title={`${isPrivacy ? 'Privacy Policy' : 'Terms & Conditions'} | ${clinic.name}`} description={`${clinic.name} ${isPrivacy ? 'privacy policy' : 'terms and conditions'}.`} />
      <section className="px-4 pb-20 pt-36 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-[32px] bg-white p-6 shadow-xl ring-1 ring-slate-200 sm:p-10">
          <Link to="/" className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-blue-700"><Home className="h-4 w-4" /> Back to Home</Link>
          <h1 className="text-4xl font-bold leading-[1.13] tracking-[-.045em] text-slate-950 sm:text-6xl">{isPrivacy ? 'Privacy Policy' : 'Terms & Conditions'}</h1>
          <div className="mt-8 space-y-6 leading-8 text-slate-600">
            {isPrivacy ? (
              <>
                <p>We collect appointment details such as name, phone number, age, health concern, and preferred timing only to respond to consultation and medicine inquiries.</p>
                <p>Information submitted through the website may be processed through EmailJS when configured by the site owner. Patients may also contact the clinic directly by call or WhatsApp.</p>
                <p>We do not sell personal information. Medical decisions should always be confirmed during direct consultation with a qualified healthcare professional.</p>
              </>
            ) : (
              <>
                <p>This website provides general information about pharmacy and basic healthcare services offered by {clinic.name}.</p>
                <p>Online booking requests are not emergency medical services. For urgent situations, call the clinic or visit the nearest emergency facility.</p>
                <p>Medicine availability, pricing, and service timings may change. Please confirm details by call before visiting.</p>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

function NotFound() {
  return (
    <section className="grid min-h-screen place-items-center px-4 pt-24 text-center">
      <SEO title={`Page Not Found | ${clinic.name}`} description="The requested page could not be found." />
      <div className="max-w-xl">
        <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full bg-blue-50 text-blue-600"><ExternalLink className="h-9 w-9" /></div>
        <h1 className="text-5xl font-bold leading-[1.13] tracking-[-.045em] text-slate-950">404 — Page not found</h1>
        <p className="mt-4 leading-8 text-slate-600">The page you are looking for may have moved. Return to the clinic homepage.</p>
        <Button href="/" className="mt-7">Go Home</Button>
      </div>
    </section>
  )
}

export default function App() {
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <div className="min-h-screen overflow-x-hidden text-slate-800">
      <LoadingScreen />
      <Navbar onBook={() => setModalOpen(true)} />
      <PageTransition>
        <Routes>
          <Route path="/" element={<HomePage onBook={() => setModalOpen(true)} />} />
          <Route path="/privacy-policy" element={<LegalPage type="privacy" />} />
          <Route path="/terms-and-conditions" element={<LegalPage type="terms" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageTransition>
      <Footer />
      <FloatingActions onBook={() => setModalOpen(true)} />
      <ConsultationModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  )
}
