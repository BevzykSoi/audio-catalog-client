import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import moment from 'moment';

import * as audiosService from 'services/audios.service';
import * as commentsService from 'services/comments.service';
import styles from './Comments.module.css';

const validationSchema = yup.object().shape({
  text: yup.string().max(200).required(),
});

function Comments({ audioId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const formik = useFormik({
    initialValues: {
      text: '',
    },
    validationSchema,
    onSubmit: (values) => {
      const data = {
        audio: audioId,
        text: values.text,
        replyTo: undefined,
      };

      setLoading(true);

      commentsService
        .create(data)
        .then((res) => setComments((prev) => [res, ...prev]))
        .catch(setError)
        .finally(() => setLoading(false));
    },
  });

  useEffect(() => {
    setLoading(true);

    audiosService
      .getAudioComments(audioId)
      .then((res) => setComments(res.reverse()))
      .catch(setError)
      .finally(() => setLoading(false));
  }, [audioId]);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Comments</h3>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <textarea
          className={styles.input}
          placeholder="Write your comment"
          name="text"
          value={formik.values.text}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        <button type="submit" className={styles.btn}>
          Надіслати
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {comments.map((comment) => (
        <div key={comment._id} className={styles.comment}>
          <div className={styles.commentHeader}>
            <h4 className={styles.commentAuthor}>{comment.owner.username}</h4>
            <p className={styles.commentTime}>
              {moment(comment.createdAt).fromNow()}
            </p>
          </div>
          <p className={styles.commentText}>{comment.text}</p>
        </div>
      ))}
    </div>
  );
}

export default Comments;
