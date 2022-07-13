import React, {useEffect,useState}from 'react'
import {useNavigate} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  CAvatar,
  CBadge, CCardImage,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle, CImage,
} from '@coreui/react'
import {cilAccountLogout, cilBell, cilLockLocked, cilSettings, cilUser} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import Axios from "axios";
import avatar from '../../assets/images/avatars/5.jpg'
const AppHeaderDropdown = ({ updateUser }) => {
  AppHeaderDropdown.propTypes = {
    updateUser: PropTypes.number.isRequired,
  }
  const navigate = useNavigate();
  const [file, setFile] = useState({preview:''});// This state  for set Image
  useEffect(()=>{
      const userId=window.localStorage.getItem('userId')
      Axios.put('http://localhost:3001/api/users/getprofile',{id:userId})
        .then((res)=>{
          if(res.data.data.image){
            const image_path=res.data.data.image
            let path=image_path.substr(7); // Removing 'public/' from image url
            setFile({preview:'http://localhost:3001/'+path})
          }
          else{
            setFile({preview: avatar})
          }
        }).catch((err)=>{
        setFile({preview: avatar})
        console.log("Something went wrong", err)
      })
    },[]
  )
  const logout=()=>{
    window.localStorage.removeItem('userId');
    window.localStorage.removeItem('MyUser');
    navigate('/login')
    window.location.reload()

  }
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={file.preview} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Settings</CDropdownHeader>
        <CDropdownItem href="http://localhost:3000/#/profile">
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        <CDropdownItem href="http://localhost:3000/#/settings">
          <CIcon icon={cilSettings} className="me-2" />
          Settings
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem href="http://localhost:3000/#/login"   onClick={() => {
              logout()
            }}>
          <CIcon
            icon={cilAccountLogout}
            className="me-2"

          />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
