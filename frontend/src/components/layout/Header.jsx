import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import ThemeToggle from '../ui/ThemeToggle';
import styles from './Header.module.css';

/**
 * Header — Sticky glassmorphism navigation bar.
 */
const Header = ({ theme, onToggleTheme }) => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo */}
        <div className={styles.logo}>
          <Link to="/" aria-label="Volver al inicio">
            <span className={styles.logoSymbol}>|Ψ⟩</span> Quantum Hub
          </Link>
        </div>

        {/* Navigation */}
        <nav aria-label="Navegación principal">
          <ul className={styles.navMenu}>
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.active : ''}`
                }
              >
                Inicio
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.active : ''}`
                }
              >
                Sobre DEVo
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.active : ''}`
                }
              >
                Contacto
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Theme Toggle */}
        <div className={styles.actions}>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  theme: PropTypes.string.isRequired,
  onToggleTheme: PropTypes.func.isRequired,
};

export default Header;
