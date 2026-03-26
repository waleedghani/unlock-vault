import React, { useEffect, useRef } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const LiveStreamPlayer = ({ roomId, user, onZegoReady }) => {
  const containerRef = useRef(null);
  const zpRef = useRef(null);

  useEffect(() => {
    if (!roomId || !user) return;

    const appID = 1427147383;
    const serverSecret = "5526ba7a909d1492f28b0891ee169a59";

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      user.id.toString(),
      user.name
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zpRef.current = zp;

    if (onZegoReady) onZegoReady(zp);

    // zp.joinRoom({
    //   container: containerRef.current,
    //   scenario: {
    //     mode: ZegoUIKitPrebuilt.LiveStreaming,
    //     config: {
    //       role: ZegoUIKitPrebuilt.Audience,
    //     },
    //   },
    //   showLeaveRoomButton: true,
    //   showTextChat: true,
    // });

    zp.joinRoom({
      container: containerRef.current,
      scenario: {
        mode: ZegoUIKitPrebuilt.LiveStreaming,
        config: {
          role: ZegoUIKitPrebuilt.Audience,
        },
      },
      sharedLinks: [],
      showPreJoinView: false, // 🚀 disables the "Join Room" pre-screen
      showLeaveRoomButton: false,
      showTextChat: false,
      // turnOnCameraWhenJoining: false,
      // turnOnMicrophoneWhenJoining: false,
      role: ZegoUIKitPrebuilt.Audience, // ✅ directly set role
    });

    // ✅ Cleanup on unmount or re-render
    return () => {
      try {
        zp.leaveRoom?.();
        zp.destroy?.();
      } catch (err) {
        console.warn("Zego cleanup error:", err);
      }
    };
  }, [roomId, user, onZegoReady]);

  return <div ref={containerRef} style={{ width: "100%", height: "500px" }} />;
};

export default LiveStreamPlayer;
