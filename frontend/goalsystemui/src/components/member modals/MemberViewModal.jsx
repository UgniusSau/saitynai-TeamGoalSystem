import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

export const MemberViewModal = ({ open, handleClose, member }) => (
  <Dialog open={open} onClose={handleClose}>
    <DialogTitle>View Member</DialogTitle>
    <DialogContent>
      <Typography>
        <strong>Name:</strong> {member?.name}
      </Typography>
      <Typography>
        <strong>Surname:</strong> {member?.surname}
      </Typography>
      <Typography>
        <strong>Role:</strong> {member?.role}
      </Typography>
      <Typography>
        <strong>Email:</strong> {member?.email}
      </Typography>
      <Typography>
        <strong>Join Date:</strong> {member?.joinDate.split("T")[0]}
      </Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} variant="contained" color="primary">
        Close
      </Button>
    </DialogActions>
  </Dialog>
);
