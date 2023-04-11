import { useDispatch, useSelector } from 'react-redux';

import styles from './AudioListHorizontal.module.css';
import AudioCard from 'components/AudioCard/AudioCard';
import PlaylistAudioCard from 'components/AudioCard/PlaylistAudioCard';
import * as audiosActions from 'redux/audios/audios.actions';
import * as authSelectors from 'redux/auth/auth.selectors';
import * as audiosService from 'services/audios.service';

function AudioListHorizontal({
  audios,
  onLike,
  cardType = 'default',
  onRemove,
}) {
  const dispatch = useDispatch();

  const user = useSelector(authSelectors.getUser);
  const isLoggedIn = useSelector(authSelectors.isLoggedIn);

  function handlePlay(index, id) {
    audiosService.listen(id);
    dispatch(audiosActions.setPlaylist(audios));
    dispatch(audiosActions.setIndex(index));
  }

  return (
    <div className={styles.list}>
      {audios.map((audio, index) => {
        switch (cardType) {
          case 'default':
            return (
              <AudioCard
                key={audio._id}
                {...audio}
                index={index}
                onPlay={handlePlay}
                onLike={onLike}
                isLiked={isLoggedIn && audio.usersLiked.includes(user._id)}
                isLoggedIn={isLoggedIn}
              />
            );
          case 'playlist':
            return (
              <PlaylistAudioCard
                key={audio._id}
                {...audio}
                index={index}
                onPlay={handlePlay}
                onLike={onLike}
                isLiked={isLoggedIn && audio.usersLiked.includes(user._id)}
                isLoggedIn={isLoggedIn}
                onRemove={onRemove}
              />
            );

          default:
            return (
              <AudioCard
                key={audio._id}
                {...audio}
                index={index}
                onPlay={handlePlay}
                onLike={onLike}
                isLiked={isLoggedIn && audio.usersLiked.includes(user._id)}
                isLoggedIn={isLoggedIn}
              />
            );
        }
      })}
    </div>
  );
}

export default AudioListHorizontal;
