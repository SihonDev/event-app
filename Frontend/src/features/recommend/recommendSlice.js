import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import recommendService from './recommendService'

const initialState = {
  recommends: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new recommend
export const createRecommend = createAsyncThunk(
  'recommends/create',
  async (recommendData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await recommendService.createRecommend(recommendData, token)
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


// Get user recommends
export const getRecommends = createAsyncThunk(
  'recommends/getAll',
  async (_, thunkAPI) => {
    try {
      return await recommendService.getRecommends()
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

// Delete user recommend
export const deleteRecommend = createAsyncThunk(
  'recommends/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await recommendService.deleteRecommend(id, token)
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

export const recommendSlice = createSlice({
  name: 'recommends',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createRecommend.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createRecommend.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.recommends.push(action.payload)
      })
      .addCase(createRecommend.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getRecommends.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getRecommends.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.recommends = action.payload
      })
      .addCase(getRecommends.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteRecommend.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteRecommend.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.recommends = state.recommends.filter(
          (recommend) => recommend._id !== action.payload.id
        )
      })
      .addCase(deleteRecommend.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = recommendSlice.actions
export default recommendSlice.reducer