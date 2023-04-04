import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

import * as audiosService from 'services/audios.service';
import * as commentsService from 'services/comments.service';

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
    <div>
      <h3>Comments</h3>
      <form onSubmit={formik.handleSubmit}>
        <textarea
          placeholder="Write your comment"
          name="text"
          value={formik.values.text}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        <button type="submit">Надіслати</button>
      </form>

      {comments.map((comment) => (
        <div>
          <div>
            <h4>{comment.owner.username}</h4>
            <p>{new Date(comment.createdAt).toLocaleString('uk')}</p>
          </div>
          <p>{comment.text}</p>
        </div>
      ))}
    </div>
  );
}

export default Comments;
