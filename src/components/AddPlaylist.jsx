import React, {useState} from 'react';
import { FileInput, Textarea, TextInput, Button } from '@mantine/core';

export default function AddPlaylist({handleAddPost}) {

const [state, setState] = useState({
    playlistName: '',
    tracklist: ''
})

const [selectedCover, setSelectedCover] = useState('');


function handleFileInput(e) {
    setSelectedCover(e)
    console.log(e);
}

function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('cover', selectedCover);
    for (let key in state) {
        formData.append(key, state[key]);
    }
    handleAddPost(formData);
}

function handleChange(e) {
    setState({
        ...state,
        [e.target.name]: e.target.value
    })
}


    return(
        
    <form autoComplete="off" onSubmit={handleSubmit}>

        <TextInput
            label="What is your Playlist called?"
            className="form-one"
            name="playlistName"
            value={state.playlistName}
            onChange={handleChange}
            required
            withAsterisk
            placeholder="Playlist Title"
        />

        <br />

        <FileInput
            placeholder="Choose File"
            className="form-control"
            name="playlist-cover"
            type="file"
            onChange={handleFileInput}
            label="Playlist Cover"
            required
            withAsterisk
        />

        <br />

        <Textarea
            className="form"
            name="tracklist"
            value={state.tracklist}
            placeholder="Enter Tracklist"
            onChange={handleChange}
            label="Your Playlist's Tracklist:"
            autosize
            required
            withAsterisk
        />

        <br/>

        <Button
            type="submit"
            className='button'
        >
            Post Playlist
        </Button>

    </form>
    
    )
}