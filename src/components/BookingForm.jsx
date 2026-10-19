import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { BRANCHES } from '../data/data';
import { useLocalStorage, isArray } from '../hooks/useLocalStorage';

export default function BookingForm({ context = 'General', compact = false }) {
  const [bookings, setBookings] = useLocalStorage('demoBookings', [], isArray);
  const [draft, setDraft] = useLocalStorage('bookingDraft', { name: '', phone: '', date: '', time: '', branch: '' });
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);
  const set = (k) => (e) => { setDone(false); setDraft({ ...draft, [k]: e.target.value }); };

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!draft.name.trim()) er.name = 'Enter your name';
    if (!/^[0-9+\s-]{8,15}$/.test(draft.phone)) er.phone = 'Enter a valid phone number';
    if (!draft.branch) er.branch = 'Select a branch';
    setErrors(er);
    if (Object.keys(er).length) return;
    setBookings([{ ...draft, context, savedAt: new Date().toISOString() }, ...bookings].slice(0, 20));
    setDraft({ name: '', phone: '', date: '', time: '', branch: '' });
    setDone(true);
  };

  const field = (k, label, type = 'text') => (
    <label className="block text-sm font-medium">
      {label}
      <input type={type} className="input mt-1" value={draft[k]} onChange={set(k)} />
      {errors[k] && <span className="text-xs text-red-600">{errors[k]}</span>}
    </label>
  );

  return (
    <form onSubmit={submit} className={`grid gap-3 ${compact ? '' : 'sm:grid-cols-2'}`} noValidate>
      {field('name', 'Name')}
      {field('phone', 'Phone No', 'tel')}
      {field('date', 'Date', 'date')}
      {field('time', 'Time', 'time')}
      <label className="block text-sm font-medium sm:col-span-2">
        Branch
        <select className="input mt-1" value={draft.branch} onChange={set('branch')}>
          <option value="">Select branch</option>
          {BRANCHES.map((b) => <option key={b}>{b}</option>)}
        </select>
        {errors.branch && <span className="text-xs text-red-600">{errors.branch}</span>}
      </label>
      <button className="btn btn-primary sm:col-span-2">Submit</button>
      {done && (
        <p className="flex items-start gap-2 rounded-md bg-green-50 p-3 text-sm text-green-800 sm:col-span-2" role="status">
          <CheckCircle size={18} className="mt-0.5 shrink-0" />
          Demo only: your request was saved in this browser. No real appointment was booked.
        </p>
      )}
    </form>
  );
}
