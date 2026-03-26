import React from "react";
import { lockIcon, playIcon } from "../constant/Index";

const VideoCard = ({ video }) => {
  return (
    <>
      <div
        className={
          video?.type == "lock"
            ? "videos-card-wrapper position-relative lock-video"
            : "videos-card-wrapper position-relative"
        }
      >
        <div
          className={
            video?.type == "lock"
              ? "videos-img-wrapper position-relative lock-video"
              : "videos-img-wrapper position-relative"
          }
        >
          <figure>
            <img src={video?.image} alt="" className="img-fluid" />
          </figure>
          <div className="center-img-wrapper ">
            {video?.type == "play" && (
              <img src={playIcon} className="img-fluid play-icon" alt="" />
            )}
          </div>
        </div>
        {video?.type == "play" && (
          <div className="videos-content-wrapper position-absolute bottom-0 p-4">
            <h4 className="heading-txt">{video?.title}</h4>
            <p>{video?.des}</p>
          </div>
        )}
        {video?.type == "lock" && (
          <div className="videos-content-wrapper lock-content-wrapper text-center">
            <div className="lock-img-wrapper mb-3">
              <img src={lockIcon} className="img-fluid lock-icon" alt="" />
            </div>
            <h4 className="heading-txt">{video?.title}</h4>
            <p>{video?.des}</p>
            <a className="gradient-button">Subscribe</a>
          </div>
        )}
      </div>
    </>
  );
};

export default VideoCard;
