// Import required modules and dependencies
const express = require('express');
const { runChat } = require('./src/ai'); // Import the function to interact with the AI
const conversation = require('./src/convo.db'); // Import the module to save conversation messages
const {v4:uuidv4} = require('uuid')
const app = express();
const port = 3000;

app.use(express.json());

// Route handler for handling incoming chat requests
app.post('/chat', async (req, res) => {
  const userId = uuidv4()
  
  const {userMessage}  = req.body; // Assuming the user ID and message are provided in the request body
  
  try {
    // Call the function to interact with the AI
    const aiResponse = await runChat(userMessage);

    // Save the user's message and the AI's response
    await conversation.saveMessage(userId, 'user', userMessage, aiResponse);

    // Send the AI's response back to the client
    res.status(201).json({ userId, aiResponse });
  } catch (error) {
    res.status(500).json({
      details:"error generating message",
    });
    console.log(error.message);
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
