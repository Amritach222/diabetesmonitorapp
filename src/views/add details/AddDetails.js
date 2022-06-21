import React, { useState } from 'react'
import Axios from 'axios'

const AddDetails = () => {
  //creating a state which stores registeration information in an object
  const [userDetails, setuserDetails] = useState({
    userSugar: '',
    userWeight: '',
    userMeal: '',
    userLaunch: '',
    userDinner: '',
    userExercise: '',
  })

  const handleInput = (event) => {
    const name = event.target.name
    const value = event.target.value
    setuserDetails({ ...userDetails, [name]: value })
    console.log(name, value)
  }

  //sending form data om submit click....
  const addDetails = async (e) => {
    e.preventDefault()
    const { userSugar, userWeight, userMeal, userLaunch, userDinner, userExercise } = userDetails

    Axios.post('http://localhost:3001/addDetails', {
      userSugar: userSugar,
      userWeight: userWeight,
      userMeal: userMeal,
      userLaunch: userLaunch,
      userDinner: userDinner,
      userExercise: userExercise,
    })
      .then((res) => {
        //handle success
        console.log(res)
      })
      .catch((res) => {
        //handle error
        console.log(res)
      })
  }

  return (
    <div
      style={{
        background: 'light dim',
        border: '0.5px solid black',
        padding: '1rem',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem' }}>
        <b>Enter Your Details Here</b>
      </div>
      <form>
        <div className="form-outline mb-4">
          <input
            type="text"
            name="userSugar"
            id="userSugar"
            className="form-control"
            autoComplete="off"
            value={userDetails.userSugar}
            onChange={handleInput}
          />
          <label className="form-label" htmlFor="form5Example1">
            Blood Sugar Level
          </label>
        </div>

        <div className="form-outline mb-4">
          <input
            type="text"
            id="userWeight"
            name="userWeight"
            className="form-control"
            autoComplete="off"
            value={userDetails.userWeight}
            onChange={handleInput}
          />
          <label className="form-label" htmlFor="form5Example2">
            Your Weight
          </label>
        </div>

        <div className="form-outline mb-4">
          <input
            type="text"
            id="userMeal"
            name="userMeal"
            className="form-control"
            autoComplete="off"
            value={userDetails.userMeal}
            onChange={handleInput}
          />
          <label className="form-label" htmlFor="form5Example2">
            Your Morning Meal
          </label>
        </div>

        <div className="form-outline mb-4">
          <input
            type="text"
            id="userLaunch"
            name="userLaunch"
            className="form-control"
            autoComplete="off"
            value={userDetails.userLaunch}
            onChange={handleInput}
          />
          <label className="form-label" htmlFor="form5Example2">
            Your Launch
          </label>
        </div>

        <div className="form-outline mb-4">
          <input
            type="text"
            id="userDinner"
            name="userDinner"
            className="form-control"
            autoComplete="off"
            value={userDetails.userDinner}
            onChange={handleInput}
          />
          <label className="form-label" htmlFor="form5Example2">
            Your Dinner
          </label>
        </div>

        <div className="form-outline mb-4">
          <input
            type="text"
            id="userExercise"
            name="userExercise"
            className="form-control"
            autoComplete="off"
            value={userDetails.userExercise}
            onChange={handleInput}
          />
          <label className="form-label" htmlFor="form5Example2">
            Your Exercise Time
          </label>
        </div>

        <button type="submit" className="btn btn-primary btn-block mb-4" onClick={addDetails}>
          Submit
        </button>
      </form>
    </div>
  )
}

export default AddDetails
