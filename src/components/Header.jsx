import React from 'react';

import { createStyles, Header, Menu, Group, Center, Burger, Container } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown } from '@tabler/icons';


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
            <div className={classes.inner}>
            <Group spacing={5} className={classes.links}>
            
            </Group>
            </div>
        </Container>
    </Header>
    );
}