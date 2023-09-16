import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import supplierService from './supplierService'

const initialState = {
  suppliers: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Get user suppliers
export const getSuppliers = createAsyncThunk(
  'suppliers/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await supplierService.getSuppliers(token)
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

export const supplierSlice = createSlice({
  name: 'suppliers',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSuppliers.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getSuppliers.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.suppliers = action.payload
      })
      .addCase(getSuppliers.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = supplierSlice.actions
export default supplierSlice.reducer