import {  useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Grid } from '@mui/material';
import EventSlider from '../components/EventSlider';
import { getEvents, reset } from '../features/event/eventSlice'
import Spinner from '../components/Spinner';
import HamlatzhaForm from '../components/HamlatzhaForm'

function Profile() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  const { events, isLoading, isError, message } = useSelector(
    (state) => state.events
  )
  
  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/home')
    }

    dispatch(getEvents())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <p>קיבלנו את בקשתך ליצירת אירוע</p>
      </section>
      {!events.length <= 0 ? <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
        <EventSlider data={events}/>
        <HamlatzhaForm />
      </Grid>:<></>}
      
    </>
  )
}

export default Profile
