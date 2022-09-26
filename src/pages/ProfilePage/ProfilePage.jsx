import React, {useState, useEffect} from 'react';
import Header from '../../components/Header';
import ProfilePostDisplay from '../../components/ProfilePostDisplay';
import userService from '../../utils/userService';
import { SimpleGrid } from '@mantine/core';
import { useParams } from 'react-router-dom';


export default function ProfilePage() {

    const { username } = useParams();

    useEffect(() => {
        async function getProfile() {
            try {
                const response = await userService.getProfile(username);
                console.log(response, '<--- OUR DATA')
            } catch(err) {
                console.log(err.message)
            }
        }
        getProfile();
    }, [username])



    return (
        <>
        <SimpleGrid cols={1} verticalSpacing="50">
            <div><Header /></div>
            <div style={{ margin: "0 35% 5% 35%", maxWidth: 700 }}><ProfilePostDisplay /></div>
        </SimpleGrid>
        </>
    )
}