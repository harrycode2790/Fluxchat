import User from "../models/user.modal.js";
import Message from "../models/message.modal.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getAllContacts = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("fullName email profilePic bio");

    res.status(200).json(filteredUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMessagesByUserId = async (req, res) => {
  try {
    const myId = req.user._id;
    const { id: userToChatId } = req.params;

    const message = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    }).sort({ createdAt: 1 }); // sort out by ascending order

    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    if (!text && !image) {
      return res.status(400).json({ error: "Message or image required" });
    }

    if (senderId.equals(receiverId)) {
      return res.status(400).json({ error: "Cannot message yourself" });
    }

    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({ error: "User not found" });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      text,
      image, // already the Cloudinary URL
    });

    const receiverSocketId = getReceiverSocketId(receiverId)
    if(receiverSocketId){
      io.to(receiverSocketId).emit("newMessage", newMessage)
    }

    return res.status(201).json({
      success: true,
      message: newMessage,
    });
  } catch (err) {
    console.error("Error sending message:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getChatPartners = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    // find all the messages where the logged in user is either the sender or the receiver

    const messages = await Message.find({
      $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
    }).sort({ createdAt: -1 });

    const chatPartnerIds = [
      ...new Set(
        messages.map((msg) =>
          msg.senderId.toString() === loggedInUserId.toString()
            ? msg.receiverId.toString()
            : msg.senderId.toString()
        )
      ),
    ];

    // fetch user details for each chat partner and preserve order
    const chatPartners = await User.find({
      _id: { $in: chatPartnerIds },
    }).select("fullName  profilePic bio ");

    // order chatPartners to match chatPartnerIds (most recent first based on messages)
    const orderedChatPartners = chatPartnerIds
      .map((id) => chatPartners.find((user) => user._id.toString() === id))
      .filter(Boolean);

    res.status(200).json(orderedChatPartners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
