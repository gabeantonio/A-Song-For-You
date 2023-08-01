import React, {useState} from 'react';
import { createStyles, Paper, Text, Title, Button, Modal, Group, ActionIcon, Indicator, SimpleGrid } from '@mantine/core';
import { IconHeart } from '@tabler/icons';
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
card: {
    height: 440,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    margin: '40px 0 0 0'
},

title: {
    fontFamily: `Greycliff CF ${theme.fontFamily}`,
    fontWeight: 900,
    color: theme.white,
    lineHeight: 1.2,
    fontSize: 32,
    marginTop: theme.spacing.xs,
},

category: {
    color: theme.white,
    opacity: 0.7,
    fontWeight: 700,
    textTransform: 'uppercase',
},
}));




export default function PlaylistPost({post, addLike, removeLike, loggedInUser, deletePost }) {
    const { classes } = useStyles();
    const [opened, setOpened] = useState(false);
    const profileUrl = `/${post.user.username}`;
    const likeCount = post.likes.length
    const likedIndex = post.likes.findIndex(
        (like) => like.username === loggedInUser.username);
    const likeColor = likedIndex > -1 ? 'red' : 'grey'
    const clickHandler =
    likedIndex > -1
        ? () => removeLike(post.likes[likedIndex]._id)  
        : () => addLike(post._id);
    return (
        <>
        
    <Paper
        shadow="md"
        p="xl"
        radius="xl"
        sx={{ backgroundImage: `url(${post.photoUrl})` }} // Maybe put a ? after post.
        className={classes.card}
        >
        
        <div>
        <Link to={profileUrl}>
        <Text className={classes.category} size="xs">
            {post.user.username}
        </Text>
        </Link>        
        <Title order={3} className={classes.title}>
            {post.playlistName}
        </Title>
        
        </div>

        <Modal
        opened={opened}
        centered
        onClose={() => setOpened(false)}
        title={post.playlistName} 
        overflow="inside"
        >
        {post.tracklist}        
        </Modal>

        
        <SimpleGrid>
        <div>
        <Group>
        <Indicator label={likeCount}  inline size={15} >
        <ActionIcon>
            <IconHeart size={100} color={likeColor} stroke={1.5} onClick={clickHandler} />
        </ActionIcon>
        </Indicator>
        </Group>
        </div>


        <div>
        <Group>
        <Button onClick={() => setOpened(true)}>View Tracklist</Button>
        </Group>
        </div>
        </SimpleGrid>

    </Paper>
    </>
);
}
