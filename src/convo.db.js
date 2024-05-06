// conversation.js
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function saveMessage(userId, role, text, aiResponse) {
  return prisma.conversation.create({
    data: {
      userId,
      role,
      text,
      aiResponse, // Save the AI's response
    },
  });
}

module.exports = {
  saveMessage,
};
