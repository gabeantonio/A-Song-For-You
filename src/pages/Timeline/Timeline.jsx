import React, {useEffect, useState} from 'react';
import Header from '../../components/Header';
import AddPlaylist from '../../components/AddPlaylist';
import PlaylistFeed from '../../components/PlaylistFeed';
import * as postsAPI from '../../utils/postApi'; 
import * as likesAPI from '../../utils/likesApi';
import { SimpleGrid, Title } from '@mantine/core';
import { DEFAULT_THEME, LoadingOverlay } from '@mantine/core';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

export default function Timeline({loggedInUser, logout}) {

    const [error, setError] = useState('');
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    async function addLike(postId) {
        try {
            const response = await likesAPI.create(postId);
            getPosts();
        } catch(err) {
        }
    }

    async function removeLike(likeId) {
        try {
            const response = await likesAPI.removeLike(likeId);
            getPosts();
        } catch (err) {
            console.log(err);
        }
        }

    async function handleDeletePost(postId) {
        try {
            const response = await postsAPI.deletePost(postId);
        } catch(err) {
            setError("Error in deleting post!");
        }
    }


    async function handleAddPost(post) {
        try {
            const response = await postsAPI.create(post);
            setPosts([...posts, response.data]);
            

        } catch(err) {
            console.log(err.message);
        } 
    }

    async function getPosts() {
        try {
            const response = await postsAPI.getAll();
            setPosts([...response.data]);
            setLoading(false);
        } catch(err) {
            setLoading(false);
        }
    }
    
        useEffect(() => {
        
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
                <div><Header loggedInUser={loggedInUser} logout={logout} /><Title italic order={1}> Welcome, {loggedInUser.username}.</Title></div>
                <div style={{ margin: "0 35% 0 35%", maxWidth: 700 }}><AddPlaylist handleAddPost={handleAddPost} /></div>
                <div style={{ margin: "0 5% 5% 25%", maxWidth: 800, minWidth: 300 }}><PlaylistFeed loggedInUser={loggedInUser} posts={posts} addLike={addLike} removeLike={removeLike} deletePost={handleDeletePost} /></div>
            </SimpleGrid>
        </>
        
    )
}