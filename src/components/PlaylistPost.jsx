import React, {useState} from 'react';
import { createStyles, Paper, Text, Title, Button, Modal, Group } from '@mantine/core';
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




export default function ArticleCardImage({post}) {

    const { classes } = useStyles();
    const [opened, setOpened] = useState(false);
    const profileUrl = `/${post.user.username}`;

    return (
        <>
    <Paper
        shadow="md"
        p="xl"
        radius="xl"
        sx={{ backgroundImage: `url(${post.photoUrl})` }}
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

        <Group>
        <Button onClick={() => setOpened(true)}>View Tracklist</Button>
        </Group>
    </Paper>
    </>
);
}