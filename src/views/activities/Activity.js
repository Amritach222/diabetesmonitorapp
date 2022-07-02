import React, {useEffect, useState} from 'react'
import {
  CButton,
  CCard, CCardBody,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilSettings} from "@coreui/icons";
import Axios from "axios";
const Activity= ()=>{
  const [userTable,setUserTable]=useState([])

  useEffect(()=>{
    const userId= localStorage.getItem("userId")
      Axios.put('http://localhost:3001/api/users/getUserdetails',{
        id:userId
      }).then((res)=>{
        if(res.data.data){
          const username=res.data.data[0].name;
          Axios.put('http://localhost:3001/api/userDetails/getuseractivity/',{
            username:username
          }).then((res)=>{
            if(res.data.data){
              setUserTable(res.data.data)
            }
          }).catch((err)=>{
            console.log("Error occured in activity aslling :",err)
          })
        }
      }).catch((err)=>{
        console.log(err)
      })
  },[])
  return(
    <div className="activities">
      <div className="button_class mb-2">
        <CButton className="float-right" color="dark" variant="outline"><CIcon icon={cilSettings} /> Generate Report</CButton>
      </div>
      <CCard className="mb-4">
        <CCardBody>
      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHead color="light" style={{background:'#000'}}>
          <CTableRow >
            <CTableHeaderCell className="text-center">S.N</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Sugar Level</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Break Fast</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Lunch</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Dinner</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Exercise Time</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Date</CTableHeaderCell>
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
                <CTableDataCell className="text-center">{item.exercise_time} minutes</CTableDataCell>
                <CTableDataCell className="text-center text-primary" >{item.date}</CTableDataCell>
                <CTableDataCell>

                </CTableDataCell>
              </CTableRow>
            ))}
        </CTableBody>
      </CTable>
        </CCardBody>
      </CCard>
    </div>
  )
}
export default  Activity
