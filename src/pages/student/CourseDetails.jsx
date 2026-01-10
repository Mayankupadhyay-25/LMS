import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Loading from "../../Components/student/Loading";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";

const CourseDetails = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [openSection, setOpenSection] = useState({});

  const {
    allCourses,
    calculateRating,
    calculateNoOfLectures,
    calculateCourseDuration,
    calculateChapterTime,
  } = useContext(AppContext);

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

    const toggleSection = (index) => {
      setOpenSection((prev) => ({
        ...prev,
        [index]: !prev[index],
      }));
    }    

  return courseData ? (
    <>
      <div className="flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px px-38 md:pt-30 pt-20 text-left">
        <div className="absolute top-0 left-0 w-full h-section-height z-1 bg-gradient-to-b from-cyan-100/70" />

        {/* Left column */}
        <div className="max-w-xl z-10 text-gray-700">
          <h1 className="font-bold text-black text-3xl md:text-4xl">{courseData.courseTitle}</h1>

          <p
            className="mt-3 text-gray-600"
            dangerouslySetInnerHTML={{ __html: courseData.courseDescription.slice(0, 200) }}
          />

          {/* Review and rating */}
          <div className="flex items-center space-x-2 pt-3 pb-1 text-sm">
            <span className="text-sm font-medium">{avgRating.toFixed(1)}</span>
            <div className="flex items-center space-x-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <img
                  key={i}
                  src={i < Math.round(avgRating) ? assets.star : assets.star_blank}
                  alt={i < Math.round(avgRating) ? "star" : "star_blank"}
                  className="w-4 h-4"
                />
              ))}
            </div>
            <p className="text-blue-600">({courseData.courseRatings.length}{courseData.courseRatings.length > 1 ? ' ratings' : 'rating'})</p>
            <p>{courseData.enrolledStudents.length}{courseData.enrolledStudents.length > 1 ? ' students' : 'student'}</p>
          </div>
          <p className="text-sm">Course by <span className="text-blue-600 underline">GreatStack</span></p>
          <div className="pt-8 text-gray-800">
            <h2 className="font-semibold text-xl">Course Structure</h2>
            <div className="pt-5">
              {courseData.courseContent.map((chapter, index) => (
                <div key={index} className="border border-gray-300 bg-white mb-2 rounded">
                  <div className="flex items-center justify-between px-4 py-3 cursor-pointer select-none" onClick={()=> toggleSection(index)}>
                    <div className="flex items-center gap-2">

                      <img className={ `transform transition-transform ${openSection[index] ? 'rotate-180' : ''}`}
                      src={assets.down_arrow_icon} alt='arrow icon' />
                      <p className="font-medium md:text-base text-sm">{chapter.chapterTitle}</p>
                    </div>
                    <p className="text-sm md:text-default">{chapter.chapterContent.length} lecture{chapter.chapterContent.length > 1 ? 's' : ''} - {calculateChapterTime(chapter)}</p>
                  </div>
                  <div className={`overflow-hidden transition-all duration-300 ${openSection[index] ? 'max-h-96' : 'max-h-0'}`}>
                    <ul className="list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300">
                      {chapter.chapterContent.map((lecture, i) => (
                        <li key={i} className="flex items-start gap-2 py-1">
                          <img src={assets.play_icon} alt={`Play ${lecture.lectureTitle}`} className="w-4 h-4 mt-1" />
                          <div className="flex items-center justify-between w-full text-gray-800 text-xs md:text-default">
                            <p>{lecture.lectureTitle}</p>
                            <div className="flex gap-2">
                              {lecture.isPreviewFree && <span className="text-blue-500 cursor-pointer">Preview</span>}
                              <span>{humanizeDuration(lecture.lectureDuration * 60 * 1000, { units: ['h', 'm'] })}</span>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="w-80 z-10" />
      </div>
    </>
  ) : (<Loading />);
};

export default CourseDetails;
