import React from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';
const Repos = () => {
  const {repos} = React.useContext(GithubContext)
  // console.log(repos)
  const lang = repos.reduce((total,item)=>{
    const {language,stargazers_count} = item
    if(!language) return total
    if(!total[language]){
      total[language] = {label:language,value:1,stars:stargazers_count}
    }
    else{
      total[language]={
              ...total[language],
              value: total[language].value + 1,
              stars : total[language].stars + stargazers_count
           } 
    }
    return total
  },{})

  const used = Object.values(lang).sort((a,b)=>{
    return b.value - a.value
  }).slice(0,5)

  const star = Object.values(lang).sort((a,b)=>{
    return b.stars - a.stars
  }).slice(0,5).map(item=>{
    return {...item,value:item.stars}
  })

  let pop = repos.reduce((total,item)=>{
    const {stargazers_count,name,forks_count} = item
    if( !stargazers_count) return total
    if(!total[name]){
      total[name] = {label:name,value:stargazers_count,forks:forks_count}
    }
    return total
  },{})

    const popular = Object.values(pop).sort((a,b)=>{
    return b.value - a.value
  }).slice(0,5)

    const fork = Object.values(pop).sort((a,b)=>{
    return b.forks - a.forks
  }).slice(0,5).map(item=>{
    return {...item,value:item.forks}
  })

  // console.log(fork)
  return <section className="section">
    <Wrapper className="section-center">
      <Pie3D data={used}/> 
      <Column3D data={popular}/>      
      <Doughnut2D data={star}/>      
      <Bar3D data={fork}/>      
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
