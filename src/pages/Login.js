import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import loginImg from '../images/login-img.svg';
const Login = () => {

  const { loginWithRedirect } = useAuth0();
  return <Wrapper>
    <div className='container'>
      <img src={loginImg} alt='github user'></img>
      <h1>Github User</h1>
      <button className='btn' onClick={() => loginWithRedirect()}>log in / sign up</button> 
  {/* 设置好 Private Route 之后，发现执行 loginWithRedirect，会导致回到 login 页面，
  理论上已经登录了但还是显示 /login 而不是 /Dashboard.
  正如同在 Navbar 上 Login 会回到 Navbar 上一样。

  本质原因：在 Auth0 过程中尚处于 loading stage, 因此 isUser 分别为 false 和 undefined.

  解决方案：为 App 添加一个 handle loading stage 的 Wrapper.

    https://auth0.com/docs/libraries/auth0-react isLoading & Error 部分
*/}

    </div>
  </Wrapper>;
};
const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  .container {
    width: 90vw;
    max-width: 600px;
    text-align: center;
  }
  img {
    margin-bottom: 2rem;
  }
  h1 {
    margin-bottom: 1.5rem;
  }
`;
export default Login;
