import React, { useEffect, useState } from 'react';
import useStyles from "../pages/style";
import SwipeableViews from 'react-swipeable-views';
import { Container, Button, MobileStepper, Typography, Grid, CardActions, CardContent, Card } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux'
import { deleteEvent } from '../features/event/eventSlice'
import PopUp from './PopUp';
import { useNavigate } from 'react-router-dom'
import { getSuggestions, reset } from '../features/suggestion/suggestionSlice'


const EventSlider = ({ data }) => {
    const classes = useStyles();
    const theme = useTheme();
    const navigate = useNavigate()
    const [activeStep, setActiveStep] = useState(0);
    const [sihon, setSihon] = useState("");
    const [id, setId] = useState("");
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const maxSteps = data.length;
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const { suggestions, isError, message } = useSelector(
        (state) => state.suggestions
    )

    const getId = (id) => {
        setId(id)
    }

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

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

console.log('data', data)
    return (
        <Container className={classes.container}>
            <Grid container alignItems="center" justifyContent="center">
                <Grid item xs={12} sm={9} md={6} lg={4} >
                    <div className={classes.root}>
                        <SwipeableViews
                            axis={theme.direction === 'ltr' ? 'x-reverse' : 'x'}
                            index={activeStep}
                            onChangeIndex={handleStepChange}
                            enableMouseEvents
                        >
                            {data.map((eventData, index) => {
                                return (
                                    <div key={index}>
                                        {Math.abs(activeStep - index) <= 2 ? (
                                            <Card sx={{ backgroundColor: "#e8eaf6", textAlign: "center" }} >
                                                <CardContent>
                                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>סוג אירוע: {eventData.eventValue}</Typography>
                                                    <Typography sx={{ mb: 1.5 }} color="text.secondary"> תאריך: {eventData.dateValue}</Typography>
                                                    <Typography variant="body1">שם החוגג: {eventData.nameValue}</Typography>
                                                    {eventData.ulamValue ? <Typography variant="body1">אולם אירועים: {eventData.ulamValue}</Typography> : <></>}
                                                    {eventData.foodValue ? <Typography variant="body1">קייטרינג: {eventData.foodValue}</Typography> : <></>}
                                                    {eventData.photographerValue ? <Typography variant="body1">צלם: {eventData.photographerValue}</Typography> : <></>}
                                                    {eventData.attractionValue ? <Typography variant="body1">אטרקציות ודיג'יי: {eventData.attractionValue}</Typography> : <></>}
                                                    {eventData.clouthValue ? <Typography variant="body1">לבוש לאירוע: {eventData.clouthValue}</Typography> : <></>}
                                                    {eventData.salonValue ? <Typography variant="body1">סלון יופי: {eventData.salonValue}</Typography> : <></>}
                                                    {eventData.placeDesignValue ? <Typography variant="body1">עיצוב מקום: {eventData.placeDesignValue}</Typography> : <></>}
                                                    {eventData.mohelValue ? <Typography variant="body1">מוהל: {eventData.mohelValue}</Typography> : <></>}
                                                    {eventData.activeBarValue ? <Typography variant="body1">בר אקטיבי: {eventData.activeBarValue}</Typography> : <></>}
                                                </CardContent>
                                                <CardActions sx={{ justifyContent: 'center' }}>
                                                    <Button size="small" onClick={() => dispatch(deleteEvent(eventData._id))}>מחיקה</Button>
                                                    <Button size="small" onClick={() => {
                                                        handleOpen();
                                                        getId(eventData._id)
                                                        setSihon(eventData.eventValue)
                                                    }}>עריכה</Button>
                                                </CardActions>
                                            </Card>
                                        ) : null}
                                    </div>
                                )
                            })}
                        </SwipeableViews>
                        <MobileStepper
                            steps={maxSteps}
                            position="static"
                            variant="text"
                            activeStep={activeStep}
                            nextButton={
                                <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                                    קדימה
                                    {theme.direction === 'ltr' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                                </Button>
                            }
                            backButton={
                                <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                    {theme.direction === 'ltr' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                                    לאחור
                                </Button>
                            }
                        />
                    </div>
                </Grid>
            </Grid>
            {open === true ? <PopUp open={open} id={id} suggestions={suggestions} handleClose={handleClose} eventName={sihon} /> : <></>}
        </Container>
    );
}

export default EventSlider;