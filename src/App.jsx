import { useState } from 'react';
import Layout from './components/Layout';
import GoalsPage from './pages/GoalsPage';
import DashboardPage from './pages/DashboardPage';
import TrashPage from './pages/TrashPage';

function App() {
  const [currentPage, setCurrentPage] = useState('goals');

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      {currentPage === 'goals' && <GoalsPage />}
      {currentPage === 'statistics' && <DashboardPage />}
      {currentPage === 'trash' && <TrashPage />}
    </Layout>
  );
}

export default App;
