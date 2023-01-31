import React from 'react';
// 通过 /components/index.js 汇总起来，这样可以一行 code 全部注入
import { Info, Repos, User, Search, Navbar } from '../components'; 
import loadingImage from '../images/preloader.gif';
import { GithubContext } from '../context/context';
const Dashboard = () => {
  const {isLoading} = React.useContext(GithubContext);
  if(isLoading){
    return (
      <main>
        <Navbar></Navbar>
        <Search></Search>
        <img src={loadingImage} alt='loading' className='loading-img'></img>
      </main>
    )
  } 
  return (
    <main>
      <Navbar></Navbar>
      <Search></Search>
      <Info></Info>
      <User></User>
      <Repos></Repos>
    </main>
  );
};


export default Dashboard;