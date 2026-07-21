import { useCallback } from 'react';
import useFetch from '../hooks/useFetch';
import { fetchNews } from '../api/quantumApi';
import NewsCard from '../components/ui/NewsCard';
import QuantumParticles from '../components/canvas/QuantumParticles';
import styles from './HomePage.module.css';

const HomePage = () => {
  const fetchFn = useCallback(fetchNews, []);
  const { data: newsArticles, loading, error } = useFetch(fetchFn);

  return (
    <>
      <QuantumParticles />

      {/* Hero Banner */}
      <section className={styles.hero}>
        <span className={styles.heroTag}>// Actualidad Tecnológica</span>
        <h1 className={styles.heroTitle}>
          Las Últimas Noticias del Mundo Tech
        </h1>
        <p className={styles.heroSubtitle}>
          Mantente al día con los avances más recientes, descubrimientos de software, IA y hardware a nivel global.
        </p>
      </section>

      {/* Main Content Grid */}
      <div className={styles.container}>
        <main className={styles.mainLayout} id="main-content">
          <section className={styles.contentSection} aria-label="Noticias tecnológicas">
            {loading && (
              <div className={styles.state}>
                <p className={styles.loadingText}>Cargando noticias tecnológicas...</p>
              </div>
            )}

            {error && (
              <div className={styles.state}>
                <p className={styles.errorText}>
                  ⚠️ Error al cargar las noticias: {error}
                </p>
                <p className={styles.errorHint}>
                  Asegúrate de tener configurada la API Key y de que el backend está corriendo.
                </p>
              </div>
            )}

            {newsArticles && newsArticles.length === 0 && !loading && !error && (
              <div className={styles.state}>
                <p className={styles.loadingText}>No se encontraron noticias recientes.</p>
              </div>
            )}

            {newsArticles && newsArticles.map((article, index) => (
              <NewsCard key={article.link || index} {...article} index={index} />
            ))}
          </section>
        </main>
      </div>
    </>
  );
};

export default HomePage;
