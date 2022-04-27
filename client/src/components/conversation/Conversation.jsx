import axios from "axios";
import { useEffect, useState } from "react";
import { publicRequest,userRequest } from "../../requestMethods";
import "./conversation.css";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await userRequest.get("/users/find/" + friendId);
        console.log("res",res)
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      {console.log(user)}
      <img
        className="conversationImg"
        src={
          user?.profilePicture
            ? user.profilePicture
            : "https://www.kindpng.com/picc/m/269-2697881_computer-icons-user-clip-art-transparent-png-icon.png"
        }
        alt=""
      />
      <span className="conversationName">{user?.username}</span>
    </div>
  );
}
