import { Routes, Route } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { routes } from 'config/router';
import Navbar from 'components/Navbar/Navbar';
import { getProfile } from 'redux/auth/auth.operations';
import * as authSelectors from 'redux/auth/auth.selectors';
import PrivateRoute from 'utils/PrivateRoute';
import PublicRoute from 'utils/PublicRoute';
import AudioPlayer from './AudioPlayer/AudioPlayer';

function App() {
  const dispatch = useDispatch();

  const { i18n } = useTranslation();

  const { audioIndex, playlist } = useSelector((state) => state.audios);
  const user = useSelector(authSelectors.getUser);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    if (!user) {
      return;
    }

    i18n.changeLanguage(user.profile.language);
  }, [user]);

  return (
    <div className="App">
      <Suspense fallback={null}>
        <Routes>
          {routes.map(({ Component, isPrivate, isPublicOnly, ...route }) => (
            <Route
              {...route}
              element={
                isPrivate ? (
                  <PrivateRoute>
                    <Component />
                  </PrivateRoute>
                ) : (
                  <PublicRoute isPublicOnly={isPublicOnly}>
                    <Component />
                  </PublicRoute>
                )
              }
            />
          ))}
        </Routes>

        <Navbar />
        {playlist[audioIndex] && (
          <AudioPlayer audioIndex={audioIndex} playlist={playlist} />
        )}
      </Suspense>
    </div>
  );
}

export default App;
