import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { UserContext } from '../services/authProvider';
import { useTeamsList } from '../hooks/teams/teams';
import { getTeamsList, logOut } from '../services/api';

const Home = () => {
  const navigate = useNavigate();

  const user = useContext(UserContext);
  console.log(user.user);

  const handleLoginClick = (event) => {
    navigate('/login');
  };

  const handleRegisterClick = (event) => {
    navigate('/register');
  };

  const handleLogoutClick = async (event) => {
    await logOut();
    user.logout();
    navigate('/');
  };

  const handleButtonClick = async () => {
    try {
      const data = await getTeamsList(); // Fetch data directly
      console.log("Fetched Teams List:", data); // Log the response data
    } catch (error) {
      console.error("Error fetching teams list:", error); // Log the error if fetching fails
    }
  };


  return (
    <>
      <h1>Pagrindinis puslapis</h1>

      {user.isLoggedIn ? 
        (
          <>
            {/* <Button variant="contained" onClick={handleUserPanelClick}>Naudotojo panelė</Button>
            {user.user.decodedJwt.role === '0' ? (
              <Button variant="contained" onClick={handleAdminPanelClick}>Administratoriaus panelė</Button>
            ) : null}
            {user.user.decodedJwt.role === '1' ? (
              <>
                <Button variant="contained" onClick={handleClientPanelClick}>Kliento panelė</Button>
                <Button variant="contained" onClick={handleServicesClick}>Peržiūrėti teikiamas paslaugas</Button>
              </>
            ) : null}
            {user.user.decodedJwt.role === '2' ? (
              <Button variant="contained" onClick={handleSpecialistPanelClick}>Specialisto panelė</Button>
            ) : null} */}
            <Button variant="contained" onClick={handleLogoutClick}>Atsijungti</Button>
            <Button variant="contained" onClick={handleButtonClick}>Fetch Teams List</Button>
          </>
        ) :
        (
          <>
            <Button variant="contained" onClick={handleLoginClick}>Prisijungti</Button>
            <Button variant="contained" onClick={handleRegisterClick}>Registuotis</Button>
          </>
        )
      }
    </>
  );
};

export default Home;