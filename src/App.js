import React, { Suspense, useState, useEffect } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import MessengerCustomerChat from 'react-messenger-customer-chat';
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

function App() {
  const [user, setLoginUser] = useState({})
const id= localStorage.getItem("userId");
  useEffect(() => {
    setLoginUser(JSON.parse(localStorage.getItem('MyUser')))
  }, [])
  const updateUser = (user) => {
    localStorage.setItem('MyUser', JSON.stringify(user))
    setLoginUser(user)
  }
  return (
    <div className='main_container'>
    <HashRouter>
      <Suspense fallback={loading}>
        <Routes>
            <Route exact path="/" name="Login Page" element={<Login updateUser={updateUser} />} />
              <Route
            exact
            path="/login"
            name="Login Page"
            element={<Login updateUser={updateUser} />}
            />
            <Route exact path="/register" name="Register Page" element={<Register/>} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route path="*" name="Home" element={<DefaultLayout updateUser={updateUser} />} />


        </Routes>
      </Suspense>

    </HashRouter>
      <MessengerCustomerChat
        pageId="105523332035746"
        appId="1448239122283334"
      />,
    </div>
  )
}

export default App
