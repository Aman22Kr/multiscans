import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Listing from './pages/Listing';
import Detail from './pages/Detail';
import Categories from './pages/Categories';
import Search from './pages/Search';
import Contact from './pages/Contact';
import StaticPage from './pages/StaticPage';
import Saved from './pages/Saved';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scans" element={<Listing kind="scan" title="Scans" />} />
        <Route path="/lab-tests" element={<Listing kind="test" title="Lab Tests" />} />
        <Route path="/nalan-packages" element={<Listing kind="package" group="nalan" title="Nalan Packages (Home care)" />} />
        <Route path="/nalvazhvu-packages" element={<Listing kind="package" group="nalvazhvu" title="Nalvazhvu Packages (Centre visit)" />} />
        <Route path="/scan/:slug" element={<Detail type="scan" />} />
        <Route path="/test/:slug" element={<Detail type="test" />} />
        <Route path="/package/:slug" element={<Detail type="package" />} />
        <Route path="/category" element={<Categories />} />
        <Route path="/category/:slug" element={<Categories />} />
        <Route path="/search" element={<Search />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/:page" element={<StaticPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
