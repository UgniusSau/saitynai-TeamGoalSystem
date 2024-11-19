import { Button, Card, DialogContent, Grid, TextField } from "@mui/material";
import { useNavigate } from "react-router";
import { Formik, Form } from "formik";
import { registerTemplateValidation } from "../../validation/registerTemplate";
import { register } from "../../services/api";
import "../../styles/Login.css";

export default function Register() {
  const navigate = useNavigate();
  const initialValues = {
    username: "",
    email: "",
    name: "",
    surname: "",
    password: "",
  };

  return (
    <div className="login-container">
      <h1 className="login-header">Register Page</h1>

      <Button
        type="submit"
        variant="contained"
        style={{ marginBottom: "1rem" }}
        onClick={() => navigate("/")}
      >
        Home Page
      </Button>

      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          await register(values);
          navigate("/login");
        }}
        validationSchema={registerTemplateValidation}
      >
        {({
          values,
          handleChange,
          handleBlur,
          errors,
          touched,
          isSubmitting,
        }) => (
          <Form className="login-form">
            <Card className="login-card">
              <DialogContent>
                <Grid container rowSpacing={2} spacing={2}>
                  <Grid item xs={12}>
                    <label className="input-label">Username:</label>
                    <TextField
                      name="username"
                      label="Username"
                      value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="outlined"
                      fullWidth
                      error={Boolean(errors.username && touched.username)}
                      helperText={
                        errors.username && touched.username && errors.username
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <label className="input-label">Email:</label>
                    <TextField
                      name="email"
                      label="Email"
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="outlined"
                      fullWidth
                      error={Boolean(errors.email && touched.email)}
                      helperText={errors.email && touched.email && errors.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <label className="input-label">Name:</label>
                    <TextField
                      name="name"
                      label="Name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="outlined"
                      fullWidth
                      error={Boolean(errors.name && touched.name)}
                      helperText={errors.name && touched.name && errors.name}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <label className="input-label">Surname:</label>
                    <TextField
                      name="surname"
                      label="Surname"
                      value={values.surname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="outlined"
                      fullWidth
                      error={Boolean(errors.surname && touched.surname)}
                      helperText={
                        errors.surname && touched.surname && errors.surname
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <label className="input-label">Password:</label>
                    <TextField
                      name="password"
                      type="password"
                      label="Password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="outlined"
                      fullWidth
                      error={Boolean(errors.password && touched.password)}
                      helperText={
                        errors.password && touched.password && errors.password
                      }
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                className="submit-button"
              >
                Register
              </Button>
            </Card>
          </Form>
        )}
      </Formik>
    </div>
  );
}
