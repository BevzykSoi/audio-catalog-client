import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

import styles from './PlaylistsPage.module.css';
import * as usersService from 'services/users.service';
import * as playlistsService from 'services/playlists.services';
import * as authSelectors from 'redux/auth/auth.selectors';
import { urls } from 'utils/constants';
import Container from 'components/Container/Container';
import PlaylistCard from './PlaylistCard/PlaylistCard';

const validationSchema = yup.object().shape({
  name: yup.string().min(3).required(),
});

function PlaylistsPage() {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const user = useSelector(authSelectors.getUser);
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema,
    onSubmit: (values) => {
      setLoading(true);

      playlistsService
        .create(values.name)
        .then((res) => setPlaylists((prev) => [...prev, res]))
        .catch(setError)
        .finally(() => setLoading(false));
    },
  });

  useEffect(() => {
    if (!user) {
      return;
    }

    setLoading(true);

    usersService
      .getUserPlaylists(user._id)
      .then(setPlaylists)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [user]);

  return (
    <Container>
      {loading && <p>{t('Loading')}...</p>}
      {error && <p>{error.message}</p>}
      <h2>{t('Create playlist')}</h2>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          className={styles.input}
          value={formik.values.name}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        <button type="submit" className={styles.btn} disabled={loading}>
          {t('Create')}
        </button>
      </form>

      <h2>{t('Playlists')}</h2>
      <div className={styles.playlists}>
        {playlists.map((playlist) => (
          <PlaylistCard key={playlist._id} {...playlist} />
        ))}
      </div>
    </Container>
  );
}

export default PlaylistsPage;
