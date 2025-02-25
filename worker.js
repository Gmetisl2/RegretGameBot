// Telegram Bot for Cloudflare Workers

// Configuration - Using environment secret
// The BOT_TOKEN will be accessed from Cloudflare Workers Secrets

// Expanded list of regret-based questions
const REGRET_QUESTIONS = [
  "Would you rather fart loudly in an important meeting or accidentally send a love text to your boss?",
  "Would you rather post an embarrassing childhood photo on Instagram or let your ex take over your social media for a day?",
  "Would you rather laugh uncontrollably at a funeral or cry at a job interview?",
  "Would you rather accidentally like your ex's old photo or send your crush a message meant for your best friend?",
  "Would you rather have to take a drug test every month for the rest of your life or never be able to drink again?"
];

// Regret Levels
function getRegretLevel(points) {
  if (points <= 5) {
    return "Carefree Rookie";
  } else if (points <= 15) {
    return "Risk Taker";
  } else if (points <= 30) {
    return "Master of Bad Decisions";
  } else {
    return "Regret King/Queen";
  }
}

// In-memory store for user scores (note: this will reset when the worker restarts)
// For persistence, you would need to use Cloudflare KV or D1
let userScores = {};

// Helper function to send messages to Telegram
async function sendTelegramMessage(chatId, text, botToken, method = "sendMessage") {
  const url = `https://api.telegram.org/bot${botToken}/${method}`;
  const params = {
    chat_id: chatId,
    text: text,
    parse_mode: "HTML"
  };
  
  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(params)
  });
}

// Helper function to send photos to Telegram
async function sendTelegramPhoto(chatId, photoUrl, botToken) {
  const url = `https://api.telegram.org/bot${botToken}/sendPhoto`;
  const params = {
    chat_id: chatId,
    photo: photoUrl
  };
  
  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(params)
  });
}

// Fetch a random meme
async function fetchMeme() {
  try {
    const response = await fetch("https://api.imgflip.com/get_memes");
    const data = await response.json();
    
    if (data.success) {
      const memes = data.data.memes;
      const randomMeme = memes[Math.floor(Math.random() * memes.length)];
      return randomMeme.url;
    }
    return null;
  } catch (error) {
    console.error("Error fetching meme:", error);
    return null;
  }
}

// Command handlers
async function handleStart(chatId, botToken) {
  return sendTelegramMessage(
    chatId, 
    "Welcome to the Regret Game! Type /play to start your first dilemma!",
    botToken
  );
}

async function handlePlay(chatId, botToken) {
  const randomQuestion = REGRET_QUESTIONS[Math.floor(Math.random() * REGRET_QUESTIONS.length)];
  return sendTelegramMessage(
    chatId, 
    `🤔 ${randomQuestion}\n\nReply with 'A' or 'B' to choose!`,
    botToken
  );
}

async function handleLeaderboard(chatId, botToken) {
  if (Object.keys(userScores).length === 0) {
    return sendTelegramMessage(
      chatId, 
      "No scores yet! Play to earn regret points!",
      botToken
    );
  }
  
  const sortedUsers = Object.entries(userScores)
    .sort((a, b) => b[1] - a[1])
    .map(([user, points]) => `${user}: ${points} points (${getRegretLevel(points)})`)
    .join("\n");
    
  return sendTelegramMessage(
    chatId, 
    `🏆 Regret Leaderboard:\n${sortedUsers}`,
    botToken
  );
}

async function handleResponse(chatId, text, username, botToken) {
  const user = username || "Anonymous";
  
  if (text.toLowerCase() === "a" || text.toLowerCase() === "b") {
    // Increment user score
    userScores[user] = (userScores[user] || 0) + 1;
    const level = getRegretLevel(userScores[user]);
    
    await sendTelegramMessage(
      chatId, 
      `😈 You earned a regret point! Your total: ${userScores[user]} (${level})\nType /play for another dilemma!`,
      botToken
    );
    
    // Send a meme after each response
    const memeUrl = await fetchMeme();
    if (memeUrl) {
      await sendTelegramPhoto(chatId, memeUrl, botToken);
    } else {
      await sendTelegramMessage(chatId, "Couldn't fetch a meme, try again later!", botToken);
    }
  } else {
    await sendTelegramMessage(chatId, "Please respond with 'A' or 'B' to choose!", botToken);
  }
}

// Main worker function
export default {
  async fetch(request, env, ctx) {
    // Get the bot token from environment secret
    const botToken = env.BOT_TOKEN;
    
    // Check if the bot token is available
    if (!botToken) {
      return new Response("Bot token not configured. Please set the BOT_TOKEN secret.", { status: 500 });
    }
    
    // Only accept POST requests
    if (request.method !== "POST") {
      return new Response("Please send a POST request", { status: 405 });
    }
    
    try {
      // Parse the incoming webhook from Telegram
      const data = await request.json();
      
      // Debug logging - you can view this in your Cloudflare Workers logs
      console.log("Received update:", JSON.stringify(data));
      
      // Check if this is a message update
      if (!data.message) {
        return new Response("OK", { status: 200 });
      }
      
      const chatId = data.message.chat.id;
      const text = data.message.text || "";
      const username = data.message.from.username || data.message.from.first_name;
      
      // Handle commands
      if (text.startsWith("/start")) {
        await handleStart(chatId, botToken);
      } else if (text.startsWith("/play")) {
        await handlePlay(chatId, botToken);
      } else if (text.startsWith("/leaderboard")) {
        await handleLeaderboard(chatId, botToken);
      } else {
        // Handle user responses
        await handleResponse(chatId, text, username, botToken);
      }
      
      // Always respond with 200 OK to Telegram
      return new Response("OK", { status: 200 });
    } catch (error) {
      console.error("Error handling webhook:", error);
      return new Response("Error processing request", { status: 500 });
    }
  }
};
