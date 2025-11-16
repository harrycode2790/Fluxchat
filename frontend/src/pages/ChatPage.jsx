import { useAuthStore } from "../store/useAuthStore";

function ChatPage() {
  const { authUser, logOut } = useAuthStore();

  return (
    <div className="z-10">
      ChatPage {authUser.fullName}{" "}
      <button className="btn btn-secondary" onClick={logOut}>
        {" "}
        Logout
      </button>
      {" "}
      
    </div>
  );
}

export default ChatPage;
