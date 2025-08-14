import { useState } from "react";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useChatStore } from "../../lib/chatStore";
import { auth, db } from "../../lib/firebase";
import { useUserStore } from "../../lib/userStore";
import "./detail.css";

const Detail = ({ chatData }) => {
  const [showMedia, setShowMedia] = useState(true);
  const {
    chatId,
    user,
    isCurrentUserBlocked,
    isReceiverBlocked,
    changeBlock,
    resetChat,
  } = useChatStore();
  const { currentUser } = useUserStore();

  const handleBlock = async () => {
    if (!user) return;

    const userDocRef = doc(db, "users", currentUser.id);

    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      changeBlock();
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    auth.signOut();
    resetChat();
  };

  return (
    <div className="detail">
      <div className="user">
        <img src={user?.avatar || "./avatar.png"} alt="" />
        <h2>{user?.username}</h2>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Thông tin về đoạn chat</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Tuỳ chỉnh đoạn chat</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title" style={{cursor: 'pointer'}} onClick={() => setShowMedia((prev) => !prev)}>
            <span>File phương tiện</span>
            <img src={showMedia ? "./arrowDown.png" : "./arrowUp.png"} alt="" />
          </div>
          {showMedia && (
            <div className="photos">
              {chatData?.messages?.filter(m => m.img).map((message, idx) => (
                <div className="photoItem" key={message.img + idx}>
                  <div className="photoDetail">
                    <img src={message.img} alt="" />
                    <span>{message.img.split('/').pop()}</span>
                  </div>
                  <a href={message.img} target="_blank" rel="noopener noreferrer">
                    <img src="./download.png" alt="" className="icon" />
                  </a>
                </div>
              ))}
              {(!chatData?.messages || chatData.messages.filter(m => m.img).length === 0) && (
                <span style={{color: 'gray', fontSize: '14px'}}>Không có ảnh nào được gửi trong đoạn chat này.</span>
              )}
            </div>
          )}
        </div>
        <div className="detail-actions">
          <button onClick={handleBlock}>
            {isCurrentUserBlocked
              ? "You are Blocked!"
              : isReceiverBlocked
              ? "User blocked"
              : "Block User"}
          </button>
          <button className="logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Detail;
