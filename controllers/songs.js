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
            url: 'https://genius.p.rapidapi.com/search',
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
        console.log(songData.data.response.hits[0].result, '<----- LOOK HERE');
        res.status(200).json({data:{
            fullTitle: fullTitle,
            songImage: songImage
        }});
        // const optionsTwo = {
        //     method: 'GET',
        //     url: `https://genius.p.rapidapi.com/songs/${response.data.response.hits[0].result.id}`,
        //     headers: {
        //     'X-RapidAPI-Key': `${RAPID_API_KEY}`,
        //     'X-RapidAPI-Host': `${RAPID_API_HOST}`
        //     }
        // }
        
        // axios.request(optionsTwo).then(function (response) {
        //     console.log(response, '<----SECOND RESPONSE');
        //     console.log(response.data.response.song.media[1].url, '<---- SECOND RESPONSE DATA')
        //     const videoLink = response.data.response.song.media[1].url;
        //     res.status(200).json({data:{videoLink: videoLink}});
        // })
    })


    } catch(err) {
        console.log(err.message, '<---- ERROR IN SONG CONTROLLER');
        res.status(400).json({error: 'Something went wrong in the SONG Controller!'});
    }
}



//     axios.request(options).then(function (response) {

//     console.log(response);

//     const optionsTwo = {
//         method: 'GET',
//         url: `https://genius.p.rapidapi.com/songs/${response.data.response.hits[0].result.id}`,
//         headers: {
//         'X-RapidAPI-Key': '355f8f5ff2msh84cc656855492b7p1b752cjsn934e4aa88371',
//         'X-RapidAPI-Host': 'genius.p.rapidapi.com'
//         }
//     }
    
//     axios.request(optionsTwo).then(function (response) {
//         console.log(response, '<----SECOND RESPONSE');
//     })

    
// }).catch(function (error) {
//     console.error(error);
// });