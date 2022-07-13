import CIcon from '@coreui/icons-react'
import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Axios from 'axios'

const ForgotPassword = () => {
     const [displayError, setdisplayerror] = useState('');
     const navigate = useNavigate();
  const [userEmail, setuserEmail] = useState({
    email: '',
  })

  const handleInput = (event) => {
    const name = event.target.name
    const value = event.target.value
    setuserEmail({ ...userEmail, [name]: value })
    console.log(name, value)
    setdisplayerror("")
  }


  
  const forgotPassword = async (e) => {
    e.preventDefault()
    const { email} = userEmail
    // console.log(email)
if(email == '')
{
  setdisplayerror("Please Enter Your Email")
}
else
{

    Axios.put('http://localhost:3001/api/recovery/', {
      email: email,
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
          // alert(res.data.data);
        
          navigate('/forgotpassword/OTP')
        }
      })
      .catch((res) => {
        //handle error
        console.log(res)
      })
  }
}

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div style={{ width: '35%', position: 'absolute', top: '235px' }}>
        <div className="row ">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Reset your password</h5>
                <hr />
                <form>
                  <div className="mb-3">
                    <label htmlFor="forgotpassword" className="form-label">
                      Email address
                    </label>
                    <input
                      style={{ width: '100%' }}
                      name="email"
                      autoComplete="off"
                      value={userEmail.email}
                      onChange={handleInput}
                      type="email"
                      className="form-control"
                      id="forgotpassword"
                      placeholder="Enter Your Registered Email"
                      aria-describedby="emailHelp"
                    />
                     <span className='text-danger ms-1 mb-3'>{displayError}</span>
                  </div>
                  <div className="float-end">
                    <Link to="/forgotpassword/otp">
                      <button
                       onClick={forgotPassword}
                        type="button"
                        className="btn btn-primary me-1"
                        style={{ outline: 'none' }}
                      >
                        Next
                      </button>
                    </Link>
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

export default ForgotPassword
