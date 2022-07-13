import React, { useState, useEffect } from 'react'
import Axios from 'axios'

import TextField from '@mui/material/TextField'

import Button from '@mui/material/Button'
import { ToastContainer, toast } from 'react-toastify'
import './adddetails.scss'
import adddetails_image from '../../assets/images/diabetes/adddetails.jpg'
import 'react-toastify/dist/ReactToastify.css'
import {
  // CButton,
  CCardGroup,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,

  CInputGroup,

  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilWarning } from '@coreui/icons'
// import { cilLockLocked, cilUser } from '@coreui/icons'
import { Link } from 'react-router-dom'
import register_image from '../../../src/assets/images/diabetes/register.png'
const AddDetails = () => {
  //creating a state which stores registeration information in an object
  const [displayError, setdisplayerror] = useState('')
  const [disableForm, setdisableForm] = useState('')
  const [disableFormTime, setdisableFormTime] = useState('')
  const [userDetails, setuserDetails] = useState({
    userSugar: '',
    userMeal: '',
    userLaunch: '',
    userDinner: '',
    userExercise: '',
    healthissues: '',
  })
  let id = localStorage.getItem('userId')

  //setting time for enabling form to open
  let currentTime = new Date()
  // let time =
  //   currentTime.getHours() + ':' + currentTime.getMinutes() + ':' + currentTime.getSeconds()
  let openingTime = Math.abs(20 - currentTime.getHours())


  useEffect(() => {
    Axios.put('http://localhost:3001/api/users/getuser', {
      user_id: id,
    })
      .then((res) => {
        if (res.data.success == 1) {
          console.log('response good')
          console.log(res.data)
          const username = res.data.data.name

          Axios.put('http://localhost:3001/api/userDetails/getsubmissionDate/', {
            username: username,
            todayDate: new Date().toLocaleDateString(),
          })
            .then((res) => {
              //handle success
              if (res.data.data) {

                setdisableForm('disabled')


                if (openingTime )
                  setdisableFormTime(`Your form  opens in ${openingTime} hour`)
                else {
                  setdisableFormTime(`Your form  opens in less than ${openingTime} hour`)
                }
              } else {
                // setdisableForm('')

                if (currentTime.getHours() >= 20 && currentTime.getHours() <= 24) {
                  setdisableForm('')
                  setdisableFormTime(`Your form  is available only between 8 PM to 12 AM`)

                } else {
                  setdisableForm('disabled')

                  // const enableForm=()=>
                  // {
                  //   const openingTime=`${Math.abs(9-currentTime.getHours())}:${Math.abs(59-currentTime.getMinutes())}:${Math.abs(60-currentTime.getSeconds())}`
                  // console.log(openingTime)
                  // console.log(time)
                  // setdisableFormTime(`Your form  opens in ${openingTime}`);
                  // }
                  // setInterval(enableForm, 1000)

                  if (openingTime > 1)
                    setdisableFormTime(`Your form  opens in ${openingTime} hour`)
                  else {
                    setdisableFormTime(`Your form  opens in less than ${openingTime} hour`)
                  }
                }
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
  }, [])

  const handleInput = (event) => {
    const name = event.target.name
    const value = event.target.value
    setuserDetails({ ...userDetails, [name]: value })
    // console.log(name, value)
    setdisplayerror('')
  }

  //sending form data on submit click....
  const addDetails = async (e) => {
    e.preventDefault()
    const { userSugar, userMeal, userLaunch, userDinner, userExercise, healthissues } = userDetails
    let username = ''

    // console.log(id)

    let today = new Date().toLocaleDateString()
    if (userMeal === '' || (userDinner === '' && userDinner === '')) {
      setdisplayerror('Fields cannot be empty')
    } else {
      Axios.put('http://localhost:3001/api/users/getuser', {
        user_id: id,
      })
        .then((res) => {
          if (res.data.success == 1) {
            // console.log("response good")
            console.log(res.data)
            username = res.data.data.name

            Axios.post('http://localhost:3001/api/userDetails', {
              sugar_level: userSugar,
              morning_meal: userMeal,
              launch: userLaunch,
              dinner: userDinner,
              exercise_time: userExercise,
              health_issues: healthissues,
              today_date: today,
              username: username,
            })
              .then((res) => {
                //handle success
                if (res.data.success == 1) {
                  alert('Submitted Successfully')

                  setdisableForm('disabled')


                  if (openingTime > 1)
                    setdisableFormTime(`Your form  opens in ${openingTime} hour`)
                  else {
                    setdisableFormTime(`Your form  opens in less than ${openingTime} hour`)
                  }


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
                        disabled={disableForm}
                        style={{ width: '100%' }}
                        name="userSugar"
                        id="userSugar"
                        autoComplete="off"
                        value={userDetails.userSugar}
                        onChange={handleInput}
                        label="Sugar Level (optional)"
                        type="number"
                        variant="standard"
                      />
                    </CInputGroup>

                    <CInputGroup className="mb-4">
                      <TextField
                        disabled={disableForm}
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

                    <CInputGroup className="mb-4">
                      <TextField
                        disabled={disableForm}
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

                    <CInputGroup className="mb-4">
                      <TextField
                        disabled={disableForm}
                        style={{ width: '100%' }}
                        name="userDinner"
                        id="userDinner"
                        autoComplete="off"
                        value={userDetails.userDinner}
                        onChange={handleInput}
                        label="Dinner"
                        type="text"
                        variant="standard"
                      />
                    </CInputGroup>

                    <CInputGroup className="mb-4">
                      <TextField
                        disabled={disableForm}
                        style={{ width: '100%' }}
                        name="userExercise"
                        id="userExercise"
                        autoComplete="off"
                        value={userDetails.userExercise}
                        onChange={handleInput}
                        label="Exercise time (optional)"
                        type="number"
                        variant="standard"
                      />
                    </CInputGroup>

                    <CInputGroup className="mb-1">
                      <TextField
                        disabled={disableForm}
                        style={{ width: '100%' }}
                        name="healthissues"
                        id="outlined-multiline-static"
                        autoComplete="off"
                        value={userDetails.healthissues}
                        onChange={handleInput}
                        label="Any health issues (optional)"
                        type="text"
                        multiline
                        rows={4}
                        variant="standard"
                      />
                    </CInputGroup>

                    <span className="text-danger ms-1">{displayError}</span>

                    <CInputGroup className="mb-2 mt-3 align-center">
                      <Button
                        disabled={disableForm}
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
              <CCard className="text-black bg-gradient py-5 form_enabling">
                <b
                style={{
                  width:'90%',
    textAlign:'center',
    margin: '0 auto',
    color: 'black',


    padding: '5px 10px',

    animationName: 'span_animation',
    animationDuration: '0.5s',
    animationIterationCount: 'infinite',

                }}>
                  <CIcon icon={cilWarning}
                    /> {disableFormTime}
                </b>
                <CCardBody className='d-flex justify-content-center align-items-center'>
                  <img src={register_image} alt="GIF" style={{ overflow: 'hidden' , maxWidth: '100%',
        maxHeight: '100%',
        display: 'block',objectFit: 'cover'}} />
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
