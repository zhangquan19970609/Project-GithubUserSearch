import React from 'react';
import { GithubContext } from '../context/context';
import styled from 'styled-components';
import { GoRepo, GoGist } from 'react-icons/go';
import { FiUsers, FiUserPlus } from 'react-icons/fi';

const UserInfo = () => {
  // 和 useGlobalContext 一样的效果，只是 context 内是否规定 globalContext
  // 此处的 data 就是 context 中的 value={} object
  const {githubUser} = React.useContext(GithubContext); 
  const {public_repos, followers, following, public_gists} = githubUser;
  // 试着制作了 四个 article，
  // 但最方便、不重复的方法，应为把 4 个 值分别归纳入 array of objects
  const infos = [
    {
      icon_class:'pink',
      icon: <GoRepo className='icon'/>,
      value: public_repos,
      name: 'repos'
    },
    {
      icon_class:'green',
      icon: <FiUsers className='icon'/>,
      value: followers,
      name: 'followers'
    },
    {
      icon_class:'purple',
      icon: <FiUserPlus className='icon'/>,
      value: following,
      name: 'following'
    },
    {
      icon_class:'yellow',
      icon: <GoGist className='icon'/>,
      value: public_gists,
      name: 'Gists'
    },
  ];
  // 以下是一种 使用 infos map through，
  // 返回一个 internal component，接收 props 并 render 的方法。
  return <section className='section'>
    <Wrapper className='section-center'>
      {infos.map((item, index) => {
        return <Item key={index} {...item}></Item>
      })}
    </Wrapper>;
  </section> 
};

const Item = ({icon_class, icon, value, name}) => {
  return <article className='item'>
      <span className={icon_class}>
        {icon}
      </span>
      <div>
        <h3>{value}</h3>
        <p>{name}</p>
      </div>
    </article>
}

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem 2rem;
  @media (min-width: 640px) {
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  }
  .item {
    border-radius: var(--radius);
    padding: 1rem 2rem;
    background: var(--clr-white);
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: 3rem;
    align-items: center;
    span {
      width: 3rem;
      height: 3rem;
      display: grid;
      place-items: center;
      border-radius: 50%;
    }
    .icon {
      font-size: 1.5rem;
    }
    h3 {
      margin-bottom: 0;
      letter-spacing: 0;
    }
    p {
      margin-bottom: 0;
      text-transform: capitalize;
    }
    .pink {
      background: #ffe0f0;
      color: #da4a91;
    }
    .green {
      background: var(--clr-primary-10);
      color: var(--clr-primary-5);
    }
    .purple {
      background: #e6e6ff;
      color: #5d55fa;
    }
    .yellow {
      background: #fffbea;
      color: #f0b429;
    }
  }
`;

export default UserInfo;
