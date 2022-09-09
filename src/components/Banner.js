import React from 'react'

import  "./Banner.css"
import Carousel from './Carousel';
const Banner = () => {

  return (
    <>
      <div  className="banner">
          <div className='banner_text'>
          <h1> Crypto Hunter</h1>
          <h3>Get All The Info Regarding Your Favorite Crypto Currency</h3>
          </div>
          <Carousel/>
      </div>
    </>
  )
}

export default Banner
