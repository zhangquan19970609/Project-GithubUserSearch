## Starter Project

- css provided (global styles, styled components)
- folders/files already setup
- all imports included (warnings)
- index.js for easier imports

## Styled Components

[Styled-Components - Main Docs](https://styled-components.com/)

```jsx
import styled from "styled-components";

const ReactComponent = () => {
 // logic here
 return <Wrapper>
 {some content}
 </Wrapper>
}


const Wrapper = styled.htmlElement`
write your styles here
`
export default ReactComponent
```

## React Icons

[React Icons - Main Docs](https://react-icons.github.io/react-icons/)

```jsx
import { FiUsers, FiUserPlus } from "react-icons/fi";
<FiUsers className="nameOfTheClass"> </FiUsers>;
```

## React Router Dom

version used - "react-router-dom": "^5.2.0",

- [react-router-dom - Main Docs](https://reactrouter.com/web/guides/quick-start)

- <Switch> renders the first child <Route> that matches
- A <Route path="*"> always matches

## Gihthub API

- [Root Endpoint](https://api.github.com)
- [Get User](https://api.github.com/users/wesbos)
- [Repos](https://api.github.com/users/john-smilga/repos?per_page=100)
- [Followers](https://api.github.com/users/john-smilga/followers)
- [Rate Limit](https://api.github.com/rate_limit)

  For unauthenticated requests, the rate limit allows for up to 60 requests per hour. Unauthenticated requests are associated with the originating IP address, and not the user making requests.

## Fusion Charts

- [Fusion Charts - Main Docs](https://www.fusioncharts.com/)
- [First React Chart](https://www.fusioncharts.com/dev/getting-started/react/your-first-chart-using-react)
- [List Of Charts](https://www.fusioncharts.com/dev/chart-guide/list-of-charts)
- [Themes](https://www.fusioncharts.com/dev/themes/introduction-to-themes)

## Auth0

- [Auth0 - Main Docs](https://auth0.com/)

- Create Application
- Choose : Single Page Web Applications
- Choose : React
- Go to Settings Tab
- Copy/Paste Domain, ClientID - can be public (or use .env) 将此两项粘贴到 index.js
- Add Domain -
  for now http://localhost:3000 (DON'T COPY PASTE FROM URL BAR)
- 将带有 http 的 host3000 链接放入以下三个栏：

  - Allowed Callback URLs
  - Allowed Logout URLs
  - Allowed Web Origins
  - SAVE CHANGES!!!!!!!!!!!!!!!

- Connections
  email,social
- 在 connection 中设置！

- [React SDK Docs](https://auth0.com/docs/libraries/auth0-react)
- [REACT SDK API Docs](https://auth0.github.io/auth0-react/)
- 在 index.js 中，用一个包含 Domain + ClientID 的 AuthApp 将整个 APP 包含起来（放在最内层）
- 根据 [REACT SDK API DOCS] 中的 DOCS 来写。
- <Auth0Provider
  domain='dev-yyshkjggdlhptodt.us.auth0.com'
  clientId='0a9ER7rdD4bFoGaKKIcTZpP8uhMgdZYD'
  authorizationParams={{
      redirect_uri: window.location.origin,
    }}>
- // 此项设置完成后，打开 Auth0 的 React SDK，对 Navbar 进行设置
- // 参考 https://auth0.github.io/auth0-react/

## Deployment

[Netlify](https://www.netlify.com/)

## Additional Info

#### Redirects with react-router-dom

In order for routing to work on netlify, redirects was added to the public folder

- \_redirects file in public

```

/*    /index.html   200

```

[Redirects Blog Post](https://dev.to/dance2die/page-not-found-on-netlify-with-react-router-58mc)

#### Warnings and create-react-app

package.json

```js
"build": "CI= react-scripts build",
```

[create-react-app Warning Fix Blog Post](https://community.netlify.com/t/how-to-fix-build-failures-with-create-react-app-in-production/17752)
