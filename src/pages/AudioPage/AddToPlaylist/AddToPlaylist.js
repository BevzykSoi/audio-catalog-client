import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import * as usersService from 'services/users.service';
import * as audiosService from 'services/audios.service';
import * as authSelectors from 'redux/auth/auth.selectors';
import styles from '../AudioPage.module.css';

function AddToPlaylist({ audio }) {
  const user = useSelector(authSelectors.getUser);

  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [added, setAdded] = useState(false);

  const { t } = useTranslation();

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

  function onPlaylistSelect(e) {
    const playlistId = e.target.value;

    setLoading(true);

    audiosService
      .addToPlaylist(audio._id, playlistId)
      .then(() => {
        setAdded(true);
      })
      .catch(setError)
      .finally(() => setLoading(false));
  }

  return (
    <div>
      <select
        className={styles.input}
        defaultValue="default"
        onChange={onPlaylistSelect}
        disabled={loading}
      >
        <option disabled value="default">
          {t('Add to playlist')}
        </option>
        {playlists.map((playlist) => (
          <option key={playlist._id} value={playlist._id}>
            {playlist.name}
          </option>
        ))}
      </select>
      {error && <p>{error.message}</p>}
      {added && !loading && !error && <p>{t('Audio successfully added')}</p>}
    </div>
  );
}

export default AddToPlaylist;
