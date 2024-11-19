import React, { useState, useContext } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
  Modal,
  Select,
  FormControl,
  InputLabel,
  Card,
  DialogContent,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { logOut } from "../services/api";
import { UserContext } from "../services/authProvider";
import { useNavigate } from "react-router-dom";
import { useTeamsList } from "../hooks/teams/teams";
import CircularProgress from "@mui/material/CircularProgress";

const pages = ["Teams", "Members"];

const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState("");

  const navigate = useNavigate();
  const { data: teams, isLoading } = useTeamsList();

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    handleCloseNavMenu();
  };

  const handleTeamSelect = () => {
    if (selectedTeam) {
      navigate(`/teams/${selectedTeam}/members`);
      handleCloseModal();
    }
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleTeamChange = (event) => setSelectedTeam(event.target.value);

  const user = useContext(UserContext);

  const handleLogoutClick = async () => {
    await logOut();
    user.logout();
    navigate("/");
  };

  const handleNavigation = (page) => {
    if (page === "Teams") {
      navigate("/teams");  
    } else if (page === "Members") {
      handleOpenModal(); 
    }
  };

  if (!user.isLoggedIn) {
    return null;
  }

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#1976d2", fontFamily: "Arial, sans-serif", borderRadius: "16px", }}
    >
      <Container maxWidth="xxl" sx={{ minWidth: "20rem", padding: "0px",  }}>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: "bold",
              fontSize: "1.8rem",
              color: "#fff",
              textDecoration: "none",
            }}
          >
            TGS
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="navigation menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handleNavigation(page)}>
                  <Typography textAlign="center" sx={{ fontSize: "1rem" }}>
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: "bold",
              fontSize: "1.5rem",
              color: "#fff",
              textDecoration: "none",
            }}
          >
            TGS
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleNavigation(page)}
                sx={{
                  my: 2,
                  color: "white",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  transition: "background-color 0.3s ease",
                  "&:hover": { backgroundColor: "#3a8fb7" },
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Button
            variant="outlined"
            startIcon={<ExitToAppIcon />}
            sx={{
              color: "white",
              borderColor: "white",
              ml: 2,
              fontSize: "1rem",
              padding: "6px 16px",
              borderRadius: "20px",
              "&:hover": { backgroundColor: "#115293" },
            }}
            onClick={handleLogoutClick}
          >
            Logout
          </Button>
        </Toolbar>
      </Container>

      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="select-team-modal"
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Card
            className="modal-card"
            sx={{
              width: 400,
              padding: 3,
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
              borderRadius: 2,
            }}
          >
            <DialogContent>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#333", textAlign: "center" }}
              >
                Select Team
              </Typography>
              {isLoading ? (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                  <CircularProgress />
                </Box>
              ) : (
                <FormControl fullWidth sx={{ marginTop: 2 }}>
                  <InputLabel id="team-select-label">Choose a Team</InputLabel>
                  <Select
                    labelId="team-select-label"
                    id="team-select"
                    value={selectedTeam}
                    label="Choose a Team"
                    onChange={handleTeamChange}
                    sx={{
                      fontSize: "1rem",
                      color: "#333",
                    }}
                  >
                    {teams?.map((team) => (
                      <MenuItem
                        key={team.id}
                        value={team.id}
                        sx={{ fontSize: "1rem" }}
                      >
                        {team.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              <Box
                sx={{ display: "flex", justifyContent: "center", mt: 3, gap: 4 }}
              >
                <Button
                  onClick={handleTeamSelect}
                  color="success"
                  variant="contained"
                >
                  Select
                </Button>
                <Button
                  onClick={handleCloseModal}
                  color="primary"
                  variant="contained"
                >
                  Cancel
                </Button>
              </Box>
            </DialogContent>
          </Card>
        </Box>
      </Modal>
    </AppBar>
  );
};

export default Header;
