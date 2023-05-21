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

export const fetchAsyncProjectTickets = createAsyncThunk<
  MyData,
  { url: string } & Partial<UserAttributes>,
  {
    rejectValue: MyKnownError
  }
>('projectTickets/fetchAsyncThunk', async (userInfo, { rejectWithValue }) => {
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

export const postAsyncProjectTicket = createAsyncThunk<
  MyData,
  { url: string } & Partial<UserAttributes>,
  {
    rejectValue: MyKnownError
  }
>('projectTicket/postAsyncThunk', async (formData, { rejectWithValue }) => {
  const { url, token, ...data } = formData
  try {
    const response = await axios.post(config.baseUrl + url, data, {
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

    if (!err.response) {
      throw err
    }

    return rejectWithValue(err.response.data)
  }
})

export interface IProjectTicket {
  data: any[] | null
  loading: string
  error: null | string
}

const initialState = {
  data: null,
  loading: 'IDLE',
  error: ''
} as IProjectTicket

const ProjectTicketSlice = createSlice({
  name: 'project-ticket',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchAsyncProjectTickets.pending, state => {
      // The type signature on action.payload matches what we passed into the generic for `normalize`, allowing us to access specific properties on `payload.articles` if desired
      state.loading = HTTP_STATUS.PENDING
    })
    builder.addCase(fetchAsyncProjectTickets.fulfilled, (state, { payload }) => {
      state.loading = HTTP_STATUS.FULFILLED
      state.data = payload.data
    })
    builder.addCase(fetchAsyncProjectTickets.rejected, (state, action: PayloadAction<any>) => {
      if (action.payload) {
        // Since we passed in `MyKnownError` to `rejectValue` in `updateUser`, the type information will be available here.
        state.error = action.payload.errorMessage
      } else {
        // state.error = action.error
      }
    }),
      builder.addCase(postAsyncProjectTicket.pending, state => {
        // The type signature on action.payload matches what we passed into the generic for `normalize`, allowing us to access specific properties on `payload.articles` if desired
        state.loading = HTTP_STATUS.PENDING
      })
    builder.addCase(postAsyncProjectTicket.fulfilled, state => {
      state.loading = HTTP_STATUS.FULFILLED

      // state.data = payload.data
    })
    builder.addCase(postAsyncProjectTicket.rejected, (state, action: PayloadAction<any>) => {
      if (action.payload) {
        // Since we passed in `MyKnownError` to `rejectValue` in `updateUser`, the type information will be available here.
        state.error = action.payload.errorMessage
      } else {
        // state.error = action.error
      }
    })
  }
})

export const getProjectTicketLoading = (state: RootState) => state.projectTicket?.loading
export const getProjectTicketData = (state: RootState) => state.projectTicket?.data
export default ProjectTicketSlice.reducer
