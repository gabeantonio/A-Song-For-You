import React, {useState} from 'react';
import { createStyles, Paper, Text, Title, Button, Modal, Group, ActionIcon, Indicator } from '@mantine/core';
import { IconHeart } from '@tabler/icons';

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




export default function ProfilePosts({post, loggedInUser, addLike, removeLike}) {
    
    const { classes } = useStyles();
    const [opened, setOpened] = useState(false);
    const likeCount = post.likes.length
    const likedIndex = post.likes.findIndex(
        (like) => like.username === loggedInUser.username);
    console.log(likedIndex, '<----- LIKED INDEX')
    const likeColor = likedIndex > -1 ? 'red' : 'grey'
    const clickHandler =
    likedIndex > -1
        ? () => removeLike(post.likes[likedIndex]._id)  
        : () => addLike(post._id);

    return (
    <Paper
        shadow="md"
        p="xl"
        radius="xl"
        sx={{ backgroundImage: `url(${post.photoUrl})` }}
        className={classes.card}
        >
        
        <div>
        <Text className={classes.category} size="xs">
            {post.user.username}
        </Text>
        <Title order={3} className={classes.title}>
            {post.playlistName}
        </Title>
        </div>

        <Modal
        opened={opened}
        centered
        overlayOpacity={0.55}
        overlayBlur={3}
        onClose={() => setOpened(false)}
        title={post.playlistName} 
        >
        {post.tracklist}
        </Modal>

        <div style={{margin: '95% 0 0 0' }}>
        <Group>
        <Button onClick={() => setOpened(true)}>View Tracklist</Button>
        </Group>
        </div>

        <div style={{margin: '-10% 0 0 90%'}}>
        <Indicator label={likeCount} overflowCount={10} inline size={15} >
        <ActionIcon>
            <IconHeart size={100} color={likeColor} stroke={1.5} onClick={clickHandler} />
        </ActionIcon>
        </Indicator>
        </div>
    </Paper>
);
}