import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Cpu, UserCheck, FileCheck, Zap, ArrowRight, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { SCANS, PACKAGES, CATEGORIES, TESTIMONIALS, img, itemPath } from '../data/data';
import { BRAND } from '../config';
import { Reveal } from '../utils/motion';
import { useLocalStorage } from '../hooks/useLocalStorage';
import Img from '../components/Img';
import BookingForm from '../components/BookingForm';
import ItemCard from '../components/ItemCard';

const BANNERS = [
  ['/_nuxt/homeBg1.ds_kQjFV.png', '/_nuxt/mblBnr1.BnwutVlq.png', '/lab-tests'],
  ['/_nuxt/homeBg2.lZAW-oZY.png', '/_nuxt/mblBnr2.bKvOX-4g.png', '/nalvazhvu-packages'],
  ['/_nuxt/homeBg3.Brd4ltOF.png', '/_nuxt/mblBnr3.DVmy_jTX.png', '/nalan-packages'],
  ['/_nuxt/homeBg4.5WVTXIPl.png', '/_nuxt/mblBnr4.lU5yFxhn.png', '/scans'],
];

function Hero() {
  const [i, setI] = useState(0);
  const n = BANNERS.length;
  const [d, m, to] = BANNERS[i];
  return (
    <section className="relative bg-brand-light">
      <Link to={to}>
        <picture>
          <source media="(max-width: 767px)" srcSet={img(m)} />
          <Img key={i} src={img(d)} alt={`${BRAND} offer banner ${i + 1}`} className="mx-auto w-full max-w-[1600px] animate-[fadein_.6s_ease]" loading="eager" />
        </picture>
      </Link>
      <button aria-label="Previous" onClick={() => setI((i + n - 1) % n)} className="absolute left-2 top-1/2 rounded-full bg-white/80 p-2 shadow hover:bg-white"><ChevronLeft /></button>
      <button aria-label="Next" onClick={() => setI((i + 1) % n)} className="absolute right-2 top-1/2 rounded-full bg-white/80 p-2 shadow hover:bg-white"><ChevronRight /></button>
      <style>{'@keyframes fadein{from{opacity:.2}to{opacity:1}}'}</style>
    </section>
  );
}

function CallbackStrip() {
  const [phone, setPhone] = useLocalStorage('callbackPhone', '');
  const [ok, setOk] = useState(false);
  return (
    <section className="bg-brand text-white">
      <form className="container-page flex flex-wrap items-center gap-3 py-4" onSubmit={(e) => { e.preventDefault(); if (phone.trim().length >= 8) setOk(true); }}>
        <h2 className="font-semibold">Get a Callback in 30 Seconds</h2>
        <input className="input !w-56 text-ink" placeholder="Phone number" value={phone} onChange={(e) => { setOk(false); setPhone(e.target.value); }} />
        <button className="btn bg-white text-brand hover:bg-brand-light">Submit</button>
        <span className="ml-auto text-sm">24/7 Home Sample Collection</span>
        {ok && <p className="w-full text-sm" role="status">Demo only: number saved in this browser; no callback will happen.</p>}
      </form>
    </section>
  );
}

const FEATURES = [[Cpu, 'Cutting Edge technology'], [UserCheck, 'Expert Staff'], [FileCheck, 'Precise Reports'], [Zap, 'Quick turn around time']];
const DIFF = [['/assets/image/scanIcon.png', "Chennai's only Diagnostic Centre with 3T MRI"], ['/assets/image/equipmentIcon.png', 'NABL-accredited lab with high-end equipment.'], ['/assets/image/groupIcon.png', 'Expert Radiologists & Pathologists'], ['/assets/image/24x7Icon.png', '24/7 Radiologists & Pathologists Services'], ['/assets/image/ratingIcon.png', '1L+ patients, 25K MRI, 40K CT scans.']];
const STEPS = [['/assets/image/homeCollectionStep1.png', 'Book Your Appointment', 'Schedule your home sample collection through our website or call us to choose a convenient time.'], ['/assets/image/homeCollectionStep2.png', 'Collection at Your Doorstep', 'Our trained professionals will arrive at your home to collect the samples safely and efficiently.'], ['/assets/image/homeCollectionStep3.png', 'Get Your Results', 'Receive your test results online, quickly and securely, once the analysis is complete.']];

