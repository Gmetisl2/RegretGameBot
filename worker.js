// Telegram Bot for Cloudflare Workers

// Configuration - Using environment secret
// The BOT_TOKEN will be accessed from Cloudflare Workers Secrets

// Expanded list of regret-based questions
const REGRET_QUESTIONS = [
  "Would you rather fart loudly in an important meeting or accidentally send a love text to your boss?",
  "Would you rather post an embarrassing childhood photo on Instagram or let your ex take over your social media for a day?",
  "Would you rather laugh uncontrollably at a funeral or cry at a job interview?",
  "Would you rather accidentally like your ex’s old photo or send your crush a message meant for your best friend?",
  "Would you rather walk around with toilet paper stuck to your shoe all day or realize your zipper has been open during an important speech?",
  "Would you rather lose all your money in a scam or forget your bank card on vacation?",
  "Would you rather accidentally send money to the wrong person or find out you’ve been paying for a subscription you never use for 5 years?",
  "Would you rather gamble away your life savings or spend it all on an NFT that becomes worthless overnight?",
  "Would you rather forget to cancel an expensive online order or lose your wallet in a foreign country?",
  "Would you rather accidentally donate $500 to a stranger or tip your rude waiter $100 by mistake?",
  "Would you rather lose all your crypto in a scam or accidentally send Bitcoin to the wrong wallet forever?",
  "Would you rather get rich overnight but lose all your friends or stay broke but have people who truly love you?",
  "Would you rather waste thousands on a useless course or invest in an NFT that instantly loses value?",
  "Would you rather find out your partner is secretly spending your money or realize you've been paying for a random stranger's Netflix for years?",
  "Would you rather lose your entire salary at a casino or accidentally donate it all to a fake charity?",
  "Would you rather go bankrupt at 25 but recover later or be rich all your life but lose everything at 60?",
  "Would you rather have someone steal your credit card info or send money to a scammer thinking it was legit?",
  "Would you rather buy fake designer clothes unknowingly or pay full price for a cheap knockoff?",
  "Would you rather get a massive unexpected bill or be fined for something you didn’t do?",
  "Would you rather win $1 million and lose it in a week or never win anything but always be financially stable?",
  "Would you rather have a one-night stand with your best friend or date your boss?",
  "Would you rather date someone who constantly lies or someone who is brutally honest about everything?",
  "Would you rather go on a date with someone who forgets your name or calls you by their ex's name?",
  "Would you rather be dumped over text or ghosted forever?",
  "Would you rather cheat and never get caught or never cheat but be falsely accused?",
  "Would you rather get stood up on a date or be rejected in front of a crowd?",
  "Would you rather date someone who is always late or someone who constantly texts their ex?",
  "Would you rather have your partner find out you stalked their ex or that you Googled embarrassing questions about them?",
  "Would you rather have your partner find out your most embarrassing kink or that you once wrote cringy love poems about an ex?",
  "Would you rather kiss your worst enemy or confess your biggest regret to your partner?",
  "Would you rather have your deepest fear come true or be haunted by nightmares of it every night?",
  "Would you rather be locked in a room with your worst enemy for 24 hours or spend a week completely alone in the woods?",
  "Would you rather know when you’re going to die or how you’re going to die?",
  "Would you rather take the blame for something horrible you didn’t do or let your best friend get punished for it?",
  "Would you rather wake up with no memory of the past 5 years or suddenly remember every mistake you ever made?",
  "Would you rather be famous but hated by everyone or completely unknown but loved by a few?",
  "Would you rather experience your worst heartbreak all over again or relive the most embarrassing moment of your life in public?",
  "Would you rather make a mistake that ruins someone else’s life or have someone else make a mistake that ruins yours?",
  "Would you rather know all the terrible things people say about you behind your back or never know the truth?",
  "Would you rather accidentally send a spicy picture to a family group chat or receive one from a family member by mistake?",
  "Would you rather get caught sexting at work or have your boss read your most flirty text out loud?",
  "Would you rather get drunk and text your ex or mistakenly kiss the wrong person at a party?",
  "Would you rather have your partner find out about all your past hookups or find out all about theirs?",
  "Would you rather have your partner say the wrong name during sex or you accidentally say the wrong name?",
  "Would you rather walk in on your parents having sex or have them walk in on you with your partner?",
  "Would you rather have a sex tape of yours accidentally leaked or have your most embarrassing Google searches revealed?",
  "Would you rather have a one-night stand with someone famous and be exposed in the media or keep it a secret forever?",
  "Would you rather be really good in bed but no one knows, or have a reputation for being amazing but be awful in reality?",
  "Would you rather be stuck in traffic for 5 hours every day or only be allowed to sleep 3 hours a night?",
  "Would you rather have unlimited money but never be able to eat your favorite food again, or eat your favorite food every day but be broke?",
  "Would you rather always be 10 minutes late for everything or 1 hour early?",
  "Would you rather always say the wrong thing in conversations or never be able to speak your mind?",
  "Would you rather have an embarrassing nickname for life or be known for one awkward moment forever?",
  "Would you rather always feel like you have to pee or always feel like you have an itch you can’t scratch?",
  "Would you rather have a superpower that no one believes is real or have the ability to read minds but only hear bad things?",
  "Would you rather always feel alone in a crowd or be the center of attention but hated?",
  "Would you rather be forced to relive your worst day over and over or never be able to remember anything new?",
  "Would you rather have no regrets in life but no real happiness, or live with regrets but have experienced real joy?",
  "Would you rather be completely forgotten after you die or remembered only for your biggest failure?",
  "Would you rather know the exact moment you will lose everything or have it happen out of nowhere?",
  "Would you rather accidentally reveal your darkest secret in public or be blackmailed with it for life?",
  // Family Regrets
  "Would you rather accidentally insult your mother-in-law or forget your parent's birthday?",
  "Would you rather have your entire family read your diary or see your entire internet search history?",
  "Would you rather miss your child's graduation or your parent's funeral?",
  "Would you rather have a sibling who constantly embarrasses you or a parent who never stops oversharing?",
  "Would you rather be stuck in a room with your most annoying cousin for a week or spend a month avoiding family drama?",
  "Would you rather have your entire family read your old love letters or watch your cringiest childhood home video?",
  "Would you rather accidentally delete all your family photos or forget your most cherished memory?",
  "Would you rather find out you're adopted or find out you have a secret sibling no one told you about?",
  "Would you rather have your parents find your hidden stash of embarrassing items or overhear your most private conversation?",
  "Would you rather never be able to see your family again or be forced to live with them forever?",
  
  // Work Regrets
  "Would you rather get fired in front of your entire team or accidentally send a resignation email to your boss?",
  "Would you rather be stuck in a job you hate for 10 years or keep getting fired from jobs you love?",
  "Would you rather show up to work in pajamas or forget an important client meeting?",
  "Would you rather have your boss see your drunk texts or find out you were lying about being sick?",
  "Would you rather take the blame for a coworker’s mistake or snitch and lose all your work friends?",
  "Would you rather be underpaid for your entire career or overpaid but do a job you despise?",
  "Would you rather be caught sleeping at your desk or be caught gossiping about your boss?",
  "Would you rather lose all your work files permanently or accidentally leak confidential information?",
  "Would you rather have your worst performance review published online or be forced to work with your most annoying colleague forever?",
  "Would you rather work 100-hour weeks for a year and retire early or have an easy job but work until you're 80?",

  // School Regrets
  "Would you rather fail an exam in front of everyone or forget to wear pants to school?",
  "Would you rather be caught cheating on a test or fail and retake an entire year?",
  "Would you rather be laughed at for a dumb answer or never speak in class at all?",
  "Would you rather have your old embarrassing yearbook photo go viral or have to retake high school?",
  "Would you rather be bullied for something embarrassing or get a teacher who openly hates you?",
  "Would you rather sit through the most boring lecture of your life or accidentally fall asleep in class?",
  "Would you rather be the class clown everyone laughs at or the nobody no one notices?",
  "Would you rather be called out by a teacher for texting or get caught passing notes?",
  "Would you rather date your high school crush and break up horribly or never date them at all?",
  "Would you rather have to repeat kindergarten or be stuck in school for an extra five years?",

  // Relationship Regrets
  "Would you rather cheat on your partner and never get caught or be falsely accused of cheating?",
  "Would you rather date someone who has no emotions or someone who is overly emotional?",
  "Would you rather never be able to say 'I love you' again or say it to the wrong person every time?",
  "Would you rather have your significant other read all your texts or have access to all your internet history?",
  "Would you rather go on a honeymoon alone or have your ex show up to your wedding uninvited?",
  "Would you rather find out your partner has a secret past or that they’re keeping a secret about your future?",
  "Would you rather never be able to have kids or have 10 kids you weren’t expecting?",
  "Would you rather be dumped on your birthday or on the day of a major life achievement?",
  "Would you rather be in a relationship with someone too clingy or someone too distant?",
  "Would you rather find out your partner cheated years ago but never told you or catch them cheating right now?",

  // Kids & Parenting Regrets
  "Would you rather accidentally swear in front of a child or let a child tell everyone your deepest secret?",
  "Would you rather have your kid turn out just like you or be the complete opposite?",
  "Would you rather forget your child's birthday or miss their first big milestone?",
  "Would you rather have a kid who is a genius but hates you or a kid who is average but loves you unconditionally?",
  "Would you rather have kids who are embarrassingly wild or painfully shy?",
  "Would you rather be stuck watching kids’ cartoons forever or never be able to watch your favorite shows again?",
  "Would you rather have a child who always tells the truth at the worst moments or one who always lies?",
  "Would you rather change diapers for the rest of your life or be woken up at 3 AM every night?",
  "Would you rather have your kid ask you an impossible question in public or throw a tantrum in the middle of a store?",
  "Would you rather hear 'Why?' 100 times a day from a toddler or deal with a moody teenager forever?",

  // Choices & Life Regrets
  "Would you rather have the ability to change one decision from your past or see 10 years into your future?",
  "Would you rather know exactly when you'll die or know exactly how you’ll die?",
  "Would you rather have unlimited money but be miserable or be broke but happy?",
  "Would you rather get everything you ever wanted but live in regret or always wonder 'what if'?",
  "Would you rather be remembered for something embarrassing or be completely forgotten?",
  "Would you rather regret not taking a risk or regret taking one that went horribly wrong?",
  "Would you rather have one huge regret or a million tiny regrets?",
  "Would you rather get the chance to redo your life or have to live with every mistake?",
  "Would you rather be famous for the wrong reasons or never be noticed at all?",
  "Would you rather never have regrets or never feel joy?",

  // Drugs, Alcohol & Bad Decisions
  "Would you rather wake up with the worst hangover of your life or wake up in a stranger’s bed with no memory?",
  "Would you rather get caught with illegal substances or accidentally take something embarrassing?",
  "Would you rather drink a mystery drink at a party or take a random pill someone offers you?",
  "Would you rather say something horribly offensive while drunk or physically embarrass yourself?",
  "Would you rather black out at a wedding or at a work party?",
  "Would you rather get arrested for public intoxication or have your boss see you drunk out of your mind?",
  "Would you rather be addicted to something expensive or something incredibly embarrassing?",
  "Would you rather have a viral video of you wasted on the internet or have your family see you blackout drunk?",
  "Would you rather always be the one who has to take care of drunk friends or always be the drunk friend?",
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
