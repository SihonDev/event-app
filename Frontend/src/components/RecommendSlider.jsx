import React, { useState } from 'react';
import useStyles from "../pages/style";
import SwipeableViews from 'react-swipeable-views';
import { Container, Button, MobileStepper, Typography, Grid, CardActions, CardContent, Card, ListItemAvatar, ListItem, List, Avatar, ListItemText } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import PersonIcon from '@mui/icons-material/Person';
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { deleteHamlatzha } from '../features/hamlatzot/hamlatzhaSlice'

const RecommendSlider = ({ data }) => {
    const classes = useStyles();
    const theme = useTheme();
    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = data.length;
    const home = window.location.toString().includes("Home")
    const profile = window.location.toString().includes("Profile")


    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };


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
                                            <Card sx={{ backgroundColor: "#e8eaf6", textAlign: "center" }}>
                                                <CardContent>
                                                    <span>{eventData.name}</span> <PersonIcon />
                                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">{moment(eventData.createdAt).format('YYYY-MM-DD')} :תאריך</Typography>
                                                    <Typography variant="body1">{eventData.text}</Typography>
                                                </CardContent>
                                                {user ?
                                                    <CardActions sx={{ justifyContent: 'center' }}>
                                                        <Button size="small" onClick={() => dispatch(deleteHamlatzha(eventData._id))}>מחיקה</Button>
                                                    </CardActions>
                                                    : <></>}
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
        </Container>
    );
}

export default RecommendSlider;