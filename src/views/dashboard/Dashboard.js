import React, {useEffect, useState} from 'react'
import Prediction from "../Prediction/Prediction"

import {
  // CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardHeader,
  CCol, CFormInput, CImage, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import {
  cibGoogle,
  cibFacebook,
  cibLinkedin,

  cibTwitter,
  cilCloudDownload,
  cilUser,
  cilUserFemale,
  cilPencil,
} from '@coreui/icons'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import Axios from "axios";
import {toast, ToastContainer} from 'react-toastify'
// Import toastify css file
import 'react-toastify/dist/ReactToastify.css';
const beans=require('./foodImages/beans.jpg')
const  brocouli=require('./foodImages/broccoli-florets.webp')
const  eggs=require('./foodImages/Brown-eggs.webp')
const  fish=require('./foodImages/fattyfish.webp')
const  garlic=require('./foodImages/garlic-benefits-for-heart.jpg')
const  yogurt=require('./foodImages/greek-yogurt-social.jpg')
const  greens=require('./foodImages/leafy greens.jpg')
const  nuts=require('./foodImages/Nuts.jpg')
const  seeds=require('./foodImages/side-effects-of-flax-seeds.webp')
const  strawberry=require('./foodImages/strawberry.jfif')
const Dashboard = () => {
  const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
  const [user,setUser]=useState();
  const [id,setId]=useState();
  const [userTable,setUserTable]=useState([])
  const [visible, setVisible] = useState(false)
  const [updateData,setUpdateData]=useState({})
  // set datas
  const [sugar,setSugar]=useState('')
  const [breakfast,setBreakfast]=useState('')
  const [lunch,setLunch]=useState('')
  const [dinner,setDinner]=useState('')
  const [etime,setEtime]=useState('')
  useEffect( ()=>{
    let userId=localStorage.getItem('userId')
     Axios.put('http://localhost:3001/api/users/getUserdetails',
      {id:userId}).then((res)=>{
        if(res.data.data){
          const username=res.data.data[0].name
          setUser(username)
            Axios.put('http://localhost:3001/api/userDetails/getTenDetails/',{
              username:username
            }).then((res)=>{
              if (res.data.data){
                setUserTable(res.data.data.reverse())
              }
            })

        }
    }).catch((error)=>{
      console.log("Error Occured",error)
    })
  },[visible])
  const progressExample = [
    { title: 'Visits', value: '29.703 Users', percent: 40, color: 'success' },
    { title: 'Unique', value: '24.093 Users', percent: 20, color: 'info' },
    { title: 'Pageviews', value: '78.706 Views', percent: 60, color: 'warning' },
    { title: 'New Users', value: '22.123 Users', percent: 80, color: 'danger' },
    { title: 'Bounce Rate', value: 'Average Rate', percent: 40.15, color: 'primary' },
  ]

  const progressGroupExample1 = [
    { title: 'Monday', value1: 34, value2: 78 },
    { title: 'Tuesday', value1: 56, value2: 94 },
    { title: 'Wednesday', value1: 12, value2: 67 },
    { title: 'Thursday', value1: 43, value2: 91 },
    { title: 'Friday', value1: 22, value2: 73 },
    { title: 'Saturday', value1: 53, value2: 82 },
    { title: 'Sunday', value1: 9, value2: 69 },
  ]

  const progressGroupExample2 = [
    { title: 'Male', icon: cilUser, value: 53 },
    { title: 'Female', icon: cilUserFemale, value: 43 },
  ]
  const progressGroupExample3 = [
    { title: 'Organic Search', icon: cibGoogle, percent: 56, value: '191,235' },
    { title: 'Facebook', icon: cibFacebook, percent: 15, value: '51,223' },
    { title: 'Twitter', icon: cibTwitter, percent: 11, value: '37,564' },
    { title: 'LinkedIn', icon: cibLinkedin, percent: 8, value: '27,319' },
  ]
const handlleEdit=(data,e)=>{
  setVisible(!visible)
  setId(data.id)
  setSugar(data.sugar_level)
  setBreakfast(data.morning_meal)
  setLunch(data.launch)
  setDinner(data.dinner)
  setEtime(data.exercise_time)
}

// defining  onchage handler
  const changeSuagr=(e)=>{
    setSugar(e.target.value)
  }
  const changeBreakfast=(e)=>{
    setBreakfast(e.target.value)
  }
  const chageLunch=(e)=>{
    setLunch(e.target.value)
  }
  const chageDinner=(e)=>{
    setDinner(e.target.value)
  }
  const chageExerciseTime=(e)=>{
    setEtime(e.target.value)
  }
  // update data to the database
  const submitData=()=>{
    Axios.put('http://localhost:3001/api/userDetails/updateMealInfo/',
      {
        user:user,
        sugar:sugar,
        breakfast:breakfast,
        lunch:lunch,
        dinner:dinner,
        etime:etime,
        id:id
      }).then((res)=>{
        if (res.data.success===1){
          setVisible(false)
          toast("Successfully Updated");
          // window.location.reload(true)
        }
        else{
          alert("error occured")
        }
    }).catch((error)=>{
      console.log("Error occured", error)
    })
  }
  return (
    <>
      <ToastContainer/>
      <WidgetsDropdown />
     
       
          <div className='prediction mb-4'>
              {/* <h4 id="traffic" className="card-title mb-0 text-center">
                Predict Your Diabetes
              </h4> */}
              
              <Prediction/>
        
</div>
      {/* <WidgetsBrand withCharts /> */}

      <CRow>
        <CCol xs>
          <CCard className="mb-4 p-3">
          <div className="container">
            <p id="traffic" className="card-title mb-0">
              Best foods for people living with diabetes
            </p>
            <hr/>
            <div className=" my-2 d-flex justify-content-around">
              <div className='image_container d-flex flex-wrap justify-content-around'>
              <div className="foodImage mx-1"><CImage rounded src={beans} width={200} height={200} /></div>
              <div className="foodImage mx-1"><CImage rounded src={brocouli} width={200} height={200} /></div>
              <div className="foodImage mx-1"><CImage rounded src={greens} width={200} height={200} /></div>
            </div>
            </div>
            <div className="d-flex justify-content-around">
              <div className='image_container d-flex flex-wrap justify-content-around'>
              <div className="foodImage mx-1"><CImage rounded src={eggs} width={200} height={200} /></div>
              <div className="foodImage mx-1"><CImage rounded src={garlic} width={200} height={200} /></div>
              <div className="foodImage mx-1"><CImage rounded src={yogurt} width={200} height={200} /></div>
              <div className="foodImage mx-1"><CImage rounded src={fish} width={200} height={200} /></div>
            </div>
            </div>
            <div className="my-2 d-flex justify-content-around">
              <div className='image_container d-flex flex-wrap justify-content-around'>
              <div className="foodImage mx-1"><CImage rounded src={nuts} width={200} height={200} /></div>
              <div className="foodImage mx-1"><CImage rounded src={seeds} width={200} height={200} /></div>
              <div className="foodImage mx-1"><CImage rounded src={strawberry} width={200} height={200} /></div>
              </div>
            </div>
          </div>


          </CCard>
        </CCol>
      </CRow>
      {/* <WidgetsBrand withCharts /> */}

      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Your recent activities</CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive style={{fontSize:'12px'}}>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">S.N</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Sugar Level</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Break Fast</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Lunch</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Dinner</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Exercise Time</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {
                    userTable.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className="text-center">{index+1}</CTableDataCell>
                      <CTableDataCell className="text-center" >{item.sugar_level} mg/dL</CTableDataCell>
                      <CTableDataCell className="text-center">{item.morning_meal}</CTableDataCell>
                      <CTableDataCell className="text-center">{item.launch}</CTableDataCell>
                      <CTableDataCell className="text-center">{item.dinner}</CTableDataCell>
                      <CTableDataCell className="text-center">{item.exercise_time}  minutes</CTableDataCell>
                      <CTableDataCell className="text-center text-primary" style={{cursor:'pointer'}} onClick={(e) =>{handlleEdit(item,e)} }><CIcon icon={cilPencil} /></CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
      
            </CCardBody>
            <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
              <CModalHeader>
                <CModalTitle>Update your meal detail</CModalTitle>
              </CModalHeader>
              <CModalBody>
                  <div className="update_meal_container">
                      <div className="form_row d-flex justify-content-between">
                        <div className="sugar_container">
                        <CFormInput
                          value={sugar}
                          contentEditable={true}
                          type="number"
                          name="username"
                          feedbackValid="Looks good!"
                          id="validationCustom01"
                          label="Sugar level"
                          required
                          onChange={(e)=>{changeSuagr(e)}}
                        />
                        </div>
                        <div className="breakfast_container ms-3">
                        <CFormInput
                          value={breakfast}
                          contentEditable={true}
                          type="text"
                          name="username"
                          feedbackValid="Looks good!"
                          id="validationCustom01"
                          label="Breakfast"
                          required
                          onChange={(e)=>{changeBreakfast(e)}}
                        />
                        </div>
                      </div>
                      <div className="form_row d-flex justify-content-between">
                        <div className="sugar_container">
                          <CFormInput
                            value={lunch}
                            contentEditable={true}
                            type="text"
                            name="username"
                            feedbackValid="Looks good!"
                            id="validationCustom01"
                            label="Lunch"
                            required
                            onChange={(e)=>{chageLunch(e)}}
                          />
                        </div>
                        <div className="breakfast_container ms-3">
                          <CFormInput
                            value={dinner}
                            contentEditable={true}
                            type="text"
                            name="username"
                            feedbackValid="Looks good!"
                            id="validationCustom01"
                            label="Dinner"
                            required
                            onChange={(e)=>{chageDinner(e)}}
                          />
                        </div>
                      </div>
                      <div className="form_row d-flex">
                        <div className="breakfast_container">
                          <CFormInput
                            value={etime}
                            contentEditable={true}
                            type="number"
                            name="username"
                            feedbackValid="Looks good!"
                            id="validationCustom01"
                            label="Exercise time"
                            required
                            onChange={(e)=>{chageExerciseTime(e)}}
                          />
                        </div>
                      </div>
                  </div>
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary" onClick={() => setVisible(false)}>
                  Close
                </CButton>
                <CButton color="primary" onClick={submitData}>Save changes</CButton>
              </CModalFooter>
            </CModal>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard