import { Link } from 'react-router-dom';

import styles from './NotificationItem.module.css';

function NotificationItem({ id, type, user, target }) {
  switch (type) {
    case 'AUDIO_LIKE':
      return AudioLikeNotification({ id, user, audio: target });
    case 'USER_FOLLOW':
      return UserFollowNotification({ id, user });
    case 'AUDIO_COMMENT':
      return CommentNotification({ id, user, comment: target });

    default:
      break;
  }
}

function AudioLikeNotification({ id, user, audio }) {
  return (
    <div className={styles.container}>
      <img
        src={user.avatarUrl}
        alt={user.username}
        className={styles.avatar}
        width={38}
        height={38}
      />
      <div className={styles.info}>
        <p className={styles.text}>
          <Link to="/" className={styles.userLink}>
            {user.username}
          </Link>{' '}
          liked your audio{' '}
          <Link to="/" className={styles.audioLink}>
            {audio.name}
          </Link>
        </p>
        <span className={styles.time}>3m ago</span>
      </div>

      <img
        src={audio.posterUrl}
        alt={audio.name}
        className={styles.audioPoster}
        width={40}
        height={40}
      />
    </div>
  );
}

function UserFollowNotification({ id, user }) {
  return (
    <div className={styles.container}>
      <img
        src={user.avatarUrl}
        alt={user.username}
        className={styles.avatar}
        width={38}
        height={38}
      />
      <div className={styles.info}>
        <p className={styles.text}>
          <Link to="/" className={styles.userLink}>
            {user.username}
          </Link>{' '}
          started following you
        </p>
        <span className={styles.time}>3m ago</span>
      </div>
    </div>
  );
}

function CommentNotification({ id, user, comment }) {
  return (
    <div className={styles.container}>
      <img
        src={user.avatarUrl}
        alt={user.username}
        className={styles.avatar}
        width={38}
        height={38}
      />
      <div className={styles.info}>
        <p className={styles.text}>
          <Link to="/" className={styles.userLink}>
            {user.username}
          </Link>{' '}
          commented your audio{' '}
          <Link to="/" className={styles.audioLink}>
            {comment.audio.name}
          </Link>
        </p>
        <p className={styles.commentText}>
          <i>
            {comment.text.length > 50
              ? comment.text.slice(0, 50) + '...'
              : comment.text}
          </i>
        </p>
        <span className={styles.time}>3m ago</span>
      </div>

      <img
        src={comment.audio.posterUrl}
        alt={comment.audio.name}
        className={styles.audioPoster}
        width={40}
        height={40}
      />
    </div>
  );
}

export default NotificationItem;
