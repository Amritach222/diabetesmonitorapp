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
import {toast, ToastContainer} from 'react-toastify'
import { cilPencil} from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import Axios from "axios";
// Import toastify css file
import 'react-toastify/dist/ReactToastify.css';
const Profile =()=>{
  //setprofile
  const [username,setUsername]=useState('')
  const [age,setAge]=useState('')
  const [weight,setWeight]=useState('')
  const [email,setEmail]=useState('')
  const [file, setFile] = useState({preview:'',data:''});// This state  for set Image
  useEffect(()=>{
    const userId=window.localStorage.getItem('userId')
    Axios.put('http://localhost:3001/api/users/getprofile',{id:userId})
      .then((res)=>{
        if(res.data.data){
          const image_path=res.data.data.image
          let path=image_path.substr(7); // Removing 'public/' from image url
          setFile({preview:'http://localhost:3001/'+path})
          setUsername(res.data.data.name);
          setAge(res.data.data.age)
          setWeight(res.data.data.weight)
          setEmail(res.data.data.email)
        }
      }).catch((err)=>{
      console.log("Something went wrong", err)
    })
    },[]
  )
  const [validated, setValidated] = useState(false)
  const handleSubmit = async (event) => {
    event.preventDefault()
    const userId=window.localStorage.getItem('userId')
    // create instane of FormData to upload an image
    const formData= new FormData();
    formData.append("profileImage",file.data)
    formData.append("username",username)
    formData.append("age",age)
    formData.append("weight",weight)
    formData.append("email",email)
    formData.append("id",userId)

    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
      setUsername(event.target.username.value)
      setAge(event.target.age.value)
      setWeight(event.target.weight.value)
      setEmail(event.target.email.value)
    console.log(age)
    await Axios.post('http://localhost:3001/api/users/updateuser',
      formData
    ).then((res)=>{
      if (res.data.message){

        toast(res.data.message);
      }
      else{
        console.log("something went wrong")
      }
    }).catch((err)=>{
      console.log("error occured",err.message)
    })
    setValidated(true)
  }
  const changeUsername=(e)=>{
    setUsername(e.target.value)
  }
  const changeAge=(e)=>{
    setAge(e.target.value)
  }
  const changeWeight=(e)=>{
    setWeight(e.target.value)
  }
  const changeEmail=(e)=>{
    setEmail(e.target.value)
  }
const changeProfileImage=(e)=>{
  const img = {
    preview: URL.createObjectURL(e.target.files[0]),
    data: e.target.files[0],
  }
  setFile(img)
}
  return (
    <div>
      <ToastContainer/>
      <CCard >
        <CCardBody>

          <div className="card_container d-flex justify-content-around flex-wrap">
            <div className="card_container_left mt-4">
          <div className="position-relative" >
            <CImage rounded src={file.preview} width={200} height={200} />
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
                value={username}
                contentEditable={true}
                type="text"
                name="username"
                feedbackValid="Looks good!"
                id="validationCustom01"
                label="Username"
                onChange={(e)=>{changeUsername(e)}}
                required
                disabled
              />
              </div>
              <div className="age_container">
                <CFormInput
                  value={age}
                  contentEditable={true}
                  type="number"
                  name="age"
                  feedbackValid="Looks good!"
                  id="validationCustom01"
                  label="Age"
                  onChange={(e)=>{changeAge(e)}}
                  required
                />
                <div className="weight_container">
                  <CFormInput
                    value={weight}
                    contentEditable="true"
                    type="number"
                    name="weight"
                    feedbackValid="Looks good!"
                    id="validationCustom01"
                    label="Weight"
                    onChange={(e)=>{changeWeight(e)}}
                    required
                  />
              </div>
                <div className="email_container">
                  <CFormInput
                    value={email}
                    type="email"
                    name="email"
                    contentEditable="true"
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
                    name="profileImage"
                    feedbackValid="Looks good!"
                    id="validationCustom01"
                    label="Choose your profile image"
                    onChange={(e)=>{changeProfileImage(e)}}
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
