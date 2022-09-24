import React from 'react';

import { createStyles, Paper, Text, Title, Button } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  card: {
    height: 440,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
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



export default function ArticleCardImage() {
  const { classes } = useStyles();

  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      sx={{ backgroundImage: `url(https://images.unsplash.com/photo-1577398577097-0ef7f248f0a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTN8fGdyZWVuJTIwbGlnaHR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60)` }}
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