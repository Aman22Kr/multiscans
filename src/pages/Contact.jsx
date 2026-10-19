import { MapPin, Phone } from 'lucide-react';
import { BRAND, PHONE } from '../config';
import BookingForm from '../components/BookingForm';
import { BRANCHES } from '../data/data';

export default function Contact() {
  return (
    <div className="container-page grid gap-10 py-10 md:grid-cols-2">
      <div>
        <h1 className="text-3xl font-bold text-brand-dark">Contact us</h1>
        <p className="mt-3 flex items-center gap-2"><Phone size={18} />{PHONE}</p>
        <p className="mt-2 flex items-start gap-2"><MapPin size={18} className="mt-1" />{BRAND} Head Office, No. 41, Arcot Road, Valasaravakkam, Chennai-600087 (sample)</p>
        <h2 className="mt-6 font-semibold">Branches</h2>
        <ul className="mt-2 grid list-disc grid-cols-2 pl-5 text-sm">{BRANCHES.map((b) => <li key={b}>{b}</li>)}</ul>
      </div>
      <div className="rounded-xl border p-6"><h2 className="mb-3 text-lg font-semibold">Send an enquiry</h2><BookingForm context="Contact" /></div>
    </div>
  );
}
