import React from 'react'
import { Form, Field, withFormik } from 'formik'
import * as Yup from 'yup'

const Register = () => {
  return (
    <Form>
      <Field type='text' name='name' placeholder='Name' />
      <Field type='email' name='email' placeholder='Email' />
      <Field type='password' name='password' placeholder='Password' />
    </Form>
  )
}

export default Register
