import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "../../assets/css/LiveChat.css";
import {
  useGetMessagesQuery,
  useSendMessageMutation,
  useSendReactionMutation,
} from "../../redux/services/ChatServices";

const REAL_EMOJIS = ["❤️", "👍", "😂", "🔥", "😢", "🎉", "🙏", "👏", "🚀"];

export default function LiveChat({ roomId, streamId, user }) {
  const [newMessage, setNewMessage] = useState("");
  const [flyingReactions, setFlyingReactions] = useState([]);
  const [hoveredMessage, setHoveredMessage] = useState(null);
  const [viewers, setViewers] = useState(0);
  const chatRef = useRef(null);
  const cleanupTimersRef = useRef([]);

  // ✅ RTK Query hooks
  const { data: messagesData, isLoading } = useGetMessagesQuery(
    { streamId: streamId },
    {
      skip: !streamId,
    }
  );
  const [sendMessageApi] = useSendMessageMutation();
  const [sendReactionApi] = useSendReactionMutation();

  const [messages, setMessages] = useState([]);

  // helper: scroll
  function scrollToBottom() {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }

  // sync messagesData -> local state
  useEffect(() => {
    if (messagesData?.data) {
      const mapped = messagesData.data.map((m) => ({
        ...m,
        username: m.sender_name || m.user?.name || "Guest",
        reaction_summary: m.reaction_summary || [],
      }));
      setMessages(mapped);
      scrollToBottom();
    }
  }, [messagesData]);

  // setup Echo for real-time updates
  useEffect(() => {
    if (!streamId || !window.Echo) return;

    const presence = window.Echo.join(`stream.${streamId}`)
      .here((users) => setViewers(users.length || 0))
      .joining(() => setViewers((v) => v + 1))
      .leaving(() => setViewers((v) => Math.max(0, v - 1)));

    // const channel = window.Echo.private(`stream.${streamId}`)
    //   .listen(".MessageSent", (e) => {
    //     setMessages((prev) => {
    //       const exists = prev.find((m) => m.id === e.message.id);
    //       if (exists) return prev;
    //       const next = [
    //         ...prev,
    //         {
    //           ...e.message,
    //           username: e.message.username || "Guest",
    //           reaction_summary: e.message.reaction_summary || [],
    //         },
    //       ];
    //       setTimeout(scrollToBottom, 50);
    //       return next;
    //     });
    //   })
    //   .listen(".ReactionAdded", (e) => {
    //     if (e.is_global) {
    //       const fly = {
    //         id: Date.now() + Math.random(),
    //         emoji: e.emoji,
    //         style: {
    //           left: `${Math.random() * 70 + 15}%`,
    //           bottom: `${Math.random() * 40 + 80}px`,
    //         },
    //       };
    //       setFlyingReactions((prev) => [...prev, fly]);
    //       const t = setTimeout(() => {
    //         setFlyingReactions((prev) => prev.filter((f) => f.id !== fly.id));
    //       }, 3000);
    //       cleanupTimersRef.current.push(t);
    //     } else {
    //       setMessages((prev) =>
    //         prev.map((m) => {
    //           if (m.id === e.message_id) {
    //             const existing = (m.reaction_summary || []).find(
    //               (r) => r.emoji === e.emoji
    //             );
    //             if (existing) {
    //               return {
    //                 ...m,
    //                 reaction_summary: m.reaction_summary.map((r) =>
    //                   r.emoji === e.emoji ? { ...r, count: r.count + 1 } : r
    //                 ),
    //               };
    //             } else {
    //               return {
    //                 ...m,
    //                 reaction_summary: [
    //                   ...(m.reaction_summary || []),
    //                   { emoji: e.emoji, count: 1 },
    //                 ],
    //               };
    //             }
    //           }
    //           return m;
    //         })
    //       );
    //     }
    //   });

    const channel = window.Echo.private(`stream.${streamId}`)
      .listen("MessageSent", (e) => {
        setMessages((prev) => {
          const exists = prev.find((m) => m.id === e.message.id);
          if (exists) return prev;
          return [
            ...prev,
            {
              ...e.message,
              username: e.message.username || "Guest",
              reaction_summary: e.message.reaction_summary || [],
            },
          ];
        });

        setTimeout(scrollToBottom, 50);
      })
      .listen("ReactionAdded", (e) => {
        if (e.is_global) {
          const fly = {
            id: Date.now() + Math.random(),
            emoji: e.emoji,
            style: {
              left: `${Math.random() * 70 + 15}%`,
              bottom: `${Math.random() * 40 + 80}px`,
            },
          };

          setFlyingReactions((prev) => [...prev, fly]);

          const t = setTimeout(() => {
            setFlyingReactions((prev) => prev.filter((f) => f.id !== fly.id));
          }, 3000);

          cleanupTimersRef.current.push(t);
        } else {
          setMessages((prev) =>
            prev.map((m) => {
              if (m.id === e.message_id) {
                const existing = m.reaction_summary?.find(
                  (r) => r.emoji === e.emoji
                );

                if (existing) {
                  return {
                    ...m,
                    reaction_summary: m.reaction_summary.map((r) =>
                      r.emoji === e.emoji ? { ...r, count: r.count + 1 } : r
                    ),
                  };
                } else {
                  return {
                    ...m,
                    reaction_summary: [
                      ...(m.reaction_summary || []),
                      { emoji: e.emoji, count: 1 },
                    ],
                  };
                }
              }
              return m;
            })
          );
        }
      });

    return () => {
      if (presence) window.Echo.leave(`stream.${streamId}`);
      if (channel) window.Echo.leave(`stream.${streamId}`);
      cleanupTimersRef.current.forEach((t) => clearTimeout(t));
      cleanupTimersRef.current = [];
    };
  }, [streamId]);

  // send message
  const sendMessage = async () => {
    if (!newMessage.trim() || !streamId) return;
    const text = newMessage.trim();
    setNewMessage("");

    // optimistic UI
    const optimistic = {
      id: `temp-${Date.now()}`,
      message: text,
      username: user?.name || "You",
      reaction_summary: [],
    };
    setMessages((prev) => [...prev, optimistic]);
    scrollToBottom();

    try {
      await sendMessageApi({
        streamId,
        data: { message: text },
      }).unwrap();
    } catch (err) {
      console.error("Send message failed:", err);
      setNewMessage(text);
    }
  };

  // send reaction (message-specific or global)
  const sendReaction = async (emoji, messageId = null) => {
    if (!streamId) return;
    try {
      await sendReactionApi({
        streamId,
        data: { emoji, message_id: messageId },
      }).unwrap();
    } catch (err) {
      console.error("Send reaction failed:", err);
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="react-chat-panel">
      <div className="chat-header d-flex align-items-center justify-content-between">
        <h5 className="mb-0 heading-txt">VIP Chat</h5>
        <div className="viewer-pill">Live Viewers {viewers}</div>
      </div>

      <div className="chat-body position-relative">
        {isLoading && (
          <div className="zego-loader small">
            <div className="loader-spinner" />
            <p>Loading chat...</p>
          </div>
        )}

        {/* Messages */}
        {/* <div className="chat-messages" ref={chatRef}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`chat-message ${msg.is_host ? "host-message" : ""}`}
            >
              <div className="message-header">
                <strong
                  className={`sender-name ${msg.is_host ? "host-name" : ""}`}
                >
                  {msg.username}
                  {msg.is_host && <span className="host-badge">HOST</span>}
                </strong>
              </div>

              <div className="message-content">
                <div className="msg-text">{msg.message || msg.text}</div>
                {msg.reaction_summary?.length > 0 && (
                  <div className="reactions-summary">
                    {msg.reaction_summary.map((r) => (
                      <button
                        key={r.emoji}
                        className="reaction-item"
                        onClick={() => sendReaction(r.emoji, msg.id)}
                      >
                        {r.emoji} {r.count}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div> */}

        <div className="chat-messages" ref={chatRef}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`chat-message ${msg.is_host ? "host-message" : ""}`}
              onMouseEnter={() => setHoveredMessage(msg.id)}
              onMouseLeave={() => setHoveredMessage(null)}
              style={{ position: "relative" }}
            >
              <div className="message-header">
                <strong
                  className={`sender-name ${msg.is_host ? "host-name" : ""}`}
                >
                  {msg.username}
                  {msg.is_host ? <span className="host-badge">HOST</span> : ""}
                </strong>
              </div>

              <div className="message-content">
                <div className="msg-text">{msg.message || msg.text}</div>

                {/* {hoveredMessage === msg.id && (
                  <div className="emoji-popup">
                    {REAL_EMOJIS.map((emoji) => (
                      <button
                        key={emoji}
                        className="emoji-option"
                        onClick={() => sendReaction(emoji, msg.id)}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                )}

                {msg.reaction_summary?.length > 0 && (
                  <div className="reactions-summary">
                    {msg.reaction_summary.map((r) => (
                      <button
                        key={r.emoji}
                        className="reaction-item"
                        onClick={() => sendReaction(r.emoji, msg.id)}
                      >
                        {r.emoji} {r.count}
                      </button>
                    ))}
                  </div>
                )} */}
              </div>
            </div>
          ))}
        </div>

        {/* Flying Reactions */}
        <div className="flying-reactions">
          {flyingReactions.map((f) => (
            <div key={f.id} className="fly-reaction" style={f.style}>
              {f.emoji}
            </div>
          ))}
        </div>

        {/* Footer */}
      </div>
      <div className="chat-footer">
        {/* <div className="reaction-buttons">
            {REAL_EMOJIS.map((emoji) => (
              <button
                key={emoji}
                className="reaction-btn"
                onClick={() => sendReaction(emoji, null)}
              >
                {emoji}
              </button>
            ))}
          </div> */}

        <div className="chat-input-container">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
            placeholder="Type a message..."
            className="chat-input"
          />
          <button className="send-btn" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

LiveChat.propTypes = {
  roomId: PropTypes.string,
  streamId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  user: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
  }).isRequired,
};
