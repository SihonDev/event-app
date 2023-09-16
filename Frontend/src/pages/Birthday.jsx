import { useEffect, useState } from 'react'
import useStyles from "./style";
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'
import { getSuppliers, reset } from '../features/supplier/supplierSlice'
import { getSuggestions } from '../features/suggestion/suggestionSlice'
import { Grid, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import PopUp from '../components/PopUp'

function Birthday() {
  const classes = useStyles();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { user } = useSelector((state) => state.auth)
  const { suppliers, isLoading, isError, message } = useSelector(
    (state) => state.suppliers
  )
  const { suggestions } = useSelector(
    (state) => state.suggestions
  )

  var removeValFrom = [3,4,5,8];
  let filterSuppliers = suppliers.filter(function (value, index) {
    return removeValFrom.indexOf(index) === -1;
  })
 
  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/home')
    }

    dispatch(getSuppliers())
    dispatch(getSuggestions())

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
        <p>לפי המידע שקיבלנו, אתם חוגגים אירוע מסוג "חתונה". להלן רשימה של ספקים לפי קטגוריות לאירוע שלך:</p>
      </section>
      <button className='btn' onClick={handleOpen}>צור אירוע</button>
      {open === true ? <PopUp open={open} suggestions={suggestions} handleClose={handleClose} eventName="יום הולדת" /> : <></>}
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className={classes.gridContainer}>
        {filterSuppliers.map((eventData, index) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
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

export default Birthday
