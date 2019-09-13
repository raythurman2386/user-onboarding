import React from 'react'

// Styled Components
import styled from 'styled-components'

// import Register
import Register from './components/Register'

function App() {
  return (
    <AppWrapper>
      <Register />
    </AppWrapper>
  )
}

export default App

const AppWrapper = styled.div`
  width: 100%;
  height: 100vh;
  margin: auto;
  color: #fff;
  background-color: #333;
`
