import React from 'react'
import {useNavigate} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {cilAccountLogout, cilBell, cilLockLocked, cilSettings, cilUser} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/8.jpg'
const AppHeaderDropdown = ({ updateUser }) => {
  AppHeaderDropdown.propTypes = {
    updateUser: PropTypes.number.isRequired,
  }
  const navigate = useNavigate();
  const logout=()=>{
    window.localStorage.removeItem('userId');
    window.localStorage.removeItem('MyUser');
    navigate('/login')
    
  }
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
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
