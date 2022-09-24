import React from 'react';
import Header from '../../components/Header';
import AddPlaylist from '../../components/AddPlaylist';
import PlaylistFeed from '../../components/PlaylistFeed';
import { Grid } from '@mantine/core';
import { SimpleGrid } from '@mantine/core';
import { Center } from '@mantine/core';

export default function Timeline() {
    return(
        <>
        
        <SimpleGrid cols={1} verticalSpacing="xl">
            <div><Header /></div>
            <div style={{ margin: "0 35% 0 35%", maxWidth: 450 }}><AddPlaylist /></div>
            <div style={{ margin: "0 35% 0 35%", maxWidth: 450 }}><PlaylistFeed /></div>
        </SimpleGrid>
        </>
        
    )
}