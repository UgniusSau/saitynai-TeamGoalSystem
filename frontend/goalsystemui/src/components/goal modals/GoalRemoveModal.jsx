import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

export const GoalRemoveModal = ({
  open,
  handleClose,
  goal,
  onRemoveGoal,
  teamId,
  memberId,
}) => (
  <Dialog open={open} onClose={handleClose}>
    <DialogTitle>Remove Goal</DialogTitle>
    <DialogContent>
      <Typography>
        Are you sure you want to remove the goal <strong>{goal?.title}</strong>?
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
          await onRemoveGoal.mutateAsync({
            teamId,
            memberId,
            goalId: goal?.id,
          });
          handleClose();
        }}
      >
        Remove
      </Button>
    </DialogActions>
  </Dialog>
);
