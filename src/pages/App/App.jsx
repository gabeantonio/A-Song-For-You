import React, { useState } from "react";
import { Navigate, useNavigate, Route, Routes } from "react-router-dom";
import { MantineProvider, AppShell, Navbar, Header } from '@mantine/core';
import "./App.css";
import SignupPage from "../SignupPage/SignupPage";
import LoginPage from "../LoginPage/LoginPage";
import Timeline from "../Timeline/Timeline";
import userService from "../../utils/userService";
import ProfilePage from  "../ProfilePage/ProfilePage";
import Search from "../../components/Search";

function App() {

  const navigate = useNavigate();

  const [user, setUser] = useState(userService.getUser());

  function handleSignUpOrLogin() {
    setUser(userService.getUser()); 
  }

  function handleLogout() {
    userService.logout();
    setUser(null);
    navigate('/login');
  }

  if (user) {
    return (
      <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
        <Routes>
          <Route path="/" element={<Timeline loggedInUser={user} logout={handleLogout} />} />
          <Route path="/search" element={<Search />} />
          <Route
            path="/login"
            element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
          />
          <Route
            path="/signup"
            element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin} />}
          />
          <Route 
            path="/:username"
            element={<ProfilePage loggedInUser={user} logout={handleLogout} /> }
          />
        </Routes>
      </MantineProvider>
    );
  }

  return (
      <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
        <Routes>
          <Route
            path="/login"
            element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
          />
          <Route
            path="/signup"
            element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin} />}
          />
          <Route path="/*" element={<Navigate to="/login" />} />
        </Routes>
    </MantineProvider>
  );
}

export default App;
