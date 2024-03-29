import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import styles from './PlaylistPage.module.css';
import * as playlistsServices from 'services/playlists.services';
import AudioSection from 'components/AudioSection/AudioSection';
import AudioListHorizontal from 'components/AudioListHorizontal/AudioListHorizontal';
import * as audiosService from 'services/audios.service';
import Container from 'components/Container/Container';

function PlaylistPage() {
  const { playlistId } = useParams();

  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { t } = useTranslation();

  useEffect(fetchPlaylist, [playlistId]);

  function fetchPlaylist() {
    setLoading(true);

    playlistsServices
      .getById(playlistId)
      .then(setPlaylist)
      .catch(setError)
      .finally(() => setLoading(false));
  }

  function removeAudioFromPlaylist(audioId) {
    setLoading(true);

    audiosService
      .removeFromPlaylist(audioId, playlistId)
      .then(fetchPlaylist)
      .catch(setError)
      .finally(() => setLoading(false));
  }

  function like(audioId) {
    audiosService.toggleLike(audioId).then((res) => {
      setPlaylist((prev) => ({
        ...prev,
        audios: prev.audios.map((audio) =>
          audio._id === res._id ? res : audio
        ),
      }));
    });
  }

  return (
    <Container>
      {loading && <p>{t('Loading')}...</p>}
      {error && <p>{error.message}</p>}
      {playlist && (
        <>
          <AudioSection title={playlist.name}>
            <AudioListHorizontal
              audios={playlist.audios}
              onLike={like}
              cardType="playlist"
              onRemove={removeAudioFromPlaylist}
            />
          </AudioSection>
        </>
      )}
    </Container>
  );
}

export default PlaylistPage;
