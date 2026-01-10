import React, { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();

  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(true);

  const fetchAllCourses = async () => { 
    setAllCourses(dummyCourses);
  };
 
  // Function to calculate average rating of a course
  const calculateRating = (course) => {
    const ratings = course?.courseRatings ?? [];
    if (ratings.length === 0) return 0;
    const total = ratings.reduce((sum, r) => sum + (r?.rating ?? 0), 0);
    return total / ratings.length;
  };

  //  Function to Calculate Course Chapter Time 
  const calculateChapterTime = (chapter) => {
    let time = 0;
    if (Array.isArray(chapter.chapterContent)) {
      chapter.chapterContent.forEach((lecture) => {
        time += Number(lecture.lectureDuration) || 0;
      });
    }
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  }

  // Function to calculate course duration
  const calculateCourseDuration = (course) => {
    let time = 0;
    if (Array.isArray(course.courseContent)) {
      course.courseContent.forEach((chapter) => {
        if (Array.isArray(chapter.chapterContent)) {
          chapter.chapterContent.forEach((lecture) => {
            time += Number(lecture.lectureDuration) || 0;
          });
        }
      });
    }
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  }

  //Function may calculate to nop. of lecture in the course 
  const calculateNoOfLectures = (course) => {
    let totalLactures = 0;
    course.courseContent.forEach(chapter => {
      if (Array.isArray(chapter.chapterContent))
        totalLactures += chapter.chapterContent.length;
    });
    return totalLactures; 
  }

  useEffect(() => {
    fetchAllCourses();
  }, []);

  const value = {
    currency,
    allCourses,
    navigate,
    setAllCourses,
    fetchAllCourses,
    calculateRating,
    isEducator,
    setIsEducator,
    calculateNoOfLectures,
    calculateCourseDuration,
    calculateChapterTime,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
