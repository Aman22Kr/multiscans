import { useMemo, useState } from 'react';
import { ALL_ITEMS } from '../data/data';
import ItemCard from '../components/ItemCard';
import { Reveal } from '../utils/motion';

export const SORTS = { name: 'Name (A-Z)', low: 'Price: low to high', high: 'Price: high to low' };
export function sortItems(list, sort) {
  const l = [...list];
  if (sort === 'name') return l.sort((a, b) => a.name.localeCompare(b.name));
  const p = (i) => i.price ?? Infinity;
  return l.sort((a, b) => (sort === 'low' ? p(a) - p(b) : (b.price ?? -1) - (a.price ?? -1)));
}

export default function Listing({ kind, group, title }) {
  const [q, setQ] = useState('');
  const [sort, setSort] = useState('name');
  const items = useMemo(() => sortItems(ALL_ITEMS.filter((i) => i.type === kind && (!group || i.group === group) && i.name.toLowerCase().includes(q.toLowerCase())), sort), [kind, group, q, sort]);
  return (
    <div className="container-page py-10">
      <h1 className="text-3xl font-bold text-brand-dark">{title}</h1>
      <div className="mt-4 flex flex-wrap gap-3">
        <input className="input max-w-xs" placeholder="Filter by name" value={q} onChange={(e) => setQ(e.target.value)} />
        <select className="input max-w-[200px]" value={sort} onChange={(e) => setSort(e.target.value)}>{Object.entries(SORTS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select>
      </div>
      {items.length === 0 ? <p className="mt-10 text-center text-gray-500">No results match your filter.</p> : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{items.map((i, k) => <Reveal key={i.slug} delay={k % 3}><ItemCard item={i} /></Reveal>)}</div>
      )}
    </div>
  );
}
