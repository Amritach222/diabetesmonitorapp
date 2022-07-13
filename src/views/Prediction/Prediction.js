import React, {useEffect, useState} from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import Button from '@mui/material/Button'
import register_image from "../../assets/images/diabetes/register.png"
import happy from './Happy.jpg'
import sad from './sad.jfif'
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
  let id = localStorage.getItem('userId')
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
const [age, setAge] = useState(null)
const [predict, setPredict] = useState(null)
useEffect(()=>{
  Axios.put('http://localhost:3001/api/users/getprofile',
    {id:id}).then((res)=>{
    if(res.data.data){
      setAge(res.data.data.age)
}
else {
    console.log("Unable to get user age")
  }
}).catch((error)=>{
  console.log("Error in retrieving age",error)
})
},[])
  const handleInput = (event) => {
    const name = event.target.name
    const value = event.target.value
    setpredictionDetails({ ...predictionDetails, [name]: value })
    // console.log(name, value)
    setdisplayError('')
  }

  const addPredictionDetails = async (e) => {
    e.preventDefault()

    const {pregnancies, glucose, bloodpressure, skinthickness, insulin, bmi, dpf } = predictionDetails
if(pregnancies===''|| glucose===''|| bloodpressure===''|| skinthickness==='' || insulin==='' || bmi===''|| dpf==='')
{
  setdisplayError('Please ! Fill your form')
}
else
{
        Axios.post('http://localhost:3001/api/prediction/', {
          user_id:id,
          pregnancy: pregnancies,
          glucose: glucose,
          blood_pressure: bloodpressure,
          skin_thickness: skinthickness,
          insulin: insulin,
          bmi: bmi,
          predegree_function:dpf
        })
          .then((res) => {
            //handle success
            console.log(res);
            if (res.data.success === 1) {
              const predictData=new FormData()
              predictData.append("pregnancies",pregnancies)
              predictData.append("glucose",glucose)
              predictData.append("bloodpressure",bloodpressure)
              predictData.append("skinthickness",skinthickness)
              predictData.append("insulin",insulin)
              predictData.append("bmi",bmi)
              predictData.append("dpf",dpf)
              predictData.append("age",age)
              Axios.post('http://127.0.0.1:5000/predict',predictData).then((res)=>{
                if(res){
                  console.log("This is your result: ", res.data);
                  if(res.data=='0'){
                    setPredict(false)
                  }
                  if (res.data=='1'){
                    setPredict(true)
                  }
                }else{
                  console.log("Something went wrong!")
                }
              }).catch((err)=>{
                console.log("Unable to predict",err)
              })
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
              name="pregnancies"
              id="pregnancy"
              autoComplete="off"
              value={predictionDetails.pregnancies}
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
              label="Glucose (mg/dL)"
              type="number"
              variant="standard"
            />
          </CInputGroup>
</div>

<div className='d-flex'>
<CInputGroup className="mb-1 me-1">
            <TextField
              style={{ width: '100%' }}
              label="Bloodpressure (mmHg)"
              type="number"
              variant="standard"
              name="bloodpressure"
              id="bloodpressure"
              autoComplete="off"
              value={predictionDetails.bloodpressure}
              onChange={handleInput}
            />
          </CInputGroup>

          <CInputGroup className="mb-1 ms-1">
            <TextField
              style={{ width: '100%' }}
              label="Skinthickness (mm) "
              type="number"
              variant="standard"
              name="skinthickness"
              id="skinthickness"
              autoComplete="off"
              value={predictionDetails.skinthickness}
              onChange={handleInput}
            />
          </CInputGroup>



</div>

<div className='d-flex'>
          <CInputGroup className="mb-1 me-1">
            <TextField
              style={{ width: '100%' }}
              label="Insulin (IU/mL) "
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
              label="BMI (kg/m²)"
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
              name="dpf"
              id="predegreefunction"
              autoComplete="off"
              value={predictionDetails.dpf}
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
                  {predict===null?<p><img src={register_image} alt="GIF"  style={{overflow:"hidden"}} width={300} height={300}/></p>:<p></p>}
                  {predict===true?
                    <div className="">
                    <p className="text-warning" style={{fontSize:'20px'}}
                    >OOps! You have diabetes</p>
                    <img src={sad} alt="GIF"  style={{overflow:"hidden"}} width={300} height={300}/>
                    </div>:<p></p>}
                  {predict===false?
                    <div className="">
                    <p className="text-success" style={{fontSize:'20px'}}>Congratulations! you have no diabetes</p>
                    <img src={happy} alt="GIF"  style={{overflow:"hidden"}} width={300} height={300}/>
                    </div>
                    :<p></p>}

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
