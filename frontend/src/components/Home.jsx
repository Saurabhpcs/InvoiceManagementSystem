import React, { useContext } from 'react';
import HeroSection from './HeroSection';
import Header from './Header';
import ContactFrom from './Contactus';
import Invoice from './Invoice';
import Register from './Register';
import { UserContext } from '../App';

const Home = () => {
  const { user } = useContext(UserContext); 
  if (!user) {
    return (
      <div>
        <Register />
      </div>
    );
  }
  return (
    <>
      <Header />
      <HeroSection />
      <Invoice />
      <ContactFrom />
    </>
  );
};

export default Home;
