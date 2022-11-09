import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import styles from './SettingsPage.module.css';
import * as authOperations from 'redux/auth/auth.operations';
import * as authSelectors from 'redux/auth/auth.selectors';
import * as usersService from 'services/users.service';

function SettingsPage() {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const user = useSelector(authSelectors.getUser);
  const loading = useSelector(authSelectors.getLoading);

  const formik = useFormik({
    initialValues: {
      theme: user.profile.theme,
      language: user.profile.language,
      saveHistory: user.profile.saveHistory,
    },
    onSubmit: saveInfo,
  });

  useEffect(() => {
    dispatch(authOperations.getProfile());
  }, [dispatch]);

  useEffect(() => {
    formik.setValues({
      theme: user.profile.theme,
      language: user.profile.language,
      saveHistory: user.profile.saveHistory,
    });
  }, [user]);

  const [avatarFile, setAvatarFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);

  function updateAvatar(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    usersService.updateAvatar(user._id, formData).then((res) => {
      dispatch(authOperations.getProfile());
    });
  }

  function updateBanner(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    usersService.updateBanner(user._id, formData).then((res) => {
      dispatch(authOperations.getProfile());
    });
  }

  function saveInfo(values) {
    usersService.updateProfile(user._id, values).then((res) => {
      dispatch(authOperations.getProfile());
    });
  }

  return (
    <div className={styles.container}>
      <h1>{t('Settings')}</h1>

      <form onSubmit={updateAvatar} className={styles.imageForm}>
        <input
          type="file"
          placeholder="Avatar"
          name="picture"
          id="avatarInput"
          accept="image/*"
          className={styles.imageInput}
          onChange={(e) => setAvatarFile(e.target.files[0])}
        />
        <label className={styles.avatarLabel} htmlFor="avatarInput">
          <img
            src={
              avatarFile
                ? URL.createObjectURL(avatarFile)
                : user.profile.avatarUrl
            }
            width={40}
            height={40}
            alt="Profile avatar"
          />
        </label>
        <button type="submit" className={styles.btn}>
          {t('Update avatar')}
        </button>
      </form>

      <form onSubmit={updateBanner} className={styles.imageForm}>
        <input
          type="file"
          placeholder="Banner"
          name="picture"
          id="bannerInput"
          accept="image/*"
          className={styles.imageInput}
          onChange={(e) => setBannerFile(e.target.files[0])}
        />
        <label htmlFor="bannerInput" className={styles.bannerLabel}>
          <img
            src={
              bannerFile ? URL.createObjectURL(bannerFile) : user.profile.banner
            }
            width={250}
            height={100}
            alt="Profile banner"
          />
        </label>

        <button type="submit" className={styles.btn}>
          {t('Update banner')}
        </button>
      </form>

      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <select
          name="theme"
          value={formik.values.theme}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={styles.input}
        >
          <option value="dark">{t('Dark')}</option>
          <option value="light">{t('Light')}</option>
        </select>

        <select
          name="language"
          value={formik.values.language}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={styles.input}
        >
          <option value="ua">Українська</option>
          <option value="en">English</option>
        </select>

        <div className={styles.field}>
          <label htmlFor="saveHistoryCheckbox" className={styles.label}>
            {t('Save history')}?
          </label>
          <input
            type="checkbox"
            name="saveHistory"
            id="saveHistoryCheckbox"
            checked={formik.values.saveHistory}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>

        <button type="submit" className={styles.btn} disabled={loading}>
          {t('Save')}
        </button>
      </form>
    </div>
  );
}

export default SettingsPage;
