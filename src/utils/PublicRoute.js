import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import * as authSelectors from 'redux/auth/auth.selectors';
import { urls } from 'utils/constants';

function PublicRoute({ isPublicOnly, children }) {
  const isLoggedIn = useSelector(authSelectors.isLoggedIn);

  return isLoggedIn && isPublicOnly ? <Navigate to={urls.home} /> : children;
}

export default PublicRoute;
