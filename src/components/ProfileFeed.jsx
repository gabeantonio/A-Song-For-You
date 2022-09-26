import React from 'react';
import ProfilePost from './ProfilePost';
import { SimpleGrid } from '@mantine/core';

export default function ProfileFeed({posts}) {
    return(
        <>
        <SimpleGrid cols={2}>
            {posts.map((post) => {
            return <ProfilePost post={post} key={post._id} />
        })}
        </SimpleGrid>
        </>
    )
}