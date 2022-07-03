import React from 'react'
import AddDetails from './views/add details/AddDetails'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

// const Charts = React.lazy(() => import('./views/charts/Charts'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))
const Doctor =React.lazy(()=>import('./views/doctor/Doctor'))
const Profile=React.lazy(()=>import('./views/profile/Profile'))
const Prediction=React.lazy(()=>import('./views/Prediction/Prediction'))
const Privacy=React.lazy(()=> import('./views/privacypolicy/privacy'))
const AboutUs=React.lazy(()=> import('./views/aboutus/Aboutus'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },

  { path: '/addDetails', name: 'Add Details', element: AddDetails },
  {path:'/doctor', name:'Doctor',element:Doctor},
  {path: '/profile', name:'Profile', element:Profile},
  {path:'/diabetes_prediction',name:'Prediction',element:Prediction},
  { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  { path: '/notifications/badges', name: 'Badges', element: Badges },
  { path: '/notifications/modals', name: 'Modals', element: Modals },
  { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  { path: '/aboutus', name: 'About Us', element: AboutUs },
  {path:'/privacyandpolicy', name:'Privacy and Policy',element:Privacy}
]

export default routes
