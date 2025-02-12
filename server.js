const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
app.use(cors());

app.get("/", (req, res) => {
    res.send("Twitch Proxy is running!");
});

app.get("/twitch", async (req, res) => {
    try {
        const response = await fetch("https://api.twitch.tv/helix/streams?game_id=509658&language=ru", {
            headers: {
                "Client-ID": process.env.TWITCH_CLIENT_ID,
                "Authorization": `Bearer ${process.env.TWITCH_ACCESS_TOKEN}`
            }
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Ошибка при получении данных от Twitch API" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy работает на порту ${PORT}`));
