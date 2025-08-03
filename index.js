require("dotenv").config();
const telegramBot = require("node-telegram-bot-api");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const child_process = require("child_process");

const bot = new telegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

async function ytSearch(query) {
    const apiKey = process.env.GOOGLE_DATA_API_KEY;
    const apiUrl = "https://www.googleapis.com/youtube/v3/search";

    const response = await axios.get(apiUrl, {
        params: {
            part: "snippet",
            q: query,
            key: apiKey,
            maxResults: 1,
            type: "video"
        }
    });

    const items = response.data.items;

    if (items.length === 0) {
        return null;
    }

    const videoId = items[0].id.videoId;
    const title = items[0].snippet.title;

    return {
        videoId,
        title,
        url: `https://www.youtube.com/watch?v=${videoId}`
    };
}

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "🎶 Send me a song name or YouTube link to get audio! with command /play <song_name>");
})

bot.onText(/\/play (.+)/, async (msg, match) => {
    const song_name = match[1];

    bot.sendMessage(msg.chat.id, `Searching ${song_name} on youtube...`);

    const youtubeSearchResults = await ytSearch(song_name);

    console.log(youtubeSearchResults);

    if (!youtubeSearchResults) {
        bot.sendMessage(msg.chat.id, "Sorry no results available for your song");
    }

    const videoUrl = youtubeSearchResults.url;
    const fileName = `${song_name}-${Date.now()}.mp3`;
    const filePath = path.join(__dirname, fileName);
    const webmFileName = `${song_name}-${Date.now()}.webm`;
    const webmFilePath = path.join(__dirname, webmFileName);

    bot.sendMessage(msg.chat.id, "Downloading your song please wait...");

    child_process.execFile("yt-dlp", [
        "-x", "--audio-format", "mp3",
        "--ffmpeg-location", "C:\\Users\\user\\Downloads\\ffmpeg-7.1.1-full_build\\ffmpeg-7.1.1-full_build\\bin", // <-- Adjust if your path differs
        "-o", filePath,
        videoUrl
    ], async (error, stdout, stderr) => {

        if (error) {
            console.error("yt-dlp error:", error);
            return bot.sendMessage(msg.chat.id, "❌ Failed to download audio.");
        }

        try {
            await bot.sendAudio(msg.chat.id, filePath, {
                title: youtubeSearchResults.title
            });

            // Delete file after sending
            fs.unlink(filePath, (err) => {
                if (err) console.error("Error deleting file:", err);
            });
            // fs.unlink(webmFilePath, (err) => {
            //     if (err) console.error("Error deleting file:", err);
            // });

        } catch (err) {
            console.error("Telegram sendAudio error:", err);
            bot.sendMessage(msg.chat.id, "❌ Failed to send audio.");
        }
    });
})