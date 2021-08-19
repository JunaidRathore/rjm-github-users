import React from 'react';
import { Info, Repos, User, Search, Navbar } from '../components';
import loadingImage from '../images/preloader.gif';
import { GithubContext } from '../context/context';
const Dashboard = () => {
  const {loading} = React.useContext(GithubContext)
  // if(loading){
  //   return 
  // }
  return (
    <main>
      <Navbar />
      <Search />
      {
        loading && <main style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}} >
      <img src={loadingImage} style={{width:'15%'}} />
    </main>
      }
      <Info />
      <User />
      <Repos />
    </main>
  );
};

export default Dashboard;
