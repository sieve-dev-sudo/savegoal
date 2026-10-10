import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import Header from './Header';
import SideDrawer from './SideDrawer';
import ToastContainer from './ToastContainer';

function Layout({ currentPage, onNavigate, children }) {
  const { t } = useLanguage();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const title =
    currentPage === 'goals' ? t.nav.dashboard : t.nav.statistics;

  return (
    <div className="flex min-h-screen flex-col bg-slate-100 dark:bg-slate-900">
      <Header title={title} onMenu={() => setDrawerOpen(true)} />

      <main className="mx-auto w-full max-w-3xl flex-1 px-3 pb-28 pt-4 sm:px-4 sm:pt-6">
        {children}
      </main>

      <AnimatePresence>
        {drawerOpen && (
          <SideDrawer
            currentPage={currentPage}
            onNavigate={onNavigate}
            onClose={() => setDrawerOpen(false)}
          />
        )}
      </AnimatePresence>

      <ToastContainer />
    </div>
  );
}

export default Layout;
