// import React, { useEffect, useState } from "react";
// import Header from "../../components/Header";
// import PageHeader from "../../components/PageHeader";
// import PageHeading from "../../components/PageHeading";
// import { Col, Container, Row } from "react-bootstrap";
// import { vault1, vault2 } from "../../constant/Index";
// import "../../assets/css/course.css";
// import { IoSearch } from "react-icons/io5";
// import Footer from "../../components/Footer";
// import { Link } from "react-router-dom";
// import { useGetAllCoursesQuery } from "../../redux/services/CourseServices";
// import { Pagination } from "antd";
// import { BeatLoader } from "react-spinners";
// const Courses = () => {
//   const [current, setCurrent] = useState(1);
//   const { data: allcourses, isLoading } = useGetAllCoursesQuery();
//   const [allCourses, setAllCourses] = useState([]);

//   useEffect(() => {
//     if (allcourses?.data?.data) {
//       setAllCourses(allcourses.data.data);
//     }
//   }, [allcourses]);

//   const pageSize = allCourses?.limit || 6;
//   const total = allCourses?.total;

//   const onChange = (page) => {
//     setCurrent(page);
//   };
//   console.log(allcourses, allCourses, "allcourses");
//   return (
//     <>
//       <Header />
//       {/* page Header starts here */}
//       <PageHeader>
//         <PageHeading
//           heading={"Relics"}
//           text={
//             "Lorem ipsum dolor sit amet consectetur. Augue commodo elementum augue placerat eleifend placer"
//           }
//         />
//         <section className="course-wrap">
//           <Container>
//             <div class="row pb-5">
//               <div class="col-lg-6">
//                 <label
//                   for="search"
//                   class="med-font color-dark level-8 text-capitalize mb-1"
//                 >
//                   Search Here
//                 </label>
//                 <div class="position-relative">
//                   <input
//                     id="search"
//                     type="text"
//                     class="form-control-1 form-control"
//                     placeholder="Search your keyword here"
//                   />
//                   <span class="search_box">
//                     <IoSearch color="#fff" size={17} />
//                   </span>
//                 </div>
//               </div>

//               <div class="col-lg-2 offset-lg-4 p-lg-0">
//                 <label
//                   for="sort"
//                   class="med-font color-dark level-8 text-capitalize mb-1"
//                 >
//                   Sort By
//                 </label>
//                 <select id="sort" class="form-select-1 form-control">
//                   <option value="" disabled selected>
//                     Select Sorting
//                   </option>
//                   <option value="low_to_high">Low To High</option>
//                   <option value="high_to_low">High To Low</option>
//                 </select>
//               </div>
//             </div>

//             {isLoading ? (
//               <div
//                 className="loader-wrapper d-flex justify-content-center align-items-center"
//                 style={{ height: "400px" }}
//               >
//                 <BeatLoader color="#6b00ff " size={20} />
//               </div>
//             ) : (
//               <>
//                 <div class="py-3">
//                   <div class="row">
//                     {allCourses?.map((course, _) => {
//                       return (
//                         <div class="col-lg-4">
//                           <div class="course-card">
//                             <figure className="mb-3">
//                               <Link to={`/course-detail/${course?.id}`}>
//                                 <img
//                                   src={course?.thumbnail_url}
//                                   alt="Course"
//                                   className="img-fluid"
//                                 />
//                               </Link>
//                             </figure>
//                             <div class="course-info">
//                               <span class="course-label text-white">
//                                 {course?.level}
//                               </span>
//                               <h5 class="course-title text-white">
//                                 {course?.title}
//                               </h5>
//                               <p class="course-price text-white mb-2">
//                                 {Number(course?.price).toFixed(2)} ObiSky
//                               </p>
//                               <div class="course-rating text-white mb-2">
//                                 {Array.from({ length: 5 }, (_, index) => {
//                                   const filled =
//                                     index < Math.floor(course?.rating || 0);
//                                   const half =
//                                     course?.rating -
//                                       Math.floor(course?.rating) >=
//                                       0.5 &&
//                                     index === Math.floor(course?.rating);
//                                   return (
//                                     <span
//                                       key={index}
//                                       style={{
//                                         color:
//                                           filled || half ? "#FFD700" : "#555",
//                                       }}
//                                     >
//                                       {filled ? "★" : half ? "☆" : "☆"}
//                                     </span>
//                                   );
//                                 })}{" "}
//                                 {course?.rating}
//                               </div>
//                               <div className="course-btn-wrapper mb-3">
//                                 <Link
//                                   to={`/course-detail/${course?.id}`}
//                                   className="btn btn-primary"
//                                 >
//                                   View Relics
//                                 </Link>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       );
//                     })}

//                   </div>
//                 </div>

//                 <div className="d-flex justify-content-center my-5">
//                   <Pagination
//                     current={current}
//                     pageSize={pageSize}
//                     total={total}
//                     onChange={onChange}
//                   />
//                 </div>
//               </>
//             )}
//           </Container>
//         </section>
//       </PageHeader>
//       <Footer />
//     </>
//   );
// };

// export default Courses;

