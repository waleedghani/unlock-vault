import React, { useState } from "react";
import ProfileLayout from "../../components/layout/ProfileLayout";
import { useMyCoursesQuery } from "../../redux/services/CourseServices";
import ReactPaginate from "react-paginate";

const MyCourses = () => {
  const { data, isLoading, refetch } = useMyCoursesQuery();
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  console.log(data?.data?.data, "all done");

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    // fetchCourses(selectedPage);
  };
  return (
    <>
      <ProfileLayout type={"My Courses"}>
        <section className="my-courses-sec">
          <div className="row">
            <div className="col-lg-12">
              {courses.length === 0 ? (
                <h2 className="text-center heading-txt mt-5 pt-5">No courses found</h2>
              ) : (
                courses.map((course) => (
                  <div key={course.id}>{course.title}</div>
                ))
              )}

              {pageCount > 1 && (
                <ReactPaginate
                  breakLabel="..."
                  nextLabel="Next ›"
                  previousLabel="‹ Prev"
                  onPageChange={handlePageClick}
                  pageCount={pageCount}
                  forcePage={currentPage - 1}
                  marginPagesDisplayed={1}
                  pageRangeDisplayed={3}
                  containerClassName="pagination"
                  activeClassName="active"
                />
              )}
            </div>
          </div>
        </section>
      </ProfileLayout>
    </>
  );
};

export default MyCourses;
