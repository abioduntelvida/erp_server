import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import config from 'src/configs/config'
import { HTTP_STATUS } from 'src/constants'
import { RootState } from 'src/store'

export interface MyData {
  message: string
  docs: any[]
}

// SIGN UP
interface UserAttributes {
  token: any
}

interface MyKnownError {
  errorMessage: string
}

export const postAsyncUser = createAsyncThunk<
  MyData,
  { url: string } & Partial<UserAttributes>,
  {
    rejectValue: MyKnownError
  }
>('user/postAsyncThunk', async (formData, { rejectWithValue }) => {
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

export const fetchAsyncAllUsers = createAsyncThunk<
  MyData,
  { url: string } & Partial<UserAttributes>,
  {
    rejectValue: MyKnownError
  }
>('users/fetchAsyncThunk', async (formData, { rejectWithValue }) => {
  const { url, token } = formData
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
    if (!err.response) {
      throw err
    }

    return rejectWithValue(err.response.data)
  }
})

export const fetchAsyncAllUsersRoles = createAsyncThunk<
  MyData,
  { url: string } & Partial<UserAttributes>,
  {
    rejectValue: MyKnownError
  }
>('usersRoles/fetchAsyncThunk', async (formData, { rejectWithValue }) => {
  const { url, token } = formData
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
    if (!err.response) {
      throw err
    }

    return rejectWithValue(err.response.data)
  }
})

export interface IUser {
  data: readonly any[]
  uroles: readonly any[]
  loading: string
  error: null | string
}

const initialState = {
  data: [],
  uroles: [],
  loading: 'IDLE',
  error: ''
} as IUser

const UserSlice = createSlice({
  name: 'helpdesk',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(postAsyncUser.pending, state => {
      // The type signature on action.payload matches what we passed into the generic for `normalize`, allowing us to access specific properties on `payload.articles` if desired
      state.loading = HTTP_STATUS.PENDING
    })
    builder.addCase(postAsyncUser.fulfilled, state => {
      state.loading = HTTP_STATUS.FULFILLED
    })
    builder.addCase(postAsyncUser.rejected, (state, action: PayloadAction<any>) => {
      if (action.payload) {
        // Since we passed in `MyKnownError` to `rejectValue` in `updateUser`, the type information will be available here.
        state.error = action.payload.errorMessage
      } else {
        // state.error = action.error
      }
    })

    builder.addCase(fetchAsyncAllUsers.pending, state => {
      // The type signature on action.payload matches what we passed into the generic for `normalize`, allowing us to access specific properties on `payload.articles` if desired
      state.loading = HTTP_STATUS.PENDING
    })
    builder.addCase(fetchAsyncAllUsers.fulfilled, (state, { payload }) => {
      state.loading = HTTP_STATUS.FULFILLED
      console.log(payload)
      state.data = payload.docs
    })
    builder.addCase(fetchAsyncAllUsers.rejected, (state, action: PayloadAction<any>) => {
      if (action.payload) {
        // Since we passed in `MyKnownError` to `rejectValue` in `updateUser`, the type information will be available here.
        state.error = action.payload.errorMessage
      } else {
        // state.error = action.error
      }
    })

    builder.addCase(fetchAsyncAllUsersRoles.pending, state => {
      // The type signature on action.payload matches what we passed into the generic for `normalize`, allowing us to access specific properties on `payload.articles` if desired
      state.loading = HTTP_STATUS.PENDING
    })
    builder.addCase(fetchAsyncAllUsersRoles.fulfilled, (state, { payload }) => {
      state.loading = HTTP_STATUS.FULFILLED
      console.log(payload)
      state.uroles = payload.docs
    })
    builder.addCase(fetchAsyncAllUsersRoles.rejected, (state, action: PayloadAction<any>) => {
      if (action.payload) {
        // Since we passed in `MyKnownError` to `rejectValue` in `updateUser`, the type information will be available here.
        state.error = action.payload.errorMessage
      } else {
        // state.error = action.error
      }
    })
  }
})

export const getUserLoading = (state: RootState) => state.user?.loading
export const getAllUsers = (state: RootState) => state.user?.data
export const getAllUsersRoles = (state: RootState) => state.user?.uroles

// export const getBomData = (state) => state?.bom?.data?.data;
export default UserSlice.reducer
