import React, {useState} from 'react';
import { FileInput, Textarea, TextInput, Button, Modal, Group } from '@mantine/core';
import { useNavigate } from "react-router-dom";
import { IconSearch } from '@tabler/icons';

export default function AddPlaylist({handleAddPost}) {

const navigate = useNavigate()

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
    navigate('/');
}

function handleChange(e) {
    setState({
        ...state,
        [e.target.name]: e.target.value
    })
}

const [opened, setOpened] = useState(false); // For MODAL. 

    return(
        <>

        <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            size="55%"
            centered
            title="Share a Playlist"
            overlayOpacity={0.55}
            overlayBlur={3}
        >
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
            
            <br/>

            <Button
                type="submit"
                className='button'
            >
            Post Playlist
            </Button>

            </form>


        </Modal>

        <Group position="center">
            <Button onClick={() => setOpened(true)}>Share a New Playlist</Button>
        </Group>
    
    </>
    )
}