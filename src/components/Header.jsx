import React from 'react';

import { createStyles, Header, Container } from '@mantine/core';



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
            This is the Header!
        </Container>
    </Header>
    );
}