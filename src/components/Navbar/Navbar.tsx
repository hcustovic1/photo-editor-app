import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

export const Navbar: React.FC = () => {
  return (
    <header>
      <nav className={styles.navbar} aria-label="Main navigation">
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link to="/" className={styles.navLink}>
              Home
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
