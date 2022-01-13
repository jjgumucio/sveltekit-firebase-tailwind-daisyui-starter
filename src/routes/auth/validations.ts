import * as yup from 'yup';
import { es } from 'yup-locales';

yup.setLocale(es);

const passwordsMatch = function (verifyPassword: string): boolean {
  return verifyPassword === this.options.parent.password;
};

export const registrationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  verifyPassword: yup
    .string()
    .test('Password Verification', 'Los passwords deben coincidir', passwordsMatch)
    .required(),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});
