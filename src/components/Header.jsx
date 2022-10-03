import React from 'react';
import { createStyles, Header, Button, Menu } from '@mantine/core';
import { useNavigate } from "react-router-dom";


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

    function toSearch() {
        navigate('/search')
    }

    return (
        <Header height={40} className={classes.header}>
            <nav>
                <Button onClick={logout}>Logout</Button>
                <Button onClick={toProfile}>Profile</Button>
                <Button onClick={toHome}>Home</Button>
                <Menu shadow="md" width={200}>
                    <Menu.Target>
                        <Button>Actions</Button>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Label>Application</Menu.Label>
                            <Menu.Item onClick={toSearch}>
                                Song Search
                            </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </nav>
        </Header>
    );
}