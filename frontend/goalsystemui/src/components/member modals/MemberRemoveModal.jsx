import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

export const MemberRemoveModal = ({
  open,
  handleClose,
  member,
  onRemoveMember,
  teamId,
}) => (
  <Dialog open={open} onClose={handleClose}>
    <DialogTitle>Remove Member</DialogTitle>
    <DialogContent>
      <Typography>
        Are you sure you want to remove {member?.name} {member?.surname}?
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
          await onRemoveMember.mutateAsync({ teamId, memberId: member?.id });
          handleClose();
        }}
      >
        Remove
      </Button>
    </DialogActions>
  </Dialog>
);
