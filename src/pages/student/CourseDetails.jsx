import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Loading from "../../Components/student/Loading";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";
import Footer from "../../Components/student/Footer";
import YouTube from "react-youtube";

const CourseDetails = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [openSection, setOpenSection] = useState({});
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(true);
  const [playerData, setIsPlayerData] = useState(null);

  const {
    allCourses,
    calculateRating,
    calculateNoOfLectures,
    calculateCourseDuration,
    calculateChapterTime,
    currency,
  } = useContext(AppContext);

  useEffect(() => {
    if (!allCourses || allCourses.length === 0) return;
    const found = allCourses.find((c) => String(c._id ?? c.id) === String(id));
    setCourseData(found || null);
  }, [allCourses, id]);

  if (!courseData) return <Loading />;

  const avgRating = calculateRating(courseData) || 0;
  const enrolledCount = courseData.enrolledStudents?.length ?? 0;
  const priceNum = Number(courseData.coursePrice) || 0;
  const discountPct =
    Number(courseData.courseDiscount ?? courseData.discount ?? 0) || 0;
  const finalPrice = priceNum * (1 - discountPct / 100);

  const toggleSection = (index) => {
    setOpenSection((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const extractYouTubeId = (url) => {
    if (!url) return null;
    // common patterns: youtu.be/ID or youtube.com/watch?v=ID or /embed/ID
    const m = url.match(/(?:youtu\.be\/|v=|embed\/)([0-9A-Za-z_-]{11})/);
    if (m && m[1]) return m[1];
    const parts = url.split("/");
    return parts.pop();
  };

  return courseData ? (
    <>
      <div className="flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-8 px-8 md:pt-30 pt-20 text-left">
        <div className="absolute top-0 left-0 w-full h-section-height z-1 bg-gradient-to-b from-cyan-100/70" />

        {/* Left column */}
        <div className="max-w-xl z-10 text-gray-700">
          <h1 className="font-bold text-black text-3xl md:text-4xl">
            {courseData.courseTitle}
          </h1>

          <div
            className="rich-text pt-4 md:text-base text-sm"
            dangerouslySetInnerHTML={{
              __html: courseData.courseDescription.slice(0, 200),
            }}
          />
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
            <p className="text-blue-600">
              ({courseData.courseRatings.length}
              {courseData.courseRatings.length > 1 ? " ratings" : "rating"})
            </p>
            <p>
              {courseData.enrolledStudents.length}
              {courseData.enrolledStudents.length > 1 ? " students" : "student"}
            </p>
          </div>
          <p className="text-sm">
            Course by{" "}
            <span className="text-blue-600 underline">GreatStack</span>
          </p>
          <div className="pt-8 text-gray-800">
            <h2 className="font-semibold text-xl">Course Structure</h2>
            <div className="pt-5">
              {courseData.courseContent.map((chapter, index) => (
                <div
                  key={index}
                  className="border border-gray-300 bg-white mb-2 rounded"
                >
                  <div
                    className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
                    onClick={() => toggleSection(index)}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        className={`transform transition-transform ${
                          openSection[index] ? "rotate-180" : ""
                        }`}
                        src={assets.down_arrow_icon}
                        alt="arrow icon"
                      />
                      <p className="font-medium md:text-base text-sm">
                        {chapter.chapterTitle}
                      </p>
                    </div>
                    <p className="text-sm md:text-default">
                      {chapter.chapterContent.length} lecture
                      {chapter.chapterContent.length > 1 ? "s" : ""} -{" "}
                      {calculateChapterTime(chapter)}
                    </p>
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openSection[index] ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <ul className="list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300">
                      {chapter.chapterContent.map((lecture, i) => (
                        <li key={i} className="flex items-start gap-2 py-1">
                          <img
                            src={assets.play_icon}
                            alt={`Play ${lecture.lectureTitle}`}
                            className="w-4 h-4 mt-1"
                          />
                          <div className="flex items-center justify-between w-full text-gray-800 text-xs md:text-default">
                            <p>{lecture.lectureTitle}</p>
                            <div className="flex gap-2">
                              {lecture.isPreviewFree && (
                                <span
                                  onClick={() =>
                                    setIsPlayerData({
                                      videoId: extractYouTubeId(
                                        lecture.lectureUrl
                                      ),
                                    })
                                  }
                                  className="text-blue-500 cursor-pointer"
                                >
                                  Preview
                                </span>
                              )}
                              <span>
                                {humanizeDuration(
                                  lecture.lectureDuration * 60 * 1000,
                                  { units: ["h", "m"] }
                                )}
                              </span>
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
          <div className="py-20 text-sm md:text-default">
            <h3 className="text-xl font-semibold text-gray-800">
              Course Description
            </h3>
            <div
              className="rich-text pt-3"
              dangerouslySetInnerHTML={{ __html: courseData.courseDescription }}
            />
          </div>
        </div>

        {/* Right column */}
        <div
          className="max-w-course-card z-10 shadow-custom-card rounded-t md:rounded-none overflow-hidden
         bg-white min-w-[300px] sm:min-w-[420px]"
        >
          {playerData ? (
            <YouTube
              videoId={playerData.videoId}
              opts={{ playerVars: { autoplay: 1 } }}
              iframeClassName="w-full aspect-video"
            />
          ) : (
            <img src={courseData.courseThumbnail} alt="" />
          )}

          <div className="p-5">
            <div className="flex item-center gap-2">
              <img
                className="w-3.5"
                src={assets.time_left_clock_icon}
                alt="time left clock icon"
              />

              <img
                className="w-3.5"
                src={assets.time_left_clock_icon}
                alt="time left clock icon"
              />
              <p className="text-red-500">
                <span className="font-medium">5 Days </span>left at this price!
              </p>
            </div>

            <div className="flex gap-3 item-center pt-2">
              <p className="text-gray-800 md:text-4xl text-2xl font-semibold">
                {currency}
                {finalPrice.toFixed(2)}
              </p>
              {discountPct > 0 && (
                <>
                  <p className="text-gray-500 pt-2.5 line-through">
                    {currency}
                    {priceNum.toFixed(2)}
                  </p>
                  <p className="text-green-600 pt-2.5 font-semibold">
                    {discountPct}% off
                  </p>
                </>
              )}
              {discountPct === 0 && (
                <p className="text-gray-500">
                  {currency}
                  {priceNum.toFixed(2)}
                </p>
              )}
            </div>
            <div className="flex item-center text-sm md:text-default gap-4 pt-2 md:pt-4 text-gray-500">
              <div className="flex item-center gap-1">
                <img src={assets.star} alt="star icon" />
                <p>{calculateRating(courseData)}</p>
              </div>

              <div className="h-4 w-px bg-gray-500/40"></div>

              <div className="flex item-center gap-1">
                <img src={assets.time_clock_icon} alt="clock icon" />
                <p>{calculateCourseDuration(courseData)} </p>
              </div>

              <div className="h-4 w-px bg-gray-500/40"></div>

              <div className="flex item-center gap-1">
                <img src={assets.lesson_icon} alt="lesson icon" />
                <p>{calculateNoOfLectures(courseData)} lessons</p>
              </div>
            </div>

            <button className="md:mt-6 mt-4 w-full py-3 rounded bg-blue-600 text-white font-medium">
              {isAlreadyEnrolled ? "Already Enrolled" : "Enroll Now"}
            </button>

            <div className="pt-6">
              <p className="md:text-xl  text-lg font-medium text-gray-800">
                What's is in the course?
              </p>
              <ul className="ml-4 pt-2 text-sm md:text-default list-disc text-gray-500">
                <li>Life access with free updates</li>
                <li>Step-by-step, hands-on project guidance.</li>
                <li>Downlodable resources and source code.</li>
                <li>Quizzes to test your Knowledge</li>
                <li>certificate of completion</li>
              </ul>
            </div>
          </div>
        </div>
        <div />
      </div>
      <Footer />
    </>
  ) : (
    <Loading />
  );
};

export default CourseDetails;
