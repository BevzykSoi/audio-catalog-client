import { lazy } from 'react';

import { urls } from 'utils/constants';

export const routes = [
  {
    key: 'home',
    path: urls.home,
    Component: lazy(() => import('pages/HomePage/HomePage')),
    isPrivate: false,
    isPublicOnly: false,
  },
  {
    key: 'register',
    path: urls.register,
    Component: lazy(() => import('pages/RegisterPage/RegisterPage')),
    isPrivate: false,
    isPublicOnly: true,
  },
  {
    key: 'login',
    path: urls.login,
    Component: lazy(() => import('pages/LoginPage/LoginPage')),
    isPrivate: false,
    isPublicOnly: true,
  },
  {
    key: 'browse',
    path: urls.browse,
    Component: lazy(() => import('pages/BrowsePage/BrowsePage')),
    isPrivate: false,
    isPublicOnly: false,
  },
  {
    key: 'profile',
    path: `${urls.profile}/:userId`,
    Component: lazy(() => import('pages/ProfilePage/ProfilePage')),
    isPrivate: false,
    isPublicOnly: false,
  },
  {
    key: 'upload',
    path: urls.upload,
    Component: lazy(() => import('pages/UploadPage/UploadPage')),
    isPrivate: true,
    isPublicOnly: false,
  },
  {
    key: 'settings',
    path: urls.settings,
    Component: lazy(() => import('pages/SettingsPage/SettingsPage')),
    isPrivate: true,
    isPublicOnly: false,
  },
];
