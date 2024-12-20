import { Button, Card, DialogContent, Grid, TextField } from "@mui/material";
import { useNavigate } from "react-router";
import { Formik, Form } from "formik";
import { loginTemplateValidation } from "../../validation/loginTemplate";
import { login } from "../../services/api";
import { UserContext } from "../../services/authProvider";
import { useContext } from "react";
import "../../styles/Login.css";

export default function Login() {
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const initialValues = {
    username: "",
    password: "",
  };

  return (
    <div className="login-container">
      <h1 className="login-header">Login page</h1>
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
          const response = await login(values);
          user.login(response.token);
          navigate("/");
        }}
        validationSchema={loginTemplateValidation}
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
                Login
              </Button>
            </Card>
          </Form>
        )}
      </Formik>
    </div>
  );
}
