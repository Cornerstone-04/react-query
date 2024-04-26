import React from "react";
import { Layout } from "../components";
import axiosApi from "../api/axios";
import { useQuery } from "@tanstack/react-query";

// Function to fetch user data by email
const fetchUserByEmail = (email) => {
  return axiosApi.get(`/users/${email}`);
};

const fetchCoursesById = (channelID) => {
  return axiosApi.get(`/content/${channelID}`);
};

const DependentQueriesPage = ({ email }) => {
  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
    error: userErrorDetails,
  } = useQuery({
    queryKey: ["user", email],
    queryFn: () => fetchUserByEmail(email),
    enabled: !!email, 
  });

  const channelID = user?.data.channelID;
  const {
    data: courses,
    isLoading: coursesLoading,
    isError: coursesError,
    error: coursesErrorDetails,
  } = useQuery({
    queryKey: ["channel", channelID],
    queryFn: () => fetchCoursesById(channelID),
    enabled: !!channelID, v
  });

  // Handling loading states for both queries
  if (userLoading || coursesLoading) {
    return (
      <Layout>
        <main>Loading...</main>
      </Layout>
    );
  }

  // Handling error states for both queries
  if (userError) {
    return (
      <Layout>
        <main>Error fetching user: {userErrorDetails.message}</main>
      </Layout>
    );
  }
  if (coursesError) {
    return (
      <Layout>
        <main>Error fetching courses: {coursesErrorDetails.message}</main>
      </Layout>
    );
  }

  // Rendering user and courses data
  return (
    <Layout>
      <main>
        <h1>User Details</h1>
        <p>Name: {user.data.name}</p>
        <p>Email: {user.data.email}</p>

        <h2>Courses</h2>
        {courses.data.map((course) => (
          <div key={course.id}>
            <p>Course Name: {course.title}</p>
          </div>
        ))}
      </main>
    </Layout>
  );
};

export default DependentQueriesPage;
