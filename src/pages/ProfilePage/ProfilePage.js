import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import styles from './ProfilePage.module.css';
import * as authSelectors from 'redux/auth/auth.selectors';
import * as usersService from 'services/users.service';
import CreatedAudios from './CreatedAudios';
import LikedAudios from './LikedAudios';
import AudioSection from 'components/AudioSection/AudioSection';
import Container from 'components/Container/Container';

function ProfilePage() {
  const { userId } = useParams();
  const authUser = useSelector(authSelectors.getUser);
  const isLoggedIn = useSelector(authSelectors.isLoggedIn);

  const isAuthUser = authUser?._id === userId;

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();

  const isFollowing = user?.followers?.includes(authUser?._id);

  function fetchUserData() {
    setLoading(true);

    usersService
      .getUser(userId)
      .then((res) => setUser(res))
      .finally(() => setLoading(false));
  }

  useEffect(fetchUserData, [userId]);

  function followToggle() {
    usersService.followToggle(userId).then((res) => setUser(res));
  }

  return (
    <div>
      {loading && <p>{t('Loading')}...</p>}
      {!loading && user && (
        <div>
          <div className={styles.header}>
            <div className={styles.bannerContainer}>
              <img
                src={user.profile?.banner}
                alt="User banner"
                height={460}
                className={styles.banner}
              />
              <div className={styles.bannerOverlay} />
            </div>

            <div className={styles.headerContent}>
              <h1 className={styles.username}>{user.username}</h1>
              <p className={styles.following}>
                {t('Following')}: {user.following?.length}
              </p>
              <p className={styles.followers}>
                {t('Followers')}: {user.followers?.length}
              </p>
              {isLoggedIn && !isAuthUser && (
                <button
                  type="button"
                  onClick={followToggle}
                  className={styles.followBtn}
                >
                  {isFollowing ? t('Unfollow') : t('Follow')}
                </button>
              )}
            </div>
          </div>

          <Container>
            <AudioSection title={t('Genres')}>
              <div className={styles.tags}>
                {user.profile?.genres?.map((genre) => (
                  <span key={genre} className={styles.tagItem}>
                    {genre}{' '}
                  </span>
                ))}
              </div>
            </AudioSection>

            <AudioSection title={t('Uploaded audios')}>
              <CreatedAudios userId={userId} />
            </AudioSection>
            <AudioSection title={t('Liked audios')}>
              <LikedAudios userId={userId} />
            </AudioSection>
          </Container>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
