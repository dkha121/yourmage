import React from 'react'
import './style.scss'
import GallerySection from '../../components/home/GallerySection'
import FeaturedModels from '../../components/home/FeaturedModels'

const Home = () => {

  return (
    <div className='home-page'>
      <FeaturedModels/>

      <div className='recent-creations'>
        <h2 className="chakra-heading">
          <span className="chakra-text">Recent </span>
          Creations
        </h2>
      </div>

      <GallerySection/>
    </div>
  )
}

export default Home