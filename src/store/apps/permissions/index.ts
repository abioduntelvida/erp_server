import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import config from 'src/configs/config'
import { HTTP_STATUS } from 'src/constants'
import { RootState } from 'src/store'

interface MyData {
  message: string
  data: any[]
}

// SIGN UP
interface UserAttributes {
  id: any
  token: any
}

interface MyKnownError {
  errorMessage: string
}

export const fetchAsyncPermissions = createAsyncThunk<
  MyData,
  { url: string } & Partial<UserAttributes>,
  {
    rejectValue: MyKnownError
  }
>('permissions/fetchAsyncThunk', async (userInfo, { rejectWithValue }) => {
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
    if (!err.response) {
      throw err
    }

    return rejectWithValue(err.response.data)
  }
})

export const postAsyncPermissions = createAsyncThunk<
  MyData,
  { url: string } & Partial<UserAttributes>,
  {
    rejectValue: MyKnownError
  }
>('permissions/postAsyncThunk', async (formData, { rejectWithValue }) => {
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
    if (!err.response) {
      throw err
    }

    return rejectWithValue(err.response.data)
  }
})

export const deleteAsyncPermission = createAsyncThunk<
  MyData,
  { url: string } & Partial<UserAttributes>,
  {
    rejectValue: MyKnownError
  }
>('permission/deleteAsyncThunk', async (formData, { rejectWithValue }) => {
  const { url, token, id } = formData
  try {
    const response = await axios.delete(config.baseUrl + url + id, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })

    return response.data
  } catch (err: any) {
    if (!err.response) {
      throw err
    }

    return rejectWithValue(err.response.data)
  }
})

export interface IPermissions {
  data: any[]
  loading: string
  error: null | string
}

const initialState = {
  data: [],
  loading: 'IDLE',
  error: ''
} as IPermissions

const PermissionsSlice = createSlice({
  name: 'permissions',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchAsyncPermissions.pending, state => {
      // The type signature on action.payload matches what we passed into the generic for `normalize`, allowing us to access specific properties on `payload.articles` if desired
      state.loading = HTTP_STATUS.PENDING
    })
    builder.addCase(fetchAsyncPermissions.fulfilled, (state, { payload }) => {
      state.loading = HTTP_STATUS.FULFILLED
      state.data = payload.data
    })
    builder.addCase(fetchAsyncPermissions.rejected, (state, action: PayloadAction<any>) => {
      if (action.payload) {
        // Since we passed in `MyKnownError` to `rejectValue` in `updateUser`, the type information will be available here.
        state.error = action.payload.errorMessage
      } else {
        // state.error = action.error
      }
    }),
      builder.addCase(postAsyncPermissions.pending, state => {
        // The type signature on action.payload matches what we passed into the generic for `normalize`, allowing us to access specific properties on `payload.articles` if desired
        state.loading = HTTP_STATUS.PENDING
      })
    builder.addCase(postAsyncPermissions.fulfilled, state => {
      state.loading = HTTP_STATUS.FULFILLED
    })
    builder.addCase(postAsyncPermissions.rejected, (state, action: PayloadAction<any>) => {
      if (action.payload) {
        // Since we passed in `MyKnownError` to `rejectValue` in `updateUser`, the type information will be available here.
        state.error = action.payload.errorMessage
      } else {
        // state.error = action.error
      }
    }),
      builder.addCase(deleteAsyncPermission.pending, state => {
        // The type signature on action.payload matches what we passed into the generic for `normalize`, allowing us to access specific properties on `payload.articles` if desired
        state.loading = HTTP_STATUS.PENDING
      })
    builder.addCase(deleteAsyncPermission.fulfilled, state => {
      state.loading = HTTP_STATUS.FULFILLED
    })
    builder.addCase(deleteAsyncPermission.rejected, (state, action: PayloadAction<any>) => {
      if (action.payload) {
        // Since we passed in `MyKnownError` to `rejectValue` in `updateUser`, the type information will be available here.
        state.error = action.payload.errorMessage
      } else {
        // state.error = action.error
      }
    })
  }
})

export const getPermissionsLoading = (state: RootState) => state.permissions?.loading

export const getPermissionsData = (state: RootState) => state?.permissions?.data
export default PermissionsSlice.reducer
