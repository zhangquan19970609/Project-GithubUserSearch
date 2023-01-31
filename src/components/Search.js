import React from 'react';
import styled from 'styled-components';
import { MdSearch } from 'react-icons/md';
import { GithubContext, useGlobalContext } from '../context/context';
const Search = () => {

  const [user, setUser] = React.useState('');
  const {requests, error, searchGithubUser, isLoading} = React.useContext(GithubContext);
  // or const {requests} = useContext(GithubContext);

  // 设置好 requests 后，多次使用 api 调用某个 user 的数据，
  // 会发现 requests  remaining 次数减少！
  // API 根据 IP 地址识别，因此从 completed project 发送请求也是一样减少 remaining 的！

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user) {
      
      searchGithubUser(user);
      // 接下来的任务：向 gitHub API 发送请求
      setUser(''); // 当 user 存在时，每次点击搜索，都重设搜索框。
    }
  }

  return <section className='section'>
    <Wrapper className='section-center'>
      <ErrorWrapper>
        {error.show && 
          <p>{error.msg}</p>
        }
      </ErrorWrapper>
      <form onSubmit={handleSubmit}>
        <div className='form-control'>
          <MdSearch />
          <input 
            type='text' 
            placeholder='enter github user' 
            value={user}
            onChange={(e) => {setUser(e.target.value)}}
          ></input>
          {requests > 0 && !isLoading && <button type='submit'>search</button>}
        </div>
      </form>
      <h3>Requests : {requests} / 60</h3>
    </Wrapper>
  </section>
};

const Wrapper = styled.div`
  position: relative;
  display: grid;
  gap: 1rem 1.75rem;
  @media (min-width: 768px) {
    grid-template-columns: 1fr max-content;
    align-items: center;
    h3 {
      padding: 0 0.5rem;
    }
  }
  .form-control {
    background: var(--clr-white);
    display: grid;
    align-items: center;
    grid-template-columns: auto 1fr auto;
    column-gap: 0.5rem;
    border-radius: 5px;
    padding: 0.5rem;
    input {
      border-color: transparent;
      outline-color: var(--clr-grey-10);
      letter-spacing: var(--spacing);
      color: var(--clr-grey-3);
      padding: 0.25rem 0.5rem;
    }
    input::placeholder {
      color: var(--clr-grey-3);
      text-transform: capitalize;
      letter-spacing: var(--spacing);
    }
    button {
      border-radius: 5px;
      border-color: transparent;
      padding: 0.25rem 0.5rem;
      text-transform: capitalize;
      letter-spacing: var(--spacing);
      background: var(--clr-primary-5);
      color: var(--clr-white);
      transition: var(--transition);
      cursor: pointer;
      &:hover {
        background: var(--clr-primary-8);
        color: var(--clr-primary-1);
      }
    }

    svg {
      color: var(--clr-grey-5);
    }
    input,
    button,
    svg {
      font-size: 1.3rem;
    }
    @media (max-width: 800px) {
      button,
      input,
      svg {
        font-size: 0.85rem;
      }
    }
  }
  h3 {
    margin-bottom: 0;
    color: var(--clr-grey-5);
    font-weight: 400;
  }
`;
const ErrorWrapper = styled.article`
  position: absolute;
  width: 90vw;
  top: 0;
  left: 0;
  transform: translateY(-100%);
  text-transform: capitalize;
  p {
    color: red;
    letter-spacing: var(--spacing);
  }
`;
export default Search;
