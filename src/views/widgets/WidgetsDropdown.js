import React , {useEffect,useState} from 'react'
import Axios from 'axios'
import {
  CRow,
  CCol,
  // CDropdown,
  // CDropdownMenu,
  // CDropdownItem,
  // CDropdownToggle,
  CWidgetStatsA,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import data from "@coreui/coreui/js/src/dom/data";
// import CIcon from '@coreui/icons-react'
// import { cilArrowBottom, cilArrowTop, cilOptions } from '@coreui/icons'

const WidgetsDropdown = () => {
  let s_data=[]
  let exercise_data=[]
  let entry_date_sugar=[]
  let edate=[]
  const [totalEntry, setTotalentry] = useState(0)
  const [sugarlevel, setSugarlevel] = useState(0)
  const [exercisedays, setExercisedays] = useState(0)
  const [sugardata,setSugardata]=useState([])
  const [s_date,setS_date]=useState([])
  const [exercisedata,setExerciseData]=useState([])
  const [e_date,setEdate]=useState([])

  let id=localStorage.getItem('userId')

  useEffect(()=>
  {
    Axios.put( 'http://localhost:3001/api/users/getuser/',{
      user_id:id
       })
       .then((res) => {
         //handle success
         if(res.data.success==1)
         {
          const username=res.data.data.name;
          Axios.put( 'http://localhost:3001/api/userDetails/getDetails/',{
            username:username
           })
           .then(async (res) => {
             //handle success
             if(res.data.data)
             {
               let user_details=res.data.data;


               //Counting total user entries
            let user_details_count= user_details.length;
            setTotalentry(user_details_count);

              //Fetching and counting total insulin entries of recent one month
             const sugar_level = user_details.filter((item)=>
             item.sugar_level
             );
             //using map function to set array data
               user_details.reverse().map((item,index)=>{
                 if(item.sugar_level){
                   if(index<=6){
                   s_data.push(Math.round(parseInt(item.sugar_level)/5));
                     entry_date_sugar.push(item.date);
                   }
                 }
               }

               )
               await setSugardata(s_data)
              await setS_date(entry_date_sugar)
               //using map function to set array data for exercise time
               user_details.map((item,index)=>{
                   if(item.exercise_time){
                     if(index<=6){
                       console.log(item.exercise_time)
                       exercise_data.push(parseInt(item.exercise_time));
                       edate.push(item.date);
                     }
                   }
                 }

               )
               console.log(exercise_data)
               await setExerciseData(exercise_data)
               await setEdate(edate)
             const sugar_level_count=sugar_level.length;
             setSugarlevel(sugar_level_count);

             //Fetching and counting total exercise entries of last one month

             const exercise_days = user_details.filter((item)=>
             item.exercise_time

             );
             const exercise_days_count=exercise_days.length;
             setExercisedays(exercise_days_count);

              }
              else
              {
                console.log("Fetching Error")
              }
            })
            .catch((res) => {
              //handle error
              console.log(res)
            })
          }
          else
          {
            alert("usernameNot Obtained")
          }
        })
        .catch((res) => {
          //handle error
          console.log(res)
        })

  },[])


  return (
    <CRow className="d-flex justify-content-between">
      <CCol style={{ width: '33.33%' }} sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="primary"
          value={

            totalEntry
          }
          title="Your Total Entries"
          chart={
            <CChartLine
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                  {
                    label: 'My First dataset',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointBackgroundColor: getStyle('--cui-primary'),
                    data: [65, 59, 84, 84, 51, 55, 40],
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    grid: {
                      display: false,
                      drawBorder: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    min: 30,
                    max: 89,
                    display: false,
                    grid: {
                      display: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
                elements: {
                  line: {
                    borderWidth: 1,
                    tension: 0.4,
                  },
                  point: {
                    radius: 4,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol>
      <CCol style={{ width: '33.33%' }} sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="info"
          value={
            sugarlevel
          }
          title="Your Sugar Entries"


          chart={
            <CChartLine
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                labels: s_date,
                datasets: [
                  {
                    label: 'Entry date',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointBackgroundColor: getStyle('--cui-info'),
                    data:sugardata
                    // data: [1, 18, 9, 17, 34, 22, 11],
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    grid: {
                      display: false,
                      drawBorder: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    min: -9,
                    max: 39,
                    display: false,
                    grid: {
                      display: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
                elements: {
                  line: {
                    borderWidth: 1,
                  },
                  point: {
                    radius: 4,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol>
      {/* <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="warning"
          value={
            <>
              2.49{' '}
              <span className="fs-6 fw-normal">
                (84.7% <CIcon icon={cilArrowTop} />)
              </span>
            </>
          }
          title="Conversion Rate"
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="p-0">
                <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another action</CDropdownItem>
                <CDropdownItem>Something else here...</CDropdownItem>
                <CDropdownItem disabled>Disabled action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartLine
              className="mt-3"
              style={{ height: '70px' }}
              data={{
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                  {
                    label: 'My First dataset',
                    backgroundColor: 'rgba(255,255,255,.2)',
                    borderColor: 'rgba(255,255,255,.55)',
                    data: [78, 81, 80, 45, 34, 12, 40],
                    fill: true,
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    display: false,
                  },
                  y: {
                    display: false,
                  },
                },
                elements: {
                  line: {
                    borderWidth: 2,
                    tension: 0.4,
                  },
                  point: {
                    radius: 0,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol> */}
      <CCol style={{ width: '33.33%' }} sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="danger"
          value={

            exercisedays

          }
          title="Your Exercise Days"

          chart={
            <CChartBar
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: e_date,
                datasets: [
                  {
                    label: 'Exercise time in minutes on date ',
                    backgroundColor: 'rgba(255,255,255,.2)',
                    borderColor: 'rgba(255,255,255,.55)',
                    data: exercisedata,
                    barPercentage: 0.6,
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    grid: {
                      display: false,
                      drawTicks: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    grid: {
                      display: false,
                      drawBorder: false,
                      drawTicks: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
              }}
            />
          }
        />
      </CCol>
    </CRow>
  )
}

export default WidgetsDropdown