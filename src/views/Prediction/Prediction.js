import React, { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import Button from '@mui/material/Button'
import register_image from "../../assets/images/diabetes/register.png"
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

const Prediction =()=>{



  const [predictionDetails, setpredictionDetails] = useState({
   
    pregnancy: '',
    glucose: '',
    blood_pressure: '',
    skin_thickness: '',
    insulin: '',
    bmi: '',
    predegree_function: '',
  })
const [displayError, setdisplayError] = useState('')

  const handleInput = (event) => {
    const name = event.target.name
    const value = event.target.value
    setpredictionDetails({ ...predictionDetails, [name]: value })
    // console.log(name, value)
    setdisplayError('')
  }

  const addPredictionDetails = async (e) => {
    e.preventDefault()
    
    const {pregnancy, glucose, blood_pressure, skin_thickness, insulin, bmi, predegree_function } = predictionDetails
if(pregnancy===''&& glucose===''&& blood_pressure===''&& skin_thickness==='' && insulin==='' &&  bmi===''&& predegree_function==='')
{
  setdisplayError('Please ! Fill your form')
}
else
{


    let id = localStorage.getItem('userId')
   Axios.post('http://localhost:3001/api/prediction/', {
    user_id:id,
            pregnancy: pregnancy,
            glucose: glucose,
            blood_pressure: blood_pressure,   
            skin_thickness: skin_thickness,
            insulin: insulin,
            bmi: bmi,
            predegree_function:predegree_function
          })
            .then((res) => {
              //handle success
              console.log(res);
              if (res.data.success === 1) {
                

  }})

            .catch((res) => {
              //handle error
              console.log(res)
              if (res.data.success === 0) {
                alert('Something went wrong')
              }
            })
        }}


  return(
    <div>
     <CContainer >

<CRow className="justify-content-center">
  <CCol md={12}>
    <CCardGroup >
    <CCard className>
      <CCardBody className="p-4"  >
        <CForm action="">
          <h1>Predict Your Result</h1>
          <p className="text-medium-emphasis">See what your Diabetes condition is </p>


<div className='d-flex'>


<CInputGroup className="mb-1 me-1">
            <TextField
              style={{ width: '100%' }}
              name="pregnancy"
              id="pregnancy"
              autoComplete="off"
              value={predictionDetails.pregnancy}
              onChange={handleInput}
              label="Pregnancy"
              type="number"
              variant="standard"
            />
          </CInputGroup>

          
          <CInputGroup className="mb-1 ms-1">
            <TextField
              style={{ width: '100%' }}
              name="glucose"
              id="glucose"
              autoComplete="off"
              value={predictionDetails.glucose}
              onChange={handleInput}
              label="Glucose"
              type="number"
              variant="standard"
            />
          </CInputGroup>
</div>

<div className='d-flex'>
<CInputGroup className="mb-1 me-1">
            <TextField
              style={{ width: '100%' }}
              label="Bloodpressure"
              type="number"
              variant="standard"
              name="blood_pressure"
              id="bloodpressure"
              autoComplete="off"
              value={predictionDetails.blood_pressure}
              onChange={handleInput}
            />
          </CInputGroup>
      
          <CInputGroup className="mb-1 ms-1">
            <TextField
              style={{ width: '100%' }}
              label="Skinthickness"
              type="number"
              variant="standard"
              name="skin_thickness"
              id="skinthickness"
              autoComplete="off"
              value={predictionDetails.skin_thickness}
              onChange={handleInput}
            />
          </CInputGroup>
         

      
</div>

<div className='d-flex'>    
          <CInputGroup className="mb-1 me-1">
            <TextField
              style={{ width: '100%' }}
              label="Insulin"
              type="number"
              variant="standard"

              name="insulin"
              id="insulin"
              autoComplete="off"
              value={predictionDetails.insulin}
              onChange={handleInput}
            />
          </CInputGroup>
          <CInputGroup className="mb-1 ms-1">
            <TextField
              style={{ width: '100%' }}
              label="BMI"
              type="number"
              variant="standard"
              name="bmi"
              id="bmi"
              autoComplete="off"
              value={predictionDetails.bmi}
              onChange={handleInput}
            />
          </CInputGroup>
</div>
          <CInputGroup className="mb-5">
            <TextField
              style={{ width: '49.8%' }}
              label="Diabetes Predegree Function"
              type="number"
              variant="standard"
              name="predegree_function"
              id="predegreefunction"
              autoComplete="off"
              value={predictionDetails.predegree_function}
              onChange={handleInput}
            />
          </CInputGroup>
         
          
          <CInputGroup className="mb-2 align-center">
            <Button
              variant="contained"
              type="submit"
              onClick={addPredictionDetails}
            >
              Predict
            </Button>
          </CInputGroup>
<span className='text-danger ms-1'>{displayError}</span>


        </CForm>
       
        
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
export  default Prediction
