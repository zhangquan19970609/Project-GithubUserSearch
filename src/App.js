import React from 'react';
import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from './pages';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

  {/* 设置好 Private Route 之后，发现执行 loginWithRedirect，会导致回到 login 页面，
  理论上已经登录了但还是显示 /login 而不是 /Dashboard.
  正如同在 Navbar 上 Login 会回到 Navbar 上一样。

  本质原因：在 Auth0 过程中尚处于 loading stage, 因此 isUser 分别为 false 和 undefined.

  解决方案：为 App 添加一个 handle loading stage 的 Wrapper.

  https://auth0.com/docs/libraries/auth0-react isLoading & Error 部分
*/}



// function AuthWrapper({children}) {
//   const {
//     isLoading,
//     error,
//   } = useAuth0();
  
//   if (isLoading) {
//     return <div>Loading...</div>;
//   }
  
//   if (error) {
//     return <div>Oops... {error.message}</div>;
//   }
  
//   return <>{children}</>;
// }


function App() {
  return (
    <div>
      <AuthWrapper>
        <Router>
          <Switch>
            <PrivateRoute exact={true} path='/'>
              {/* dashboard 是事实上的 homepage */}
              <Dashboard></Dashboard> 
            </PrivateRoute>
            <Route path='/login'>
              <Login></Login>
            </Route>
            {/* 避免任何情况下都render error page，使用一个 switch 来包含所有 route 组。 */}
            <Route  path='*'>
              <Error />
            </Route>
            </Switch>
        </Router>
      </AuthWrapper>
    </div>
  );
}

export default App;
