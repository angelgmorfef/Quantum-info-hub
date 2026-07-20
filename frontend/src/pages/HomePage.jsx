import { useCallback } from 'react';
import useFetch from '../hooks/useFetch';
import { fetchConcepts } from '../api/quantumApi';
import ConceptCard from '../components/ui/ConceptCard';
import Sidebar from '../components/layout/Sidebar';
import QuantumParticles from '../components/canvas/QuantumParticles';
import styles from './HomePage.module.css';

const HomePage = () => {
  const fetchFn = useCallback(fetchConcepts, []);
  const { data: concepts, loading, error } = useFetch(fetchFn);

  return (
    <>
      <QuantumParticles />

      {/* Hero Banner */}
      <section className={styles.hero}>
        <span className={styles.heroTag}>// Investigación Tecnológica</span>
        <h1 className={styles.heroTitle}>
          Los Computadores Cuánticos Cambiarán a la Humanidad para Siempre
        </h1>
        <p className={styles.heroSubtitle}>
          ¿Estamos listos para el mayor salto computacional de la historia o nos
          enfrentamos a un riesgo de seguridad cibernética irreversible?
        </p>
        {concepts && (
          <p className={styles.readingTime}>
            ≈ {Math.max(1, Math.ceil(concepts.reduce((acc, c) => {
              const text = c.content.replace(/<[^>]+>/g, '');
              return acc + text.trim().split(/\s+/).length;
            }, 0) / 200))} min de lectura
          </p>
        )}
      </section>

      {/* Reading Progress Bar */}
      <div className={styles.progressContainer}>
        <div className={styles.progressBar} id="reading-progress" />
      </div>

      {/* Main Content Grid */}
      <div className={styles.container}>
        <main className={styles.mainLayout} id="main-content">
          {/* Sidebar TOC */}
          {concepts && <Sidebar concepts={concepts} />}

          {/* Articles */}
          <section className={styles.contentSection} aria-label="Desarrollo del artículo">
            {loading && (
              <div className={styles.state}>
                <p className={styles.loadingText}>Cargando artículos cuánticos...</p>
              </div>
            )}

            {error && (
              <div className={styles.state}>
                <p className={styles.errorText}>
                  ⚠️ Error al cargar el contenido: {error}
                </p>
                <p className={styles.errorHint}>
                  Asegúrate de que el backend está corriendo en{' '}
                  <code>http://localhost:4000</code>
                </p>
              </div>
            )}

            {concepts && concepts.map((concept) => (
              <ConceptCard key={concept.id} {...concept} />
            ))}
          </section>
        </main>
      </div>
    </>
  );
};

export default HomePage;
