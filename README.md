# RegretGameBot

worker.js to be deployed using Cloudflare workers.
Step-by-Step Instructions for Hosting on Cloudflare Workers Using Only UI

Create a Cloudflare Account

Go to cloudflare.com
Sign up for an account if you don't have one
Log in to your account


Navigate to Workers

From the dashboard, click on "Workers & Pages" in the left sidebar


Create a New Worker

Click the "Create application" button
Select "Create Worker"
You'll be directed to the Worker setup page


Set Up the Worker

Enter a name for your worker (e.g., "telegram-regret-bot")
Click "Deploy" to continue to the editor


Remove the Default Code

In the editor that opens, select all of the default code and delete it


Paste Your Code

Paste the JavaScript code I provided above into the editor


Save and Deploy

Click "Save and deploy" to publish your worker
You'll see a confirmation message when the deployment is successful

Add the Secret

After deploying, go to your Worker's settings
On the left sidebar, click on "Variables"
Under the "Environment Variables" section, click "Add variable"
Enter the following:

Variable name: BOT_TOKEN
Value: Your Telegram bot token (e.g., 123514235324:AAHadsasdaasdasdhfkjalhdskhldsuhfldsauhfl)


Make sure to check the "Encrypt" checkbox to store it as a secret
Click "Save and deploy"


Set Up Webhook with Telegram

Open a new browser tab and go to:
Copyhttps://api.telegram.org/bot[YOUR_BOT_TOKEN]/setWebhook?url=[YOUR_WORKER_URL]

Replace [YOUR_BOT_TOKEN] with your actual bot token
Replace [YOUR_WORKER_URL] with your Cloudflare worker URL


Test Your Bot

Open Telegram and start a chat with your bot
Try commands like /start, /play, and /leaderboard
