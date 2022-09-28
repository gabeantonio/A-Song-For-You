import React from 'react';
import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons';
import { createStyles, Header, Container, Text, Button } from '@mantine/core';
import { Link, useNavigate } from "react-router-dom";
// import { HomeSignal } from 'tabler-icons-react';


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



export default function HeaderMenuColored({loggedInUser, logout}) {
    const { classes } = useStyles();
    const navigate = useNavigate();


    function toProfile() {
        const profileUrl = `/${loggedInUser.username}`;
        navigate(`${profileUrl}`)
    }
    
    function toHome() {
        navigate('/')
    }

    return (
        <Header height={40} className={classes.header}>
            <nav>
                <Button onClick={logout}>Logout</Button>
                <Button onClick={toProfile}>Profile</Button>
                <Button onClick={toHome}>Home</Button>
            </nav>
        </Header>
    );
}