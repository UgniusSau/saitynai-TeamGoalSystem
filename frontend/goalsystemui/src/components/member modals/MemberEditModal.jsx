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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Formik, Form } from "formik";
import CloseIcon from "@mui/icons-material/Close";
import * as Yup from "yup";
import dayjs from "dayjs";

const UpdateMemberSchema = Yup.object().shape({
  name: Yup.string().max(50, "Maximum 50 characters allowed"),
  surname: Yup.string().max(50, "Maximum 50 characters allowed"),
  role: Yup.string().max(50, "Maximum 50 characters allowed"),
  email: Yup.string().email("Invalid email format"),
  joinDate: Yup.date()
    .nullable()
    .max(new Date(), "Date cannot be in the future"),
});

export const MemberEditModal = ({
  open,
  handleClose,
  member,
  onUpdateMember,
  teamId,
}) => {
  const initialValues = {
    name: member?.name || "",
    surname: member?.surname || "",
    role: member?.role || "",
    email: member?.email || "",
    joinDate: member?.joinDate ? dayjs(member.joinDate) : null,
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
      <DialogTitle>Edit Member Information</DialogTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={UpdateMemberSchema}
        onSubmit={async (values) => {
          await onUpdateMember.mutateAsync({
            teamId,
            memberId: member.id,
            memberData: {
              ...values,
              joinDate: values.joinDate
                ? dayjs(values.joinDate).format("YYYY-MM-DD")
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
                    name="name"
                    fullWidth
                    label="Name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name ? errors.name : " "}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="surname"
                    fullWidth
                    label="Surname"
                    value={values.surname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                    error={touched.surname && Boolean(errors.surname)}
                    helperText={
                      touched.surname && errors.surname ? errors.surname : " "
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="role"
                    fullWidth
                    label="Role"
                    value={values.role}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                    error={touched.role && Boolean(errors.role)}
                    helperText={touched.role && errors.role ? errors.role : " "}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="email"
                    fullWidth
                    label="Email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                    error={touched.email && Boolean(errors.email)}
                    helperText={
                      touched.email && errors.email ? errors.email : " "
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs} locale="lt">
                    <DatePicker
                      label="Join Date"
                      value={values.joinDate} 
                      format="YYYY-MM-DD"
                      onChange={(newValue) =>
                        setFieldValue(
                          "joinDate",
                          newValue ? dayjs(newValue) : null
                        )
                      }
                      slotProps={{
                        textField: {
                          error: Boolean(touched.joinDate && errors.joinDate),
                          helperText: touched.joinDate && errors.joinDate ? errors.joinDate : " ",
                        },
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={Boolean(touched.joinDate && errors.joinDate)}
                          helperText={touched.joinDate && errors.joinDate ? errors.joinDate : " "}
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
                disabled={isSubmitting}
                variant="contained"
                color="success"
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
