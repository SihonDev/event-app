import { useEffect } from 'react'
import useStyles from "./style";
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'
import { getSuggestions, reset } from '../features/suggestion/suggestionSlice'
import { Grid, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'

function Suggestion() {
  const classes = useStyles();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { suggestions, isLoading, isError, message } = useSelector(
    (state) => state.suggestions
  )

console.log('suggestions', suggestions)
  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/home')
    }

    dispatch(getSuggestions())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }
console.log('suggestions', suggestions)
  return (
    <>
      <section className='heading'>
        <p>רשימת המלצות</p>
      </section>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className={classes.gridContainer}>
        {suggestions.map((eventData, index) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card sx={{ maxWidth: 345 }} >
                <CardMedia
                  sx={{ height: 140 }}
                  image={eventData.image}
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

export default Suggestion
