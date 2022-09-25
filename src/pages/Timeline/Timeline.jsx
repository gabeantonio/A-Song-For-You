import React, {useState} from 'react';
import Header from '../../components/Header';
import AddPlaylist from '../../components/AddPlaylist';
import PlaylistFeed from '../../components/PlaylistFeed';
import * as postsAPI from '../../utils/postApi'; 
import { SimpleGrid } from '@mantine/core';


export default function Timeline() {

    const [posts, setPosts] = useState([]);

    async function handleAddPost(post) {
    
        try {
            const response = await postsAPI.create(post);
            console.log(response);

        } catch(err) {
            console.log(err.message);
        } 

    }


    return(

        <>
        <SimpleGrid cols={1} verticalSpacing="xl">
            <div><Header /></div>
            <div style={{ margin: "0 35% 0 35%", maxWidth: 450 }}><AddPlaylist handleAddPost={handleAddPost} /></div>
            <div style={{ margin: "0 35% 0 35%", maxWidth: 450 }}><PlaylistFeed /></div>
        </SimpleGrid>
        </>
        
    )
}