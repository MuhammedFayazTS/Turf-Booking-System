import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { hideLoading, showLoading } from '../redux/alertSlice'
import { getUserInfoByIdToken } from '../Services/allAPIs'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../redux/userSlice'

function ProtectedRoutes(props) {

  const navigation = useNavigate()
  const { loading } = useSelector(state => state.alerts)
  const { user } = useSelector(state => state.user)

  const dispatch = useDispatch()

  const getUserData = async () => {
    dispatch(showLoading())
    try {
      const response = await getUserInfoByIdToken({
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token')
        }
      })
      dispatch(hideLoading())
      if(response.data.success){
        if(response.data.data.user.isAdmin){
          navigation('/admin')
        }
        dispatch(setUser(response.data.data.user))
      }else{
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
    if(!user){
      getUserData();
    }
  }, [user])

  if(sessionStorage.getItem('token'))
  {
      return props.children
  }else{
        return <Navigate to='/login' />
  }
}

export default ProtectedRoutes