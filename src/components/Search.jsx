import React, {useState, useEffect} from 'react';
import { FileInput, Textarea, TextInput, Button, Modal, Group, SimpleGrid, Text, Image } from '@mantine/core';
import { useNavigate } from "react-router-dom";
import Header from './Header';
import * as geniusAPI from '../utils/geniusApi';
import { IconExternalLink } from '@tabler/icons';
import userService from '../utils/userService';


export default function AddPlaylist({handleAddPost}) {

const navigate = useNavigate()

const [state, setState] = useState({
    songName: '',
})

// let queryString = {q: state.songName}

// const axios = require("axios")
const [title, setTitle] = useState('');
const [songUrl, setSongUrl] = useState('');
const [lyricsUrl, setLyricsUrl] = useState('');
// const options = {
//     method: 'GET',
//     url: 'https://genius.p.rapidapi.com/search',
//     params: queryString,
//     headers: {
//     'X-RapidAPI-Key': '355f8f5ff2msh84cc656855492b7p1b752cjsn934e4aa88371',
//     'X-RapidAPI-Host': 'genius.p.rapidapi.com'
//     }
// };

// axios.request(options).then(function (response) {
//     // const songImage = response.data.response.hits[0].result.song_art_image_url;
//     setSongInfo(response.data.response.hits[0].result)
//     // console.log(songInfo);
    
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



async function handleSubmit(e) {
    e.preventDefault();
    // geniusAPI.getSong(state.songName)
    const response = await geniusAPI.getSong(state.songName);
    console.log(response.data, '<--- RESPONSE DATA');
    setTitle(response.data.fullTitle)
    setSongUrl(response.data.songImage)
    setLyricsUrl(response.data.lyricsUrl);
}

const geniusUrl = `${lyricsUrl}`;

const [user, setUser] = useState(userService.getUser());


function handleChange(e) {
    setState({
        ...state,
        [e.target.name]: e.target.value
    })
}

function handleLogout() {
    userService.logout();
    setUser(null);
    navigate('/login');
}

    return(

        <>
        <SimpleGrid col={3}>
            <Header logout={handleLogout}/>
        <div style={{margin: '5% 40% 0 40%'}}>
        <form autoComplete="off" onSubmit={handleSubmit}>
        
            <TextInput
                style={{maxWidth: 350}}
                label="Search Song"
                className="form-one"
                name="songName"
                value={state.songName}
                onChange={handleChange}
                required
                withAsterisk
                placeholder="Song Title"
            />
            
            <br />

            <div>
            <Button
                type="submit"
                className='button'
                onClick={handleSubmit}
            >
            Search 
            </Button>
            </div>

            <br />

            </form>

            <div style={{maxWidth: 600}}>    
            <Image
                radius="md"
                src={songUrl}
                caption={title}
            />
            </div>

            <br />

            <div>
            <Button component="a" href={geniusUrl} variant="outline" leftIcon={<IconExternalLink size={14} />}>
                Lyrics on Genius
            </Button>
            </div>

            </div>
            </SimpleGrid>
        </>
    )
}