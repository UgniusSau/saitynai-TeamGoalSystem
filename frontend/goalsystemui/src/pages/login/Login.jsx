import { Button, Card, DialogContent, Grid, TextField } from '@mui/material';
import { useNavigate } from 'react-router';
import { Formik, Form } from 'formik';
import { loginTemplateValidation } from '../../validation/loginTemplate';
import { login } from '../../services/api';
import { UserContext } from '../../services/authProvider'; 
import { useContext } from 'react';

export default function Login() {
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const initialValues = {
    username: '',
    password: '',
  };

  return (
    <>
      <h1>Prisijungimo puslapis</h1>
      <Button variant="contained" onClick={() => { navigate('/');}}>Pagrindinis puslapis</Button>

      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          const response = await login(values);
          
          user.login(response.token);

          navigate('/');
        }}
        validationSchema={loginTemplateValidation}
      >
        {({ values, handleChange, handleBlur, errors, touched, isSubmitting }) => (
          <Form>
            <Card style={{ width: '20%' }}>
              <DialogContent>
                <Grid container rowSpacing={1} spacing={1}>
                  <Grid item xs={12} style={{ fontWeight: 'bold' }}>Prisijungimas vardas:</Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="username"
                      label="Prisijungimo vardas"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="outlined"
                      error={errors.username && touched.username}
                      helperText={errors.username && touched.username && errors.username}
                    />
                  </Grid>
                  <Grid item xs={12} style={{ fontWeight: 'bold' }}>Prisijungimas slaptažodis:</Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="password"
                      type="password"
                      label="Prisijungimo slaptažodis"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="outlined"
                      error={errors.password && touched.password}
                      helperText={errors.password && touched.password && errors.password}
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <Button 
                type="submit" 
                variant="contained" 
                disabled={isSubmitting}
              >
                Prisijungti
              </Button>
            </Card>
          </Form>
        )}
      </Formik>
    </>
  );
};