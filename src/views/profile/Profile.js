import React, {useEffect, useState} from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardLink,
  CCardSubtitle,
  CCardText,
  CCardTitle,
  CForm,
  CFormInput,
  CImage
} from "@coreui/react";
import p_image from './pexels-tomé-louro-1666779.jpg'
import image1 from './download.jpg'
import {cilAudioSpectrum, cilPencil} from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import Axios from "axios";
const Profile =()=>{
  //setprofile
  const [username,setUsername]=useState('')
  const [profile, setProfile]=useState({
    name:"amritach",
    age:23,
    weight:75,
    email:'amritach222@gmail.com'
  })
  useEffect(()=>{
    const userId=window.localStorage.getItem('userId')
    Axios.put('http://localhost:3001/api/users/getprofile',{id:userId})
      .then((res)=>{
        if(res.data.data){
          setProfile({
            name:res.data.data.name,
            age:res.data.data.age,
            weight: res.data.data.weight,
            email: res.data.data.email
          })
          setUsername(res.data.data.name);
        }
      }).catch((err)=>{
      console.log("Something went wrong", err)
    })
    },[]
  )
  const [validated, setValidated] = useState(false)
  // change image state
  const [image, setImage]=useState(p_image)
  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    // Create Object of form data
    // const formData= new FormData();
    // formData.append("profileImage",image)
    const userId=window.localStorage.getItem('userId')
    Axios.put('http://localhost:3001/api/users/updateuser',{
      id:userId,
      username:profile.name,
      age:profile.age,
      weight:profile.weight,
      email:profile.email,
      image:'amrit/image1.jpg',
    }).then((res)=>{
      if (res.data.success==1){
        console.log(profile.name)
        console.log(res.data.message)
      }
      else{
        console.log("something went wrong")
      }
    }).catch((err)=>{
      console.log("error occured",err.message)
    })
    setValidated(true)
  }
  const changeProfileImage=(e)=>{
    setImage(e.target.files[0])
  }
  //change user name
  const changeUsername=(e)=>{
    console.log(e.target.value)
    setProfile({name:e.target.value})
  }
  //change age
  const changeAge=(e)=>{
    setProfile({age:e.target.value})
  }
  //change weight
  const changeWeight=(e)=>{
    setProfile({weight:e.target.value})
  }
  //change email
  const changeEmail=(e)=>{
    setProfile({email:e.target.value})
  }
  return (
    <div>
      <CCard >
        <CCardBody>

          <div className="card_container d-flex justify-content-around flex-wrap">
            <div className="card_container_left mt-4">
          <div className="position-relative" >
            <CImage rounded src={image} width={200} height={200} />
          </div>
            </div>
            <div className="card_container_right">
              <div className="d-flex align-items-center ms-1">
              <b> Update your profile</b> <CIcon className="ms-1" style={{background:"lightgray", borderRadius:'50%' ,color:'green', padding:'1px'}} icon={cilPencil} />
              </div>
          <CCardText>
            <CCard className="p-4">
            <CForm
              encType="multipart/form-data"
              className="row g-3 needs-validation"
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
            >
              <div className="name_container">
              <CFormInput
                value={profile.name}
                type="text"
                feedbackValid="Looks good!"
                id="validationCustom01"
                label="Username"
                onChange={(e)=>{changeUsername(e)}}
                required
              />
              </div>
              <div className="age_container">
                <CFormInput
                  value={profile.age}
                  type="number"
                  feedbackValid="Looks good!"
                  id="validationCustom01"
                  label="Age"
                  onChange={(e)=>{changeAge(e)}}
                  required
                />
                <div className="weight_container">
                  <CFormInput
                    value={profile.weight}
                    type="number"
                    feedbackValid="Looks good!"
                    id="validationCustom01"
                    label="Weight"
                    onChange={(e)=>{changeWeight(e)}}
                    required
                  />
              </div>
                <div className="email_container">
                  <CFormInput
                    value={profile.email}
                    type="email"
                    feedbackValid="Looks good!"
                    id="validationCustom01"
                    label="Email"
                    onChange={(e)=>{changeEmail(e)}}
                    required
                  />
                </div>
                <div className="image_container">
                  <CFormInput
                    style={{border:'none'}}
                    type="file"
                    name="image"
                    feedbackValid="Looks good!"
                    id="validationCustom01"
                    label="Choose your profile image"
                    required
                  />
                </div>
              <div className="mt-2 float-end">
                <CButton color="success" type="submit" variant="outline">Save Changes</CButton>
              </div>
              </div>
              </CForm>
            </CCard>
          </CCardText>
            </div>
          </div>
        </CCardBody>
      </CCard>
    </div>
  )
}
export default  Profile;
