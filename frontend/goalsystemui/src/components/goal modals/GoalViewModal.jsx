import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

export const GoalViewModal = ({ open, handleClose, goal }) => (
  <Dialog open={open} onClose={handleClose}>
    <DialogTitle>View Goal</DialogTitle>
    <DialogContent>
      <Typography>
        <strong>Title:</strong> {goal?.title}
      </Typography>
      <Typography>
        <strong>Description:</strong> {goal?.description}
      </Typography>
      <Typography>
        <strong>Created Date:</strong>{" "}
        {goal?.createdDate ? goal.createdDate.split("T")[0] : "N/A"}
      </Typography>
      <Typography>
        <strong>Finish Date:</strong>{" "}
        {goal?.finishDate ? goal.finishDate.split("T")[0] : "N/A"}
      </Typography>
      <Typography display="flex" alignItems="center">
        <strong>Is Completed:</strong>
        <Box display="flex" alignItems="center" ml={1}>
          {goal?.isCompleted ? (
            <CheckCircleIcon sx={{ color: "green" }} />
          ) : (
            <CancelIcon sx={{ color: "red" }} />
          )}
        </Box>
      </Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} variant="contained" color="primary">
        Close
      </Button>
    </DialogActions>
  </Dialog>
);
