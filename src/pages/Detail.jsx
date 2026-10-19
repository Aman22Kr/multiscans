import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { findItem, itemPath, ALL_ITEMS } from '../data/data';
import { useLocalStorage, isArray } from '../hooks/useLocalStorage';
import { useSaved } from '../hooks/useSaved';
import BookingForm from '../components/BookingForm';
import NotFound from './NotFound';

export default function Detail({ type }) {
  const { slug } = useParams();
  const item = findItem(type, slug);
  const [, setRecent] = useLocalStorage('recent', [], isArray);
  const { isSaved, toggle } = useSaved();
  useEffect(() => { if (item) setRecent((r) => [`${item.type}/${item.slug}`, ...r.filter((k) => k !== `${item.type}/${item.slug}`)].slice(0, 8)); }, [item?.slug]); // eslint-disable-line
  if (!item) return <NotFound />;
  const related = ALL_ITEMS.filter((i) => i !== item && i.type === item.type).slice(0, 3);
  return (
    <div className="container-page grid gap-10 py-10 lg:grid-cols-[1fr_380px]">
      <div>
        <p className="text-sm text-gray-500"><Link to="/" className="hover:text-brand">Home</Link> / {item.name}</p>
        <h1 className="mt-2 text-3xl font-bold text-brand-dark">{item.name}</h1>
        {item.count && <p className="mt-1 text-accent">{item.count} Tests Included</p>}
        <div className="mt-3 flex items-center gap-3">
          {item.mrp && <span className="text-gray-400 line-through">₹{item.mrp}</span>}
          <span className="text-2xl font-bold text-brand">{item.price ? `₹${item.price}` : 'Price on request'}</span>
          <button onClick={() => toggle(item)} className="btn btn-outline !py-1.5"><Heart size={16} className={isSaved(item) ? 'fill-red-500 text-red-500' : ''} />{isSaved(item) ? 'Saved' : 'Save'}</button>
        </div>
        <p className="mt-5 text-gray-700">{item.desc}</p>
        {item.tests && <><h2 className="mt-6 text-xl font-semibold">Included tests (condensed)</h2><ul className="mt-2 grid list-disc gap-1 pl-5 sm:grid-cols-2">{item.tests.map((x) => <li key={x}>{x}</li>)}</ul></>}
        <h2 className="mt-8 text-xl font-semibold">Related</h2>
        <div className="mt-2 flex flex-wrap gap-2">{related.map((r) => <Link key={r.slug} to={itemPath(r)} className="rounded-full border px-4 py-1.5 text-sm hover:bg-brand-light">{r.name}</Link>)}</div>
      </div>
      <aside className="h-fit rounded-xl border p-5 shadow-sm lg:sticky lg:top-24">
        <h2 className="mb-3 text-lg font-semibold">Book Your Appointment</h2>
        <BookingForm compact context={item.name} />
      </aside>
    </div>
  );
}
