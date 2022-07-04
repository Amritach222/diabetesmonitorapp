import React, {useState} from 'react'
import {CButton, CCard, CCardBody, CCardHeader, CCardText, CCardTitle, CCol, CForm, CFormInput} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {cilSettings} from "@coreui/icons";
import Axios from "axios";
import {toast, ToastContainer} from 'react-toastify'
// Import toastify css file
import 'react-toastify/dist/ReactToastify.css';
const Settings=()=>{
  const id= localStorage.getItem("userId")
  const [password, setPassword]=useState('')
  const [matcherror, setMatcherror]=useState('')
  const [cpassword, setCpassword]=useState('')
  const [perror, setPerror]=useState('')
  const [openpassword,setOpenpassword]=useState(false)
  const [validated, setValidated] = useState(false)
  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
  }
  const getPassword =(e)=>{
      if (e.target.value.length<8){
        setPerror("Password must have at least 8 characters.")
      }else{
        setPerror('')
        setPassword(e.target.value)
      }
  }
  const matchPassword =(e)=>{
    if(password!='' || cpassword!='' || password.length>=8) {
      if (password.match(cpassword)) {
        Axios.put('http://localhost:3001/api/users/updatepassword', {
          id: id
        }).then((res) => {
          if (res.data.message) {
            toast(res.data.message)
            setMatcherror('')
          }
        }).catch((error) => {
          console.log("Error Occured", error)
        })
      } else {
        setMatcherror("Password must me matched")
      }
    }
  }
  const changePassword=()=>{
    setOpenpassword(!openpassword)
  }
  return(
    <div>
      <ToastContainer/>
      <CCard>
        <CCardHeader><CIcon icon={cilSettings} /> Settings</CCardHeader>
        <CCardBody>
          <CCardTitle></CCardTitle>
          <CButton onClick={()=>{changePassword()}} color="warning" variant="outline">Change Password</CButton>
          <div className={openpassword?'':'d-none'}>
            <CForm
              className="row g-3 needs-validation d-flex"
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
            >
              <CCol md={4}>
                <CFormInput
                  type="password"
                  feedbackValid="Looks good!"
                  id="validationCustom01"
                  label="Password"
                  required
                  onChange={(e)=>{getPassword(e)}}
                />
                <small style={{color:"red"}}>{perror}</small>
              </CCol>
              <CCol md={4}>
                <CFormInput
                  type="password"
                  feedbackValid="Looks good!"
                  id="validationCustom02"
                  label="Confirm Password"
                  onChange={(e)=>{setCpassword(e.target.value)}}
                  required
                />
                <small style={{color:"red"}}>{matcherror}</small>
              </CCol>
              <CCol className="d-flex justify-content-end align-items-center" md={4}>
              <CButton className="" style={{width:'fit-content', height:'fit-content'}} color="info" onClick={()=>{matchPassword()}}>Apply</CButton>
              </CCol>
              </CForm>
          </div>
        </CCardBody>
      </CCard>
    </div>
  )
}

export  default Settings;
