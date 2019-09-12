import React from 'react'
import { Form, Field, withFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

const Register = ({ errors, touched }) => {
  return (
    <Form>
      {touched.name && errors.name && <p>{errors.name}</p>}
      <Field type='text' name='name' placeholder='Name' />

      {touched.email && errors.email && <p>{errors.email}</p>}
      <Field type='email' name='email' placeholder='Email' />
      <Field type='password' name='password' placeholder='Password' />
      <label>
        <Field type='checkbox' name='tos' />
        <span>Terms of Service</span>
      </label>
      <button type='submit'>Submit</button>
    </Form>
  )
}

export default withFormik({
  // Basically map props to the state
  mapPropsToValues: ({ name, email, password, tos }) => {
    return {
      name: name || '',
      email: email || '',
      password: password || '',
      tos: tos || false,
    }
  },

  // need to add validationSchema here
  validationSchema: Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string()
      .email()
      .required(),
    password: Yup.string()
      .min(6)
      .max(20)
      .required(),
    tos: Yup.boolean().oneOf([true]),
  }),

  // handle submit
  // axios request will go here
  handleSubmit(values, { setStatus }) {
    console.log(values)
    axios
      .post('https://reqres.in/api/users', values)
      .then(res => console.log(res.data))
      .catch(err => console.log(err.response))
  },
})(Register)
