import Header from './Header';
import Nav from './Nav';
import ToastContainer from './ToastContainer';

function Layout({ currentPage, onNavigate, children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Nav currentPage={currentPage} onNavigate={onNavigate} />
      <main className="mx-auto w-full max-w-4xl flex-1 px-3 py-4 sm:px-4 sm:py-6">
        {children}
      </main>
      <ToastContainer />
    </div>
  );
}

export default Layout;
