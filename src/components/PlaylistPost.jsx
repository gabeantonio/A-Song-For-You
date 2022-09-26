import React from 'react';

import { createStyles, Paper, Text, Title, Button, BackgroundImage } from '@mantine/core';

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
            Testing
        </Text>
        <Title order={3} className={classes.title}>
            Card
        </Title>
        </div>
        <Button variant="white" color="dark">
        Read article
        </Button>

    </Paper>
);
}