function BookingBand({ title }) {
  return (
    <div className="mt-10 grid items-center gap-8 rounded-xl bg-brand-light p-6 md:grid-cols-2">
      <div><h3 className="text-2xl font-bold text-brand-dark">Don't Let Doubts Linger – Get Diagnosed Today!</h3><p className="mt-2 text-gray-600">Worried about your health? Get the clarity you need and peace of mind you deserve. {title}</p></div>
      <div><h4 className="mb-3 font-semibold">Book Your Appointment</h4><BookingForm context="Home" /></div>
    </div>
  );
}

export default function Home() {
  const [tab, setTab] = useLocalStorage('homePkgTab', 'nalan', (v) => v === 'nalan' || v === 'nalvazhvu');
  const [t, setT] = useState(0);
  return (
    <>
      <CallbackStrip />
      <Hero />
      <section className="container-page grid grid-cols-2 gap-4 py-10 md:grid-cols-4">
        {FEATURES.map(([Icon, label], k) => (
          <Reveal key={label} delay={k} className="flex flex-col items-center gap-3 rounded-lg border p-5 text-center transition hover:-translate-y-1 hover:shadow-lg">
            <Icon className="text-accent" size={32} /><h3 className="font-semibold">{label}</h3>
          </Reveal>
        ))}
      </section>

      <section className="container-page py-10">
        <Reveal><h2 className="text-3xl font-bold text-brand-dark">Advanced Scans, Accurate Results</h2><p className="mt-2 max-w-2xl text-gray-600">Experience precision diagnostics with our state-of-the-art scanning technology. From MRI to CT and X-rays, we ensure clarity and accuracy every step of the way.</p></Reveal>
        <div className="mt-6 grid gap-5 md:grid-cols-3">{SCANS.slice(0, 3).map((s, k) => <Reveal key={s.slug} delay={k}><ItemCard item={s} /></Reveal>)}</div>
        <Reveal><BookingBand title="Schedule your diagnostic tests with us now!" /></Reveal>
        <div className="mt-4 text-right"><Link to="/scans" className="inline-flex items-center gap-1 font-semibold text-brand">VIEW ALL <ArrowRight size={16} /></Link></div>
      </section>

      <section className="bg-gray-50 py-10">
        <div className="container-page">
          <Reveal><h2 className="text-3xl font-bold text-brand-dark">Pre-Packed test packages</h2></Reveal>
          <div className="mt-4 flex gap-2">
            {[['nalan', 'Nalan Packages (Home care)'], ['nalvazhvu', 'Nalvazhvu Packages (Centre visit)']].map(([k, l]) => (
              <button key={k} onClick={() => setTab(k)} className={`btn ${tab === k ? 'btn-primary' : 'btn-outline'}`}>{l}</button>
            ))}
          </div>
          <div className="mt-6 grid gap-5 md:grid-cols-3">{PACKAGES.filter((p) => p.group === tab).map((p) => <ItemCard key={p.slug} item={p} />)}</div>
          <div className="mt-4 text-right"><Link to={`/${tab}-packages`} className="inline-flex items-center gap-1 font-semibold text-brand">VIEW ALL <ArrowRight size={16} /></Link></div>
        </div>
      </section>

      <section className="container-page py-12">
        <Reveal className="grid items-center gap-6 rounded-xl bg-brand p-8 text-white md:grid-cols-2">
          <div><h2 className="text-3xl font-bold">Affordable X-Rays, Starting at ₹499</h2><p className="mt-2">Precise imaging at unbeatable prices. Book today!</p><Link to="/scan/digital-x-ray" className="btn mt-4 bg-white text-brand">Book Now</Link></div>
          <Img src={img('/assets/image/docXrayImg.webp')} alt="Digital X-ray" className="mx-auto max-h-64 object-contain" />
        </Reveal>
      </section>

      <section className="container-page py-6">
        <div className="flex items-end justify-between"><div><h2 className="text-3xl font-bold text-brand-dark">Book a test by category</h2><p className="mt-1 text-gray-600">Choose from various options tailored to your needs.</p></div><Link to="/category" className="font-semibold text-brand">View all</Link></div>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-6">
          {CATEGORIES.map((c, k) => <Reveal key={c.slug} delay={k}><Link to={`/category/${c.slug}`} className="block rounded-lg border p-5 text-center font-semibold transition hover:border-brand hover:bg-brand-light">{c.name}</Link></Reveal>)}
        </div>
      </section>

      <section className="container-page py-12">
        <h2 className="text-3xl font-bold text-brand-dark">Home Collection - Convenient &amp; Reliable</h2>
        <h3 className="mt-2 text-lg text-gray-600">How it works?</h3>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {STEPS.map(([src, h, p], k) => <Reveal key={h} delay={k} className="text-center"><Img src={img(src)} alt={h} className="mx-auto h-40 object-contain" /><h4 className="mt-3 font-semibold">{h}</h4><p className="text-sm text-gray-600">{p}</p></Reveal>)}
        </div>
        <div className="mt-6 text-center"><Link to="/nalan-packages" className="btn btn-accent">View Packages</Link></div>
      </section>

      <section className="bg-brand-light py-12">
        <div className="container-page">
          <h2 className="text-3xl font-bold text-brand-dark">What makes us different</h2>
          <p className="mt-2 max-w-3xl text-gray-700">At {BRAND}, we go beyond just tests—we provide reliable, efficient, and patient-friendly healthcare services that prioritize your well-being.</p>
          <div className="mt-6 grid gap-4 md:grid-cols-5">
            {DIFF.map(([src, l], k) => <Reveal key={l} delay={k} className="rounded-lg bg-white p-4 text-center shadow-sm"><Img src={img(src)} alt="" className="mx-auto h-12 object-contain" /><p className="mt-2 text-sm font-semibold">{l}</p></Reveal>)}
          </div>
          <p className="mt-3 text-xs text-gray-500">Claims are sample copy from the reference site.</p>
        </div>
      </section>

      <section className="container-page py-12">
        <p className="text-xs font-semibold tracking-widest text-accent">TESTIMONIALS</p>
        <h2 className="text-3xl font-bold text-brand-dark">Trusted by Many, Loved by All</h2>
        <div className="mt-6 rounded-xl border p-6">
          <div className="flex text-yellow-400">{[...Array(5)].map((_, k) => <Star key={k} size={16} fill="currentColor" />)}</div>
          <p className="mt-3 text-gray-700">{TESTIMONIALS[t].text}</p>
          <p className="mt-3 font-semibold">{TESTIMONIALS[t].name} <span className="text-sm font-normal text-gray-500">· {TESTIMONIALS[t].when}</span></p>
          <div className="mt-4 flex gap-2">{TESTIMONIALS.map((_, k) => <button key={k} aria-label={`Review ${k + 1}`} onClick={() => setT(k)} className={`h-2.5 w-2.5 rounded-full ${k === t ? 'bg-brand' : 'bg-gray-300'}`} />)}</div>
        </div>
      </section>

      <section className="container-page grid items-center gap-6 py-6 md:grid-cols-2">
        <div><h2 className="text-3xl font-bold text-brand-dark">Convenient Home Sample Collection</h2><p className="mt-2 text-gray-600">Get your tests done from the comfort of your home. Quick, safe, and hassle-free.</p><Link to="/nalan-packages" className="btn btn-primary mt-4">Book Now <ArrowRight size={16} /></Link></div>
        <Img src={img('/assets/image/sampleCollectionImg.webp')} alt="Home sample collection" className="mx-auto max-h-72 object-contain" />
      </section>

      <section className="container-page py-12">
        <div className="rounded-xl bg-gray-50 p-8">
          <h2 className="text-2xl font-bold text-brand-dark">Partner with {BRAND} – A Profitable Franchise Opportunity</h2>
          <p className="mt-2 text-gray-600">Join a trusted name in diagnostics and healthcare and become part of our expanding franchise network. (Sample copy.)</p>
          <div className="mt-4 max-w-xl"><BookingForm context="Franchise" /></div>
        </div>
      </section>
    </>
  );
}
