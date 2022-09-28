import React from 'react';
import PlaylistPost from './PlaylistPost';

export default function PlaylistFeed({posts, addLike, removeLike, loggedInUser, deletePost}) {
    return(
        <>
        {posts.map((post) => {
            return <PlaylistPost loggedInUser={loggedInUser} post={post} key={post._id} addLike={addLike} removeLike={removeLike} deletePost={deletePost}/>
        })}
        
        </>
    )
}