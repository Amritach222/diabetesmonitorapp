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
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import Axios from 'axios'
import login_image from "../../../assets/images/diabetes/loginAnimation.png"
import healthyfood_image from "../../../assets/images/diabetes/healthy_food.jpg"

const Login = ({ updateUser }) => {
  const [displayError, setdisplayerror] = useState('');
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
    setdisplayerror("")
  }

  const loginUser = async (e) => {
    // <Link to='/' />
    e.preventDefault()
    const { email, password } = userLogin
    // console.log(username)
if(email == '' || password== '')
{
  setdisplayerror("Fields cannot be empty")
}
else
{

    Axios.post('http://localhost:3001/api/users/login', {
      email: email,
      password: password,
    })
      .then((res) => {
        //handle error
        // console.log(res)
        if(res.data.success===0)
        {
          const message=res.data.data;
          setdisplayerror(`${message}`)
        }
        //handle success
        if (res.data.success===1) {
          // alert(res.data.data);
          Axios.put('http://localhost:3001/api/users/userbyemail',
            {email:email,password:password}).then((res)=>{
              if(res.data.data){
                const id=res.data.data.id;
                console.log("data", res.data.data)
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

        }
      })
      .catch((res) => {
        //handle error
        console.log(res)
      })
  }
}

  return (

    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer >
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup style={{boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
              <CCard className="p-4" >
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      

                      <TextField
                      style={{ width: '100%' }}
                      name="email"
                      id="email"
                      autoComplete="off"
                      value={userLogin.email}
                      onChange={handleInput}
                      label="Email"
                      type="email"
                      variant="standard"
                    />
                    </CInputGroup>
                    <CInputGroup className="mb-1">
                     

                      <TextField
                      style={{ width: '100%' }}
                      name="password"
                      id="password"
                      autoComplete="off"
                      value={userLogin.password}
                      onChange={handleInput}
                      label="Password"
                      type="password"
                      variant="standard"
                    />
                    </CInputGroup>


                    <CRow>
                    <span className='text-danger ms-1 mb-3'>{displayError}</span>
                      <CCol xs={6}>
        

                        <Button
                      variant="contained"
                      type="submit"
                      onClick={loginUser}
                    
                    >Log in</Button>
                      </CCol>

                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0"  style={{
                      
                      color: 'blue',
                      fontStyle: 'italic',
                      marginLeft: '8px',
              
                    }}>
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-black bg-gradient py-5" style={{ width: '44%'}}>
                <CCardBody className="text-center  d-flex justify-content-center align-items-center">
                  <div>
                  <img src={login_image} alt="login"  style={{overflow:"hidden",height:"100%", width:"100%"}}/>
                    <h2>Sign up</h2>
                    <p style={{fontSize:"1.2rem",fontFamily:"monospace"}}>
                    I didnt choose Diabetes but i can choose how i react to it.
                    </p>
                    <Link to="/register" style={{ textDecoration: 'none'}}>
                    <Button variant="contained">Register</Button>
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
