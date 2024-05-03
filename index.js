// server/index.js
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 6000;

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://christopherabraham8:CYj7p9GGOXDH8vmh@cluster0.8yod844.mongodb.net/mails",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Define MongoDB schema for messages
const messageSchema = new mongoose.Schema({
  subject: String,
  content: String,
  isRead: Boolean,
});

const Message = mongoose.model("Message", messageSchema);

// Define routes
// Route to get all message
app.get("/api/messages", async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Route to get a single message by its ID
app.get("/api/messages/:id", async (req, res) => {
  const messageId = req.params.id;
  console.log(messageId);
  try {
    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }
    res.json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Route to update the isRead field of a message
app.put("/api/messages/:id", async (req, res) => {
  const messageId = req.params.id;
  //   const isRead  = req.body;

  try {
    const message = await Message.findByIdAndUpdate(
      messageId,
      { isRead: true },
      { new: true }
    );
    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }
    res.json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
