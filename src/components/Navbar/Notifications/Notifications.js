import {
  MdOutlineNotifications,
  MdOutlineNotificationsActive,
} from 'react-icons/md';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { socket } from 'config/socket';
import styles from './Notifications.module.css';
import { useClickOutside } from 'hooks/useClickOutside';
import NotificationItem from './NotificationItem';
import * as usersService from 'services/users.service';
import * as authSelectors from 'redux/auth/auth.selectors';

const avatarUrl =
  'https://res.cloudinary.com/bevzyksoi/image/upload/v1668016321/sbcf-default-avatar_dykn6i.png';
const posterUrl =
  'https://res.cloudinary.com/dzlxh7hbv/image/upload/v1680002501/d3mhrz4ntfr3sq3brdjf.png';

function Notifications() {
  const [visible, setVisible] = useState(false);
  const [notificationItemsList, setNotificationItemsList] = useState([]);

  const user = useSelector(authSelectors.getUser);

  useClickOutside(`.${styles.container}`, () => {
    setVisible(false);
  });

  function toggle() {
    setVisible((prev) => !prev);
  }
  function onNewNotification(notification) {
    setNotificationItemsList((prev) => [notification, ...prev]);
  }

  useEffect(() => {
    socket.on('new_notification', onNewNotification);
    return () => {
      socket.off('new_notification', onNewNotification);
    };
  }, []);

  useEffect(() => {
    if (!user) {
      return;
    }

    usersService
      .getUserNotifications(user._id)
      .then((data) => setNotificationItemsList(data.reverse()));
  }, [user]);

  return (
    <div className={styles.container}>
      <button type="button" className={styles.toggler} onClick={toggle}>
        <MdOutlineNotifications size={22} color="var(--color-text)" />
      </button>

      {visible && (
        <div className={styles.notifications}>
          {notificationItemsList.length > 0 ? (
            notificationItemsList.map((item) => {
              return (
                <NotificationItem
                  key={item._id}
                  id={item._id}
                  type={item.type}
                  user={item.user}
                  target={item.target}
                />
              );
            })
          ) : (
            <p>No notifications</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Notifications;
