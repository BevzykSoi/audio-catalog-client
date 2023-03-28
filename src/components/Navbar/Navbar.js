import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './Navbar.module.css';
import { urls } from 'utils/constants';
import * as authSelectors from 'redux/auth/auth.selectors';
import * as authOperations from 'redux/auth/auth.operations';
import { useClickOutside } from 'hooks/useClickOutside';
import Notifications from './Notifications';

function Navbar() {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const user = useSelector(authSelectors.getUser);
  const isLoggedIn = useSelector(authSelectors.isLoggedIn);

  useClickOutside(`.${styles.dropdownContainer}`, () => {
    setDropdownVisible(false);
  });

  function logout() {
    dispatch(authOperations.logout());
  }

  function toggleDropdown() {
    setDropdownVisible((prev) => !prev);
  }

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <Link to={urls.home} className={styles.logo}>
          OnSound
        </Link>

        <div className={styles.navList}>
          <Link to={urls.home} className={styles.navLink}>
            {t('Home')}
          </Link>
          <Link to={urls.browse} className={styles.navLink}>
            {t('Browse')}
          </Link>
          {isLoggedIn && (
            <Link to={`${urls.profile}/${user._id}`} className={styles.navLink}>
              {t('Profile')}
            </Link>
          )}
          {isLoggedIn && (
            <Link to={urls.playlists} className={styles.navLink}>
              {t('Playlists')}
            </Link>
          )}
          {isLoggedIn && (
            <Link to="/upload" className={styles.navLink}>
              {t('Upload')}
            </Link>
          )}
        </div>

        <div className={styles.authLinks}>
          {!isLoggedIn && (
            <Link to={urls.register} className={styles.navLink}>
              {t('Register')}
            </Link>
          )}
          {!isLoggedIn && (
            <Link to={urls.login} className={styles.navLink}>
              {t('Login')}
            </Link>
          )}

          {isLoggedIn && <Notifications />}

          {isLoggedIn && (
            <div className={styles.dropdownContainer}>
              <button
                type="button"
                onClick={toggleDropdown}
                className={styles.dropdownToggler}
              >
                <span>{user.username}</span>
                <img
                  src={user.profile.avatarUrl}
                  alt="User avatar"
                  width={40}
                  height={40}
                />
              </button>
              <div
                className={
                  dropdownVisible ? styles.dropdownVisible : styles.dropdown
                }
                onClick={toggleDropdown}
              >
                <Link to={urls.settings} className={styles.dropdownItem}>
                  {t('Settings')}
                </Link>
                <button
                  type="button"
                  onClick={logout}
                  className={styles.dropdownItem}
                >
                  {t('Logout')}
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
