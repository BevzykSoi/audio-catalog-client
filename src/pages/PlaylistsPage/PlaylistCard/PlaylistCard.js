import { Link } from 'react-router-dom';

import { urls } from 'utils/constants';
import styles from './PlaylistCard.module.css';

function PlaylistCard({ _id, name, genres, audios }) {
  return (
    <Link className={styles.card} to={`${urls.playlists}/${_id}`}>
      <h4 className={styles.name}>
        {name} ({audios.length})
      </h4>
      {genres?.length > 0 && (
        <div className={styles.genresList}>
          <span>Жанри: </span>
          {genres.map((genre) => (
            <span key={genre} className={styles.genre}>
              {genre}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}

export default PlaylistCard;
