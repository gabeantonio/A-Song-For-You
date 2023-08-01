import React from 'react';
import PlaylistPost from './PlaylistPost';
import { SimpleGrid } from '@mantine/core';

export default function PlaylistFeed({posts, addLike, removeLike, loggedInUser, deletePost}) {
    return(
        <>
        <SimpleGrid cols={2}>
        {posts.map((post) => {
            return <PlaylistPost 
            loggedInUser={loggedInUser} 
            post={post} key={post._id} 
            addLike={addLike} 
            removeLike={removeLike} 
            deletePost={deletePost}/>
        })}
        </SimpleGrid>
        </>
    )
}