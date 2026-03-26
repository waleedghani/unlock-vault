import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import PageHeader from "../../components/PageHeader";
import PageHeading from "../../components/PageHeading";
import Footer from "../../components/Footer";
import { Container, Spinner } from "react-bootstrap";
import "../../assets/css/chapter.css";
import { useLocation, useParams } from "react-router-dom";
import { useGetCourseSectionsQuery } from "../../redux/services/CourseServices";
import { MdOutlineSlowMotionVideo } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";
// ES2015 module syntax
// import { PDFViewer } from "@progress/kendo-react-pdf-viewer";
const Chapter = () => {
  const params = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedLessonId = queryParams.get("lesson");

  const { data: singleChapter, isLoading } = useGetCourseSectionsQuery(
    params?.id
  );

  const chapterData = singleChapter?.data;
  const lessons = chapterData?.lessons || [];

  const [selectedVideo, setSelectedVideo] = useState(null);

  // ✅ Load first lesson automatically
  // useEffect(() => {
  //   if (lessons.length > 0) {
  //     setSelectedVideo(lessons[0]);
  //   }
  // }, [lessons]);

  useEffect(() => {
    if (lessons.length > 0) {
      if (selectedLessonId) {
        const found = lessons.find(
          (l) => String(l.id) === String(selectedLessonId)
        );
        if (found) {
          setSelectedVideo(found); // 🔥 play the clicked lesson
          return;
        }
      }
      setSelectedVideo(lessons[0]); // fallback to first lesson
    }
  }, [lessons, selectedLessonId]);

  // ✅ Handle lesson click
  const handleLessonClick = (lesson) => {
    setSelectedVideo(lesson);
  };

  return (
    <>
      <Header />

      <PageHeader>
        <PageHeading
          heading={chapterData?.title}
          text={chapterData?.description}
        />
      </PageHeader>

      <section className="view-course-section py-5 my-5">
        <Container>
          {isLoading ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "400px" }}
            >
              <Spinner animation="border" />
            </div>
          ) : (
            <div className="row">
              {/* ===== Left Side (Video Player) ===== */}
              <div className="col-lg-8">
                <div className="view-course-img-wrapper position-relative">
                  {selectedVideo?.video_full_url ? (
                    <video
                      key={selectedVideo?.id}
                      src={selectedVideo?.video_full_url}
                      className="w-100 rounded"
                      style={{ height: "400px", objectFit: "cover" }}
                      controls
                      autoPlay
                      disablePictureInPicture
                      controlsList="nodownload noremoteplayback nofullscreen"
                    />
                  ) : (
                    // <div
                    //   className="video-placeholder bg-dark text-white d-flex justify-content-center align-items-center"
                    //   style={{ height: "400px" }}
                    // >
                    //   <p className="mb-0">No video available</p>
                    // </div>
                    <iframe
                      src={selectedVideo?.pdf_full_url}
                      width="100%"
                      height="600vh"
                      title="PDF Viewer"
                    />
                  )}
                </div>

                <div className="view-course-content-wrapper mt-3">
                  <h2 className="heading-txt text-capitalize">
                    {selectedVideo?.title || chapterData?.title}
                  </h2>
                  <p>
                    {selectedVideo?.description || chapterData?.description}
                  </p>
                </div>
                {console.log(
                  selectedVideo?.pdf_full_url,
                  "selectedVideo?.pdf_full_url"
                )}
              </div>
              <div className="col-lg-4">
                <div className="courses-sidebar-detail-wrapper">
                  <div className="course-sidebar-card-wrapper">
                    <div className="courses-sidebar-heading-wrapper">
                      <h4 className="text-uppercase level-4 heading-font text-white">
                        Course Lessons
                      </h4>
                    </div>
                    <div className="chapters-tags-wrapper mt-3 d-flex flex-column gap-2">
                      {lessons.length > 0 ? (
                        lessons.map((lesson) => (
                          <button
                            key={lesson?.id}
                            className={`badge bg-secondary p-2 text-start border-0 w-100 d-flex justify-content-between align-items-center ${
                              selectedVideo?.id === lesson?.id
                                ? "active-lesson"
                                : ""
                            }`}
                            onClick={() => handleLessonClick(lesson)}
                            disabled={lesson?.is_free == 0}
                          >
                            {console.log(lesson, "pdf detect")}
                            <div className="side-1 d-flex align-items-center">
                              {lesson?.lesson_type == "pdf" ? (
                                <IoDocumentTextOutline
                                  color="#fff"
                                  size={20}
                                  className="me-2"
                                />
                              ) : (
                                <MdOutlineSlowMotionVideo
                                  color="#fff"
                                  size={20}
                                  className="me-2"
                                />
                              )}

                              {lesson?.title}
                            </div>
                            <div className="side-2">
                              <span
                                className={`lesson-badge ${
                                  lesson?.is_free == 1
                                    ? "free-badge"
                                    : "paid-badge"
                                }`}
                                style={{
                                  color: lesson?.is_free == 1 ? "green" : "red",
                                }}
                              >
                                {lesson?.is_free == 1 ? "Free" : "Paid"}
                              </span>
                            </div>
                          </button>
                        ))
                      ) : (
                        <p className="text-muted small mt-2">
                          No lessons found.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Container>
      </section>
      <Footer />
    </>
  );
};

export default Chapter;
