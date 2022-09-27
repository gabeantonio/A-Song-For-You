import React from 'react';
import ProfilePost from './ProfilePost';
import { SimpleGrid } from '@mantine/core';

export default function ProfileFeed({posts, loggedInUser, addLike, removeLike}) {
    return(
        <>
        <SimpleGrid cols={2}>
            {posts.map((post) => {
            return <ProfilePost loggedInUser={loggedInUser} post={post} key={post._id} addLike={addLike} removeLike={removeLike} />
        })}
        </SimpleGrid>
        </>
    )
}