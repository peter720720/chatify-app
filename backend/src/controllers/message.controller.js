import Message from "../models/Message.js";
import User from "../models/User.js";

export const getAllContacts = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error in  getAllcontacts:", error);
        res.status(500).json({ message: "Server error" });
    }

};

export const getMessagesByUserId = async (req, res) => {
    try {
        const myId = req.user._id;
        const { id: userToChatId } = req.params;

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiveId: userToChatId },
                { senderId: userToChatId, receiveId: myId },
            ],
        });

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({ error: "Internal Server error" });
    }
};

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiveId } = req.params;
        const senderId = req.user._id;

        if (!text && !image) {
            return res.status(400).json({ message: "Text or image is required." });
        }

        if(senderId.equals(receiveId)) {
            return res.status(400).json({ message: "You cannot send a message to yourself." });
        }

        const receiverExists = await User.exists({ _id: receiveId });
        if (!receiverExists) {
            return res.status(404).json({ message: "Receiver not found." });
        }

        let imageUrl;
        if (image) {
            // Upload image to Cloudinary
            const uploadResult = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiveId,
            text,
            image: imageUrl,
        });

        await newMessage.save();

        // todo: send message in real-time if user is online
        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({ error: "Internal Server error" });
    }
};

export const getChatsPartners = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        // Find all the messages where the logged-in user is either the sender or receiver
        const messages = await Message.find({
            $or: [{ senderId: loggedInUserId }, { receiveId: loggedInUserId }],
        });

        const chatPartnerIds = [
            ...new Set(
                messages.map((msg) =>
                    msg.senderId.toString() === loggedInUserId.toString()
                        ? msg.receiveId.toString()
                        : msg.senderId.toString()
                )
            ),
        ];

     const chatPartners = await User.find({ _id: { $in: chatPartnerIds } }).select("-password");
        
      res.status(200).json(chatPartners);
    } catch (error) {
      console.log("Error in getChatsPartners: ", error.message);  
      res.status(500).json({ error: "Internal Server error" });
    }
};