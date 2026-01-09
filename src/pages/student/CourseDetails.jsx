import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Loading from "../../Components/student/Loading";
import { assets } from "../../assets/assets";

const CourseDetails = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);

  const { allCourses, calculateRating, currency } = useContext(AppContext);

  useEffect(() => {
    if (!allCourses || allCourses.length === 0) return;
    const found = allCourses.find((c) => String(c._id ?? c.id) === String(id));
    setCourseData(found || null);
  }, [allCourses, id]);

  if (!courseData) return <Loading />;

  const avgRating = calculateRating(courseData) || 0;
  const enrolledCount = courseData.enrolledStudents?.length ?? 0;
  const discount = courseData.discount ?? 0;
  const finalPrice = courseData.coursePrice
    ? courseData.coursePrice * (1 - discount / 100)
    : 0;

  return (
    <>
      <div className="flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px px-8 md:pt-30 pt-20 text-left">
        <div className="absolute top-0 left-0 w-full h-section-height z-1 bg-gradient-to-b from-cyan-100/70"></div>

        {/* Left column */}
        <div className="max-w-xl z-10 text-gray-700">
          <h1 className="font-bold text-black text-3xl md:text-4xl">
            {courseData.courseTitle}
          </h1>
          <p
            className="mt-3 text-gray-600"
            dangerouslySetInnerHTML={{
              __html: courseData.courseDescription.slice(0, 200),
            }}
          ></p>

          {/* Review and rating */}
          <div className="flex items-center space-x-2 pt-3 pb-1 text-sm">
            <span className="text-sm font-medium">{avgRating.toFixed(1)}</span>
            <div className="flex items-center space-x-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <img
                  key={i}
                  src={
                    i < Math.round(avgRating) ? assets.star : assets.star_blank
                  }
                  alt={i < Math.round(avgRating) ? "star" : "star_blank"}
                  className="w-4 h-4"
                />
              ))}
            </div>

          <p className="text-blue-600">({courseData.courseRatings.length}{courseData.courseRatings.length > 1 ? " ratings":"rating"})</p>
          <p>{courseData.enrolledStudents.length}{courseData.enrolledStudents.length > 1 ? " students":"student"}</p>
          </div>

          <p className="text-sm">Course by <span className="text-blue-600 underline"> GreatStack</span></p>
        </div>

        {/* Right column */}
        <div className="w-80 z-10"></div>
      </div>
    </>
  );
};

export default CourseDetails;
