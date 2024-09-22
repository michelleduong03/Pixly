import  { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import HomePage from 'scenes/homepage';
import ProfilePage from 'scenes/profilePage';
import LoginPage from 'scenes/loginPage';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import  { createTheme } from '@mui/material/styles';
import { themeSettings } from './theme';



function App() {
  const mode =  useSelector ((state) => state.mode); // grabbing mode from our state 
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]); // setup our theme
  const isAuth = Boolean(useSelector((state) => state.token)); // if token exists, user is authorized

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path = "/" element={<LoginPage />}/>  
            <Route path = "/home" element={ isAuth ? <HomePage /> : <Navigate to="/" />}/>  
            <Route path = "/profile/:userId" element={ isAuth ? <ProfilePage /> : <Navigate to="/" />}/>  
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
