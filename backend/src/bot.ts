import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
dotenv.config();

const BOT_TOKEN = process.env.BOT_TOKEN || '';
const APP_URL = process.env.APP_URL || '';

let bot: TelegramBot | null = null;

export function getBot(): TelegramBot {
  if (!bot) {
    bot = new TelegramBot(BOT_TOKEN, { polling: true });

    bot.onText(/\/start/, (msg) => {
      const chatId = msg.chat.id;
      bot!.sendMessage(chatId,
        '🎓 Welcome to Course Shop!\n\nBrowse and buy exclusive private channel courses.',
        {
          reply_markup: {
            inline_keyboard: [[
              {
                text: '🛒 Open Course Shop',
                web_app: { url: APP_URL }
              }
            ]]
          }
        }
      );
    });
  }
  return bot;
}

export async function sendInviteLink(telegramId: string, courseName: string, inviteLink: string): Promise<void> {
  const b = getBot();
  await b.sendMessage(telegramId,
    `✅ *Payment Approved!*\n\n` +
    `Your access to *${courseName}* has been approved.\n\n` +
    `🔗 Your private invite link:\n${inviteLink}\n\n` +
    `⚠️ This link is one-time use. Join immediately!`,
    { parse_mode: 'Markdown' }
  );
}

export async function sendRejectionMessage(telegramId: string, courseName: string, note: string): Promise<void> {
  const b = getBot();
  await b.sendMessage(telegramId,
    `❌ *Payment Rejected*\n\n` +
    `Your order for *${courseName}* was rejected.\n\n` +
    `Reason: ${note || 'Payment could not be verified.'}\n\n` +
    `Please try again or contact support.`,
    { parse_mode: 'Markdown' }
  );
}

export async function generateInviteLink(channelId: string): Promise<string> {
  // Dev mode: return a fake link if DEV_BYPASS_AUTH is true and no real intent
  if (process.env.DEV_BYPASS_AUTH === 'true') {
    console.log(`[DEV] Fake invite link for channel: ${channelId}`);
    return `https://t.me/joinchat/DEV_TEST_LINK_${Date.now()}`;
  }
  const b = getBot();
  const link = await b.createChatInviteLink(channelId, {
    member_limit: 1,
    expire_date: Math.floor(Date.now() / 1000) + 86400 * 7 // 7 days
  });
  return link.invite_link;
}

export async function sendInviteLinkSafe(telegramId: string, courseName: string, inviteLink: string): Promise<void> {
  if (process.env.DEV_BYPASS_AUTH === 'true') {
    console.log(`[DEV] Would send invite to ${telegramId} for "${courseName}": ${inviteLink}`);
    return;
  }
  await sendInviteLink(telegramId, courseName, inviteLink);
}

export async function sendRejectionSafe(telegramId: string, courseName: string, note: string): Promise<void> {
  if (process.env.DEV_BYPASS_AUTH === 'true') {
    console.log(`[DEV] Would send rejection to ${telegramId} for "${courseName}": ${note}`);
    return;
  }
  await sendRejectionMessage(telegramId, courseName, note);
}
