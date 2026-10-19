import { Link, useParams } from 'react-router-dom';
import { CATEGORIES, ALL_ITEMS } from '../data/data';
import ItemCard from '../components/ItemCard';
import NotFound from './NotFound';

export default function Categories() {
  const { slug } = useParams();
  if (!slug) return (
    <div className="container-page py-10"><h1 className="text-3xl font-bold text-brand-dark">Book a test by category</h1>
      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">{CATEGORIES.map((c) => <Link key={c.slug} to={`/category/${c.slug}`} className="rounded-lg border p-8 text-center text-lg font-semibold transition hover:bg-brand-light">{c.name}</Link>)}</div></div>
  );
  const c = CATEGORIES.find((x) => x.slug === slug);
  if (!c) return <NotFound />;
  const items = ALL_ITEMS.filter((i) => i.tags.includes(slug));
  return (
    <div className="container-page py-10"><h1 className="text-3xl font-bold text-brand-dark">{c.name}</h1><p className="text-sm text-gray-500">Category tags are sample data.</p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{items.map((i) => <ItemCard key={i.type + i.slug} item={i} />)}</div></div>
  );
}
