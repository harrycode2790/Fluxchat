import React from 'react'
import { useAuthStore } from '../store/useAuthStore'



function ChatPage() {
  const {authUser} = useAuthStore()
  
  return (
    <div>ChatPage {authUser._id} </div>
  )
}

export default ChatPage