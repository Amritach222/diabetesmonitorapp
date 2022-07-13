import CIcon from '@coreui/icons-react'
import React,{useState} from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import Axios from "axios"



const OTP = () => {

    const [displayError, setdisplayerror] = useState('');
    const navigate = useNavigate();
 const [userOTP, setuserOTP] = useState({
   OTP: ''
 })

 const handleInput = (event) => {
    const name = event.target.name
    const value = event.target.value
    setuserOTP({ ...userOTP, [name]: value })
    setdisplayerror("")
  }



  const matchOTP = async (e) => {
    e.preventDefault()
    const { OTP} = userOTP
if(OTP == '')
{
  setdisplayerror("Please Enter Your Received Code")
}
else
{

    Axios.put('http://localhost:3001/api/recovery/createMatchOTP', {
        userOTP: OTP,
    })
      .then((res) => {
        //handle error
        // console.log(res)
        if(res.data.success===0)
        {
         
          const message=res.data.data;
          console.log(res.data)
          setdisplayerror(`${message}`)
        }
        //handle success
        if (res.data.success===1) {
        //   alert(res.data.data);
        localStorage.setItem('OTP', JSON.stringify(res.data.data))
          navigate('/forgotpassword/recoverpassword')
        }
      })
      .catch((res) => {
        //handle error
        console.log(res)
      })
  }
}

  return (
    <div className='container d-flex justify-content-center align-items-center'>

    <div  style={{width:'35%',
    position: 'absolute',
    top: '235px'}}>
        <div className="row ">
  <div className="col-sm-12">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Enter security code</h5>
        <hr/>

<p>Please check your Email for a text message with your code. Your code is 4 digit long.</p>

        <form>
  <div className="mb-3 " style={{width:'40%'}}>
    <input 
    
    name="OTP"
                      autoComplete="off"
                      value={userOTP.OTP}
                      onChange={handleInput}
    type="number" className="form-control" id="otpcode" placeholder='Enter code' />

    
  </div>
<span className='text-danger ms-1 mb-3'>{displayError}</span>
  <hr/>
<div className='float-end'>


<Link to='/login'>
<button type='button' className='btn btn-dark me-1' style={{outline:'none'}}>Cancel</button>
</Link>


<button type='button' className='btn btn-primary me-1' style={{outline:'none'}} onClick={matchOTP} >Next</button>

</div>
</form>
        
      </div>
    </div>
  </div>
  
    </div>
    </div>
    </div>
  )
}

export default OTP