import { Link } from 'react-router-dom';
export default function NotFound() {
  return <div className="container-page py-24 text-center"><h1 className="text-5xl font-bold text-brand">404</h1><p className="mt-3 text-gray-600">This page could not be found.</p><Link to="/" className="btn btn-primary mt-6">Back to Home</Link></div>;
}
