import { ALL_ITEMS } from '../data/data';
import { useSaved } from '../hooks/useSaved';
import ItemCard from '../components/ItemCard';

export default function Saved() {
  const { saved } = useSaved();
  const items = ALL_ITEMS.filter((i) => saved.includes(`${i.type}/${i.slug}`));
  return (
    <div className="container-page py-10"><h1 className="text-3xl font-bold text-brand-dark">Saved items</h1>
      <p className="text-sm text-gray-500">Stored only in this browser (localStorage). Not synced across devices; not an account.</p>
      {items.length === 0 ? <p className="mt-10 text-center text-gray-500">Nothing saved yet. Tap the heart on any card.</p> :
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{items.map((i) => <ItemCard key={i.type + i.slug} item={i} />)}</div>}
    </div>
  );
}
