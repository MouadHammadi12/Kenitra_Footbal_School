import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import InscriptionPage from './pages/InscriptionPage';
import AdminPage from './pages/AdminPage';
import AboutPage from './pages/AboutPage';
import TeamsPage from './pages/TeamsPage';
import TrainingsPage from './pages/TrainingsPage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/teams" element={<TeamsPage />} />
      <Route path="/trainings" element={<TrainingsPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/inscription" element={<InscriptionPage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
}

export default App;
