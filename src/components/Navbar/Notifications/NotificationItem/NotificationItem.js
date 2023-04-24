import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

import styles from './NotificationItem.module.css';
import { urls } from 'utils/constants';

function NotificationItem({ id, type, user, target, createdAt }) {
  switch (type) {
    case 'AUDIO_LIKE':
      return (
        <AudioLikeNotification
          id={id}
          user={user}
          audio={target}
          createdAt={createdAt}
        />
      );
    case 'USER_FOLLOW':
      return (
        <UserFollowNotification id={id} user={user} createdAt={createdAt} />
      );
    case 'AUDIO_COMMENT':
      return (
        <CommentNotification
          id={id}
          user={user}
          comment={target}
          createdAt={createdAt}
        />
      );

    default:
      break;
  }
}

function AudioLikeNotification({ id, user, audio, createdAt }) {
  const { t } = useTranslation();

  console.log(createdAt);

  return (
    <div className={styles.container}>
      <img
        src={user.profile.avatarUrl}
        alt={user.username}
        className={styles.avatar}
        width={38}
        height={38}
      />
      <div className={styles.info}>
        <p className={styles.text}>
          <Link to={`${urls.profile}/${user._id}`} className={styles.userLink}>
            {user.username}
          </Link>{' '}
          {t('liked your audio')}{' '}
          <Link to={`${urls.audios}/${audio._id}`} className={styles.audioLink}>
            {audio.name}
          </Link>
        </p>
        <span className={styles.time}>{moment(createdAt).fromNow()}</span>
      </div>

      <img
        src={audio.coverUrl}
        alt={audio.name}
        className={styles.audioPoster}
        width={40}
        height={40}
      />
    </div>
  );
}

function UserFollowNotification({ id, user, createdAt }) {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <img
        src={user.profile.avatarUrl}
        alt={user.username}
        className={styles.avatar}
        width={38}
        height={38}
      />
      <div className={styles.info}>
        <p className={styles.text}>
          <Link to={`${urls.profile}/${user._id}`} className={styles.userLink}>
            {user.username}
          </Link>{' '}
          {t('started following you')}
        </p>
        <span className={styles.time}>{moment(createdAt).fromNow()}</span>
      </div>
    </div>
  );
}

function CommentNotification({ id, user, comment, createdAt }) {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <img
        src={user.profile.avatarUrl}
        alt={user.username}
        className={styles.avatar}
        width={38}
        height={38}
      />
      <div className={styles.info}>
        <p className={styles.text}>
          <Link to={`${urls.profile}/${user._id}`} className={styles.userLink}>
            {user.username}
          </Link>{' '}
          {t('commented your audio')}{' '}
          <Link
            to={`${urls.audios}/${comment.audio._id}`}
            className={styles.audioLink}
          >
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
        <span className={styles.time}>{moment(createdAt).fromNow()}</span>
      </div>

      <img
        src={comment.audio.coverUrl}
        alt={comment.audio.name}
        className={styles.audioPoster}
        width={40}
        height={40}
      />
    </div>
  );
}

export default NotificationItem;
