import React, {useState} from 'react';
import { TextInput, Button, SimpleGrid, Image } from '@mantine/core';
import { useNavigate } from "react-router-dom";
import Header from './Header';
import * as geniusAPI from '../utils/geniusApi';
import { IconExternalLink } from '@tabler/icons';
import userService from '../utils/userService';


export default function AddPlaylist({handleAddPost}) {

const navigate = useNavigate();
const [state, setState] = useState({
    songName: '',
});
const [title, setTitle] = useState('');
const [songUrl, setSongUrl] = useState('');
const [lyricsUrl, setLyricsUrl] = useState('');
const [user, setUser] = useState(userService.getUser());
const geniusUrl = `${lyricsUrl}`;

async function handleSubmit(e) {
    e.preventDefault();
    const response = await geniusAPI.getSong(state.songName);
    setTitle(response.data.fullTitle)
    setSongUrl(response.data.songImage)
    setLyricsUrl(response.data.lyricsUrl);
}

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