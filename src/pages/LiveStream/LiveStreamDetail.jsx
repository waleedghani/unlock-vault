import React, { useEffect, useRef } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PageHeader from "../../components/PageHeader";
import PageHeading from "../../components/PageHeading";
import { BeatLoader } from "react-spinners";
import "../../assets/css/liveStream.css";
import LiveStreamPlayer from "../../components/LiveStream/LiveStreamPlayer";
import {
  useJoinLiveStreamMutation,
  useLeaveLiveStreamMutation,
} from "../../redux/services/LiveStreamServices";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import LiveChat from "../../components/LiveStream/LiveChat";

const LiveStreamDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [joinLiveStream, response] = useJoinLiveStreamMutation();
  const [leaveLiveStream] = useLeaveLiveStreamMutation();
  const user = useSelector((state) => state?.AuthReducer?.user);
  const joinedRef = useRef(false);
  const [zegoInstance, setZegoInstance] = React.useState(null);

  const AllTokensData = response?.data?.data;

  // ✅ Join stream once
  useEffect(() => {
    if (!id || joinedRef.current) return;
    joinedRef.current = true;
    joinLiveStream({ id });
  }, [id, joinLiveStream]);

  // ✅ Leave stream on page unload (browser close / refresh)
  useEffect(() => {
    const handleBeforeUnload = () => {
      navigator.sendBeacon(
        `${process.env.REACT_APP_API_BASE_URL}/leave-live-stream`,
        JSON.stringify({ id })
      );
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [id]);

  // ✅ Cleanup Zego instance on unmount
  // useEffect(() => {
  //   return () => {
  //     if (zegoInstance) {
  //       try {
  //         zegoInstance.destroy?.();
  //       } catch (err) {
  //         console.warn("Zego cleanup error:", err);
  //       }
  //     }
  //   };
  // }, [zegoInstance]);

  // ✅ End stream manually
  const handleEndStream = async () => {
    try {
      if (zegoInstance) {
        zegoInstance.destroy?.();
      }
      await leaveLiveStream({ id });
      navigate("/");
    } catch (err) {
      console.warn("End stream error:", err);
    }
  };
  useEffect(() => {
    import("../../echo");
  }, []);

  return (
    <>
      <Header />
      <PageHeader>
        <PageHeading heading="Live Streaming" text="Watch in real-time" />
      </PageHeader>

      <section className="live-stream">
        <div className="container">
          {response?.isLoading ? (
            <div
              className="loader-wrapper d-flex justify-content-center align-items-center"
              style={{ height: "400px" }}
            >
              <BeatLoader color="#6b00ff" size={20} />
            </div>
          ) : (
            <div className="row">
              <div className="col-lg-8 pr-0">
                <div className="stream">
                  <figure>
                    <LiveStreamPlayer
                      roomId={AllTokensData?.stream?.zego_room_id}
                      user={user}
                      onZegoReady={setZegoInstance}
                    />
                  </figure>

                  <div className="title-wrapper">
                    <h2 className="text-white">
                      {AllTokensData?.stream?.title}
                    </h2>
                    {/* <button
                      className="btn follow end-stream mt-3"
                      onClick={handleEndStream}
                      style={{width:"120px"}}
                    >
                      End Stream
                    </button> */}
                  </div>

                  <p className="description">
                    {AllTokensData?.stream?.description}
                  </p>
                </div>
              </div>
              <div className="col-lg-4">
                {/* <LiveChat
                  roomId={AllTokensData?.stream?.zego_room_id}
                  user={user}
                  token={AllTokensData?.kit_token}
                /> */}
                <LiveChat
                  roomId={AllTokensData?.stream?.zego_room_id}
                  streamId={id} // <-- pass backend stream id
                  user={user}
                />
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default LiveStreamDetail;
