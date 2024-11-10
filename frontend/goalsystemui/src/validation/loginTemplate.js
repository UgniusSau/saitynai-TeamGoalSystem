import * as yup from 'yup';

export const loginTemplateValidation = yup.object({
  username: yup
    .string()
    .required('Reikalingas vartotojo vardas'),
  password: yup
    .string()
    .required('Reikalingas slaptažodis'),
});