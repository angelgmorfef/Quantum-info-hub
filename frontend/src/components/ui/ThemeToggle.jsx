import PropTypes from 'prop-types';
import styles from './ThemeToggle.module.css';

const SunIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.icon}>
    <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.01c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z" />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.icon}>
    <path d="M12.3 22h-.1c-5.5 0-10-4.5-10-10C2.2 6.8 6.5 2.5 12 2.2c.6 0 1 .4 1 .9 0 .4-.2.8-.6 1-2.4 1.7-3.7 4.5-3.7 7.5s1.3 5.8 3.7 7.5c.4.2.6.6.6 1 0 .5-.4.9-1 1z" />
  </svg>
);

/**
 * ThemeToggle — Button to switch between dark and light themes.
 */
const ThemeToggle = ({ theme, onToggle }) => {
  return (
    <button
      className={styles.btn}
      onClick={onToggle}
      aria-label={`Cambiar a modo ${theme === 'dark' ? 'claro' : 'oscuro'}`}
      title="Cambiar tema"
    >
      <span className={`${styles.iconWrapper} ${theme === 'dark' ? styles.showSun : styles.showMoon}`}>
        <SunIcon />
        <MoonIcon />
      </span>
    </button>
  );
};

ThemeToggle.propTypes = {
  theme: PropTypes.oneOf(['dark', 'light']).isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default ThemeToggle;
