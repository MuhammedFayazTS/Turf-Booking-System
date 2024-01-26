import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { hideLoading, showLoading } from '../redux/alertSlice'
import { fetchAllBookingsAPI, fetchAllUsersAPI, getAllVenuesAPI, getUserInfoByIdToken } from '../Services/allAPIs'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../redux/userSlice'
import toast from 'react-hot-toast'
import { addBookings, addUsers, addVenues } from '../redux/adminSlice'

function AdminRoutes(props) {

  const navigation = useNavigate()
  const { loading } = useSelector(state => state.alerts)
  const { user } = useSelector(state => state.user)

  const dispatch = useDispatch()

  const fetchAllBookingDetails = async () => {
    dispatch(showLoading())
    try {
      const response = await fetchAllBookingsAPI()
      dispatch(hideLoading())
      if (response) {
        // setAllBookings(response.data)
        return dispatch(addBookings(response.data))
      }
    } catch (error) {
      dispatch(hideLoading())
      console.log(error)
    }
  }

  const fetchAllUsersDetails = async () => {
    dispatch(showLoading())
    try {
      const response = await fetchAllUsersAPI()
      dispatch(hideLoading())
      if (response) {
        dispatch(addUsers(response.data.users))
      }
    } catch (error) {
      dispatch(hideLoading())
      console.log(error)
    }
  }

  const fetchAllVenueDetails = async () => {
    dispatch(showLoading())
    let data = { sort: "", search: "", sports: "", selectedAmenities: "", minPrice: "", maxPrice: "", location: "" }
    try {
      const response = await getAllVenuesAPI(data)
      dispatch(hideLoading())
      if (response) {
        return dispatch(addVenues(response.data))
      }
    } catch (error) {
      dispatch(hideLoading())
      console.log(error)
    }
  }


  // useEffect(() => {

  // }, [])

  const getUserData = async () => {
    dispatch(showLoading())
    try {
      const response = await getUserInfoByIdToken({
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token')
        }
      })
      dispatch(hideLoading())
      if (response.data.success) {
        if (response.data.data.user.isAdmin) {
          dispatch(setUser(response.data.data.user))
          fetchAllBookingDetails()
          fetchAllUsersDetails()
          fetchAllVenueDetails()
        } else {
          toast.error("Only admins have access to this page")
          navigation('/')
        }
      } else {
        sessionStorage.removeItem('token')
        navigation('/login')
      }
    } catch (error) {
      dispatch(hideLoading())
      sessionStorage.removeItem('token')
      navigation('/login')
    }
  }

  useEffect(() => {
    if (!user) {
      getUserData();
    }
  }, [user])

  if (sessionStorage.getItem('token')) {
    return props.children
  } else {
    return <Navigate to='/login' />
  }
}

export default AdminRoutes