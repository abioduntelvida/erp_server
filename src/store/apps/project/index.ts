import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import config from 'src/configs/config'
import { HTTP_STATUS } from 'src/constants'
import { RootState } from 'src/store'

interface MyData {
  docs: any[]
  message: string
}

// SIGN UP
interface UserAttributes {
  token: any
}

interface MyKnownError {
  errorMessage: string
}

export const fetchAsyncProject = createAsyncThunk<
  MyData,
  { url: string } & Partial<UserAttributes>,
  {
    rejectValue: MyKnownError
  }
>('project/fetchAsyncThunk', async (formData, { rejectWithValue }) => {
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

    return rejectWithValue(err.response.data)
  }
})

export const postAsyncProject = createAsyncThunk<
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

export const updateAsyncProject = createAsyncThunk<
  MyData,
  { url: string } & Partial<UserAttributes>,
  {
    rejectValue: MyKnownError
  }
>('projectTicket/updateAsyncThunk', async (formData, { rejectWithValue }) => {
  const { url, token, ...data } = formData
  try {
    const response = await axios.patch(config.baseUrl + url, data, {
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

export const deleteAsyncProject = createAsyncThunk<
  MyData,
  { url: string } & Partial<UserAttributes>,
  {
    rejectValue: MyKnownError
  }
>('projectTicket/deleteAsyncThunk', async (formData, { rejectWithValue }) => {
  const { url, token } = formData
  try {
    const response = await axios.delete(config.baseUrl + url, {
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

export interface IProject {
  data: readonly any[]
  loading: string
  error: null | string
}

const initialState = {
  data: [],
  loading: 'IDLE',
  error: ''
} as IProject

const ProjectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchAsyncProject.pending, state => {
      // The type signature on action.payload matches what we passed into the generic for `normalize`, allowing us to access specific properties on `payload.articles` if desired
      state.loading = HTTP_STATUS.PENDING
    })
    builder.addCase(fetchAsyncProject.fulfilled, (state, { payload }) => {
      state.loading = HTTP_STATUS.FULFILLED
      state.data = payload.docs
    })
    builder.addCase(fetchAsyncProject.rejected, (state, action: PayloadAction<any>) => {
      if (action.payload) {
        // Since we passed in `MyKnownError` to `rejectValue` in `updateUser`, the type information will be available here.
        state.error = action.payload.errorMessage
      } else {
        // state.error = action.error
      }
      state.loading = HTTP_STATUS.REJECTED
    })
    builder.addCase(postAsyncProject.pending, state => {
      // The type signature on action.payload matches what we passed into the generic for `normalize`, allowing us to access specific properties on `payload.articles` if desired
      state.loading = HTTP_STATUS.PENDING
    })
    builder.addCase(postAsyncProject.fulfilled, state => {
      state.loading = HTTP_STATUS.FULFILLED
    })
    builder.addCase(postAsyncProject.rejected, (state, action: PayloadAction<any>) => {
      if (action.payload) {
        // Since we passed in `MyKnownError` to `rejectValue` in `updateUser`, the type information will be available here.
        state.error = action.payload.errorMessage
      } else {
        // state.error = action.error
      }
      state.loading = HTTP_STATUS.REJECTED
    })
    builder.addCase(deleteAsyncProject.pending, state => {
      // The type signature on action.payload matches what we passed into the generic for `normalize`, allowing us to access specific properties on `payload.articles` if desired
      state.loading = HTTP_STATUS.PENDING
    })
    builder.addCase(deleteAsyncProject.fulfilled, state => {
      state.loading = HTTP_STATUS.FULFILLED
    })
    builder.addCase(deleteAsyncProject.rejected, (state, action: PayloadAction<any>) => {
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

export const getProjectLoading = (state: RootState) => state.project?.loading
export const getProjectData = (state: RootState) => state.project?.data
export default ProjectSlice.reducer
