import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import PropTypes from 'prop-types'

const DefaultLayout = ({ updateUser }) => {
  DefaultLayout.propTypes = {
    updateUser: PropTypes.number.isRequired,
  }
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader updateUser={updateUser} />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
