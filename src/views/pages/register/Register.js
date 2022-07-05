import React, { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import Button from '@mui/material/Button'
import register_image from "../../../assets/images/diabetes/register.png"
import {
  // CButton,
  CCardGroup,
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
import { Link,Navigate,useNavigate } from 'react-router-dom'
import Axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'


const Register = () => {

  const navigate = useNavigate();
  //creating a state which stores registeration information in an object
  const [userRegistration, setuserRegistration] = useState({
    fullname:'',
    username: '',
    age: '',
    weight: '',
    gender: '',
    email: '',
    password: '',
    cpassword: '',
  })


  const [displayError, setdisplayerror] = useState('');
  const handleInput = (event) => {
    const name = event.target.name
    const value = event.target.value
    setuserRegistration({ ...userRegistration, [name]: value })
    console.log(name, value)
    setdisplayerror('')
  }

  //sending form data om submit click....
  const registerUser = async (e) => {
    e.preventDefault()
    
    const { fullname,username, age, weight, gender, email, password, cpassword } = userRegistration

    //validation for email only
    const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
   const result = pattern.test(email);
  //  console.log(result)
   

    if(fullname==='' || username==='' || age==='' || weight==='' || gender==='' || email==='' || password==='' || cpassword===''){
      setdisplayerror(`Fields cant be empty`);
    }
    else{
      if(password !== cpassword )
      {
        setdisplayerror('Password must be matched');

      }
else{

  if(password.length < 8)
  {
    setdisplayerror('Password must be of minimum 8 characters');
  }
  else

  {
      if(result===false){
        setdisplayerror(`Enter a valid email`);
       }
      else{

        setdisplayerror('');

    Axios.get('http://localhost:3001/api/users/userValidation/').then((res) => {
      if (res.data.success === 1) {
        let userdata = res.data.data
        // console.log(userdata)
        const user = userdata.filter((item) => item.name == username)
    
        const useremail = userdata.filter((item) => item.email == email)
       
        if (user.length) {
          setdisplayerror('Username already exist')
        } 
        else{

        if(useremail.length)
        {
          setdisplayerror('Email already exist')
        }
        
        else {
          Axios.post('http://localhost:3001/api/users/', {
            fullname:fullname,
            username: username,
            age: age,
            weight: weight,
            gender: gender,
            email: email,
            password: password,
           
          })
            .then((res) => {
              //handle success
              console.log("res")
              if (res.data.success === 1) {
                alert("Registration Successful")
                // toast.success('Registration Successful', {
                //   toastId: 'customId',
                // })
                navigate('/login');

              }

              Axios.post('http://localhost:3001/api/users/userDetails', {
                fullname:fullname,
                username: username,
                age: age,
                weight: weight,
                gender: gender,
                email: email,
                password: password,
                
              })
                .then((res) => {
                  //handle success
                  console.log(res)
                  if (res.data.success === 1) {
                    console.log('User Details Table Created')
                  }
                })
                .catch((res) => {
                  //handle error
                  console.log(res)
                  if (res.data.success === 0) {
                    console.log('User Details Table Not Created')
                  }
                })

            })
            .catch((res) => {
              //handle error
              console.log(res)
              if (res.data.success === 0) {
                alert('Registration Unsuccessful')
              }
            })
        }
      }
      }
    })
  }
}
}
  }
}
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center"> 
      <CContainer >

        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup style={{boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
            <CCard className>
              <CCardBody className="p-4"  style={{boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
                <CForm action="">
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
<div className='d-flex '>


<CInputGroup className="mb-1 me-1">
                    <TextField
                      style={{ width: '100%' }}
                      name="fullname"
                      id="fullname"
                      autoComplete="off"
                      value={userRegistration.fullname}
                      onChange={handleInput}
                      label="Full Name"
                      type="text"
                      variant="standard"
                    />
                  </CInputGroup>
        
                  
                  

                  <CInputGroup className="mb-1 ms-1">
                    <TextField
                      style={{ width: '100%' }}
                      name="username"
                      id="username"
                      autoComplete="off"
                      value={userRegistration.username}
                      onChange={handleInput}
                      label="username"
                      type="text"
                      variant="standard"
                    />
                  </CInputGroup>
        
</div>
                  
<div className='d-flex'>



<CInputGroup className="mb-1 me-1">
                    <TextField
                      style={{ width: '100%' }}
                      label="age"
                      type="number"
                      variant="standard"
                      name="age"
                      id="age"
                      autoComplete="off"
                      value={userRegistration.age}
                      onChange={handleInput}
                    />
                  </CInputGroup>
              
                  <CInputGroup className="mb-1 ms-1">
                    <TextField
                      style={{ width: '100%' }}
                      label="weight (kg)"
                      type="number"
                      variant="standard"
                      name="weight"
                      id="weight"
                      autoComplete="off"
                      value={userRegistration.weight}
                      onChange={handleInput}
                    />
                  </CInputGroup>
                 
</div>
              

                  <CInputGroup className="mb-3">
                    <FormControl style={{ marginBottom: '-20px', marginTop: '20px' }}>
                      <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="gender"
                        value={userRegistration.gender}
                        onChange={handleInput}
                      >
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                      </RadioGroup>
                    </FormControl>
                  </CInputGroup>

                  
                  <CInputGroup className="mb-1">
                    <TextField
                      style={{ width: '100%' }}
                      label="email"
                      type="email"
                      variant="standard"

                      name="email"
                      id="email"
                      autoComplete="off"
                      value={userRegistration.email}
                      onChange={handleInput}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-1">
                    <TextField
                      style={{ width: '100%' }}
                      label="password"
                      type="password"
                      variant="standard"
                      name="password"
                      id="password"
                      autoComplete="off"
                      value={userRegistration.password}
                      onChange={handleInput}
                    />
                  </CInputGroup>

                 
                 

                

                  <CInputGroup className="mb-4">
                    <TextField
                      style={{ width: '100%' }}
                      label="confirm password"

                      type="password"
                      variant="standard"
                      name="cpassword"
                      id="cpassword"
                      autoComplete="off"
                      value={userRegistration.cpassword}
                      onChange={handleInput}
                    />
                  </CInputGroup>

                  
                  <CInputGroup className="mb-2 align-center">
                    <Button
                      variant="contained"
                      type="submit"
                      name="register"
                      id="register"
                      onClick={registerUser}
                    >
                      Create Account
                    </Button>
                  </CInputGroup>
<span className='text-danger ms-1'>{displayError}</span>


                </CForm>
                <p className="d-flex justify-content-center">
                  Already have an account ?
                  <Link
                    to="/login"
                    className="d-flex justify-content-center"
                    style={{
                      textDecoration: 'none',
                      color: 'red',
                      fontStyle: 'italic',
                      marginLeft: '8px',
                    }}
                  >
                    Login
                  </Link>
                </p>
                
              </CCardBody>
            </CCard>
              <CCard className="text-black bg-gradient py-5" style={{ width: '44%'}}>
                <CCardBody className=" d-flex justify-content-center align-items-center">
            <img src={register_image} alt="GIF"  style={{overflow:"hidden"}}/>
        
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
