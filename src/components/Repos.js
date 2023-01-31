// 本文件负责引入各个 Chart，使其呈现在 chart div 中。

// ExampleChart.js 规定了 chart 的输出格式，
  // 而 chart 的 dataSource[chart + data] ，
  // chart 格式在 chart.js 中，
  // data 内容在 Repo.js 中决定。

// 而 chart 本身 的 width 和 height ，
  // 并不决定这个 chart 的 responsiveness，
      // 不止需要在 Pie3D 中设置 chart 尺寸，，也需要 Repo 中的 CSS !important 设置，
      // 来确保 chart 使用百分比设置大小，不至于显示不全，或使用 absolute value
      // Reponsiveness 就是使用 % ，根据窗口大小决定 div 大小！
// 这个 chart 是否 responsive，仍然需要经过 Repo 中对于 chart 的多层 container 的设置。

  // div {
  //   width: 100% !important;
  // }
  // .fusioncharts-container {
  //   width: 100% !important;
  // }
  // svg {
  //   width: 100% !important;
  //   border-radius: var(--radius) !important;
  // }

// Reponsiveness: 即是根据窗口大小来更改 div 大小的 CSS 设置。
  // 仅使用 width:100 height:100 等 absolute value，无法确保 responsiveness，
  // 而应该对其的 div container 进行百分比设置。

import React from 'react'

import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';
const Repos = () => {
  // Charts 是针对 repos 的统计，
  // 因此，首先打印出 repos 的内容：
  const {repos} = React.useContext(GithubContext);
  // console.log(repos);

    // 使用 repos.reduce 来统计 repos 中的 language property 分别出现了几次。
      // let mostPopularProjects = repos.reduce((total, item) => {
      //   const {name, stargazers_count, forks} = item;
      //   if (stargazers_count === 0) return total;
      //   if (!total[name]){
      //     total[name] = {label: name, value: stargazers_count, forks: forks}
      //   } 
      //   return total;
      // },{});

      // let mostStar = Object.values(mostPopularProjects).sort((a,b) => {
      //   return b.value - a.value
      // }).slice(0,5);

      // let mostForked = Object.values(mostPopularProjects).sort((a,b) => {
      //   return b.forks - a.forks
      // }).map((item) => {
      //   const {forks} = item;
      //   return {...item, value:forks}
      // }).slice(0,5)

      // 更加巧妙的写法:
      let {forks, stars} = repos.reduce((total, item) => {
        const {name, stargazers_count, forks} = item;
        total.stars[stargazers_count] = {label:name, value:stargazers_count} // 若无的话直接建立 stars[stargazers_count]
        // 由于这是一个 nested object,
        // 返回一个 {1: {}, 2:{}, 3:{}} 的结构，
        // 因此会自动排列，不用 sort！
        total.forks[forks] = {label:name, value:forks}
        return total
      },{
        stars: {},
        forks: {}
      })

      // console.log(forks);
      // console.log(stars);

      forks = Object.values(forks).slice(-5).reverse(); // 顺序不可搞反。
      stars = Object.values(stars).slice(-5).reverse();

      // console.log(forks);
      // console.log(stars);

  let mostUsed = repos.reduce((total, item) => {

    const {language, stargazers_count} = item;
    
    if (!language) return total;
    
    if (!total[language]){ // 若之前的循环中，没有创建这个语言，则设置为 1；
      // total[language] = 1
      // 不易使用 chartData 取值。因此在 total object 内，再分别建立 language object.
      total[language] = {label:language, value:1, stars: stargazers_count}

    } else if (total[language]) { // 找到了这个语言，为其 value + 1
      // total[language] += 1
      // 不易使用 chartData 取值。因此在 total object 内，再分别建立 language object.
      total[language] = {
        ...total[language], 
        value: total[language].value + 1, 
        stars: total[language].stars + stargazers_count
      }
    }
    return total;
  },{}) // total 是一个 object，这个object 的初始值就是本行规定的 这个 {} initial.

  // 返回的是一个 object！
    // {JavaScript: 45, CSS: 38, HTML: 14}
    // 这种 simple object 的坏处在于不方便 chartData 取值.
    // 因此采用：
      // total[language] = {label:language, value:1}
      // total[language] = {...total[language], value: total[language].value + 1}
  
  // 形成 nested object mostUsed {Javascript: {…}, CSS: {…}, HTML: {…}} 后，将其转化为 array:

  // 为了计算其他值，用 mostUsed 代替 languages。
  mostUsed = Object.values(mostUsed) // Object.values method 专用于将 nested object 转化为 array.
    // [{…}, {…}, {…}]
  mostUsed = mostUsed.sort((a,b) => {
    return b.value - a.value; // 用 sort method，可以令 array value 按照从大到小的次序排列
  })
  mostUsed = mostUsed.slice(0,5); // 用 slice method 仅保留前五个常用 language；
  // console.log(mostUsed);

  // 计算 starZ，并将 star 作为 values 填入 object！（因为 chart 只接纳 value 作为有效值）
  const mostPopular = mostUsed.sort((a,b) => {
    return b.stars - a.stars;
  }).map((item, index) => {
    const {stars} = item;
    return {...item, value:stars}
  })

  // console.log(mostPopular); 
  // 发现 value 和 stars 调换了位置！

  // 接下来转到 ExampleChart，
  // 将 Fusion Chart 的 documentation 中的 render the chart 部分粘贴上去。  

  const chartData = [
    {
      label: "SCSS",
      value: "2"
    },
    {
      label: "HTML",
      value: "14"
    },
    {
      label: "JavaScript",
      value: "36"
    },
    {
      label: "CSS",
      value: "45"
    }
  ];
  
  return  <section className='section-center'>
    <Wrapper>
      {/* <ExampleChart data={chartData} />  */}
      {/* 呈现出一个最简单的柱状图，并将其放入  */}

      <Pie3D data={mostUsed} />
      <Column3D data={stars}/> 
      <Doughnut2D data={mostPopular}/>
      <Bar3D data={forks}/>
    </Wrapper>
  </section>
  
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
