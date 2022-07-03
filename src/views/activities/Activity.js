import React, {useEffect, useState,PureComponent} from 'react'
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
import {cilCloudDownload, cilSettings} from "@coreui/icons";
import Axios from "axios";
import jsPDF from 'jspdf'
import GeneratePDF from '../../components/PDF/GeneratePDF'
import 'jspdf-autotable'
import * as PropTypes from "prop-types";

function CDatePicker(props) {
  return null;
}

CDatePicker.propTypes = {locale: PropTypes.string};
const Activity= ()=>{
  const [userTable,setUserTable]=useState([]);
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
    const tableColumn = ["S.N", "Sugar Level", "Breakfast", "Lunch", "Dinner","Exercise Time", "Date"];
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
  const previewReport =()=>{
    setPreview(!preview)
  }
  const handleSearch=(e)=>{
   const userData= userTable.filter((item)=> item.date.includes(e.target.value))
    setUserTable(userData)
  }
  return(
    <div className="activities">
      <div className="button_class mb-2">
        <CButton className="float-right" onClick={()=>{previewReport()}} color="dark" variant="outline"><CIcon icon={cilSettings} /> Generate Report</CButton>
      </div>
      <div className={!preview?'d-none':''}>
        <div className="button_class mb-2 float-end me-3">
          <CButton className=""  color="info" variant="outline"><CIcon icon={cilCloudDownload} /> Download Report</CButton>
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
