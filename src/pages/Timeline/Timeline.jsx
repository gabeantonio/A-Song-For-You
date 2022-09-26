import React, {useEffect, useState} from 'react';
import Header from '../../components/Header';
import AddPlaylist from '../../components/AddPlaylist';
import PlaylistFeed from '../../components/PlaylistFeed';
import * as postsAPI from '../../utils/postApi'; 
import { SimpleGrid } from '@mantine/core';


export default function Timeline() {

    const [posts, setPosts] = useState([]);

    async function handleAddPost(post) {
    
        try {
            console.log('CREATING POST!')
            const response = await postsAPI.create(post);
            console.log(response);
            setPosts([response.data, ...posts])

        } catch(err) {
            console.log(err.message);
        } 
    }

    useEffect(() => {
        async function getPosts() {
            try {
                const response = await postsAPI.getAll();
                console.log(response, '<--- RESPONSE DATA');
                setPosts([...response.data])
            } catch(err) {
                console.log(err.message, "<--- ERROR in USE EFFECT");
            }
        }
        getPosts()
    }, [])


    return(

        <>
        <SimpleGrid cols={1} verticalSpacing="50">
            <div><Header /></div>
            <div style={{ margin: "0 35% 0 35%", maxWidth: 600 }}><AddPlaylist handleAddPost={handleAddPost} /></div>
            <div style={{ margin: "0 35% 5% 35%", maxWidth: 600 }}><PlaylistFeed posts={posts}/></div>
        </SimpleGrid>
        </>
        
    )
}