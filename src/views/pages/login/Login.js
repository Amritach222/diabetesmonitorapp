import React, { useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
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
import Axios from 'axios'

const Login = ({ updateUser }) => {
  const navigate = useNavigate();
  const [userLogin, setuserLogin] = useState({
    email: '',
    password: '',
  })

  Login.propTypes = {
    updateUser: PropTypes.object.isRequired,
  }

  const handleInput = (event) => {
    const name = event.target.name
    const value = event.target.value
    setuserLogin({ ...userLogin, [name]: value })
    // console.log(name, value)
  }

  const loginUser = async (e) => {
    // <Link to='/' />
    e.preventDefault()
    const { email, password } = userLogin
    // console.log(username)

    Axios.post('http://localhost:3001/api/users/login', {
      email: email,
      password: password,
    })
      .then((res) => {
        //handle error
        // console.log(res)
        if(res.data.success===0)
        {
          alert(res.data.data)
        }
        //handle success
        if (res.data.success===1) {
          alert(res.data.data);
          Axios.put('http://localhost:3001/api/users/getprofile',
            {email:email}).then((res)=>{
              if(res.data.data){
                const id=res.data.data.id;
                  localStorage.setItem('userId',id);
              }
              else{
                console.log("data Not received")
              }
          }). catch((error)=>{
            console.log("Server error", error)
          })
          updateUser(userLogin);
          navigate('/dashboard')

        } else {


        }

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
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        name="email"
                        placeholder="Email"
                        autoComplete="off"
                        value={userLogin.email}
                        onChange={handleInput}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        name="password"
                        type="password"
                        placeholder="Password"
                        autoComplete="off"
                        value={userLogin.password}
                        onChange={handleInput}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={loginUser}>
                          Login
                        </CButton>
                      </CCol>

                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p style={{fontSize:"20px",font:"bold"}}>
                    I didnot choose Diabetes but i can choose how i react to it.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1} style={{border:"0.5px solid white", borderRadius:"10px"}}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}
export default Login
