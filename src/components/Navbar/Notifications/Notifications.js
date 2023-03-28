import {
  MdOutlineNotifications,
  MdOutlineNotificationsActive,
} from 'react-icons/md';
import { useState } from 'react';

import styles from './Notifications.module.css';
import { useClickOutside } from 'hooks/useClickOutside';
import NotificationItem from './NotificationItem';

const avatarUrl =
  'https://res.cloudinary.com/bevzyksoi/image/upload/v1668016321/sbcf-default-avatar_dykn6i.png';
const posterUrl =
  'https://res.cloudinary.com/dzlxh7hbv/image/upload/v1680002501/d3mhrz4ntfr3sq3brdjf.png';

function Notifications() {
  const [visible, setVisible] = useState(false);

  useClickOutside(`.${styles.container}`, () => {
    setVisible(false);
  });

  function toggle() {
    setVisible((prev) => !prev);
  }

  return (
    <div className={styles.container}>
      <button type="button" className={styles.toggler} onClick={toggle}>
        <MdOutlineNotifications size={22} color="var(--color-text)" />
      </button>

      {visible && (
        <div className={styles.notifications}>
          <NotificationItem
            id="1"
            type="AUDIO_LIKE"
            user={{ _id: '1', username: 'user1', avatarUrl }}
            target={{ _id: '1', name: 'audio1', posterUrl }}
          />
          <NotificationItem
            id="1"
            type="USER_FOLLOW"
            user={{ _id: '1', username: 'user1', avatarUrl }}
            target={{ _id: '2', name: 'auth_user', avatarUrl }}
          />
          <NotificationItem
            id="1"
            type="AUDIO_COMMENT"
            user={{ _id: '1', username: 'user1', avatarUrl }}
            target={{
              _id: '1',
              text: 'Excepteur qui Lorem qui duis aliqua. Cupidatat eiusmod ut tempor excepteur anim qui anim non duis consectetur. Sint dolor adipisicing do consequat laborum magna velit ex dolore.',
              audio: { id: '1', name: 'audio1', posterUrl },
            }}
          />
        </div>
      )}
    </div>
  );
}

export default Notifications;
