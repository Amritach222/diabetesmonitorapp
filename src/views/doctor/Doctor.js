import React, {useEffect, useState} from 'react'
import Axios from 'axios'
import {
  CButton,
  CCard,
  CCardBody,
  CCardImage,
  CCardText,
  CCardTitle,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea
} from "@coreui/react";
import './doctor.scss'
import doctor_image from './regular-checkups_banner.jpg'
const doctor={
  name: " Amrit Acharya",
  email: "amritach222@gmail.com",
  phone:"9814119703"
}
const Doctor =()=>{
  const [displayclass, setDisplayClass]=useState(false);
  const [validated, setValidated] = useState(false)

  const [doctorDetails, setdoctorDetails] = useState({
    doctorName: '',
    doctorEmail: '',
    doctorPhone: '',
  })
  // const changeName=(e)=>{
  //   setdoctorDetails({doctorName:e.target.value})
  // }
  // const changeEmail=(e)=>{
  //   setdoctorDetails({doctorEmail:e.target.value})
  // }
  // const changePhone=(e)=>{
  //   setdoctorDetails({doctorPhone:e.target.value})
  // }

  let id=localStorage.getItem('userId')

  useEffect(()=>
  {
          Axios.put( 'http://localhost:3001/api/doctors/getDoctor/',{
            user_id:id
           })
           .then((res) => {
             //handle success
             if(res.data.data)
             {

              // console.log("Fetching Doctor Details")
              // console.log(res.data.data)
              const doctor_details=res.data.data
    setDisplayClass({name:doctor_details.name,email:doctor_details.email,phone:doctor_details.phone})
              }
              else
              {
                console.log("Fetching Error")
                setDisplayClass(false);
              }
            })
            .catch((res) => {
              //handle error
              console.log(res)
            })

  },[doctorDetails])


  const handleInput = (event) => {
    const name = event.target.name
    const value = event.target.value
    setdoctorDetails({ ...doctorDetails, [name]: value })
    console.log(name, value)
  }
  const handleSubmit = (event) => {
    const form = event.currentTarget


    if (form.checkValidity() === false) {

      event.stopPropagation();
      event.preventDefault();
    }else {
      const {doctorName, doctorEmail, doctorPhone} = doctorDetails
      console.log(doctorDetails)

      Axios.post('http://localhost:3001/api/doctors/', {
        doctorName,
        doctorEmail,
        doctorPhone,
        user_id: id
      })
        .then((res) => {
          //handle success
          if (res.data.success == 1) {

            //  alert("Submitted Successfully");
            setDisplayClass({name: doctorName, email: doctorEmail, phone: doctorPhone})


          } else {
            alert("Not Submitted")
          }
        })
        .catch((res) => {
          //handle error
          console.log(res)
        })
    }
        setValidated(true)
      }


  return (
      <div>
        <CCard className={displayclass?'doctorform p-5':'p-5'}>
  <CForm
    className="g-3 needs-validation"
    noValidate
    validated={validated}
    onSubmit={handleSubmit}
  >
          <h3>Add your doctor</h3>
        <div className="mb-3 d-flex justify-content-between flex-wrap align-items-center">
          <div className="name_container">
            <CFormInput
             name='doctorName'
            value={doctorDetails.doctorName}
              type="text"
              feedbackValid="Looks good!"
              id="validationCustom01"
              label="Enter Name"
              required
              onChange={handleInput}
            />
          </div>
          <div className="email_container">
            <CFormInput
            name='doctorEmail'
            value={doctorDetails.doctorEmail}
              type="email"
              feedbackValid="Looks good!"
              id="validationCustom02"
              label="Enter Email Address"
              required
              onChange={handleInput}
            />
          </div>
          <div className="name_container">
            <CFormInput
             name='doctorPhone'
            value={doctorDetails.doctorPhone}
              type="number"
              feedbackValid="Looks good!"
              id="validationCustom03"
              label="Enter Phone number"
              required
              onChange={handleInput}
            />
        </div>
        </div>
        <div className="mb-3 float-end">
          <CButton color="primary" type="submit" variant="outline">Add Doctor</CButton>
        </div>
      </CForm>
          </CCard>
        {/* This class for  showing doctor detail*/}
        <CCard style={{ width: '18rem' }} className={!displayclass?'doctorform':''}>
          <CCardImage orientation="top" src={doctor_image} />
          <CCardBody>
            <CCardTitle>{displayclass.name}</CCardTitle>
            <CCardText>
              Email:{' '+displayclass.email} <br/>
              Phone: {' '+displayclass.phone}
            </CCardText>
            <CButton href="#">Contact</CButton>
          </CCardBody>
        </CCard>
      </div>
  )
}
export default  Doctor
