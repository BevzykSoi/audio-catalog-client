import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import styles from './LoginPage.module.css';
import { login } from 'redux/auth/auth.operations';
import * as authSelectors from 'redux/auth/auth.selectors';
import Alert from 'components/Alert/Alert';

const validationSchema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required(),
});

function LoginPage() {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const loading = useSelector(authSelectors.getLoading);
  const error = useSelector(authSelectors.getError);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => {
      dispatch(login(values));
    },
    validationSchema,
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <input
          type="text"
          autoComplete="username"
          name="username"
          placeholder={t('Username')}
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder={t('Password')}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={styles.input}
        />

        {loading && <p>Loading...</p>}
        {error && <Alert>{error}</Alert>}

        <button type="submit" className={styles.btn} disabled={loading}>
          {t('Login')}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
