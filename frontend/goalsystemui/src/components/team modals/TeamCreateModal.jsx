import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const CreateTeamSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .max(50, "Maximum 50 characters allowed"),
  office: Yup.string()
    .required("Office is required")
    .max(50, "Maximum 50 characters allowed"),
  division: Yup.string()
    .required("Division is required")
    .max(50, "Maximum 50 characters allowed"),
  teamLeaderName: Yup.string()
    .required("Team Leader Name is required")
    .max(50, "Maximum 50 characters allowed"),
});

export const TeamCreateModal = ({ open, handleClose, onCreateTeam }) => {
  const initialValues = {
    title: "",
    office: "",
    division: "",
    teamLeaderName: "",
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <div
        style={{
          position: "absolute",
          top: "0",
          right: "0",
          padding: "0.5rem",
          cursor: "pointer",
        }}
      >
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </div>
      <DialogTitle>Create Team</DialogTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={CreateTeamSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await onCreateTeam.mutateAsync(values);
            handleClose();
          } catch {
            setSubmitting(false);
          }
        }}
      >
        {({
          values,
          handleChange,
          handleBlur,
          errors,
          touched,
          isSubmitting,
        }) => (
          <Form>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="title"
                    fullWidth
                    label="Title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                    error={touched.title && Boolean(errors.title)}
                    helperText={
                      touched.title && errors.title ? errors.title : " "
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="office"
                    fullWidth
                    label="Office"
                    value={values.office}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                    error={touched.office && Boolean(errors.office)}
                    helperText={
                      touched.office && errors.office ? errors.office : " "
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="division"
                    fullWidth
                    label="Division"
                    value={values.division}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                    error={touched.division && Boolean(errors.division)}
                    helperText={
                      touched.division && errors.division
                        ? errors.division
                        : " "
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="teamLeaderName"
                    fullWidth
                    label="Team Leader Name"
                    value={values.teamLeaderName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                    error={
                      touched.teamLeaderName && Boolean(errors.teamLeaderName)
                    }
                    helperText={
                      touched.teamLeaderName && errors.teamLeaderName
                        ? errors.teamLeaderName
                        : " "
                    }
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} variant="contained" color="primary">
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                variant="contained"
                color="success"
              >
                Create
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};
