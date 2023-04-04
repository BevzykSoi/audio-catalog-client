import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactPaginate from 'react-paginate';

import * as audiosService from 'services/audios.service';
import AudioSection from 'components/AudioSection/AudioSection';
import AudioListHorizontal from 'components/AudioListHorizontal/AudioListHorizontal';

function NewReleases() {
  const [audios, setAudios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagesCount, setPagesCount] = useState(1);
  const [activePage, setActivePage] = useState(0);

  const { t } = useTranslation();

  function fetchAudios() {
    setLoading(true);

    audiosService
      .getNew(activePage + 1)
      .then((res) => {
        setAudios(res.items);
        setPagesCount(res.pagesCount);
      })
      .finally(() => setLoading(false));
  }

  useEffect(fetchAudios, [activePage]);

  function like(audioId) {
    audiosService.toggleLike(audioId).then((res) => {
      setAudios((prev) =>
        prev.map((audio) => (audio._id === res._id ? res : audio))
      );
    });
  }

  return (
    <div>
      <AudioSection title={t('New Releases')}>
        {loading && <p>{t('Loading')}...</p>}
        {audios.length > 0 && (
          <>
            <AudioListHorizontal audios={audios} onLike={like} />
            <ReactPaginate
              initialPage={activePage}
              breakLabel="..."
              nextLabel=">"
              previousLabel="<"
              pageRangeDisplayed={5}
              pageCount={pagesCount}
              disableInitialCallback
              className="react-paginate"
              onPageChange={({ selected }) => setActivePage(selected)}
            />
          </>
        )}
      </AudioSection>
    </div>
  );
}

export default NewReleases;
