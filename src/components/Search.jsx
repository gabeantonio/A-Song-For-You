import React, {useState, useEffect} from 'react';
import { FileInput, Textarea, TextInput, Button, Modal, Group, SimpleGrid, Text, Image } from '@mantine/core';
import { useNavigate } from "react-router-dom";
import Header from './Header';


export default function AddPlaylist({handleAddPost}) {

const navigate = useNavigate()

const RAPID_API_KEY = process.env.RAPID_API_KEY // NOT WORKING!

const [state, setState] = useState({
    songName: '',
})

let queryString = {q: state.songName}

const axios = require("axios")
const [songInfo, setSongInfo] = useState({});

const options = {
    method: 'GET',
    url: 'https://genius.p.rapidapi.com/search',
    params: queryString,
    headers: {
    'X-RapidAPI-Key': '355f8f5ff2msh84cc656855492b7p1b752cjsn934e4aa88371',
    'X-RapidAPI-Host': 'genius.p.rapidapi.com'
    }
};

function handleSubmit(e) {
    e.preventDefault();

    axios.request(options).then(function (response) {
        // const songImage = response.data.response.hits[0].result.song_art_image_url;
        setSongInfo(response.data.response.hits[0].result)
        // console.log(songInfo);
        
        const optionsTwo = {
            method: 'GET',
            url: `https://genius.p.rapidapi.com/songs/${response.data.response.hits[0].result.id}`,
            headers: {
            'X-RapidAPI-Key': '355f8f5ff2msh84cc656855492b7p1b752cjsn934e4aa88371',
            'X-RapidAPI-Host': 'genius.p.rapidapi.com'
            }
        }
        
        axios.request(optionsTwo).then(function (response) {
            console.log(response);
        })
    
        
    }).catch(function (error) {
        console.error(error);
    });
}

function handleChange(e) {
    setState({
        ...state,
        [e.target.name]: e.target.value
    })
}

    return(

        <>
        <SimpleGrid col={3}>
            <Header />
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

            <div style={{margin: '0 35% 0 35%'}}>
            <Button
                type="submit"
                className='button'
                onClick={handleSubmit}
            >
            Search 
            </Button>
            </div>

            <br />

            <div>    
            <Image
                radius="md"
                src={songInfo.song_art_image_url}
                caption={songInfo.full_title}
            />
            </div>

            </form>

            </div>
            </SimpleGrid>
        </>
    )
}