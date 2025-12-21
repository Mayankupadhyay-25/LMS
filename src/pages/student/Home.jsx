import React from 'react'
import Hero from '../../Components/student/Hero'
import SearchBar from '../../Components/student/SearchBar'
import Companies from '../../Components/student/Companies'

const Home = () => {
  return (
    <div className='flex flex-col items-center space-y-7 text-center'>
        <Hero/>
        <SearchBar/>
         <Companies/>
    </div>
  )
}

export default Home