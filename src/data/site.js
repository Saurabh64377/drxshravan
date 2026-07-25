import {
  BadgePlus,
  BookMarked,
  BriefcaseMedical,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  HeartPulse,
  Leaf,
  MessageCircle,
  Pill,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  TestTubes,
  TimerReset,
  Users,
  Wifi,
} from 'lucide-react'

export const clinic = {
  name: 'Buddha Medical & General Store',
  owner: 'Drx. Shravan Paswan',
  qualification: 'D.Pharma (B.T.E. UP Lucknow)',
  location: 'Buddha Medical store, Mahaflaxcs Banaha, Prithvipal Garh, Uttar Pradesh 273157',
  address:
    'Buddha Medical store, Mahaflaxcs Banaha, Prithvipal Garh, Uttar Pradesh 273157',
  phonePrimary: '+91 9621917053',
  phoneSecondary: '+91 9580921898',
  whatsapp: '+919621917053',
  email: 'hello@buddhamedical.store',
  hours: 'Mon–Sun · 8:00 AM – 9:30 PM',
  emergency: '+91 9621917053',
}

export const navLinks = [
  { label: 'Home', href: '#home' },
   { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
 
  { label: 'Facilities', href: '#facilities' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#consultation' },
]

export const services = [
  { title: 'General Medicines', description: 'Quality branded and generic medicines with careful guidance.', icon: Pill },
  { title: 'Prescription Medicines', description: 'Quick dispensing with dosage awareness and medicine safety support.', icon: BookMarked },
  { title: 'Blood Pressure Check', description: 'Reliable BP monitoring with a calm, private consultation experience.', icon: HeartPulse },
  { title: 'Blood Sugar Test', description: 'Fast capillary sugar testing and practical next-step advice.', icon: TestTubes },
  { title: 'Nebulizer Service', description: 'Supportive respiratory care in a hygienic, comfortable setting.', icon: Wifi },
  { title: 'Health Consultation', description: 'Personalized primary healthcare guidance for families and seniors.', icon: Stethoscope },
  { title: 'Medical Guidance', description: 'Medicines explained clearly for safe, informed use.', icon: BadgePlus },
  { title: 'Healthcare Essentials', description: 'Trusted essentials, wellness items, and daily care products.', icon: BriefcaseMedical },
]

export const whyChoose = [
  { title: 'Experienced Healthcare Professional', text: 'Guidance shaped by a pharmacy background and local clinical experience.', icon: Users },
  { title: 'Affordable Medicines', text: 'Premium service quality with thoughtful pricing for families.', icon: CircleDollarSign },
  { title: 'Trusted Local Clinic', text: 'A familiar neighborhood destination with personal care.', icon: ShieldCheck },
  { title: 'Quick Consultation', text: 'Efficient advice and support without feeling rushed.', icon: TimerReset },
  { title: 'Personalized Care', text: 'Every patient receives clear, practical attention.', icon: Sparkles },
  { title: 'Reliable Service', text: 'Consistent opening hours and responsive support when needed.', icon: CheckCircle2 },
]

export const facilities = [
  { title: 'Medicine availability', desc: 'Wide range of branded and generic medicines always in stock.' },
  { title: 'BP monitoring', desc: 'Quick and accurate blood pressure checks in a private setting.' },
  { title: 'Sugar testing', desc: 'Fast capillary blood sugar testing with instant results.' },
  { title: 'Nebulizer support', desc: 'Comfortable nebulizer service for respiratory care needs.' },
  { title: 'Health consultation', desc: 'Personalized guidance for families, seniors, and daily health concerns.' },
  { title: 'Patient guidance', desc: 'Clear instructions on dosage, usage, and follow-up care.' },
  { title: 'Affordable pricing', desc: 'Premium service quality with honest, family-friendly pricing.' },
  { title: 'Emergency support', desc: 'Quick medicine access and guidance during urgent health needs.' },
  { title: 'Medicine delivery', desc: ' doorstep delivery for regular and prescribed medicines nearby.' },
  { title: 'Health records', desc: ' organized tracking and guidance for ongoing treatments.' },
  { title: 'Senior care support', desc: ' Dedicated attention and medicine guidance for elderly patients.' },
  { title: 'Child-friendly service', desc: ' Gentle care and medicine advice for kids and families.' },
]

export const process = [
  'Call Clinic',
  'Schedule Appointment',
  'Visit Clinic',
  'Consultation',
  'Medicine & Treatment',
]

export const testimonials = [
  {
    name: 'Amit Yadav',
    rating: 5,
    text: 'Very professional and caring. The consultation was clear and the medicines were explained properly.',
  },
  {
    name: 'Sushma Devi',
    rating: 5,
    text: 'A neat clinic with polite support. BP and sugar checks were quick and affordable.',
  },
  {
    name: 'Ravi Kumar',
    rating: 5,
    text: 'It feels trustworthy and local, but with a premium clinic experience. Highly recommended.',
  },
  {
    name: 'Meena Singh',
    rating: 5,
    text: 'The staff was very respectful and the guidance felt honest and professional.',
  },
  {
    name: 'Pradeep Gupta',
    rating: 5,
    text: 'Quick medicine availability and fair prices. My family trusts this clinic for all basic health needs.',
  },
  {
    name: 'Sunita Paswan',
    rating: 5,
    text: 'The nebulizer service and BP check were very smooth. Clean environment and caring approach.',
  },
]

export const gallery = [
  { title: 'Reception & medicine counter', tone: 'blue', image: './sarvan6.png' },
  { title: 'Consultation corner', tone: 'green', image: 'sarvan7.png' },
  { title: 'Medicine shelves', tone: 'sky', image: 'sarvan8.png' },
  { title: 'Testing setup', tone: 'indigo', image: 'sarvan9.png' },
  { title: 'Patient guidance desk', tone: 'emerald', image: 'https://images.unsplash.com/photo-1765031092161-a9ebe556117e?w=800&h=600&fit=crop&auto=format' },
  { title: 'Hygienic service area', tone: 'teal', image: 'sarvan5.png' },
]

export const wellnessTips = [
  {
    title: 'Keep medicines organized',
    category: 'Medicine Tips',
    excerpt: 'Store tablets safely and check expiry dates before use.',
  },
  {
    title: 'Check BP regularly',
    category: 'Health Awareness',
    excerpt: 'Routine pressure monitoring helps catch concerns early.',
  },
  {
    title: 'Stay hydrated in summer',
    category: 'Seasonal Care',
    excerpt: 'Heat can affect energy, sugar levels, and general wellness.',
  },
  {
    title: 'Use inhalation devices properly',
    category: 'Wellness Guide',
    excerpt: 'Nebulizers work best when used cleanly and as instructed.',
  },
]

export const faqs = [
  {
    question: 'Do you provide both medicines and basic consultation?',
    answer: 'Yes, we combine pharmacy support with basic healthcare guidance for families and local patients.',
  },
  {
    question: 'Is BP and sugar testing available?',
    answer: 'Yes, we offer BP monitoring and blood sugar testing at the clinic.',
  },
  {
    question: 'How can I book a consultation?',
    answer: 'You can call, WhatsApp, or fill out the online consultation form.',
  },
  {
    question: 'What are your working hours?',
    answer: 'We generally operate from 8:00 AM to 9:30 PM, seven days a week.',
  },
]

export const landmarks = [
  'Near Prithvipal Garh market',
  'Easy road access from local areas',
  'Suitable for local family visits',
]

export const quickStats = [
  { label: 'Happy Patients', value: '500+' },
  { label: 'Medicines Available', value: '1,000+' },
  { label: 'Years of Trust', value: '4+' },
  { label: 'Emergency Support', value: '24*7' },
]

export const heroHighlights = [
  'Genuine Medicines',
  'Licensed Professional',
  'Affordable Healthcare',
  'Trusted Local Clinic',
]

export const featuredBadges = [
  { label: 'Private clinic feel', icon: Sparkles },
  { label: 'Fast local support', icon: Clock3 },
  { label: 'Family friendly', icon: Leaf },
  { label: 'Call-first service', icon: MessageCircle },
]

export const emergencyBanner = {
  title: 'Need immediate medicine guidance or health advice?',
  action: 'Call Now',
}

export const brandMarks = [
  { label: 'Medical Cross', icon: HeartPulse },
  { label: 'Capsule', icon: Pill },
  { label: 'Heartbeat', icon: Sparkles },
  { label: 'Leaf care', icon: Leaf },
]
