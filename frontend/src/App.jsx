import { BrowserRouter, Routes, Route } from 'react-router-dom';
import useTheme from './hooks/useTheme';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

/**
 * App — Root component with React Router and theme management.
 */
const App = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <BrowserRouter>
      <Header theme={theme} onToggleTheme={toggleTheme} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* 404 fallback */}
        <Route
          path="*"
          element={
            <div style={{ textAlign: 'center', padding: '8rem 2rem' }}>
              <h1 style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-secondary)' }}>404</h1>
              <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>
                Página no encontrada.
              </p>
            </div>
          }
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
};

export default App;
