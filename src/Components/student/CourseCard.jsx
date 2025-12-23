import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import { Link } from 'react-router-dom'

const CourseCard = ({ course }) => {

  const { currency, calculateRating } = useContext(AppContext) || {}

  if (!course) return null

  const ratings = course.courseRatings || []
  const avgRating = ratings.length
    ? (ratings.reduce((sum, r) => sum + (r.rating || 0), 0) / ratings.length)
    : 0

  const price = Number(course.coursePrice || 0)
  const discount = Number(course.discount || 0)
  const finalPrice = price - (discount * price) / 100

  return (
    <Link to={'/course/' + course._id} onClick={() => window.scrollTo(0,0)}
     className='border border-gray-500/30 pb-6 overflow-hidden rounded-lg'>
      <img className="w-full"
        src={course.courseThumbnail || assets.course_1_thumbnail}
        alt={course.courseTitle}/>
      <div className="p-3 text-left">
        <h3 className="text-base font-semibold">{course.courseTitle}</h3>
        <p className="text-gray-500">{typeof course.educator === 'string' ? '' : course.educator?.name}</p>
        <div className="flex items-center space-x-2">
              <p>{calculateRating(course)}</p>
          <span className="text-sm font-medium">{avgRating.toFixed(1)}</span>
          <div className="flex">
            
            {Array.from({ length: 5 }).map((_, i) => (
              <img key={i} src={i < Math.round(avgRating) ? assets.star : assets.star_blank}
                alt={i < Math.round(avgRating) ? 'star' : 'star_blank'}
                className="w-3.4 h-3.5" 
              />
            ))}
          </div>
          
          <span className="text-sm text-gray-500">({course.enrolledStudents.length || 0})</span>
        </div>
        <p className="mt-3 font-semibold">{currency}{finalPrice.toFixed(course.courseRatings.length)}</p>
      </div>
    </Link>
  )
}

export default CourseCard