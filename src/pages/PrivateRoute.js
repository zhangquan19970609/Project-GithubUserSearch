import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

// 用 PrivateRouter 盛装每一个 user 的 DashBoard.

const PrivateRoute = ({children, ...rest}) => { // children 指 App 中 被 <PrivateRoute> 包含的元素（Dashboard）
  // 而 ...rest 指的是 PrivateRoute 在调用时的其他 props: exact 与 path
  const {user, isAuthenticated} = useAuth0();
  const isUser = user && isAuthenticated;
  return <Route
    {...rest}
    render={() => {
      return isUser ? children : <Redirect to='/login'></Redirect>; // 若存在则加载 Dashboard，若不存在则 redirect to login.
    }}
  ></Route>
};
export default PrivateRoute;
