
import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import  Axios from 'axios'

const RecoverPassword = () => {

    const [displayError, setdisplayerror] = useState('');
    const navigate = useNavigate();
    const [resetPassword, setresetPassword] = useState({
     newPassword:''
    })


    const handleInput = (event) => {
        const name = event.target.name
        const value = event.target.value
        setresetPassword({ ...resetPassword, [name]: value })
        console.log(name, value)
        setdisplayerror("")
      }
    
      const setNewPassword= async (e) => {
        // <Link to='/' />
        e.preventDefault()
        const { newPassword } = resetPassword
        // console.log(newPassword)
    if(newPassword == '' )
    {
      setdisplayerror("Password can't be empty")
    }
    else
    {
    
        const code= localStorage.getItem('OTP');
        Axios.post('http://localhost:3001/api/recovery/createNewPassword', {
            code:code,
            newPassword:newPassword
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
            
              navigate('/login')
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
        <h5 className="card-title">Choose a New Password</h5>
        <hr/>

<p>Create a new password that is at least 8 characters long. A strong password is combination of letters, numbers, and punctuation marks.</p>

        <form>
  <div className="mb-3 " style={{width:'40%'}}>
    <input type="password"
     name="newPassword"
                      autoComplete="off"
                      value={resetPassword.newPassword}
                      onChange={handleInput}   
     className="form-control" id="recover_password" placeholder='New Password' />
    
  </div>
  <span className='text-danger ms-1 mb-3'>{displayError}</span>
  <hr/>
<div className='float-end'>


<Link to='/login'>
<button type='button' className='btn btn-dark me-1' style={{outline:'none'}}>Cancel</button>
</Link>
<button type='button' className='btn btn-primary me-1' style={{outline:'none'}} onClick={setNewPassword}>Next</button>

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

export default RecoverPassword