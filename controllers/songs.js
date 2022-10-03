const axios = require("axios");


module.exports = {
    get: getSong
}

const RAPID_API_KEY = process.env.RAPID_API_KEY;
const RAPID_API_HOST = process.env.RAPID_API_HOST;


async function getSong(req,res) {
    try {
        const songName = req.params.songName

        const options = {
            method: 'GET',
            url: 'https://genius-song-lyrics1.p.rapidapi.com/search',
            params: {q: `${songName}`},
            headers: {
                'X-RapidAPI-Key': `${RAPID_API_KEY}`,
                'X-RapidAPI-Host': `${RAPID_API_HOST}`
            }
        };
        
    axios.request(options).then(function (response, body) {
        const songData = response;
        const fullTitle = songData.data.response.hits[0].result.full_title;
        const songImage = songData.data.response.hits[0].result.song_art_image_url;
        const lyricsUrl = songData.data.response.hits[0].result.url;
        console.log(songData.data.response.hits[0].result.url, '<----- LOOK HERE');
        res.status(200).json({data:{
            fullTitle: fullTitle,
            songImage: songImage,
            lyricsUrl: lyricsUrl
        }});
    })


    } catch(err) {
        console.log(err.message, '<---- ERROR IN SONG CONTROLLER');
        res.status(400).json({error: 'Something went wrong in the SONG Controller!'});
    }
}
