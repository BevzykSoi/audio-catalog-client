import {
  MdOutlineNotifications,
  MdOutlineNotificationsActive,
} from 'react-icons/md';
import { useState, useEffect } from 'react';
import { socket } from 'config/socket';
import { v4 as uuidv4 } from 'uuid';
import styles from './Notifications.module.css';
import { useClickOutside } from 'hooks/useClickOutside';
import NotificationItem from './NotificationItem';

const avatarUrl =
  'https://res.cloudinary.com/bevzyksoi/image/upload/v1668016321/sbcf-default-avatar_dykn6i.png';
const posterUrl =
  'https://res.cloudinary.com/dzlxh7hbv/image/upload/v1680002501/d3mhrz4ntfr3sq3brdjf.png';

function Notifications() {
  const [visible, setVisible] = useState(false);
  const [notificationItemsList, setNotificationItemsList] = useState([]);

  useClickOutside(`.${styles.container}`, () => {
    setVisible(false);
  });

  function toggle() {
    setVisible((prev) => !prev);
  }
  function onNewNotification(notification) {
    setNotificationItemsList((prev) => [...prev, notification]);
  }

  useEffect(() => {
    socket.on('new_notification', onNewNotification);
    return () => {
      socket.off('new_notification', onNewNotification);
    };
  }, []);

  return (
    <div className={styles.container}>
      <button type="button" className={styles.toggler} onClick={toggle}>
        <MdOutlineNotifications size={22} color="var(--color-text)" />
      </button>

      {visible && (
        <div className={styles.notifications}>
          {notificationItemsList.map((item) => {
            return (
              <NotificationItem
                key={uuidv4()}
                id={item.id}
                type={item.type}
                user={item.user}
                target={item.target}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Notifications;
