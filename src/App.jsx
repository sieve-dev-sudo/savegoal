import { useState } from 'react';
import Layout from './components/Layout';
import GoalsPage from './pages/GoalsPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  const [currentPage, setCurrentPage] = useState('goals');

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      {currentPage === 'goals' && <GoalsPage />}
      {currentPage === 'dashboard' && <DashboardPage />}
    </Layout>
  );
}

export default App;
