import { useEffect, useState } from 'react';

import * as userService from 'services/users.service';
import * as audiosService from 'services/audios.service';
import AudioListHorizontal from 'components/AudioListHorizontal/AudioListHorizontal';

function LikedAudios({ userId }) {
  const [audios, setAudios] = useState([]);
  const [loading, setLoading] = useState(false);

  function fetchUserAudios() {
    setLoading(true);

    userService
      .getLikedAudios(userId)
      .then((res) => setAudios(res.items))
      .finally(() => setLoading(false));
  }

  useEffect(fetchUserAudios, [userId]);

  function like(audioId) {
    audiosService.toggleLike(audioId).then((res) => {
      setAudios((prev) =>
        prev.map((audio) => (audio._id === res._id ? res : audio))
      );
    });
  }

  return (
    <div>
      {!loading && audios.length > 0 && (
        <AudioListHorizontal audios={audios} onLike={like} />
      )}
    </div>
  );
}

export default LikedAudios;
