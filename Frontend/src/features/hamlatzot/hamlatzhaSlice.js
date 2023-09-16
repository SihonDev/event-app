import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import hamlatzhaService from './hamlatzhaService'

const initialState = {
  hamlatzot: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}


export const createHamlatzha = createAsyncThunk(
  'hamlatzot/create',
  async (hamlatzhaData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await hamlatzhaService.createHamlatzha(hamlatzhaData, token)
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


export const getHamlatzot = createAsyncThunk(
  'hamlatzot/getAll',
  async (_, thunkAPI) => {
    try {
      return await hamlatzhaService.getHamlatzot()
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

export const deleteHamlatzha = createAsyncThunk(
  'hamlatzot/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await hamlatzhaService.deleteHamlatzha(id, token)
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

export const hamlatzhaSlice = createSlice({
  name: 'hamlatzot',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createHamlatzha.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createHamlatzha.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.hamlatzot.push(action.payload)
      })
      .addCase(createHamlatzha.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getHamlatzot.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getHamlatzot.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.hamlatzot = action.payload
      })
      .addCase(getHamlatzot.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteHamlatzha.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteHamlatzha.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.hamlatzot = state.hamlatzha.filter(
          (hamlatzha) => hamlatzha._id !== action.payload.id
        )
      })
      .addCase(deleteHamlatzha.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = hamlatzhaSlice.actions
export default hamlatzhaSlice.reducer