import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import PageHeader from "../../components/PageHeader";
import PageHeading from "../../components/PageHeading";
import { Col, Container, Row } from "react-bootstrap";
import "../../assets/css/course.css";
import { IoSearch } from "react-icons/io5";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { useGetAllCoursesQuery } from "../../redux/services/CourseServices";
import { Pagination } from "antd";
import { BeatLoader } from "react-spinners";

const Courses = () => {
  const [current, setCurrent] = useState(1);
  const { data: allcourses, isLoading } = useGetAllCoursesQuery();

  // LOCAL STATES FOR SEARCH + SORT
  const [allCourses, setAllCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);

  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("");

  // Load API data
  useEffect(() => {
    if (allcourses?.data?.data) {
      setAllCourses(allcourses?.data?.data);
      setFilteredCourses(allcourses?.data?.data);
    }
  }, [allcourses]);

  // FILTER + SEARCH + SORT Logic
  useEffect(() => {
    let updated = [...allCourses];

    // 🔍 SEARCH
    if (search.trim() !== "") {
      updated = updated.filter((course) =>
        course.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // ↕️ SORT BY PRICE
    if (sortType === "low_to_high") {
      updated.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortType === "high_to_low") {
      updated.sort((a, b) => Number(b.price) - Number(a.price));
    }

    setFilteredCourses(updated);
  }, [search, sortType, allCourses]);

  // PAGINATION LOGIC
  const pageSize = 6;
  const total = filteredCourses.length;

  const indexOfLast = current * pageSize;
  const indexOfFirst = indexOfLast - pageSize;
  const currentCourses = filteredCourses.slice(indexOfFirst, indexOfLast);

  const onChange = (page) => {
    setCurrent(page);
  };

  return (
    <>
      <Header />

      <PageHeader>
        <PageHeading
          heading={"Relics"}
          text={
            "Lorem ipsum dolor sit amet consectetur. Augue commodo elementum augue placerat eleifend placer"
          }
        />

        <section className="course-wrap">
          <Container>
            <div className="row pb-5">
              {/* SEARCH FIELD */}
              <div className="col-lg-6">
                <label
                  htmlFor="search"
                  className="med-font color-dark level-8 text-capitalize mb-1"
                >
                  Search Here
                </label>

                <div className="position-relative">
                  <input
                    id="search"
                    type="text"
                    className="form-control-1 form-control"
                    placeholder="Search your keyword here"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <span className="search_box">
                    <IoSearch color="#fff" size={17} />
                  </span>
                </div>
              </div>

              {/* SORT DROPDOWN */}
              <div className="col-lg-2 offset-lg-4 p-lg-0">
                <label
                  htmlFor="sort"
                  className="med-font color-dark level-8 text-capitalize mb-1"
                >
                  Sort By
                </label>

                <select
                  id="sort"
                  className="form-select-1 form-control"
                  value={sortType}
                  onChange={(e) => setSortType(e.target.value)}
                >
                  <option value="">Select Sorting</option>
                  <option value="low_to_high">Low To High</option>
                  <option value="high_to_low">High To Low</option>
                </select>
              </div>
            </div>

            {/* MAIN CONTENT */}
            {isLoading ? (
              <div
                className="loader-wrapper d-flex justify-content-center align-items-center"
                style={{ height: "400px" }}
              >
                <BeatLoader color="#6b00ff " size={20} />
              </div>
            ) : (
              <>
                <div className="py-3">
                  <div className="row">
                    {currentCourses.map((course) => (
                      <div className="col-lg-4 py-2" key={course.id}>
                        <div className="course-card">
                          <figure className="mb-3">
                            <Link to={`/course-detail/${course.id}`}>
                              <img
                                src={course.thumbnail_url}
                                alt="Course"
                                className="img-fluid"
                              />
                            </Link>
                          </figure>

                          <div className="course-info">
                            <span className="course-label text-white">
                              {course.level}
                            </span>

                            <h5 className="course-title text-white">
                              {course.title}
                            </h5>

                            <p className="course-price text-white mb-2">
                              {Number(course.price).toFixed(5)} ObiSky
                            </p>

                            {/* Rating Stars */}
                            <div className="course-rating text-white mb-2">
                              {Array.from({ length: 5 }, (_, index) => {
                                const filled =
                                  index < Math.floor(course.rating || 0);
                                const half =
                                  course.rating - Math.floor(course.rating) >=
                                    0.5 && index === Math.floor(course.rating);

                                return (
                                  <span
                                    key={index}
                                    style={{
                                      color:
                                        filled || half ? "#FFD700" : "#555",
                                    }}
                                  >
                                    {filled ? "★" : half ? "☆" : "☆"}
                                  </span>
                                );
                              })}{" "}
                              {course.rating}
                            </div>

                            <div className="course-btn-wrapper mb-3">
                              <Link
                                to={`/course-detail/${course.id}`}
                                className="btn btn-primary"
                              >
                                View Relics
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* PAGINATION */}
                <div className="d-flex justify-content-center my-5">
                  <Pagination
                    current={current}
                    pageSize={pageSize}
                    total={total}
                    onChange={onChange}
                  />
                </div>
              </>
            )}
          </Container>
        </section>
      </PageHeader>

      <Footer />
    </>
  );
};

export default Courses;
