import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Container from 'components/Container/Container';
import { getAudio } from 'services/audios.service';
import styles from './AudioPage.module.css';
import { urls } from 'utils/constants';
import Comments from './Comments/Comments';
import AddToPlaylist from './AddToPlaylist/AddToPlaylist';

function AudioPage() {
  const { audioId } = useParams();
  const [audio, setAudio] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    getAudio(audioId)
      .then(setAudio)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [audioId]);

  return (
    <Container>
      {loading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {audio && (
        <div>
          <div className={styles.header}>
            <img
              src={audio.coverUrl}
              alt={audio.name}
              className={styles.cover}
            />
            <div className={styles.info}>
              <h1 className={styles.name}>{audio.name}</h1>
              <h3 className={styles.author}>
                <Link to={`${urls.profile}/${audio.author._id}`}>
                  {audio.author.username}
                </Link>
              </h3>

              <div className={styles.genresList}>
                {audio.genres.map((genre) => (
                  <span key={genre} className={styles.genre}>
                    #{genre}
                  </span>
                ))}
              </div>

              <p>{audio.listenCount} прослуховувань</p>
              <p>{audio.usersLiked.length} лайків</p>

              <AddToPlaylist audio={audio} />
            </div>
          </div>
          <Comments audioId={audio._id} />
        </div>
      )}
    </Container>
  );
}

export default AudioPage;
