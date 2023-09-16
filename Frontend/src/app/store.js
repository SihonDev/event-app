import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import hamlatzhaReducer from '../features/hamlatzot/hamlatzhaSlice'
import eventsTypeReducer from '../features/eventsType/eventsTypeSlice'
import supplierReducer from '../features/supplier/supplierSlice'
import suggestionReducer from '../features/suggestion/suggestionSlice'
import recommendReducer from '../features/recommend/recommendSlice'
import eventReducer from '../features/event/eventSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    hamlatzot: hamlatzhaReducer,
    eventsType: eventsTypeReducer,
    suppliers: supplierReducer,
    suggestions: suggestionReducer,
    recommends: recommendReducer,
    events: eventReducer,
  },
})
