import React from 'react'
import Topsellers from './Topsellers';
import Recommened from './Recommened';
import News from './News';

function Home() {
  return (
    <>
      <Topsellers />
      <Recommened />
      <News />
    </>
  )
}

export default Home;