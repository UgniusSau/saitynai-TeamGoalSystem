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
import { Formik, Form } from "formik";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import CloseIcon from "@mui/icons-material/Close";
import * as Yup from "yup";
import dayjs from "dayjs";

const CreateGoalSchema = Yup.object().shape({
  title: Yup.string().required("Title is required").max(50, "Maximum 50 characters allowed"),
  description: Yup.string().required("Description is required").max(500, "Maximum 500 characters allowed"),
  finishDate: Yup.date()
    .required()
    .min(
      new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      "Date must be a week back or later"
    )
    .max(
      new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      "Date must be within the next year"
    ),
});

export const GoalCreateModal = ({ open, handleClose, onCreateGoal, teamId, memberId }) => {
  const initialValues = {
    title: "",
    description: "",
    finishDate: null,
    isCompleted: false,
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
      <DialogTitle>Create Goal</DialogTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={CreateGoalSchema}
        onSubmit={async (values) => {
          
          await onCreateGoal.mutateAsync({
            teamId,
            memberId,
            goalData: {
              ...values,
              finishDate: dayjs(values.finishDate).format("YYYY-MM-DD"),
            },
          });
          handleClose();
        }}
      >
        {({
          values,
          handleChange,
          handleBlur,
          errors,
          touched,
          setFieldValue,
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
                    helperText={touched.title && errors.title ? errors.title : " "}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="description"
                    fullWidth
                    label="Description"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                    error={touched.description && Boolean(errors.description)}
                    helperText={touched.description && errors.description ? errors.description : " "}
                  />
                </Grid>
                <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs} locale="lt">
                    <DatePicker
                      label="Finish Date"
                      value={values.finishDate} 
                      onChange={(newValue) => setFieldValue("finishDate", newValue)}
                      format="YYYY-MM-DD"
                      slotProps={{
                        textField: {
                          error: Boolean(touched.finishDate && errors.finishDate),
                          helperText: touched.finishDate && errors.finishDate ? errors.finishDate : " ",
                        },
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={Boolean(touched.finishDate && errors.finishDate)} 
                          helperText={touched.finishDate && errors.finishDate ? errors.finishDate : " "}
                          fullWidth
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} variant="contained" color="primary">
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="success"
                disabled={isSubmitting}
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
