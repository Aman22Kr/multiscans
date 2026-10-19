import { useParams } from 'react-router-dom';
import { STATIC_PAGES } from '../data/data';
import { BRAND } from '../config';
import NotFound from './NotFound';

export default function StaticPage() {
  const p = STATIC_PAGES[useParams().page];
  if (!p) return <NotFound />;
  return (
    <div className="container-page max-w-3xl py-10"><h1 className="text-3xl font-bold text-brand-dark">{p.title}</h1>
      {p.body.map((t) => <p key={t} className="mt-4 text-gray-700">{t.replace('{B}', BRAND)}</p>)}</div>
  );
}
