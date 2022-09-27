import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { MantineProvider, Text } from '@mantine/core';
import "./App.css";
import SignupPage from "../SignupPage/SignupPage";
import LoginPage from "../LoginPage/LoginPage";
import Timeline from "../Timeline/Timeline";
import userService from "../../utils/userService";
import ProfilePage from  "../ProfilePage/ProfilePage";

function App() {
  const [user, setUser] = useState(userService.getUser()); 
  function handleSignUpOrLogin() {
    setUser(userService.getUser()); 
  }

  function handleLogout() {
    userService.logout();
    setUser(null);
  }

  if (user) {
    return (
      <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
      <Routes>
        <Route path="/" element={<Timeline loggedInUser={user} />} />
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
          element={<ProfilePage loggedInUser={user} /> }
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
