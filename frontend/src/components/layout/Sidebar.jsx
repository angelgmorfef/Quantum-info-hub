import PropTypes from 'prop-types';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import styles from './Sidebar.module.css';

/**
 * Sidebar — Sticky Table of Contents that highlights the active section.
 */
const Sidebar = ({ concepts }) => {
  const ids = concepts.map((c) => c.id);
  const activeId = useIntersectionObserver(ids);

  const handleClick = (e, id) => {
    const el = document.getElementById(id);
    if (el) {
      el.classList.remove(styles.flash);
      void el.offsetWidth; // force reflow
      el.classList.add(styles.flash);
    }
  };

  return (
    <aside className={styles.sidebar} aria-label="Índice de contenidos">
      <h2 className={styles.title}>Índice del Artículo</h2>
      <ul className={styles.list}>
        {concepts.map((concept, i) => (
          <li
            key={concept.id}
            className={`${styles.item} ${activeId === concept.id ? styles.active : ''}`}
          >
            <a
              href={`#${concept.id}`}
              onClick={(e) => handleClick(e, concept.id)}
            >
              {i + 1}. {concept.title}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
};

Sidebar.propTypes = {
  concepts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Sidebar;
