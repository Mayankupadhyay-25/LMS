import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import CourseCard from './CourseCard'
import { AppContext } from '../../context/AppContext'

const CoursesSection = () => {

  const {allCourses} = useContext(AppContext)
  return (
    <div className='py-16 md:px:40 px-8'>
        <h2 className='text-3xl font-medium text-gray-800 '>learn from best </h2>
        <p className='text-sm md:text-base text-gray-500 mt-3'>Discover our top-releted courses accross various categories. from coding and design
          to business and willness, our courses are crafted to deliver result.
        </p>

        <div>
          {allCourses.slice (0,4).map((course,index) => <CourseCard key={index} course={course} /> )}

        </div>

        <Link to={'/course-list'} onClick={() => window.scrollTo(0,0)}
          className='text-gray-500 border border-gray-500/30 px-10 py-3 rounded'
        >Show all courses</Link>
        </div>
  )
}

export default CoursesSection