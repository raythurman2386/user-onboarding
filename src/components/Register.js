import React, { useState, useEffect } from 'react'
import { Form, Field, withFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

const Register = ({ errors, touched, status }) => {
  // set up hooks to display data
  const [users, setUsers] = useState([])

  return (
    <Form>
      {/* Custom Name Error */}
      {touched.name && errors.name && <p>{errors.name}</p>}
      <Field type='text' name='name' placeholder='Name' />

      {/* Custom Email Error */}
      {touched.email && errors.email && <p>{errors.email}</p>}
      <Field type='email' name='email' placeholder='Email' />

      {/* Custom PW Error */}
      {touched.password && errors.password && <p>{errors.password}</p>}
      <Field type='password' name='password' placeholder='Password' />

      {/* Custom TOS Error */}
      {touched.tos && errors.tos && <p>{errors.tos}</p>}
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
    name: Yup.string().required('Please provide a name'),
    email: Yup.string()
      .email('Email is not valid')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password is too short')
      .max(20, 'Password is too long')
      .required('You must have a password'),
    tos: Yup.boolean().oneOf([true], 'Please agree to the Terms of Service'),
  }),

  // handle submit
  // axios request will go here
  handleSubmit(values, { setStatus }) {
    console.log(values)
    axios
      .post('https://reqres.in/api/users', values)
      .then(res => {
        console.log(res.data)
        setStatus(res.data)
      })
      .catch(err => console.log(err.response))
  },
})(Register)
