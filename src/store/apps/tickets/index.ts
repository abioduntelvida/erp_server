import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import config from 'src/configs/config'
import { HTTP_STATUS } from 'src/constants'
import { RootState } from 'src/store'

export interface MyData {
  docs: any[]
  details: any[]
}

// SIGN UP
interface UserAttributes {
  token: any
}

interface MyKnownError {
  errorMessage: string
}

export const fetchAsyncTickets = createAsyncThunk<
  MyData,
  { url: string } & Partial<UserAttributes>,
  {
    rejectValue: MyKnownError
  }
>('tickets/fetchAsyncThunk', async (userInfo, { rejectWithValue }) => {
  const { url, token } = userInfo
  try {
    const response = await axios.get(config.baseUrl + url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`
      },
      validateStatus: () => {
        return true
      }
    })

    return response.data
  } catch (err: any) {
    return rejectWithValue(err.response.data)
  }
})

export const fetchAsyncTicketsAll = createAsyncThunk<
  MyData,
  { url: string } & Partial<UserAttributes>,
  {
    rejectValue: MyKnownError
  }
>('ticketsAll/fetchAsyncThunk', async (userInfo, { rejectWithValue }) => {
  const { url, token } = userInfo
  try {
    const response = await axios.get(config.baseUrl + url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`
      },
      validateStatus: () => {
        return true
      }
    })

    return response.data
  } catch (err: any) {
    return rejectWithValue(err.response.data)
  }
})

export const fetchAsyncAssignedTickets = createAsyncThunk<
  MyData,
  { url: string } & Partial<UserAttributes>,
  {
    rejectValue: MyKnownError
  }
>('ticketsDetails/fetchAsyncThunk', async (userInfo, { rejectWithValue }) => {
  const { url, token } = userInfo
  try {
    const response = await axios.get(config.baseUrl + url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`
      },
      validateStatus: () => {
        return true
      }
    })

    return response.data
  } catch (err: any) {
    console.log(err)

    // if (!err.response) {
    //   throw err;
    // }
    return rejectWithValue(err.response.data)
  }
})

export interface ITickets {
  data: any[] | null
  assign: any[] | null
  all: any[] | null
  loading: string
  error: null | string
}

const initialState = {
  data: null,
  assign: null,
  all: null,
  loading: 'IDLE',
  error: ''
} as ITickets

const TicketsSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchAsyncTickets.pending, state => {
      // The type signature on action.payload matches what we passed into the generic for `normalize`, allowing us to access specific properties on `payload.articles` if desired
      state.loading = HTTP_STATUS.PENDING
    })
    builder.addCase(fetchAsyncTickets.fulfilled, (state, { payload }) => {
      state.loading = HTTP_STATUS.FULFILLED
      state.data = payload.docs
    })
    builder.addCase(fetchAsyncTickets.rejected, (state, action: PayloadAction<any>) => {
      if (action.payload) {
        // Since we passed in `MyKnownError` to `rejectValue` in `updateUser`, the type information will be available here.
        state.error = action.payload.errorMessage
      } else {
        // state.error = action.error
      }
    })
    builder.addCase(fetchAsyncAssignedTickets.pending, state => {
      // The type signature on action.payload matches what we passed into the generic for `normalize`, allowing us to access specific properties on `payload.articles` if desired
      state.loading = HTTP_STATUS.PENDING
    })
    builder.addCase(fetchAsyncAssignedTickets.fulfilled, (state, { payload }) => {
      state.loading = HTTP_STATUS.FULFILLED
      state.assign = payload.docs
    })
    builder.addCase(fetchAsyncAssignedTickets.rejected, (state, action: PayloadAction<any>) => {
      if (action.payload) {
        // Since we passed in `MyKnownError` to `rejectValue` in `updateUser`, the type information will be available here.
        state.error = action.payload.errorMessage
      } else {
        // state.error = action.error
      }
      state.loading = HTTP_STATUS.REJECTED
    })
    builder.addCase(fetchAsyncTicketsAll.pending, state => {
      // The type signature on action.payload matches what we passed into the generic for `normalize`, allowing us to access specific properties on `payload.articles` if desired
      state.loading = HTTP_STATUS.PENDING
    })
    builder.addCase(fetchAsyncTicketsAll.fulfilled, (state, { payload }) => {
      state.loading = HTTP_STATUS.FULFILLED
      state.all = payload.docs
    })
    builder.addCase(fetchAsyncTicketsAll.rejected, (state, action: PayloadAction<any>) => {
      if (action.payload) {
        // Since we passed in `MyKnownError` to `rejectValue` in `updateUser`, the type information will be available here.
        state.error = action.payload.errorMessage
      } else {
        // state.error = action.error
      }
      state.loading = HTTP_STATUS.REJECTED
    })
  }
})

export const getTicketLoading = (state: RootState) => state.tickets.loading
export const getTicketData = (state: RootState) => state.tickets?.data
export const getAssignedTicketData = (state: RootState) => state.tickets?.assign
export const getTicketAllData = (state: RootState) => state.tickets?.all

export default TicketsSlice.reducer
