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
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Formik, Form } from "formik";
import CloseIcon from "@mui/icons-material/Close";
import * as Yup from "yup";
import dayjs from "dayjs";

const UpdateGoalSchema = Yup.object().shape({
  title: Yup.string()
    .max(50, "Maximum 50 characters allowed")
    .required("Title is required"),
  description: Yup.string()
    .max(500, "Maximum 500 characters allowed")
    .required("Description is required"),
  finishDate: Yup.date()
    .nullable()
    .min(
      new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      "Date must be a week back or later"
    )
    .max(
      new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      "Date must be within the next year"
    ),
});

export const GoalEditModal = ({
  open,
  handleClose,
  goal,
  onUpdateGoal,
  teamId,
  memberId,
}) => {
  const initialValues = {
    title: goal?.title || "",
    description: goal?.description || "",
    finishDate: goal?.finishDate ? dayjs(goal.finishDate) : null,
    isCompleted: goal?.isCompleted || false,
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
      <DialogTitle>Edit Goal</DialogTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={UpdateGoalSchema}
        onSubmit={async (values) => {
          await onUpdateGoal.mutateAsync({
            teamId,
            memberId,
            goalId: goal.id,
            goalData: {
              ...values,
              finishDate: values.finishDate
                ? dayjs(values.finishDate).format("YYYY-MM-DD")
                : null,
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
                    helperText={
                      touched.title && errors.title ? errors.title : " "
                    }
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
                    helperText={
                      touched.description && errors.description
                        ? errors.description
                        : " "
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs} locale="lt">
                    <DatePicker
                      label="Finish Date"
                      value={values.finishDate}
                      format="YYYY-MM-DD"
                      onChange={(newValue) =>
                        setFieldValue(
                          "finishDate",
                          newValue ? dayjs(newValue) : null
                        )
                      }
                      slotProps={{
                        textField: {
                          error: Boolean(
                            touched.finishDate && errors.finishDate
                          ),
                          helperText:
                            touched.finishDate && errors.finishDate
                              ? errors.finishDate
                              : " ",
                        },
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={Boolean(
                            touched.finishDate && errors.finishDate
                          )}
                          helperText={
                            touched.finishDate && errors.finishDate
                              ? errors.finishDate
                              : " "
                          }
                          fullWidth
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{
                    marginTop: 0,
                    paddingTop: 0
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.isCompleted}
                        onChange={(e) =>
                          setFieldValue("isCompleted", e.target.checked)
                        }
                      />
                    }
                    style={{
                      marginLeft: 0,
                      paddingLeft: 0
                    }}
                    label="Completed"
                    labelPlacement="start"
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
                variant="contained"
                color="success"
                disabled={isSubmitting}
              >
                Save
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};
