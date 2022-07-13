import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  CButton, CFormSwitch,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilMenu } from '@coreui/icons'
import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'


const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          {/*<CIcon icon={logo} height={48} alt="Logo" />*/}
          <h3>DIABETES <span style={{color:'red'}}>TRACKER</span></h3>

        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to="/dashboard" component={NavLink}>
              Dashboard
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="d-flex justify-content-center align-items-center">
          <CNavItem>
            <CFormSwitch size="xl"  id="formSwitchCheckDefaultXL"/>

            {/*<CNavLink href="">*/}
            {/*  <CIcon icon={cilBell} size="lg" />*/}
            {/*</CNavLink>*/}

          </CNavItem>
          {/* <CNavItem>
            <CNavLink>
              <CButton color="secondary">
                <Link to="/login" style={{ textDecoration: 'none', color: 'black' }}>
                  login
                </Link>
              </CButton>
            </CNavLink>
          </CNavItem> */}
          {/* <CNavItem>
            <CNavLink href="#">
              <CButton color="secondary">
                <Link to="/register" style={{ textDecoration: 'none', color: 'black' }}>
                  Register
                </Link>
              </CButton>
            </CNavLink>
          </CNavItem> */}
        </CHeaderNav>
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown  />
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
