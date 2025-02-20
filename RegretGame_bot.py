import logging
import random
import requests
from telegram import Update
from telegram.ext import Application, CommandHandler, MessageHandler, filters, CallbackContext

# Enable logging
logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s", level=logging.INFO
)
logger = logging.getLogger(__name__)

# Your Telegram Bot API Token (replace with your own token from @BotFather)
import os
TOKEN = os.getenv("7898843003:AAGiHkAJAkZmZWdSw9RqDe8sB2R4OA8GeW8")

# Expanded list of regret-based questions
REGRET_QUESTIONS = [
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
]

# Regret Levels
def get_regret_level(points):
    if points <= 5:
        return "Carefree Rookie"
    elif points <= 15:
        return "Risk Taker"
    elif points <= 30:
        return "Master of Bad Decisions"
    else:
        return "Regret King/Queen"

# Regret Points Tracker
user_scores = {}

async def start(update: Update, context: CallbackContext) -> None:
    await update.message.reply_text("Welcome to the Regret Game! Type /play to start your first dilemma!")

async def play(update: Update, context: CallbackContext) -> None:
    question = random.choice(REGRET_QUESTIONS)
    await update.message.reply_text(f"🤔 {question}\n\nReply with 'A' or 'B' to choose!")

async def leaderboard(update: Update, context: CallbackContext) -> None:
    if not user_scores:
        await update.message.reply_text("No scores yet! Play to earn regret points!")
        return
    leaderboard_text = "🏆 Regret Leaderboard:\n" + "\n".join([f"{user}: {points} points ({get_regret_level(points)})" for user, points in sorted(user_scores.items(), key=lambda x: x[1], reverse=True)])
    await update.message.reply_text(leaderboard_text)

async def fetch_meme():
    url = "https://api.imgflip.com/get_memes"
    response = requests.get(url).json()
    if response["success"]:
        memes = response["data"]["memes"]
        meme = random.choice(memes)
        return meme["url"]
    return None

async def send_meme(update: Update, context: CallbackContext) -> None:
    meme_url = await fetch_meme()
    if meme_url:
        await update.message.reply_photo(photo=meme_url)
    else:
        await update.message.reply_text("Couldn't fetch a meme, try again later!")

async def handle_response(update: Update, context: CallbackContext) -> None:
    user = update.message.from_user.username or update.message.from_user.first_name
    if update.message.text.lower() in ["a", "b"]:
        user_scores[user] = user_scores.get(user, 0) + 1
        level = get_regret_level(user_scores[user])
        await update.message.reply_text(f"😈 You earned a regret point! Your total: {user_scores[user]} ({level})\nType /play for another dilemma!")
        await send_meme(update, context)  # Send a meme after each response
    else:
        await update.message.reply_text("Please respond with 'A' or 'B' to choose!")

def main() -> None:
    app = Application.builder().token(TOKEN).build()
    app.add_handler(CommandHandler("start", start))
    app.add_handler(CommandHandler("play", play))
    app.add_handler(CommandHandler("leaderboard", leaderboard))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_response))
    app.run_polling()

if __name__ == "__main__":
    main()
