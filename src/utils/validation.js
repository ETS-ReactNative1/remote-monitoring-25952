import * as yup from 'yup';

const loginValidationSchema = yup.object().shape({
    email: yup
    .string()
    .email("Please enter valid email")
    .required('Email Address is Required'),
    name: yup
    .string()
    .required('Name is Required'),
    lastname: yup
    .string()
    .required('Last Name is Required'),
});

const loginValidationSchema_= yup.object().shape({
    address: yup
    .string()
    .required('Address is Required'),
    city: yup
    .string()
    .required('City is Required'),
    zipcode: yup
    .string()
    .required('Zip Code is Required'),
});

export {loginValidationSchema, loginValidationSchema_};