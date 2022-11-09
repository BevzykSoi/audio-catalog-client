import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import * as authSelectors from 'redux/auth/auth.selectors';
import { urls } from 'utils/constants';

function PrivateRoute({ children }) {
  const isLoggedIn = useSelector(authSelectors.isLoggedIn);

  return isLoggedIn ? children : <Navigate to={urls.login} />;
}

export default PrivateRoute;
