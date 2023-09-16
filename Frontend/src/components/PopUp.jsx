import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { Modal, Button, Paper, TextField, Stack } from '@mui/material'
import useClasses from '../hooks/useClasses';
import style from "./style";
import { useDispatch, useSelector } from 'react-redux'
import { createEvent, getEvents, updateEvent } from '../features/event/eventSlice'
import { useNavigate } from 'react-router-dom'
import { getEventsType } from '../features/eventsType/eventsTypeSlice';
import moment from 'moment'

const PopUp = ({ open, id, suggestions, handleClose, eventName }) => {
  const classes = useClasses(style);

  const [filterSuppliers, setFilterSuppliers] = useState([]);
  const [ulamValue, setUlamValue] = useState('');
  const [foodValue, setFoodValue] = useState('');
  const [attractionValue, setAttractionValue] = useState('');
  const [clouthValue, setClouthValue] = useState('');
  const [photographerValue, setPhotographerValue] = useState('');
  const [salonValue, setSalonValue] = useState('');
  const [placeDesignValue, setPlaceDesignValue] = useState('');
  const [mohelValue, setMohelValue] = useState('');
  const [activeBarValue, setActiveBarValue] = useState('');
  const [dateValue, setDateValue] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [eventValue, setEventValue] = useState('');

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { eventsType } = useSelector(
    (state) => state.eventsType
  )

  useEffect(() => {
    dispatch(getEventsType())
    if (eventName === "חתונה") {
      setEventValue("חתונה")
      setFilterSuppliers([
        { name: "אולמות", list: suggestions.ulam },
        { name: "קייטרינג", list: suggestions.food },
        { name: "אטרקציות ודיג'יי", list: suggestions.attraction },
        { name: "לבוש לאירוע", list: suggestions.clouth },
        { name: "צלם", list: suggestions.photographer },
        { name: "סלון יופי", list: suggestions.salon },
      ])
    } else if (eventName === "בר מצווה") {
      setEventValue("בר מצווה")
      setFilterSuppliers([
        { name: "אולמות", list: suggestions.ulam },
        { name: "קייטרינג", list: suggestions.food },
        { name: "אטרקציות ודיג'יי", list: suggestions.attraction },
        { name: "לבוש לאירוע", list: suggestions.clouth },
        { name: "צלם", list: suggestions.photographer },
      ])
    } else if (eventName === "יום הולדת") {
      setEventValue("יום הולדת")
      setFilterSuppliers([
        { name: "אולמות", list: suggestions.ulam },
        { name: "קייטרינג", list: suggestions.food },
        { name: "אטרקציות ודיג'יי", list: suggestions.attraction },
        { name: "עיצוב מקום", list: suggestions.placeDesign },
        { name: "בר אקטיבי", list: suggestions.activeBar },
      ])
    } else if (eventName === "ברית") {
      setEventValue("ברית")
      setFilterSuppliers([
        { name: "אולמות", list: suggestions.ulam },
        { name: "קייטרינג", list: suggestions.food },
        { name: "עיצוב מקום", list: suggestions.placeDesign },
        { name: "צלם", list: suggestions.photographer },
        { name: "מוהל", list: suggestions.mohel },
      ])
    }
    setDateValue(moment().format('YYYY-MM-DD'))


  }, [dispatch])

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      ulamValue,
      foodValue,
      attractionValue,
      clouthValue,
      photographerValue,
      salonValue,
      placeDesignValue,
      mohelValue,
      activeBarValue,
      dateValue,
      nameValue,
      eventValue
    }

    var filtered = Object.fromEntries(Object.entries(userData).filter(value => value[1]))

    if (id) {
      filtered.id = id;
      dispatch(updateEvent(filtered))
      dispatch(getEvents())
    } else {
      dispatch(createEvent(filtered))
      console.log('create', filtered)
      navigate('/profile')
    }
  }

  return (
    <>
      {suggestions || eventsType ? <Modal open={open} onClose={handleClose} >
        <Paper className={classes.modal} >
          <form autoComplete="off" className={classes.form} onSubmit={onSubmit}>
            <TextField
              id="name"
              label="סוג האירוע"
              type="text"
              value={eventName}
              sx={{ width: 220, padding: 1 }}
              InputLabelProps={{
                shrink: true,
              }}
              onInputChange={(e) => {
                setEventValue(e.target.value);
              }}
            />
            <TextField
              id="date"
              label="בחר תאריך"
              type="date"
              value={dateValue}
              inputProps={{ min: dateValue }}
              sx={{ width: 220, padding: 1 }}
              InputLabelProps={{
                shrink: true,
              }}
             
              onChange={(e) => {
                setDateValue(e.target.value);
              }}
            />
            <TextField
              id="name"
              label="שם החוגג"
              type="text"
              value={nameValue}
              sx={{ width: 220, padding: 1 }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => {
                setNameValue(e.target.value);
              }}
            />
            <Autocomplete
              inputValue={ulamValue}
              onInputChange={(event, newInputValue) => {
                setUlamValue(newInputValue);
              }}
              fullWidth
              options={suggestions.ulam.map((option) => option.name)}
              renderInput={(params) => <TextField {...params} label="אולמות" margin="normal" />}
            />
            <Autocomplete
              inputValue={foodValue}
              onInputChange={(event, newInputValue) => {
                setFoodValue(newInputValue);
              }}
              fullWidth
              options={suggestions.food.map((option) => option.name)}
              renderInput={(params) => <TextField {...params} label="קייטרינג" margin="normal" />}
            />

            {eventName === "חתונה" ? <>
              <Autocomplete
                inputValue={attractionValue}
                onInputChange={(event, newInputValue) => {
                  setAttractionValue(newInputValue);
                }}
                fullWidth
                options={suggestions.attraction.map((option) => option.name)}
                renderInput={(params) => <TextField {...params} label="אטרקציות ודיג'יי" margin="normal" />}
              />
              <Autocomplete
                inputValue={clouthValue}
                onInputChange={(event, newInputValue) => {
                  setClouthValue(newInputValue);
                }}
                fullWidth
                options={suggestions.clouth.map((option) => option.name)}
                renderInput={(params) => <TextField {...params} label="לבוש לאירוע" margin="normal" />}
              />
              <Autocomplete
                inputValue={photographerValue}
                onInputChange={(event, newInputValue) => {
                  setPhotographerValue(newInputValue);
                }}
                fullWidth
                options={suggestions.photographer.map((option) => option.name)}
                renderInput={(params) => <TextField {...params} label="צלם" margin="normal" />}
              />
              <Autocomplete
                inputValue={salonValue}
                onInputChange={(event, newInputValue) => {
                  setSalonValue(newInputValue);
                }}
                fullWidth
                options={suggestions.salon.map((option) => option.name)}
                renderInput={(params) => <TextField {...params} label="סלון יופי" margin="normal" />}
              />
            </> : <></>}
            {eventName === "בר מצווה" ? <>
              <Autocomplete
                inputValue={attractionValue}
                onInputChange={(event, newInputValue) => {
                  setAttractionValue(newInputValue);
                }}
                fullWidth
                options={suggestions.attraction.map((option) => option.name)}
                renderInput={(params) => <TextField {...params} label="אטרקציות ודיג'יי" margin="normal" />}
              />
              <Autocomplete
                inputValue={clouthValue}
                onInputChange={(event, newInputValue) => {
                  setClouthValue(newInputValue);
                }}
                fullWidth
                options={suggestions.clouth.map((option) => option.name)}
                renderInput={(params) => <TextField {...params} label="לבוש לאירוע" margin="normal" />}
              />
              <Autocomplete
                inputValue={photographerValue}
                onInputChange={(event, newInputValue) => {
                  setPhotographerValue(newInputValue);
                }}
                fullWidth
                options={suggestions.photographer.map((option) => option.name)}
                renderInput={(params) => <TextField {...params} label="צלם" margin="normal" />}
              />
            </> : <></>}
            {eventName === "יום הולדת" ? <>
              <Autocomplete
                inputValue={attractionValue}
                onInputChange={(event, newInputValue) => {
                  setAttractionValue(newInputValue);
                }}
                fullWidth
                options={suggestions.attraction.map((option) => option.name)}
                renderInput={(params) => <TextField {...params} label="אטרקציות ודיג'יי" margin="normal" />}
              />
              <Autocomplete
                inputValue={placeDesignValue}
                onInputChange={(event, newInputValue) => {
                  setPlaceDesignValue(newInputValue);
                }}
                fullWidth
                options={suggestions.placeDesign.map((option) => option.name)}
                renderInput={(params) => <TextField {...params} label="עיצוב מקום" margin="normal" />}
              />
              <Autocomplete
                inputValue={activeBarValue}
                onInputChange={(event, newInputValue) => {
                  setActiveBarValue(newInputValue);
                }}
                fullWidth
                options={suggestions.activeBar.map((option) => option.name)}
                renderInput={(params) => <TextField {...params} label="בר אקטיבי" margin="normal" />}
              />
            </> : <></>}
            {eventName === "ברית" ? <>
              <Autocomplete
                inputValue={mohelValue}
                onInputChange={(event, newInputValue) => {
                  setMohelValue(newInputValue);
                }}
                fullWidth
                options={suggestions.mohel.map((option) => option.name)}
                renderInput={(params) => <TextField {...params} label="מוהל" margin="normal" />}
              />
              <Autocomplete
                inputValue={placeDesignValue}
                onInputChange={(event, newInputValue) => {
                  setPlaceDesignValue(newInputValue);
                }}
                fullWidth
                options={suggestions.placeDesign.map((option) => option.name)}
                renderInput={(params) => <TextField {...params} label="עיצוב מקום" margin="normal" />}
              />
              <Autocomplete
                inputValue={photographerValue}
                onInputChange={(event, newInputValue) => {
                  setPhotographerValue(newInputValue);
                }}
                fullWidth
                options={suggestions.photographer.map((option) => option.name)}
                renderInput={(params) => <TextField {...params} label="צלם" margin="normal" />}
              />
            </> : <></>}
            <Stack direction="row" spacing={4}>
              <Button variant="contained" color="primary" type="submit" fullWidth>שלח</Button>
            </Stack>
          </form>
        </Paper>
      </Modal> : <></>}
    </>
  )
}


export default PopUp
