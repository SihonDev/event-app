import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import suggestionService from './suggestionService'

const initialState = {
  suggestions: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Get user suppliers
export const getSuggestions = createAsyncThunk(
  'suggestions/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await suggestionService.getSuggestions(token)
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

export const suggestionSlice = createSlice({
  name: 'suggestions',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSuggestions.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getSuggestions.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.suggestions = action.payload
      })
      .addCase(getSuggestions.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = suggestionSlice.actions
export default suggestionSlice.reducer