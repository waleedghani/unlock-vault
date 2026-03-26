import React, { useRef } from "react";
import { useSelector } from "react-redux";
import Header from "../Header";
import PageHeader from "../PageHeader";
import PageHeading from "../PageHeading";
import Sidebar from "./Sidebar";
import Footer from "../Footer";
import { FaPencilAlt } from "react-icons/fa"; // pencil icon

const ProfileLayout = ({
  children,
  type,
  sidebar = true,
  profileImg,
  onImageSelect,
  edit,
}) => {
  const user = useSelector((state) => state?.AuthReducer?.user);
  const fileInputRef = useRef(null);

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    if (onImageSelect) {
      onImageSelect(e.target.files[0]); // pass file back to parent (MyProfile)
    }
  };

  return (
    <>
      <Header />
      <PageHeader>
        <PageHeading heading={type} />
      </PageHeader>

      <section className="profile__wrapp mt-5 site_width">
        <div className="container">
          <div className="row">
            {sidebar ? (
              <>
                <div className="col-lg-3">
                  <div className="profile__sidebar position-relative mb-3 py-3">
                    <div className="profile__info mb-4">
                      <div className="img__wrapp position-relative">
                        <img
                          alt="profile_image"
                          className="profile__img"
                          // src={
                          //   user?.profile_img_url
                          //     ? user?.profile_img_url
                          //     : profileImg
                          // }
                          src={profileImg || user?.profile_img_url}
                        />
                        {/* ✅ Only show pencil when edit is true */}
                        {edit && (
                          <>
                            <button
                              type="button"
                              className="edit-icon-btn position-absolute"
                              style={{
                                top: "10px",
                                right: "65px",
                                background: "#fff",
                                borderRadius: "50%",
                                border: "1px solid #ddd",
                                // padding: "5px",
                                width: "33px",
                                height: "33px",
                                cursor: "pointer",
                                zIndex: 99,
                              }}
                              onClick={handleIconClick}
                            >
                              <FaPencilAlt size={14} color="#333" />
                            </button>

                            {/* Hidden file input */}
                            <input
                              type="file"
                              accept="image/*"
                              ref={fileInputRef}
                              style={{ display: "none" }}
                              onChange={handleFileChange}
                            />
                          </>
                        )}
                      </div>
                      <div className="heading-bg-wrapper">
                        <h5 className="text-uppercase heading-txt text-center">
                          {user?.name ? `${user?.name}` : "User Name"}
                        </h5>
                      </div>
                    </div>
                    <Sidebar />
                  </div>
                </div>
                <div className="col-lg-8 offset-lg-2 ms-lg-5">{children}</div>
              </>
            ) : (
              <>{children}</>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ProfileLayout;
