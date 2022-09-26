import React, {useState, useEffect} from 'react';
import Header from '../../components/Header';
import ProfileFeed from '../../components/ProfileFeed';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import userService from '../../utils/userService';
import { SimpleGrid } from '@mantine/core';
import { useParams } from 'react-router-dom';


export default function ProfilePage() {

    const [posts, setPosts] = useState([]);
    const [profileUser, setProfileUser] = useState({});
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('');

    const { username } = useParams();



    useEffect(() => {
        async function getProfile() {
            try {
                const response = await userService.getProfile(username);
                setLoading(false)
                setProfileUser(response.data.user);
                setPosts(response.data.posts);
                console.log(response, '<--- OUR DATA')
            } catch(err) {
                console.log(err.message);
                setError('Profile does not exist!')
            }
        }
        getProfile();
    }, [username])

    if(error){
        return (
            <>
            <Header />
            <ErrorMessage error={error} />
            </>
        )
    }

    if (loading) {
        return (
            <>
            <Header />
            <h1>Loading...</h1>
            </>
        )
    }





    return (
        <>
        <SimpleGrid cols={1} spacing="50" verticalSpacing="50">
            <div><Header /></div>
            <div style={{ margin: "0 0 5% 25%", maxWidth: 700 }}><ProfileFeed posts={posts} /></div>
        </SimpleGrid>
        </>
    )
}