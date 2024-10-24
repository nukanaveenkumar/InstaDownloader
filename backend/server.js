const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Replace this with your actual RapidAPI key
const RAPIDAPI_KEY = "25aa127bd5msh69941c1792ca82ep110d1djsn7c8870674164";

app.post("/api/download", async (req, res) => {
    const instaUrl = req.body.videoUrl; // Corrected: Accessing videoUrl from request body
    const options = {
        method: 'GET',
        url: 'https://instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com/get-info-rapidapi',
        params: {
            url: instaUrl
        },
        headers: {
            'x-rapidapi-key': RAPIDAPI_KEY,
            'x-rapidapi-host': 'instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
        res.json(response.data); // Send the API response back to the client
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching data from Instagram API" });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
