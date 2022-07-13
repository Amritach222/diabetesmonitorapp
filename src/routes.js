import React from 'react'
import AddDetails from './views/add details/AddDetails'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

// const Charts = React.lazy(() => import('./views/charts/Charts'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

const Activity=React.lazy(()=>import('./views/activities/Activity'))
const Doctor =React.lazy(()=>import('./views/doctor/Doctor'))
const Profile=React.lazy(()=>import('./views/profile/Profile'))
const Prediction=React.lazy(()=>import('./views/Prediction/Prediction'))
const Privacy=React.lazy(()=> import('./views/privacypolicy/privacy'))
const AboutUs=React.lazy(()=> import('./views/aboutus/Aboutus'))
const Settings = React.lazy(()=>import('./views/settings/Settings'))

const Causes=React.lazy(()=>import('./views/about diabetes/causes/Causes'))
const Symptoms=React.lazy(()=>import('./views/about diabetes/symptoms/Symptoms'))
const Types=React.lazy(()=>import('./views/about diabetes/types/Types'))
const Medications=React.lazy(()=>import('./views/about diabetes/medications/Medications'))
const Prevention=React.lazy(()=>import('./views/about diabetes/prevention/Prevention'))
const Insulin=React.lazy(()=>import('./views/about diabetes/about insulin/Insulin'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },

  { path: '/addDetails', name: 'Add Details', element: AddDetails },
  {path:'/doctor', name:'Doctor',element:Doctor},
  {path: '/profile', name:'Profile', element:Profile},
  {path: '/settings', name:'Setting', element:Settings},
  {path: '/activities', name:'My Activities', element:Activity},
  {path:'/diabetes_prediction',name:'Prediction',element:Prediction},
  { path: '/aboutDiabetes', name: 'About Diabetes', element: Causes, exact: true },
  { path: '/aboutDiabetes/causes', name: 'Causes', element: Causes },
  { path: '/aboutDiabetes/symptoms', name: 'Symptoms', element: Symptoms },
  { path: '/aboutDiabetes/types', name: 'Types', element: Types },
  { path: '/aboutDiabetes/medications', name: 'Medications', element: Medications },
  { path: '/aboutDiabetes/prevention', name: 'Prevention', element: Prevention },
  { path: '/aboutDiabetes/aboutinsulin', name: 'About Insulin', element: Insulin },

  { path: '/aboutus', name: 'About Us', element: AboutUs },
  {path:'/privacyandpolicy', name:'Privacy and Policy',element:Privacy}
]

export default routes
