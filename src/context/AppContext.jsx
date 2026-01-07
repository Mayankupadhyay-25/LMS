import React, { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";

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
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
