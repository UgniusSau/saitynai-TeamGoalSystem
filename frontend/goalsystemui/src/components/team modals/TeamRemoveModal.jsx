import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

export const TeamRemoveModal = ({ open, handleClose, team, onRemoveTeam }) => (
  <Dialog open={open} onClose={handleClose}>
    <DialogTitle>Remove Team</DialogTitle>
    <DialogContent>
      <Typography>
        Are you sure you want to remove the team <strong>{team?.title}</strong>?
      </Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} variant="contained" color="primary">
        Cancel
      </Button>
      <Button
        color="error"
        variant="contained"
        onClick={async () => {
          await onRemoveTeam.mutateAsync(team.id);
          handleClose();
        }}
      >
        Remove
      </Button>
    </DialogActions>
  </Dialog>
);
