import React from "react";
import { Route, Routes } from "react-router";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { useAuthStore } from "./store/useAuthStore";

function App() {
  const {authUser, isLoading, login} = useAuthStore()

  console.log("auth User ", authUser)
  console.log("isloading" , isLoading)
  login()
 
  return (
    <div className="min-h-screen bg-gray-900 relative flex items-center justify-center p-4 overflow-hidden">
      {/* DECORATORS - GRID BG & GLOW SHAPES */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute top-0 -left-4 size-96 bg-brandColor opacity-20 blur-[100px]" />
      <div className="absolute bottom-0 -right-4 size-96 bg-brandColor opacity-20 blur-[100px]" />
        <button></button>
      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </div>
  );
}

export default App;
