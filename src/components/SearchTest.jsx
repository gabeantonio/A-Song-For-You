import React, {useState} from 'react';
import { FileInput, Textarea, TextInput, Button, Modal, Group } from '@mantine/core';
import { useNavigate } from "react-router-dom";
import { IconSearch } from '@tabler/icons';

export default function AddPlaylist({handleAddPost}) {

const navigate = useNavigate()

const [state, setState] = useState({
    songName: '',
})

let query = {q: state.songName}

    const axios = require("axios")

    const options = {
        method: 'GET',
        url: 'https://genius.p.rapidapi.com/search',
        params: query,
        headers: {
        'X-RapidAPI-Key': '355f8f5ff2msh84cc656855492b7p1b752cjsn934e4aa88371',
        'X-RapidAPI-Host': 'genius.p.rapidapi.com'
        }
    };

function handleSubmit(e) {
    e.preventDefault();

    axios.request(options).then(function (response) {
        console.log(response.data);
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
        <form autoComplete="off" onSubmit={handleSubmit}>

            <TextInput
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

            <Button
                type="submit"
                className='button'
                onClick={handleSubmit}
            >
            Search 
            </Button>

            </form>

    
    </>
    )
}