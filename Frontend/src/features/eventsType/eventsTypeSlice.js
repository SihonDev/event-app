import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import eventsTypeService from './eventsTypeService'

const initialState = {
  eventsType: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Get user eventsTypes
export const getEventsType = createAsyncThunk(
  'eventsType/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await eventsTypeService.getEventsType(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)


export const eventsTypeSlice = createSlice({
  name: 'eventsType',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEventsType.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getEventsType.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.eventsType = action.payload
      })
      .addCase(getEventsType.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = eventsTypeSlice.actions
export default eventsTypeSlice.reducer