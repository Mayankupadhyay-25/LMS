import React from 'react'
import Hero from '../../Components/student/Hero'
import SearchBar from '../../Components/student/SearchBar'

const Home = () => {
  return (
    <div className='flex flex-col items-center space-y-7 text-center'>
        <Hero/>
        <SearchBar/>
    </div>
  )
}

export default Home