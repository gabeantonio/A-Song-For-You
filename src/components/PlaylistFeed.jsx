import React from 'react';
import PlaylistPost from './PlaylistPost';

export default function PlaylistFeed({posts}) {
    return(
        <>
        {posts.map((post) => {
            return <PlaylistPost  post={post} key={post._id} />
        })}
        
        </>
    )
}