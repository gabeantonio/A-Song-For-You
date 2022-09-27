import React from 'react';
import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons';
import { createStyles, Header, Container, Text } from '@mantine/core';



const useStyles = createStyles((theme) => ({
header: {
    backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
    borderBottom: 0,
},

inner: {
    height: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
},

}));



export default function HeaderMenuColored() {
    const { classes } = useStyles();


    return (
        <Header height={70} className={classes.header}>
        <Container>
        <Text size="xl">Medley In Love</Text>
        </Container>
    </Header>
    );
}