import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        backgroundColor: "#e0e0e0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem 0",
        textAlign: "center",
        zIndex: 1000, 
      }}
    >
      <Typography
        variant="body1"
        sx={{
          fontSize: { xs: "0.8rem", sm: "1rem" }, 
        }}
      >
        <strong>This work is done by a student for educational purposes</strong>
      </Typography>
    </Box>
  );
};

export default Footer;
