import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilApple,
  cilAudioSpectrum,
  cilBell,
  cilCalculator,
  cilCheck, cilDescription,
  cilMedicalCross, cilNoteAdd,
  cilPlus, cilSearch,
  cilSpeedometer,
} from '@coreui/icons'
import {CNavGroup, CNavItem, CNavTitle} from '@coreui/react'
import diabetesLogo from './assets/images/diabetes/blood-test.png'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Components',
  },
  {
    component: CNavItem,
    name: 'Add Details',
    to: '/addDetails',
    icon: <CIcon icon={cilNoteAdd} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'My Activities',
    to: '/activities',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Your Doctor',
    to: '/doctor',
    icon: <CIcon icon={cilMedicalCross} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Predict  Your Result',
    to: '/diabetes_prediction',
    icon: <CIcon icon={cilSearch} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'About Diabetes',
    icon: (
      <img
        src={diabetesLogo}
        alt=""
        style={{ height: '20px', margin: '0 18px 0 8px', color: 'white', filter: 'invert(100%)' }}
      />
    ),
    items: [
      {
        component: CNavItem,
        name: 'Causes',
        to: '/aboutDiabetes/causes',
      },
      {
        component: CNavItem,
        name: 'Symptoms',
        to: '/aboutDiabetes/symptoms',
      },
      {
        component: CNavItem,
        name: 'Types',
        to: '/aboutDiabetes/types',
      },
      {
        component: CNavItem,
        name: 'Medications',
        to: '/aboutDiabetes/medications',
      },
      {
        component: CNavItem,
        name: 'Prevention',
        to: '/aboutDiabetes/prevention',
      },
      {
        component: CNavItem,
        name: 'About Insulin',
        to: '/aboutDiabetes/aboutInsulin',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'About Us',
    to: '/aboutus',
    icon: <CIcon icon={cilBell} customClassName="nav-icon"/>

    // items: [
    //   {
    //     component: CNavItem,
    //     name: 'Alerts',
    //     to: '/notifications/alerts',
    //   },
    //   {
    //     component: CNavItem,
    //     name: 'Badges',
    //     to: '/notifications/badges',
    //   },
    //   {
    //     component: CNavItem,
    //     name: 'Modal',
    //     to: '/notifications/modals',
    //   },
    //   {
    //     component: CNavItem,
    //     name: 'Toasts',
    //     to: '/notifications/toasts',
    //   },
    // ],
  },
  {
    component: CNavItem,
    name: 'Privacy and Policy',
    to: '/privacyandpolicy',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,

  },
]

export default _nav
