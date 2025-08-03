# 🎵 Telegram Music Bot

A Telegram bot that lets you play music directly by sending a `/play <song name>` command. It uses the YouTube Data API to search for songs and `yt-dlp` to download and extract the audio.

---

## 🚀 Features

- 🔍 Search YouTube using song names
- 🎧 Download audio in `.mp3` format
- 📤 Sends audio files directly to the chat
- 🧹 Automatically deletes temporary files after sending

---

## 🧰 Tech Stack

- **Node.js**
- **[node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api)**
- **[yt-dlp](https://github.com/yt-dlp/yt-dlp)**
- **Google YouTube Data API v3**
- **FFmpeg**

---

## 🛠️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/sharmavasant/music-bot.git
cd music-bot
````

### 2. Install dependencies

```bash
npm install
```

### 3. Set up `.env` file

Create a `.env` file in the root directory with the following content:

```env
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
YOUTUBE_API_KEY=your_youtube_api_key
FFMPEG_PATH=full_path_to_ffmpeg_bin_directory
```

Example for Windows:

```env
FFMPEG_PATH=C:\Users\yourname\Downloads\ffmpeg\bin
```

Make sure the path points to the folder where `ffmpeg.exe` exists.

---

## ▶️ Run the Bot

```bash
node index.js
```

---

## 💬 How to Use

On Telegram, send:

```
/play <song name>
```

Example:

```
/play tum hi ho
```

The bot will:

1. Search YouTube for the song
2. Download audio via `yt-dlp`
3. Convert it to MP3
4. Send it back to you

---

## 🧹 Auto Cleanup

The bot automatically deletes temporary `.mp3` and `.webm` files after the audio has been sent, so your local folder remains clean.

---

## 📁 File Structure

```
music-bot/
├── index.js          # Main bot logic
├── .env              # Environment variables (DO NOT COMMIT)
├── package.json
└── README.md
```

---

## 📜 License

This project is open-source and free to use for personal or educational purposes.

---

## 🙋‍♂️ Author

**Vasant Kumar Sharma**
🔗 [GitHub](https://github.com/sharmavasant)


