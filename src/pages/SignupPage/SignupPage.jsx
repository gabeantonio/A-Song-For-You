import React, { useState } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import userService from "../../utils/userService";
import { useNavigate } from "react-router-dom";
import { Route, Routes, Link, Navigate } from "react-router-dom";
import {
    Paper,
    createStyles,
    TextInput,
    PasswordInput,
    Button,
    Title,
    Text,
    Anchor,
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
    wrapper: {
        minHeight: 900,
        backgroundSize: 'cover',
        backgroundImage:
        'url(https://images.unsplash.com/photo-1601066525716-3cca33c6d4c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)',
    },

    form: {
        borderRight: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
        }`,
        minHeight: 900,
        maxWidth: 450,
        paddingTop: 80,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
        maxWidth: '100%',
        },
    },

    title: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },

    logo: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        width: 120,
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
}));

export default function SignUp() {

    const { classes } = useStyles();

    function handleSubmit(e) {
        e.preventDefault();
        console.log('Test');
    }

    function handleChange(e) {
        console.log('Test');
    }

    return (

    <div className={classes.wrapper}>

        <form onSubmit={handleSubmit}>
        <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} align="center" mt="md" mb={50}>
            Create An Account
        </Title>

            <TextInput name="username" placeholder="hello@gmail.com" value="" onChange={handleChange} required label="Username" size="md" />

            <br />

            <TextInput type="email" name="email" placeholder="hello@gmail.com" value="" onChange={handleChange} required label="Email Address"  size="md" />

            <PasswordInput type="password" name="password" placeholder="Password" value="" onChange={handleChange} required label="Password" mt="md" size="md" />

            <PasswordInput type="password" name="passwordConf" placeholder="Confirm Password" value="" onChange={handleChange} required label="Password Confirmation" mt="md" size="md" />

            <Button type="submit" fullWidth mt="xl" size="md">
            Sign Up
            </Button>

            <Text align="center" mt="md">
            Already have an account?{' '}
            <Link to="/">Log In</Link>
            </Text>

        </Paper>
        </form>
    </div>
    
    );
}