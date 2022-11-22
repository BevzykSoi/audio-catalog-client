import { useState, useMemo } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { BsX } from 'react-icons/bs';

import styles from './UploadPage.module.css';
import * as audiosService from 'services/audios.service';
import { urls } from 'utils/constants';
import * as authSelectors from 'redux/auth/auth.selectors';

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  genres: Yup.string().required(),
});

async function getDuration(file) {
  const url = URL.createObjectURL(file);

  return new Promise((resolve) => {
    const audio = document.createElement('audio');
    audio.muted = true;
    const source = document.createElement('source');
    source.src = url;
    audio.preload = 'metadata';
    audio.appendChild(source);
    audio.onloadedmetadata = function () {
      resolve(audio.duration);
    };
  });
}

function UploadPage() {
  const formik = useFormik({
    initialValues: {
      name: '',
      genres: '',
    },
    validationSchema,
  });

  const navigate = useNavigate();

  const { t } = useTranslation();

  const user = useSelector(authSelectors.getUser);

  const [cover, setCover] = useState(null);
  const [audio, setAudio] = useState(null);
  const [loading, setLoading] = useState(false);
  const coverPreviewUrl = useMemo(
    () => (cover ? URL.createObjectURL(cover) : ''),
    [cover]
  );
  const audioPreviewUrl = useMemo(
    () => (audio ? URL.createObjectURL(audio) : ''),
    [audio]
  );
  const [genres, setGenres] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    getDuration(audio).then((duration) => {
      const formData = new FormData(e.target);
      formData.append('duration', duration);
      formData.append('genres', genres.join(', '));

      setLoading(true);

      audiosService
        .upload(formData)
        .then(() => {
          navigate(`${urls.profile}/${user._id}`);
        })
        .finally(() => setLoading(false));
    });
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <input
            type="file"
            accept="image/*"
            placeholder="Cover"
            name="cover"
            id="audioCoverInput"
            className={styles.coverInput}
            onChange={(e) => setCover(e.target.files[0])}
          />
          <label className={styles.coverLabel} htmlFor="audioCoverInput">
            {coverPreviewUrl && (
              <img
                src={coverPreviewUrl}
                width={150}
                height={150}
                alt="Audio cover preview"
                className={styles.coverLabelImage}
              />
            )}
            <span className={styles.coverLabelText}>{t('Cover')}</span>
          </label>
        </div>

        <div className={styles.field}>
          <label className={styles.audioLabel}>{t('Audio')}</label>
          <input
            type="file"
            accept="audio/*"
            placeholder="Audio"
            name="audio"
            onChange={(e) => setAudio(e.target.files[0])}
          />
          {audioPreviewUrl && <audio src={audioPreviewUrl} controls />}
        </div>

        <input
          type="text"
          placeholder={t('Name')}
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={styles.input}
        />
        {/* <input
          type="text"
          placeholder={`${t('Genres')} (Rock, Pop, Classical)`}
          name="genres"
          value={formik.values.genres}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={styles.input}
        /> */}
        <div className={styles.genres}>
          {genres.map((genre) => (
            <button
              type="button"
              key={genre}
              className={styles.genre}
              onClick={() =>
                setGenres((prev) => prev.filter((item) => item !== genre))
              }
            >
              <span>{genre}</span>
              <BsX size={14} />
            </button>
          ))}
        </div>
        <select
          className={styles.input}
          onChange={(e) =>
            e.target.value !== '' &&
            setGenres((prev) => [...prev, e.target.value])
          }
        >
          <option value="">Select genres</option>
          {[
            'Pop',
            'Rock',
            'Jazz',
            'Traditional',
            'Hip-Hop',
            'Electronic',
            'Folk',
            'Indi',
            'Country',
            'Classical',
          ]
            .filter((genre) => !genres.includes(genre))
            .map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
        </select>

        {loading && <p>Loading...</p>}

        <button type="submit" className={styles.btn} disabled={loading}>
          {t('Upload')}
        </button>
      </form>
    </div>
  );
}

export default UploadPage;
