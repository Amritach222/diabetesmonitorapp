import React, {useEffect, useState, PureComponent, useRef} from 'react'
import {
  CButton,
  CCard, CCardBody, CForm, CFormInput,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow
} from "@coreui/react";
import './activity.scss'
import CIcon from "@coreui/icons-react";
import {cilCloudDownload, cilSend, cilSettings} from "@coreui/icons";
import Axios from "axios";
import jsPDF from 'jspdf'
import GeneratePDF from '../../components/PDF/GeneratePDF'
import 'jspdf-autotable'
import emailjs from '@emailjs/browser'
import * as PropTypes from "prop-types";

function CDatePicker(props) {
  return null;
}

CDatePicker.propTypes = {locale: PropTypes.string};
const Activity= ()=>{
  const [userTable,setUserTable]=useState([]);
  const [userTemptable,setUserTemptable]=useState([]);
  const [tempopen,setTempopen]=useState(false)
  const [preview,setPreview]=useState(false)
  const [name, setName]=useState()
  useEffect(()=>{
    const userId= localStorage.getItem("userId")
      Axios.put('http://localhost:3001/api/users/getUserdetails',{
        id:userId
      }).then((res)=>{
        if(res.data.data){
          const username=res.data.data[0].name;
          const fullname=res.data.data[0].fullname;
          setName(fullname)
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
  // function for generating pdf
  const generatePDF=(data)=>{
    // intialize jsPDF
      var doc=new jsPDF();
      // Setting font
    // define the columns we want and their titles
    const tableColumn = ["S.N", "Sugar Level", "Breakfast", "Lunch", "Dinner","Exercise Time","Health Issues","Date"];
    // define an empty array of rows
    const tableRows = [];
    // for each ticket pass all its data into an array
    data.map((item,index)=>{
      const mealData=[
        index+1,
        item.sugar_level+" mg/dL",
        item.morning_meal,
        item.launch,
        item.dinner,
        item.exercise_time+" minutes",
        item.health_issues,
        item.date
      ];
      // push each item to the row
      tableRows.push(mealData)
    })
    doc.setFont('courier');
    doc.text(15,20,'Daily Activities of '+name);
    // startY is basically margin-top
    doc.autoTable(tableColumn, tableRows, { startY: 25 });
    const date = Date().split(" ");
    // we use a date string to generate our filename.
    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
    // we define the name of our PDF file.
    doc.save(`report_${dateStr}.pdf`);
  }

  // function for Sending  pdf using mail to the doctor
  const sendReport=()=>{
    const id=localStorage.getItem('userId')
    Axios.put( 'http://localhost:3001/api/doctors/getDoctor/',{
      user_id:id
    })
      .then((res) => {
        //handle success
        if(res.data.data)
        {
      Axios.put('http://localhost:3001/api/users/sendreport',{id:id}).then((res)=>{
        if(res.data.success==1){
          alert("Successfully sent!")
        }else{
          alert("Unable to send email to your doctor")
        }
      })
        }else{
          alert("You have not added your doctor!")
        }

      }).catch((err)=>{
        console.log("Error occured! "+err)
    })
  }
  const previewReport =()=>{
    setPreview(!preview)
  }
  const handleSearch=(e)=>{
    const date_value=e.target.value;
    let year = date_value.slice(0, 4);
    let month = date_value.slice(5, 7);
    let day = date_value.slice(8, 10);
    if(month.charAt(0)==0){
      month=date_value.charAt(6)
    }
    if(day.charAt(0)==0){
      day=date_value.charAt(9)
    }
    const full_date=month+'/'+day+'/'+year;
    console.log(full_date)
   const userData= userTable.filter((item)=> item.date.includes(full_date))
    setUserTemptable(userData);
    setTempopen(true);
  }
  return(
    <div className="activities">
      <div className="button_class mb-2">
        <CButton className="float-right" onClick={()=>{previewReport()}} color="dark" variant="outline"><CIcon icon={cilSettings} /> Generate Report</CButton>
      </div>
      <div className={!preview?'d-none':''}>
        <div className="button_class mb-2 float-end me-3">
          <CButton className="" onClick={()=>{sendReport(userTable)}}  color="success" variant="outline"><CIcon icon={cilSend} /> Send report to my doctor</CButton>
        </div>
        <div className="button_class mb-2 float-end me-3">
          <CButton className="" onClick={()=>{generatePDF(userTable)}}  color="info" variant="outline"><CIcon icon={cilCloudDownload} /> Download Report</CButton>
        </div>
      <GeneratePDF preview={userTable}  name={name} />
      </div>
      <CCard className={preview?'d-none':'mb-4'}>
        <CCardBody>
          <div className="search_container"  >
          <CForm className="d-flex" >
          <CFormInput style={{outline:'none',width:'180px'}} onChange={(e)=>{handleSearch(e)}} type="date"  id="exampleFormControlInput1" />
          </CForm>
          </div>
      <CTable align="middle" className="mb-0 border mt-2" hover responsive style={{fontSize:'12px'}}>
        <CTableHead color="light">
          <CTableRow >
            <CTableHeaderCell className="text-center">S.N</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Sugar Level</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Breakfast</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Lunch</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Dinner</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Exercise Time</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Health Issues</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Date</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {tempopen?
            userTemptable.map((item, index) => (
              <CTableRow v-for="item in tableItems" key={index}>
                <CTableDataCell className="text-center">{index+1}</CTableDataCell>
                <CTableDataCell className="text-center" >{item.sugar_level} mg/dL</CTableDataCell>
                <CTableDataCell className="text-center">{item.morning_meal}</CTableDataCell>
                <CTableDataCell className="text-center">{item.launch}</CTableDataCell>
                <CTableDataCell className="text-center">{item.dinner}</CTableDataCell>
                <CTableDataCell className="text-center">{item.exercise_time} minutes</CTableDataCell>
                <CTableDataCell className="text-center">{item.health_issues}</CTableDataCell>
                <CTableDataCell className="text-center text-primary" >{item.date}</CTableDataCell>
                <CTableDataCell>
                </CTableDataCell>
              </CTableRow>
            )):userTable.map((item, index) => (
              <CTableRow v-for="item in tableItems" key={index}>
                <CTableDataCell className="text-center">{index+1}</CTableDataCell>
                <CTableDataCell className="text-center" >{item.sugar_level} mg/dL</CTableDataCell>
                <CTableDataCell className="text-center">{item.morning_meal}</CTableDataCell>
                <CTableDataCell className="text-center">{item.launch}</CTableDataCell>
                <CTableDataCell className="text-center">{item.dinner}</CTableDataCell>
                <CTableDataCell className="text-center">{item.exercise_time} minutes</CTableDataCell>
                <CTableDataCell className="text-center">{item.health_issues}</CTableDataCell>
                <CTableDataCell className="text-center text-primary" >{item.date}</CTableDataCell>
                <CTableDataCell>
                </CTableDataCell>
              </CTableRow>
            ))

          }
        </CTableBody>
      </CTable>
        </CCardBody>
      </CCard>
    </div>
  )
}
export default  Activity
