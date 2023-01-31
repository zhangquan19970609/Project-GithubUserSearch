import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
const Error = () => {
  return <Wrapper>
    <div>
      <h1>404</h1>
      <h3>sorry, the page you tried cannot be found</h3>
      <Link to='/' className='btn'>back home</Link>
    </div>
  </Wrapper>;
};
// 这种 style 方式称为 styled component，
// 将 style 直接以变量形式，建立在 component 上
const Wrapper = styled.section` // 意思是：Wrapper 是一个经过 style 的 section
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: var(--clr-primary-10);
  text-align: center;
  h1 {
    font-size: 10rem;
  }
  h3 {
    color: var(--clr-grey-3);
    margin-bottom: 1.5rem;
  }
`;
export default Error;
