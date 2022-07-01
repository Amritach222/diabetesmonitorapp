import React, {useEffect, useState} from 'react'
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

  useEffect(()=>{
      setDisplayClass(doctor)
    },
    [doctor]
  )
  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
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
              type="text"
              feedbackValid="Looks good!"
              id="validationCustom01"
              label="Enter Name"
              required
            />
          </div>
          <div className="email_container">
            <CFormInput
              type="email"
              feedbackValid="Looks good!"
              id="validationCustom02"
              label="Enter Email Address"
              required
            />
          </div>
          <div className="name_container">
            <CFormInput
              type="number"
              feedbackValid="Looks good!"
              id="validationCustom03"
              label="Enter Phone number"
              required
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
