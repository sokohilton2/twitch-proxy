const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());

app.get("/twitch", async (req, res) => {
    try {
        const response = await fetch("https://api.twitch.tv/helix/streams?game_id=509658&language=ru", {
            headers: {
                "Client-ID": "b8gm3ocj4zuniuakjlbb3yhje7v98q",
                "Authorization": "Bearer hqdqjbl7ongdzbylz33zo2zx5np99r"
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
