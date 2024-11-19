import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";

export const TeamViewModal = ({ open, handleClose, team }) => (
  <Dialog open={open} onClose={handleClose}>
    <DialogTitle>View Team</DialogTitle>
    <DialogContent>
      <Typography>
        <strong>Title:</strong> {team?.title}
      </Typography>
      <Typography>
        <strong>Office:</strong> {team?.office}
      </Typography>
      <Typography>
        <strong>Division:</strong> {team?.division}
      </Typography>
      <Typography>
        <strong>Team Leader:</strong> {team?.teamLeaderName}
      </Typography>
      <Typography>
        <strong>Created:</strong> {dayjs(team?.created).format("YYYY-MM-DD")}
      </Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} variant="contained" color="primary">
        Close
      </Button>
    </DialogActions>
  </Dialog>
);
