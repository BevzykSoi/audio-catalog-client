import { Link } from 'react-router-dom';
import { AiFillHeart, AiOutlineHeart, AiOutlineClose } from 'react-icons/ai';
import { BiPlay } from 'react-icons/bi';

import styles from './AudioCard.module.css';
import { urls } from 'utils/constants';

function PlaylistAudioCard({
  _id,
  index,
  name,
  coverUrl,
  author,
  isLiked,
  onPlay,
  onLike,
  isLoggedIn,
  onRemove,
}) {
  return (
    <div className={styles.card}>
      <img
        src={coverUrl}
        width={130}
        height={130}
        alt={name}
        className={styles.cover}
      />
      <h4 className={styles.name} title={name}>
        <Link to={`${urls.audios}/${_id}`}>{name}</Link>
      </h4>
      <div className={styles.footer}>
        <Link to={`${urls.profile}/${author._id}`} className={styles.author}>
          by {author.username}
        </Link>
        {isLoggedIn && (
          <button
            type="button"
            onClick={() => onLike(_id)}
            disabled={!isLoggedIn}
            className={styles.likeBtn}
          >
            {isLiked ? <AiFillHeart size={32} /> : <AiOutlineHeart size={32} />}
          </button>
        )}
      </div>
      <button
        type="button"
        onClick={() => onPlay(index, _id)}
        className={styles.playBtn}
      >
        <BiPlay size={55} />
      </button>
      <button
        type="button"
        className={styles.removeBtn}
        onClick={() => onRemove(_id)}
      >
        <AiOutlineClose size={20} />
      </button>
    </div>
  );
}

export default PlaylistAudioCard;
