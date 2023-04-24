import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  AiFillCaretLeft,
  AiFillCaretRight,
  AiFillPlayCircle,
  AiFillPauseCircle,
} from 'react-icons/ai';

import styles from './AudioPlayer.module.css';
import * as audiosActions from 'redux/audios/audios.actions';
import { Link } from 'react-router-dom';
import { urls } from 'utils/constants';

const audioElem = new Audio();
audioElem.volume = 0.1;

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

function convertTime(time) {
  var mins = Math.floor(time / 60);
  if (mins < 10) {
    mins = '0' + String(mins);
  }
  var secs = Math.floor(time % 60);
  if (secs < 10) {
    secs = '0' + String(secs);
  }

  return mins + ':' + secs;
}

function AudioPlayer({ audioIndex, playlist }) {
  const dispatch = useDispatch();

  const [paused, setPaused] = useState(true);
  const [volume, setVolume] = useState(audioElem.volume);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentTimeCache, setCurrentTimeCache] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    audioElem.addEventListener('play', () => {
      setPaused(false);
    });

    audioElem.addEventListener('pause', () => {
      setPaused(true);
    });

    audioElem.addEventListener('volumechange', (e) => {
      setVolume(e.currentTarget.volume);
    });

    audioElem.addEventListener('timeupdate', (e) => {
      setCurrentTime(e.currentTarget.currentTime);
    });

    audioElem.addEventListener('ended', () => {
      next();
    });

    setVolume(audioElem.volume);
  }, []);

  useEffect(() => {
    if (!playlist[audioIndex]) {
      return;
    }

    audioElem.src = playlist[audioIndex].fileUrl;
    audioElem.preload = 'metadata';
    audioElem.onloadedmetadata = function () {
      setDuration(audioElem.duration);
    };
    play();
  }, [audioIndex, playlist]);

  function play() {
    audioElem.play();
  }

  function pause() {
    audioElem.pause();
  }

  function prev() {
    if (audioIndex - 1 === -1) {
      return;
    }

    dispatch(audiosActions.setIndex(audioIndex - 1));
  }

  function next() {
    if (audioIndex + 1 === playlist.length) {
      return;
    }

    dispatch(audiosActions.setIndex(audioIndex + 1));
  }

  const activeAudio = playlist[audioIndex];

  return (
    <div className={styles.container}>
      {activeAudio ? (
        <img
          src={activeAudio.coverUrl}
          width={120}
          height={120}
          alt="Audio cover"
          className={styles.cover}
        />
      ) : (
        <div />
      )}

      <div className={styles.main}>
        <p className={styles.title}>
          <Link to={`${urls.audios}/${activeAudio._id}`}>
            {activeAudio.name}
          </Link>{' '}
          by{' '}
          <Link to={`${urls.profile}/${activeAudio.author._id}`}>
            {activeAudio.author.username}
          </Link>
        </p>
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.controlBtn}
            onClick={prev}
            disabled={audioIndex - 1 === -1}
          >
            <AiFillCaretLeft size={32} />
          </button>
          <button
            type="button"
            className={styles.controlBtn}
            onClick={() => (paused ? play() : pause())}
          >
            {paused ? (
              <AiFillPlayCircle size={32} />
            ) : (
              <AiFillPauseCircle size={32} />
            )}
          </button>
          <button
            type="button"
            className={styles.controlBtn}
            onClick={next}
            disabled={audioIndex + 1 === playlist.length}
          >
            <AiFillCaretRight size={32} />
          </button>
        </div>
        <div className={styles.track}>
          <span className={styles.time}>{convertTime(currentTime)}</span>
          <input
            type="range"
            className={styles.slider}
            min={0}
            max={duration}
            value={isEditing ? currentTimeCache : currentTime}
            onChange={(e) => setCurrentTimeCache(e.target.valueAsNumber)}
            onMouseDown={() => setIsEditing(true)}
            onMouseUp={() => {
              setIsEditing(false);
              audioElem.currentTime = currentTimeCache;
            }}
          />
          <span className={styles.time}>{convertTime(duration)}</span>
        </div>
      </div>

      <div className={styles.volumeBox}>
        <span className={styles.volumeLabel}>{Math.round(volume * 100)}%</span>
        <input
          type="range"
          min={0}
          max={100}
          value={volume * 100}
          onChange={(e) => (audioElem.volume = e.target.valueAsNumber / 100)}
        />
      </div>
    </div>
  );
}

export default AudioPlayer;
