import React from 'react'
import { Form, Field, withFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

const Register = () => {
  return (
    <Form>
      <Field type='text' name='name' placeholder='Name' />
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

export default withFormik({})(Register)
