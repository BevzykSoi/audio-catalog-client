import { useEffect, useState } from 'react';

import * as userService from 'services/users.service';
import * as audiosService from 'services/audios.service';
import AudioListHorizontal from 'components/AudioListHorizontal/AudioListHorizontal';
import Pagination from 'components/Pagination/Pagination';

function LikedAudios({ userId }) {
  const [audios, setAudios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [pagesCount, setPagesCount] = useState(1);

  function fetchUserAudios() {
    setLoading(true);

    userService
      .getLikedAudios(userId, page + 1)
      .then((res) => {
        setAudios(res.items);
        setPage(res.page);
        setPagesCount(res.pagesCount);
      })
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
      {audios.length > 0 && (
        <Pagination
          activePage={page - 1}
          pageCount={pagesCount}
          setActivePage={setPage}
        />
      )}
    </div>
  );
}

export default LikedAudios;
