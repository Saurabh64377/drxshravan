import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { motion, AnimatePresence } from 'framer-motion'
import { CalendarCheck2, CheckCircle2, Clock, MessageCircle, Phone, Send, Shield, X } from 'lucide-react'
import { clinic } from '../data/site'

const initialForm = {
  fullName: '',
  phone: '',
  age: '',
  gender: '',
  concern: '',
  date: '',
  time: '',
  message: '',
}

export default function ConsultationModal({ open, onClose }) {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle')
  const [errors, setErrors] = useState({})

  const validate = () => {
    const next = {}
    if (!form.fullName.trim()) next.fullName = 'Name is required'
    if (!/^\d{10}$/.test(form.phone.replace(/\D/g, ''))) next.phone = 'Enter a valid 10 digit phone number'
    if (!form.concern.trim()) next.concern = 'Please share your health concern'
    if (!form.date) next.date = 'Select a preferred date'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!validate()) return
    setStatus('loading')

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

      if (serviceId && templateId && publicKey) {
        await emailjs.send(serviceId, templateId, form, publicKey)
      } else {
        await new Promise((resolve) => setTimeout(resolve, 850))
      }

      setStatus('success')
      setForm(initialForm)
    } catch {
      setStatus('error')
    }
  }

  const update = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] grid place-items-center bg-slate-950/50 px-4 py-6 backdrop-blur-md sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="consultation-title"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 200, damping: 24 }}
            className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-[24px] bg-white shadow-2xl lg:flex-row lg:rounded-[28px]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Doctor Image Panel — lg+ only */}
            <div className="relative hidden w-[380px] shrink-0 flex-col justify-between overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-8 xl:w-[420px] lg:flex">
              <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-emerald-400/15 blur-3xl" />

              <button
                type="button"
                onClick={onClose}
                className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/15 text-white/80 backdrop-blur-sm transition-colors hover:bg-white/25 hover:text-white"
                aria-label="Close consultation form"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="relative z-10">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-[.14em] text-white/90 backdrop-blur-sm">
                  <CalendarCheck2 className="h-3.5 w-3.5" /> Expert Consultation
                </div>
                <h2 id="consultation-title" className="text-2xl font-bold leading-[1.15] tracking-[-.035em] text-white lg:text-3xl">
                  Your Health,<br />Our Priority
                </h2>
                <p className="mt-3 text-[13px] leading-relaxed text-white/70">
                  Get personalized consultation from our experienced medical professionals.
                </p>
              </div>

              <div className="relative z-10 my-6 flex-1">
                <div className="relative mx-auto w-full max-w-[260px]">
                  <div className="absolute inset-0 rounded-[20px] bg-white/10 blur-xl" />
                  <img src="./sarvan3.png" alt={clinic.owner} className="relative w-full rounded-[20px] object-contain drop-shadow-2xl" />
                </div>
              </div>

              <div className="relative z-10 space-y-3">
                {[
                  { icon: Clock, text: 'Response within 30 minutes' },
                  { icon: Shield, text: '100% confidential & secure' },
                  { icon: MessageCircle, text: 'Call or WhatsApp available' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2.5 text-[12px] font-medium text-white/75">
                    <div className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-white/10">
                      <Icon className="h-3.5 w-3.5 text-white/80" />
                    </div>
                    {text}
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile/Tablet Header — below lg */}
            <div className="flex shrink-0 items-center justify-between border-b border-slate-100 bg-gradient-to-r from-blue-50 to-indigo-50 px-5 py-4 lg:hidden">
              <div className="flex items-center gap-2.5">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-blue-100">
                  <CalendarCheck2 className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-bold tracking-[-.02em] text-slate-900">Book Consultation</p>
                  <p className="text-[11px] text-slate-500">Fill in your details below</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="grid h-9 w-9 place-items-center rounded-full bg-white text-slate-500 shadow-sm ring-1 ring-slate-200 transition-colors hover:bg-slate-50 hover:text-slate-700"
                aria-label="Close consultation form"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Form Panel */}
            <div className="flex-1 overflow-y-auto px-5 py-6 max-h-[80vh] lg:max-h-none lg:px-8 lg:py-7">
              <div className="mb-5 lg:mb-0">
                <h3 className="text-lg font-bold tracking-[-.03em] text-slate-900">Tell us what you need</h3>
                <p className="mt-1 text-[13px] text-slate-500">Submit your preferred timing or connect instantly through call/WhatsApp.</p>
              </div>

              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-5 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-800"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
                  <div>
                    <p className="font-semibold">Request received!</p>
                    <p className="text-[12px] text-emerald-600">We will contact you soon.</p>
                  </div>
                </motion.div>
              )}
              {status === 'error' && (
                <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  Something went wrong. Please call or WhatsApp the clinic directly.
                </div>
              )}

              <form onSubmit={handleSubmit} className="grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    ['fullName', 'Full Name', 'text', 'e.g. Rahul Kumar'],
                    ['phone', 'Phone Number', 'tel', '10-digit mobile number'],
                    ['age', 'Age', 'number', 'e.g. 28'],
                    ['date', 'Preferred Date', 'date', ''],
                    ['time', 'Preferred Time', 'time', ''],
                  ].map(([name, label, type, placeholder]) => (
                    <label key={name} className="block">
                      <span className="mb-1.5 block text-[12px] font-bold uppercase tracking-[.1em] text-slate-500">{label}</span>
                      <input
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-[13px] font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                        name={name}
                        type={type}
                        value={form[name]}
                        onChange={update}
                        placeholder={placeholder}
                      />
                      {errors[name] && <span className="mt-1 block text-[11px] text-red-500">{errors[name]}</span>}
                    </label>
                  ))}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-[12px] font-bold uppercase tracking-[.1em] text-slate-500">Gender</span>
                    <select
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-[13px] font-medium text-slate-900 outline-none transition-all focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                      name="gender"
                      value={form.gender}
                      onChange={update}
                    >
                      <option value="">Select</option>
                      <option>Female</option>
                      <option>Male</option>
                      <option>Other</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-[12px] font-bold uppercase tracking-[.1em] text-slate-500">Health Concern</span>
                    <input
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-[13px] font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                      name="concern"
                      value={form.concern}
                      onChange={update}
                      placeholder="Fever, cough, BP check..."
                    />
                    {errors.concern && <span className="mt-1 block text-[11px] text-red-500">{errors.concern}</span>}
                  </label>
                </div>

                <label className="block">
                  <span className="mb-1.5 block text-[12px] font-bold uppercase tracking-[.1em] text-slate-500">Message</span>
                  <textarea
                    className="min-h-[88px] w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-[13px] font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    name="message"
                    value={form.message}
                    onChange={update}
                    placeholder="Add symptoms, medicine query, or availability request"
                  />
                </label>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                  >
                    <Send className="h-4 w-4" /> {status === 'loading' ? 'Sending...' : 'Submit Request'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
