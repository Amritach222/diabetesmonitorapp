import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { Link } from 'react-router-dom'
import Axios from 'axios'

const Register = () => {
  //creating a state which stores registeration information in an object
  const [userRegistration, setuserRegistration] = useState({
    username: '',
    email: '',
    password: '',
    cpassword: '',
  })
  const [records, setRecords] = useState([])

  const handleInput = (event) => {
    const name = event.target.name
    const value = event.target.value
    setuserRegistration({ ...userRegistration, [name]: value })
    console.log(name, value)
  }

  //handlesubmit to store user inputs in object....
  // const handleSubmit = (event) => {
  //   console.log(event)
  //   event.preventDefault()
  //   const newRecord = { ...userRegistration, id: new Date().getTime().toString() }
  //   console.log(records)
  //   setRecords([...records, newRecord])
  //   console.log(records)
  //   setuserRegistration({ username: '', email: '', password: '', cpassword: '' })
  // }

  //sending form data om submit click....
  const registerUser = async (e) => {
    e.preventDefault()
    const { username, email, password, cpassword } = userRegistration
    // console.log(userRegistration)
    // console.log(password)
    Axios.post('http://localhost:3001/register', {
      username: username,
      email: email,
      password: password,
      cpassword: cpassword,
    })
      .then((res) => {
        //handle success
        console.log(res)
      })
      .catch((res) => {
        //handle error
        console.log(res)
      })
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm action="">
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Username"
                      name="username"
                      id="username"
                      autoComplete="off"
                      value={userRegistration.username}
                      onChange={handleInput}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      name="email"
                      id="email"
                      autoComplete="off"
                      value={userRegistration.email}
                      onChange={handleInput}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                      autoComplete="off"
                      value={userRegistration.password}
                      onChange={handleInput}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      name="cpassword"
                      id="cpassword"
                      placeholder="Repeat password"
                      autoComplete="off"
                      value={userRegistration.cpassword}
                      onChange={handleInput}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CFormInput
                      className="form-submit"
                      type="submit"
                      name="register"
                      id="register"
                      value="Create Account"
                      onClick={registerUser}
                      style={{ backgroundColor: 'lightgreen' }}
                    />
                  </CInputGroup>
                </CForm>
                <p className="d-flex justify-content-center">
                  Already have an account ?
                  <Link to="/login" className="d-flex justify-content-center">
                    Login
                  </Link>
                </p>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
