import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { itemPath } from '../data/data';
import { useSaved } from '../hooks/useSaved';

export default function ItemCard({ item }) {
  const { isSaved, toggle } = useSaved();
  const saved = isSaved(item);
  return (
    <div className="group relative flex flex-col rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <button aria-label={saved ? 'Remove from saved' : 'Save'} onClick={() => toggle(item)} className="absolute right-3 top-3 text-gray-400 hover:text-red-500">
        <Heart size={18} className={saved ? 'fill-red-500 text-red-500' : ''} />
      </button>
      <span className="mb-2 text-xs font-semibold uppercase tracking-wide text-accent">{item.type === 'test' ? 'Lab test' : item.type}</span>
      <h3 className="pr-6 text-lg font-semibold text-brand-dark">{item.name}</h3>
      {item.count && <p className="mt-1 text-sm text-gray-500">{item.count} Tests Included</p>}
      <p className="mt-2 line-clamp-3 flex-1 text-sm text-gray-600">{item.tests ? item.tests.join(', ') : item.desc}</p>
      <div className="mt-4 flex items-center justify-between">
        <div>
          {item.mrp && <span className="mr-2 text-sm text-gray-400 line-through">₹{item.mrp}</span>}
          {item.price ? <span className="text-lg font-bold text-brand">{item.type === 'scan' ? 'from ' : ''}₹{item.price}</span> : <span className="text-sm text-gray-500">Price on request</span>}
        </div>
        <Link to={itemPath(item)} className="btn btn-primary !py-1.5">Book now</Link>
      </div>
    </div>
  );
}
