const express = require("express");
const axios = require("axios");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

// Weather API route
app.get("/weather", async (req, res) => {
    const city = req.query.city;

    try {
        const response = await axios.get(
            `https://api.weatherapi.com/v1/current.json?key=${process.env.API_KEY}&q=${city}`
        );

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch weather" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});