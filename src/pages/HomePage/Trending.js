import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import * as audiosService from 'services/audios.service';
import AudioSection from 'components/AudioSection/AudioSection';
import AudioListHorizontal from 'components/AudioListHorizontal/AudioListHorizontal';
import Pagination from 'components/Pagination/Pagination';

function Trending() {
  const [audios, setAudios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagesCount, setPagesCount] = useState(1);
  const [activePage, setActivePage] = useState(0);

  const { t } = useTranslation();

  function fetchAudios() {
    setLoading(true);

    audiosService
      .getTop(activePage + 1)
      .then((res) => {
        setAudios(res.items);
        setPagesCount(res.pagesCount);
      })
      .finally(() => setLoading(false));
  }

  useEffect(fetchAudios, []);

  function like(audioId) {
    audiosService.toggleLike(audioId).then((res) => {
      setAudios((prev) =>
        prev.map((audio) => (audio._id === res._id ? res : audio))
      );
    });
  }

  return (
    <div>
      <AudioSection title={t('Trending')}>
        {loading && <p>{t('Loading')}...</p>}
        {!loading && audios.length > 0 && (
          <>
            <AudioListHorizontal audios={audios} onLike={like} />
            <Pagination
              initialPage={activePage}
              pageCount={pagesCount}
              setActivePage={setActivePage}
            />
          </>
        )}
      </AudioSection>
    </div>
  );
}

export default Trending;
