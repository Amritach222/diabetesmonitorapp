import React, { useState } from 'react'
import Axios from 'axios'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import Button from '@mui/material/Button'
import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
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
// import { cilLockLocked, cilUser } from '@coreui/icons'
import { Link } from 'react-router-dom'
import register_image from '../../../src/assets/images/diabetes/register.png'

const AddDetails = () => {
  //creating a state which stores registeration information in an object
  const [userDetails, setuserDetails] = useState({
    userSugar: '',
    userMeal: '',
    userLaunch: '',
    userDinner: '',
    userExercise: '',
  })

  const handleInput = (event) => {
    const name = event.target.name
    const value = event.target.value
    setuserDetails({ ...userDetails, [name]: value })
    console.log(name, value)
  }

  //sending form data on submit click....
  const addDetails = async (e) => {
    e.preventDefault()
    console.log('Submit running ')
    let username = ''
    let id = localStorage.getItem('userId')
    // console.log(id)

    Axios.put('http://localhost:3001/api/users/getuser', {
      user_id: id,
    })
      .then((res) => {
        if (res.data.success == 1) {
          // console.log("response good")
          console.log(res.data)
          username = res.data.data.name
          const { userSugar, userMeal, userLaunch, userDinner, userExercise } = userDetails
          Axios.post('http://localhost:3001/api/userDetails', {
            sugar_level: userSugar,
            morning_meal: userMeal,
            launch: userLaunch,
            dinner: userDinner,
            exercise_time: userExercise,
            username: username,
          })
            .then((res) => {
              //handle success
              if (res.data.success == 1) {
                alert('Submitted Successfully')
              } else {
                alert('Not Submitted')
              }
            })
            .catch((res) => {
              //handle error
              console.log(res)
            })
        }
      })
      .catch((res) => {
        console.log(res)
      })
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9}>
            <CCardGroup
              style={{
                boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
              }}
            >
              <CCard className>
                <CCardBody
                  className="p-4"
                  style={{
                    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                  }}
                >
                  <CForm action="">
                    <h1>Enter Your Details Here</h1>
                    <p className="text-medium-emphasis">
                      Daily Activites help to track your Diabetes Condition
                    </p>

                    <CInputGroup className="mb-4">
                      <TextField
                        style={{ width: '100%' }}
                        name="userSugar"
                        id="userSugar"
                        autoComplete="off"
                        value={userDetails.userSugar}
                        onChange={handleInput}
                        label="Sugar Level"
                        type="number"
                        variant="standard"
                      />
                    </CInputGroup>

                    <CInputGroup className="mb-4 ">
                      <TextField
                        style={{ width: '100%' }}
                        name="userMeal"
                        id="userMeal"
                        autoComplete="off"
                        value={userDetails.userMeal}
                        onChange={handleInput}
                        label="Morning Meal"
                        type="text"
                        variant="standard"
                      />
                    </CInputGroup>

                    <CInputGroup className="mb-4 ">
                      <TextField
                        style={{ width: '100%' }}
                        name="userLaunch"
                        id="userLaunch"
                        autoComplete="off"
                        value={userDetails.userLaunch}
                        onChange={handleInput}
                        label="Launch"
                        type="text"
                        variant="standard"
                      />
                    </CInputGroup>

                    <CInputGroup className="mb-4 ">
                      <TextField
                        style={{ width: '100%' }}
                        name="user"
                        id="userDinner"
                        autoComplete="off"
                        value={userDetails.userMeal}
                        onChange={handleInput}
                        label="Dinner"
                        type="text"
                        variant="standard"
                      />
                    </CInputGroup>

                    <CInputGroup className="mb-4">
                      <TextField
                        style={{ width: '100%' }}
                        name="userExercise"
                        id="userExercise"
                        autoComplete="off"
                        value={userDetails.userExercise}
                        onChange={handleInput}
                        label="Exercise time"
                        type="number"
                        variant="standard"
                      />
                    </CInputGroup>

                    <CInputGroup className="mb-2 align-center">
                      <Button
                        variant="outlined"
                        type="submit"
                        name="submit"
                        id="submit"
                        onClick={addDetails}
                      >
                        Submit
                      </Button>
                    </CInputGroup>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-black bg-gradient py-5">
                <CCardBody className=" d-flex justify-content-center align-items-center ">
                  <img src={register_image} alt="GIF" />
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
      <ToastContainer position="top-center" autoClose={1000} />
    </div>
  )
}

export default AddDetails
