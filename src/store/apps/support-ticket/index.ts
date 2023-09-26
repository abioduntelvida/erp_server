import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import config from 'src/configs/config'
import { HTTP_STATUS } from 'src/constants'
import { RootState } from 'src/store'

interface MyData {
  data: any[]
  message: string
}

// SIGN UP
interface UserAttributes {
  token: any
}

interface MyKnownError {
  errorMessage: string
}

export const fetchAsyncSupportTickets = createAsyncThunk<
  MyData,
  { url: string } & Partial<UserAttributes>,
  {
    rejectValue: MyKnownError
  }
>('supportTickets/fetchAsyncThunk', async (userInfo, { rejectWithValue }) => {
  const { url, token } = userInfo
  try {
    const response = await axios.get(config.baseUrl + url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      validateStatus: () => {
        return true
      }
    })

    return response.data
  } catch (err: any) {
    console.log(err)

    return rejectWithValue(err.response.data)
  }
})

export const postAsyncSupportTicket = createAsyncThunk<
  MyData,
  { url: string } & Partial<UserAttributes>,
  {
    rejectValue: MyKnownError
  }
>('supportTicket/postAsyncThunk', async (formData, { rejectWithValue }) => {
  const { url, token, ...data } = formData
  try {
    const response = await axios.post(config.baseUrl + url, data, {
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

    if (!err.response) {
      throw err
    }

    return rejectWithValue(err.response.data)
  }
})

export interface ISupport {
  data: any[] | null
  loading: string
  error: null | string
}

const initialState = {
  data: null,
  loading: 'IDLE',
  error: ''
} as ISupport

const SupportTicketSlice = createSlice({
  name: 'support',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchAsyncSupportTickets.pending, state => {
      // The type signature on action.payload matches what we passed into the generic for `normalize`, allowing us to access specific properties on `payload.articles` if desired
      state.loading = HTTP_STATUS.PENDING
    })
    builder.addCase(fetchAsyncSupportTickets.fulfilled, (state, { payload }) => {
      state.loading = HTTP_STATUS.FULFILLED
      state.data = payload.data
    })
    builder.addCase(fetchAsyncSupportTickets.rejected, (state, action: PayloadAction<any>) => {
      if (action.payload) {
        // Since we passed in `MyKnownError` to `rejectValue` in `updateUser`, the type information will be available here.
        state.error = action.payload.errorMessage
      } else {
        // state.error = action.error
      }
    }),
      builder.addCase(postAsyncSupportTicket.pending, state => {
        // The type signature on action.payload matches what we passed into the generic for `normalize`, allowing us to access specific properties on `payload.articles` if desired
        state.loading = HTTP_STATUS.PENDING
      })
    builder.addCase(postAsyncSupportTicket.fulfilled, state => {
      state.loading = HTTP_STATUS.FULFILLED

      // state.data = payload.data
    })
    builder.addCase(postAsyncSupportTicket.rejected, (state, action: PayloadAction<any>) => {
      if (action.payload) {
        // Since we passed in `MyKnownError` to `rejectValue` in `updateUser`, the type information will be available here.
        state.error = action.payload.errorMessage
      } else {
        // state.error = action.error
      }
    })
  }
})

export const getSupportLoading = (state: RootState) => state.support?.loading
export const getBomData = (state: RootState) => state.support?.data
export default SupportTicketSlice.reducer
