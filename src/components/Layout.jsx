import Header from './Header';
import Nav from './Nav';
import ToastContainer from './ToastContainer';

function Layout({ currentPage, onNavigate, children }) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-100 dark:bg-slate-900">
      <Header />
      <Nav currentPage={currentPage} onNavigate={onNavigate} />
      <main className="mx-auto w-full max-w-6xl flex-1 px-3 py-5 sm:px-6 sm:py-8">
        {children}
      </main>
      <ToastContainer />
    </div>
  );
}

export default Layout;
