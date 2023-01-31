import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { GithubProvider } from './context/context';
import { Auth0Provider } from '@auth0/auth0-react';
// https://auth0.github.io/auth0-react/
// Domain
// dev-yyshkjggdlhptodt.us.auth0.com
// ClientID
// 0a9ER7rdD4bFoGaKKIcTZpP8uhMgdZYD
// 此项设置完成后，打开 Auth0 的 React SDK，对 Navbar 进行设置


  {/*
    使用 Email 登录时，进入 404 Error page 再退出，仍然处于正常登录状态，
    但使用 social 登录，则可能无法实现这种 persistency。

    解决方法：在 Auth0 Provider 的 props 中使用 cacheLocation='localstorage' prop.
  */}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
        domain='dev-yyshkjggdlhptodt.us.auth0.com'
        clientId='gty6fU8NLF2jLwZDk8Sy1FpncXSATgXZ'
        redirectUri={window.location.origin}
        cacheLocation='localstorage'
      >
      <GithubProvider>
        <App />
      </GithubProvider>
    </Auth0Provider>
    
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
