import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';

import styles from './PlaylistsPage.module.css';
import * as usersService from 'services/users.service';
import * as playlistsService from 'services/playlists.services';
import * as authSelectors from 'redux/auth/auth.selectors';

const validationSchema = yup.object().shape({
  name: yup.string().min(3).required(),
});

function PlaylistsPage() {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const user = useSelector(authSelectors.getUser);

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
    <div>
      <h2>Створити список відтворення</h2>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formik.values.name}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        <button type="submit">Створити</button>
      </form>

      <h2>Списки відтворення</h2>
      {playlists.map((playlist) => (
        <div>
          <h4>{playlist.name}</h4>
        </div>
      ))}
    </div>
  );
}

export default PlaylistsPage;
