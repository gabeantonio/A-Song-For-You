import React, {useEffect, useState} from 'react';
import Header from '../../components/Header';
import AddPlaylist from '../../components/AddPlaylist';
import PlaylistFeed from '../../components/PlaylistFeed';
import * as postsAPI from '../../utils/postApi'; 
import { SimpleGrid } from '@mantine/core';
import { DEFAULT_THEME, LoadingOverlay } from '@mantine/core';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

export default function Timeline() {

    const [error, setError] = useState('');
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    async function handleAddPost(post) {
    
        try {
            console.log('CREATING POST!')
            const response = await postsAPI.create(post);
            console.log(response);
            setPosts([response.data, ...posts]);
            

        } catch(err) {
            console.log(err.message);
        } 
    }

    useEffect(() => {
        async function getPosts() {
            try {
                const response = await postsAPI.getAll();
                console.log(response, '<--- RESPONSE DATA');
                setPosts([...response.data]);
                setLoading(false);
            } catch(err) {
                console.log(err.message, "<--- ERROR in USE EFFECT");
                setLoading(false);
            }
        }
        getPosts()
    }, [])

    if (error) {
        return (
        <>
            <Header />
            <ErrorMessage error={error} />;
        </>
        );
    }

    const customLoader = (
        <svg
            width="54"
            height="54"
            viewBox="0 0 38 38"
            xmlns="http://www.w3.org/2000/svg"
            stroke={DEFAULT_THEME.colors.blue[6]}
        >
            <g fill="none" fillRule="evenodd">
            <g transform="translate(1 1)" strokeWidth="2">
                <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
                <path d="M36 18c0-9.94-8.06-18-18-18">
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 18 18"
                    to="360 18 18"
                    dur="1s"
                    repeatCount="indefinite"
                />
                </path>
            </g>
            </g>
        </svg>
    );

    if (loading) {
        return (
            <>
            <Header />
            <LoadingOverlay loader={customLoader} visible />
            </>
        )
    }

    return(

        <>
        <SimpleGrid cols={1} verticalSpacing="50">
            <div><Header /></div>
            <div style={{ margin: "0 35% 0 35%", maxWidth: 700 }}><AddPlaylist handleAddPost={handleAddPost} /></div>
            <div style={{ margin: "0 35% 5% 35%", maxWidth: 700 }}><PlaylistFeed posts={posts} /></div>
        </SimpleGrid>
        </>
        
    )
}