import React, {useState} from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardText,
  CCardTitle,
  CCol,
  CForm,
  CFormInput, CImage,
  CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {cilDelete, cilSettings, cilWarning} from "@coreui/icons";
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
  const [opendoctor,setOpendoctor]=useState(false)
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [phone,setPhone]=useState('')
  const [emailerror,setEmailerror]=useState('')
  const [phoneerror,setPhoneerror]=useState('')
  const [doctorerror,setDoctorerror]=useState('')
  const [visible, setVisible] = useState(false)
  const [deletetext, setDeletetext] = useState(false)
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
    if(password!='' || cpassword!='') {
      if (password.length>=8){
      if (password===cpassword) {
        Axios.put('http://localhost:3001/api/users/updatepassword', {
          id: id,
          password:password
        }).then((res) => {
          if (res.data.message) {
            toast(res.data.message)
            setMatcherror('')
          }
        }).catch((error) => {
          console.log("Error Occured", error)
        })
      }
      else {
        setMatcherror("Password must be matched")
      }
      }
    }
  }
  //open Change password form
  const changePassword=()=>{
    setOpenpassword(!openpassword)
  }
  //Open change doctor form
  const changeDoctor=()=>{
    setOpendoctor(!opendoctor)
  }
  // handle doctor field empty
  const handleDoctorerror=()=>{
    const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
    if (name==='' || email==='' || phone===''){
      setDoctorerror("Fields can't be empty")
    }
    else{
      setDoctorerror('')
      if(pattern.test(email)){
        setEmailerror('')
        if(phone.length!==10){
          setPhoneerror("Phone number must have 10 digit")
        }else{
          setPhoneerror('')
          Axios.put('http://localhost:3001/api/doctors/updatedoctor/',
            {
              id:id,
              name:name,
              email:email,
              phone:phone
            }).then((res)=>{
              if(res.data.success===1){
                toast(res.data.message);
              }
          }).catch((err)=>{
            console.log("Error occured", err)
          })
        }
      }
      else{
        setEmailerror("Invalid email")
      }

    }
  }
  // This is distructive function which deletes overall account of a user
  const deleteAccount=()=>{
        Axios.put('http://localhost:3001/api/users/getprofile',{
          id:id
        }).then((res)=>{
          if(res.data.data){
            const username=res.data.data.name
            console.log(username)
            Axios.put('http://localhost:3001/api/users/deleteaccount/',
              {
                id:id,
                username:username
              }).then((res)=>{
                if(res.data.message){
                  toast("Deleted")
                  setVisible(false)
                  setDeletetext(true)
                  localStorage.removeItem("userId");
                  window.location.reload()
                }
                else {
                  toast("Something went wrong ")
                }
            })
          }else{
            toast("unable to delete user")
          }
        }).catch((err)=>{
          console.log("Error occured",err)
        })
  }
  return(
    <div>
      <ToastContainer/>
      <CCard>
        <CCardHeader><CIcon icon={cilSettings} /> Settings</CCardHeader>
        <CCardBody>
          <CCardTitle></CCardTitle>
          <CButton onClick={()=>{changePassword()}} color="warning" variant="outline">Change Password</CButton>
          <br/><div className={openpassword?'':'d-none'}>
          <br/>
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
            <br/>
          <CButton onClick={()=>{changeDoctor()}} color="primary" variant="outline">Update your doctor</CButton>
          <div className={opendoctor?'':'d-none'}>
            <br/>
            <CForm
              className="row g-3 needs-validation d-flex"
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
            >
              <CCol md={3}>
                <CFormInput
                  type="text"
                  value={name}
                  feedbackValid="Looks good!"
                  id="validationCustom01"
                  label="Name"
                  required
                  onChange={(e)=>{setName(e.target.value)}}
                />
              </CCol>
              <CCol md={3}>
                <CFormInput
                  type="email"
                  value={email}
                  feedbackValid="Looks good!"
                  id="validationCustom02"
                  label="Email"
                  onChange={(e)=>{setEmail(e.target.value)}}
                  required
                />
                <small style={{color:"red"}}>{emailerror}</small>
              </CCol>
              <CCol md={3}>
                <CFormInput
                  type="number"
                  value={phone}
                  feedbackValid="Looks good!"
                  id="validationCustom02"
                  label="Phone"
                  onChange={(e)=>{setPhone(e.target.value)}}
                  required
                />
                <small style={{color:"red"}}>{phoneerror}</small>
              </CCol>
              <CCol className="d-flex justify-content-end align-items-center" md={3}>
                <CButton className="" style={{width:'fit-content', height:'fit-content'}} color="info" onClick={()=>{handleDoctorerror()}}>Apply</CButton>
              </CCol>
            </CForm>
            <small style={{color:"red"}}>{doctorerror}</small>
          </div>
          <br/>
          <div className="delete_account_container d-flex justify-content-center" >
            <br/>
            <span onClick={()=>{setVisible(!visible)}} style={{color:'red', cursor:"pointer"}}><CIcon icon={cilDelete}/> <small>Delete Account</small></span>
          </div>
          <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
            <CModalBody>
              <div className="text-danger d-flex justify-content-center flex-column">
                <div className="text-center">
              <CIcon className="text-center"  icon={cilWarning}/>
                </div>
                <span style={{fontSize:'13px'}} className="text-center">
                {`  Are you sure you want to delete your whole account?\n
                You'll lose everything. Usernames,\n themes, the love we shared, likes messages,\n
                and everything you've ever posted will be gone forever. `}

                </span>
              </div>
            </CModalBody>
              <CModalFooter>
                <CButton color="secondary" onClick={() => setVisible(false)}>
                  Close
                </CButton>
                <CButton onClick={()=>{
                  deleteAccount()
                }} color="danger">Confirm</CButton>
              </CModalFooter>
          </CModal>
          <CModal alignment="center" visible={deletetext} onClose={() => setDeletetext(true)}>
            <CModalBody>
              <div className="text-dark d-flex justify-content-center flex-column">
                <div className="text-center">
                  <CImage   src="https://images-na.ssl-images-amazon.com/images/I/711NDQNFqxL.png" width={90} height={90} />
                </div>
                <span style={{fontSize:'13px'}} className="text-center">
                {`  Your account is completely deleted. We will miss you so badly!,
                 If you want to rejoin with us to track your  diabetes activity. You have an option to rejoin 😊`}
                  <a href="http://localhost:3000/#/register">Click here to rejoin</a> Thank You!
                </span>
              </div>
            </CModalBody>

          </CModal>
        </CCardBody>
      </CCard>
    </div>
  )
}

export  default Settings;
