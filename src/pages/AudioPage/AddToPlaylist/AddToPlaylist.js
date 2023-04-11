import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import * as usersService from 'services/users.service';
import * as audiosService from 'services/audios.service';
import * as authSelectors from 'redux/auth/auth.selectors';

function AddToPlaylist({ audio }) {
  const user = useSelector(authSelectors.getUser);

  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

    audiosService.addToPlaylist(audio._id, playlistId).then(console.log);
  }

  return (
    <div>
      <select defaultValue="default" onChange={onPlaylistSelect}>
        <option disabled value="default">
          Додати до списку відтворення
        </option>
        {playlists.map((playlist) => (
          <option key={playlist._id} value={playlist._id}>
            {playlist.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default AddToPlaylist;
