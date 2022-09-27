import React, {useState, useEffect} from 'react';
import Header from '../../components/Header';
import ProfileFeed from '../../components/ProfileFeed';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import userService from '../../utils/userService';
import * as likesAPI from '../../utils/likesApi';
import { SimpleGrid } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { DEFAULT_THEME, LoadingOverlay } from '@mantine/core';

export default function ProfilePage({loggedInUser}) {

    const [posts, setPosts] = useState([]);
    const [profileUser, setProfileUser] = useState({});
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('');

    const { username } = useParams();

    async function addLike(postId) {
        try {
            const response = await likesAPI.create(postId);
            console.log(response, '<--- THE RESPONSE FROM ADD LIKE!');
            getProfile();
        } catch(err) {
            console.log(err, '<--- THE ERROR FROM THE SERVER!')
        }
    }

    async function removeLike(likeId) {
        try {
            const response = await likesAPI.removeLike(likeId);
            console.log(response, 'REMOVED LIKE');
            getProfile();
        } catch (err) {
            console.log(err);
            setError("Error in removing like!");
        }
        }

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

    useEffect(() => {
        
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





    return (
        <>
        <SimpleGrid cols={1} spacing="50" verticalSpacing="50">
            <div><Header /></div>
            <div style={{ margin: "0 0 5% 25%", maxWidth: 700 }}><ProfileFeed loggedInUser={loggedInUser} posts={posts} addLike={addLike} removeLike={removeLike} /></div>
        </SimpleGrid>
        </>
    )
}