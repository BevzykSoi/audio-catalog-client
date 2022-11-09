import { Link } from 'react-router-dom';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BiPlay } from 'react-icons/bi';

import styles from './AudioCard.module.css';
import { urls } from 'utils/constants';

function AudioCard({
  _id,
  index,
  name,
  coverUrl,
  author,
  isLiked,
  onPlay,
  onLike,
  isLoggedIn,
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
        {name}
      </h4>
      <div className={styles.footer}>
        <Link to={`${urls.profile}/${author._id}`} className={styles.author}>
          by {author.username}
        </Link>
        <button
          type="button"
          onClick={() => onLike(_id)}
          disabled={!isLoggedIn}
          className={styles.likeBtn}
        >
          {isLiked ? <AiFillHeart size={32} /> : <AiOutlineHeart size={32} />}
        </button>
      </div>
      <button
        type="button"
        onClick={() => onPlay(index, _id)}
        className={styles.playBtn}
      >
        <BiPlay size={55} />
      </button>
    </div>
  );
}

export default AudioCard;
