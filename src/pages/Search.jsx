import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchItems } from '../data/data';
import { sortItems, SORTS } from './Listing';
import { useLocalStorage, isArray } from '../hooks/useLocalStorage';
import ItemCard from '../components/ItemCard';

export default function Search() {
  const [params, setParams] = useSearchParams();
  const q = params.get('q') || '';
  const type = params.get('type') || 'all';
  const [sort, setSort] = useState('name');
  const [hist, setHist] = useLocalStorage('searchHistory', [], isArray);
  const found = searchItems(q);
  const items = sortItems(type === 'all' ? found : found.filter((i) => i.type === type), sort);
  const upd = (o) => setParams({ q, type, ...o });
  return (
    <div className="container-page py-10">
      <h1 className="text-3xl font-bold text-brand-dark">Search</h1>
      <input className="input mt-4 max-w-md" autoFocus placeholder="Search…" value={q} onChange={(e) => upd({ q: e.target.value })} />
      <div className="mt-3 flex flex-wrap gap-2">
        {['all', 'scan', 'test', 'package'].map((t) => <button key={t} onClick={() => upd({ type: t })} className={`btn !py-1 ${type === t ? 'btn-primary' : 'btn-outline'}`}>{t}</button>)}
        <select className="input ml-auto max-w-[200px]" value={sort} onChange={(e) => setSort(e.target.value)}>{Object.entries(SORTS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select>
      </div>
      {!q && hist.length > 0 && <div className="mt-6"><div className="flex items-center gap-3 text-sm text-gray-500">Recent searches <button className="underline" onClick={() => setHist([])}>clear</button></div><div className="mt-2 flex flex-wrap gap-2">{hist.map((h) => <button key={h} onClick={() => upd({ q: h })} className="rounded-full border px-3 py-1 text-sm">{h}</button>)}</div></div>}
      {q && items.length === 0 && <p className="mt-10 text-center text-gray-500">No results for “{q}”.</p>}
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{items.map((i) => <ItemCard key={i.type + i.slug} item={i} />)}</div>
    </div>
  );
}
