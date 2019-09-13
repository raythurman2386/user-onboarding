import React, { useState, useEffect } from 'react'
import { Form, Field, withFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

// Styled Components
import styled from 'styled-components'

// Styles
const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  margin: auto;
  align-items: center;
`;
const StyledField = styled(Field)`
  margin: 10px 0;
  line-height: 2;
  border: none;
  // border-radius: 8px;
  padding: 5px 10px;
  width: 60%;
  box-shadow: 0 -1px 0 #e0e0e0, 0 0 2px rgba(0, 0, 0, 0.12),
    0 2px 4px rgba(0, 0, 0, 0.24);
`;
const ButtonWrapper = styled.button`
  cursor: pointer;
  margin: 10px;
  padding: 8px 14px;
  background-color: lightskyblue;
  border: none;
  box-shadow: 0 -1px 0 #e0e0e0, 0 0 2px rgba(0, 0, 0, 0.12),
    0 2px 4px rgba(0, 0, 0, 0.24);
  &:hover {
    box-shadow: 0 -1px 10px #e0e0e0, 0 0 2px rgba(0, 0, 0, 0.12),
      0 2px 10px rgba(0, 0, 0, 0.24);
  }
`;

const Register = ({ errors, touched, status }) => {
  // set up hooks to display data
  const [users, setUsers] = useState([])

  // useEffect to update users
  useEffect(() => {
    if (status) {
      setUsers([...users, status])
    }
  }, [status])

  return (
    <StyledForm>
      {/* Custom Name Error */}
      {touched.name && errors.name && <p>{errors.name}</p>}
      <StyledField type='text' name='name' placeholder='Name' />

      {/* Custom Email Error */}
      {touched.email && errors.email && <p>{errors.email}</p>}
      <StyledField type='email' name='email' placeholder='Email' />

      {/* Custom PW Error */}
      {touched.password && errors.password && (
        <p>{errors.password}</p>
      )}
      <StyledField type='password' name='password' placeholder='Password' />

      {/* Custom TOS Error */}
      {touched.tos && errors.tos && <p>{errors.tos}</p>}
      <label>
        <Field type='checkbox' name='tos' />
        <span>Terms of Service</span>
      </label>
      <ButtonWrapper type='submit'>Submit</ButtonWrapper>
      <div>
        {users.map(user => (
          <ul>
            <li>{user.name}</li>
            <li>{user.email}</li>
          </ul>
        ))}
      </div>
    </StyledForm>
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
