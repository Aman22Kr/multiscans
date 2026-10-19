import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Search, Phone, Menu, X, ChevronDown, Upload, Heart, Facebook, Instagram } from 'lucide-react';
import { BRAND, PHONE } from '../config';
import { searchItems, itemPath } from '../data/data';
import { useLocalStorage, isArray } from '../hooks/useLocalStorage';
import AdSlot from './AdSlot';

const NAV = [
  { to: '/', label: 'Home' }, { to: '/scans', label: 'Scans' }, { to: '/lab-tests', label: 'Lab test' },
  { label: 'Packages', sub: [{ to: '/nalan-packages', label: 'Nalan Packages' }, { to: '/nalvazhvu-packages', label: 'Nalvazhvu Packages' }] },
  { label: 'Explore', sub: [{ to: '/about-us', label: 'About Us' }, { to: '/careers', label: 'Careers' }, { to: '/blogs', label: 'Blogs' }, { to: '/contact-us', label: 'Contact us' }] },
];

function UploadModal({ onClose }) {
  const [name, setName] = useState('');
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div className="w-full max-w-md rounded-lg bg-white p-6" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div className="mb-4 flex items-center justify-between"><h2 className="text-lg font-semibold">Upload Prescription</h2><button onClick={onClose} aria-label="Close"><X /></button></div>
        <input type="file" accept="image/*,.pdf" className="input" onChange={(e) => setName(e.target.files?.[0]?.name || '')} />
        {name && <p className="mt-3 rounded bg-brand-light p-3 text-sm">Selected: {name}. Demo only: the file is not uploaded or stored anywhere.</p>}
      </div>
    </div>
  );
}

function SearchBox({ className = '' }) {
  const nav = useNavigate();
  const [q, setQ] = useState('');
  const [hist, setHist] = useLocalStorage('searchHistory', [], isArray);
  const [open, setOpen] = useState(false);
  const results = searchItems(q).slice(0, 6);
  const go = (e) => {
    e.preventDefault();
    if (!q.trim()) return;
    setHist([q.trim(), ...hist.filter((h) => h !== q.trim())].slice(0, 8));
    setOpen(false); nav(`/search?q=${encodeURIComponent(q.trim())}`);
  };
  return (
    <form onSubmit={go} className={`relative ${className}`}>
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <input className="input pl-9" placeholder="Search scans, tests, packages" value={q} onChange={(e) => { setQ(e.target.value); setOpen(true); }} onBlur={() => setTimeout(() => setOpen(false), 150)} onFocus={() => setOpen(true)} />
      {open && results.length > 0 && (
        <ul className="absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-md border bg-white shadow-lg">
          {results.map((r) => <li key={r.type + r.slug}><Link to={itemPath(r)} className="block px-3 py-2 text-sm hover:bg-brand-light">{r.name}</Link></li>)}
        </ul>
      )}
    </form>
  );
}

function Header({ onUpload }) {
  const [menu, setMenu] = useState(false);
  const [dd, setDd] = useState(null);
  const loc = useLocation();
  useEffect(() => { setMenu(false); setDd(null); }, [loc.pathname]);
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container-page flex items-center gap-4 py-3">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-brand"><span className="grid h-9 w-9 place-items-center rounded-md bg-brand text-white">M</span>{BRAND}</Link>
        <nav className="ml-6 hidden items-center gap-1 lg:flex">
          {NAV.map((n) => n.sub ? (
            <div key={n.label} className="relative" onMouseEnter={() => setDd(n.label)} onMouseLeave={() => setDd(null)}>
              <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium hover:text-brand">{n.label}<ChevronDown size={14} /></button>
              {dd === n.label && <div className="absolute left-0 top-full w-48 rounded-md border bg-white py-1 shadow-lg">{n.sub.map((s) => <Link key={s.to} to={s.to} className="block px-4 py-2 text-sm hover:bg-brand-light">{s.label}</Link>)}</div>}
            </div>
          ) : <NavLink key={n.to} to={n.to} end className={({ isActive }) => `px-3 py-2 text-sm font-medium hover:text-brand ${isActive ? 'text-brand' : ''}`}>{n.label}</NavLink>)}
        </nav>
        <SearchBox className="ml-auto hidden w-64 md:block" />
        <Link to="/saved" aria-label="Saved items" className="hidden text-gray-500 hover:text-red-500 md:block"><Heart size={20} /></Link>
        <button onClick={onUpload} className="btn btn-outline hidden xl:inline-flex"><Upload size={16} />Upload Prescription</button>
        <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="btn btn-accent ml-auto md:ml-0"><Phone size={16} /><span className="hidden sm:inline">{PHONE}</span></a>
        <button className="lg:hidden" aria-label="Menu" onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button>
      </div>
      {menu && (
        <div className="border-t bg-white px-4 pb-4 lg:hidden">
          <SearchBox className="my-3" />
          {NAV.flatMap((n) => n.sub || [n]).map((n) => <Link key={n.to} to={n.to} className="block border-b py-2.5 text-sm font-medium">{n.label}</Link>)}
          <button onClick={onUpload} className="btn btn-outline mt-3 w-full"><Upload size={16} />Upload Prescription</button>
        </div>
      )}
    </header>
  );
}

function Footer() {
  const links = [['/', 'Home'], ['/scans', 'Scans'], ['/lab-tests', 'Lab test'], ['/nalan-packages', 'Nalan Packages'], ['/nalvazhvu-packages', 'Nalvazhvu Packages'], ['/about-us', 'About Us'], ['/careers', 'Careers'], ['/blogs', 'Blogs'], ['/contact-us', 'Contact us']];
  return (
    <footer className="bg-brand-dark text-white">
      <div className="container-page grid gap-8 py-12 md:grid-cols-3">
        <div>
          <div className="text-2xl font-bold">{BRAND}</div>
          <div className="mt-4 flex gap-3"><Facebook size={20} /><Instagram size={20} /></div>
        </div>
        <div>
          <h3 className="mb-3 font-semibold">Quick links</h3>
          <ul className="grid grid-cols-2 gap-1 text-sm text-white/80">{links.map(([to, l]) => <li key={to}><Link className="hover:text-white" to={to}>{l}</Link></li>)}</ul>
        </div>
        <div>
          <h3 className="mb-3 font-semibold">Address</h3>
          <p className="font-medium">Valasaravakkam (Head Office)</p>
          <p className="text-sm text-white/80">No. 41, Arcot Road, Valasaravakkam, Chennai-600087. 044-47660375 | +91 809 808 8090</p>
          <p className="mt-2 text-xs text-white/60">Sample address copied from the reference site.</p>
        </div>
      </div>
      <div className="border-t border-white/20 py-4 text-center text-xs text-white/70">
        Copyrights © {new Date().getFullYear()} {BRAND}, all rights reserved · <Link to="/privacy-policy" className="underline">Privacy Policy</Link> · <Link to="/terms-and-conditions" className="underline">Terms &amp; Condition</Link>
        <div className="mt-1">Demo site. Not a real diagnostic service.</div>
      </div>
    </footer>
  );
}

export default function Layout({ children }) {
  const [upload, setUpload] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return (
    <div className="flex min-h-screen flex-col">
      <Header onUpload={() => setUpload(true)} />
      <main className="flex-1">{children}</main>
      <AdSlot />
      <Footer />
      {upload && <UploadModal onClose={() => setUpload(false)} />}
    </div>
  );
}
