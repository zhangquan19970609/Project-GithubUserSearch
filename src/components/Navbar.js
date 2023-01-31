// Auth0 配置完成后，在页面上设置的第一步：
// 参考 https://auth0.github.io/auth0-react/
import React from 'react';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';

const Navbar = () => {
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } = useAuth0();

  // 这个用户是否存在，且已经登录？(是 true 还是 false)
  const isUser = isAuthenticated && user;
  console.log(user);
  // 当发现无法加载时，可对照已经建立好的 application 重新 Configure 一次！
  return <Wrapper>
      {isUser && user.picture && <img src={user.picture} alt={user.name} />}
      {isUser && user.name && (
        <h4>
          Welcome, <strong>{user.name.toUpperCase()}</strong>
        </h4>
      )}
      {isUser ? (
        <button
          onClick={() => {
            logout({ returnTo: window.location.origin });
          }}
        >
          logout
        </button>
      ) : (
        <button onClick={loginWithRedirect}>login</button>
      )}
    </Wrapper>
};

const Wrapper = styled.nav`
  padding: 1.5rem;
  margin-bottom: 4rem;
  background: var(--clr-white);
  text-align: center;
  display: grid;
  grid-template-columns: auto auto 100px;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  h4 {
    margin-bottom: 0;
    font-weight: 400;
  }
  img {
    width: 35px !important;
    height: 35px;
    border-radius: 50%;
    object-fit: cover;
  }
  button {
    background: transparent;
    border: transparent;
    font-size: 1.2rem;
    text-transform: capitalize;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
`;

export default Navbar;
