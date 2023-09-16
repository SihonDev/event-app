import { useEffect } from 'react'
import useStyles from "./style";
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'
import { getEventsType, reset } from '../features/eventsType/eventsTypeSlice'
import { Grid, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'

function Welcome() {
  const classes = useStyles();
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { eventsType, isLoading, isError, message } = useSelector(
    (state) => state.eventsType
  )
  
  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/home')
    }

    dispatch(getEventsType())

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
        <h1>שלום {user && user.name}</h1>
        <p>בראש ובראשונה צוות eventRacking מאחלים לכם המון מזל טוב ומקווים שהאתר יקל עליכן בארגון האירוע שלכם. האתר יוכל לספק לכם רשימה של ספקים מומלצים ,בין אם זה מקום לאיורע ,קייטרינג, אטרקציות, צלמים, תלבושות וכו..</p>
      </section>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className={classes.gridContainer}>
        {eventsType.map((eventData, index) => {
        return (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card sx={{ maxWidth: 345 }} >
              <CardMedia
                sx={{ height: 140 }}
                image={"./images/" + eventData.image}
                title={eventData.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {eventData.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {eventData.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" href={eventData.link} >פרטים נוספים</Button>
              </CardActions> 
            </Card>
          </Grid>
        )
      })}
      </Grid>
    </>
  )
}

export default Welcome
