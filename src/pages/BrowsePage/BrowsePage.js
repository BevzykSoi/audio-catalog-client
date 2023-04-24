import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './BrowsePage.module.css';
import AudioListHorizontal from 'components/AudioListHorizontal/AudioListHorizontal';
import AudioSection from 'components/AudioSection/AudioSection';
import * as audiosService from 'services/audios.service';
import Container from 'components/Container/Container';
import Pagination from 'components/Pagination/Pagination';

function BrowsePage() {
  const [q, setQ] = useState('');
  const [oldQ, setOldQ] = useState('');
  const [audios, setAudios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pagesCount, setPagesCount] = useState(1);

  const { t } = useTranslation();

  function handleSubmit(e) {
    e.preventDefault();

    setOldQ(q);
    setLoading(true);

    audiosService
      .search(q, page + 1)
      .then((res) => {
        setAudios(res.items);
        setPage(res.page);
        setPagesCount(res.pagesCount);
      })
      .finally(() => setLoading(false));
  }

  function like(audioId) {
    audiosService.toggleLike(audioId).then((res) => {
      setAudios((prev) =>
        prev.map((audio) => (audio._id === res._id ? res : audio))
      );
    });
  }

  return (
    <Container>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <input
          type="search"
          name="q"
          placeholder={`${t('Search')}...`}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.searchBtn} disabled={loading}>
          {t('Search')}
        </button>
      </form>

      {audios.length > 0 && (
        <AudioSection title={`${t('Results for')} ${oldQ}`}>
          {loading && <p>{t('Loading')}...</p>}
          <AudioListHorizontal audios={audios} onLike={like} />
        </AudioSection>
      )}

      {audios.length > 0 && (
        <Pagination
          activePage={page - 1}
          pageCount={pagesCount}
          setActivePage={setPage}
        />
      )}
    </Container>
  );
}

export default BrowsePage;
