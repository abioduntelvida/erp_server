import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import config from 'src/configs/config'
import { HTTP_STATUS } from 'src/constants'
import { RootState } from 'src/store'

export interface MyData {
  docs: any[]
  message: string
  status: string
  error: string
}

// SIGN UP
interface UserAttributes {
  token: any
}

interface MyKnownError {
  errorMessage: string
}

export const fetchAsyncTasks = createAsyncThunk<
  MyData,
  { url: string } & Partial<UserAttributes>,
  {
    rejectValue: MyKnownError
  }
>('tasks/fetchAsyncThunk', async (userInfo, { rejectWithValue }) => {
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

    return rejectWithValue(err.response.data)
  }
})

export const fetchAsyncOngoingTasks = createAsyncThunk<
  MyData,
  { url: string } & Partial<UserAttributes>,
  {
    rejectValue: MyKnownError
  }
>('tasksOngoing/fetchAsyncThunk', async (userInfo, { rejectWithValue }) => {
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

    return rejectWithValue(err.response.data)
  }
})

export const fetchAsyncPausedTasks = createAsyncThunk<
  MyData,
  { url: string } & Partial<UserAttributes>,
  {
    rejectValue: MyKnownError
  }
>('tasksPaused/fetchAsyncThunk', async (userInfo, { rejectWithValue }) => {
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

    return rejectWithValue(err.response.data)
  }
})

export const fetchAsyncRejectedTasks = createAsyncThunk<
  MyData,
  { url: string } & Partial<UserAttributes>,
  {
    rejectValue: MyKnownError
  }
>('tasksRejected/fetchAsyncThunk', async (userInfo, { rejectWithValue }) => {
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

    return rejectWithValue(err.response.data)
  }
})

export const fetchAsynCompletedTasks = createAsyncThunk<
  MyData,
  { url: string } & Partial<UserAttributes>,
  {
    rejectValue: MyKnownError
  }
>('tasksCompleted/fetchAsyncThunk', async (userInfo, { rejectWithValue }) => {
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

    return rejectWithValue(err.response.data)
  }
})

export const moveAsyncTasks = createAsyncThunk<
  MyData,
  { url: string } & Partial<UserAttributes>,
  {
    rejectValue: MyKnownError
  }
>('moveTask/fetchAsyncThunk', async (userInfo, { rejectWithValue }) => {
  const { url, token, ...data } = userInfo
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

    return rejectWithValue(err.response.data)
  }
})

export const postAsyncTask = createAsyncThunk<
  MyData,
  { url: string } & Partial<UserAttributes>,
  {
    rejectValue: MyKnownError
  }
>('task/postAsyncThunk', async (formData, { rejectWithValue }) => {
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

export const requestAsyncTask = createAsyncThunk<
  MyData,
  { url: string } & Partial<UserAttributes>,
  {
    rejectValue: MyKnownError
  }
>('requestTask/postAsyncThunk', async (formData, { rejectWithValue }) => {
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

export interface ITask {
  data: any[] | null
  loading: string
  error: null | string
  paused: any[] | []
  rejected: any[] | []
  ongoing: any[] | null
  done: any[] | null
}

const initialState = {
  data: null,
  paused: [],
  rejected: [],
  ongoing: null,
  loading: 'IDLE',
  error: ''
} as ITask

const TaskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchAsyncTasks.pending, state => {
      // The type signature on action.payload matches what we passed into the generic for `normalize`, allowing us to access specific properties on `payload.articles` if desired
      state.loading = HTTP_STATUS.PENDING
    })
    builder.addCase(fetchAsyncTasks.fulfilled, (state, { payload }) => {
      state.loading = HTTP_STATUS.FULFILLED
      console.log(payload)
      state.data = payload.docs
    })
    builder.addCase(fetchAsyncTasks.rejected, (state, action: PayloadAction<any>) => {
      if (action.payload) {
        // Since we passed in `MyKnownError` to `rejectValue` in `updateUser`, the type information will be available here.
        state.error = action.payload.errorMessage
      } else {
        // state.error = action.error
      }
    })

    builder.addCase(fetchAsyncPausedTasks.pending, state => {
      state.loading = HTTP_STATUS.PENDING
    })
    builder.addCase(fetchAsyncPausedTasks.fulfilled, (state, { payload }) => {
      state.loading = HTTP_STATUS.FULFILLED
      state.paused = payload.docs
    })
    builder.addCase(fetchAsyncPausedTasks.rejected, (state, action: PayloadAction<any>) => {
      if (action.payload) {
        state.error = action.payload.errorMessage
      } else {
      }
      state.loading = HTTP_STATUS.REJECTED
    })

    builder.addCase(fetchAsyncRejectedTasks.pending, state => {
      state.loading = HTTP_STATUS.PENDING
    })
    builder.addCase(fetchAsyncRejectedTasks.fulfilled, (state, { payload }) => {
      state.loading = HTTP_STATUS.FULFILLED
      state.rejected = payload.docs
    })
    builder.addCase(fetchAsyncRejectedTasks.rejected, (state, action: PayloadAction<any>) => {
      if (action.payload) {
        state.error = action.payload.errorMessage
      } else {
      }
      state.loading = HTTP_STATUS.REJECTED
    })

    builder.addCase(fetchAsyncOngoingTasks.pending, state => {
      state.loading = HTTP_STATUS.PENDING
    })
    builder.addCase(fetchAsyncOngoingTasks.fulfilled, (state, { payload }) => {
      state.loading = HTTP_STATUS.FULFILLED
      state.ongoing = payload.docs
    })
    builder.addCase(fetchAsyncOngoingTasks.rejected, (state, action: PayloadAction<any>) => {
      if (action.payload) {
        state.error = action.payload.errorMessage
      } else {
      }
      state.loading = HTTP_STATUS.REJECTED
    })
    builder.addCase(fetchAsynCompletedTasks.pending, state => {
      state.loading = HTTP_STATUS.PENDING
    })
    builder.addCase(fetchAsynCompletedTasks.fulfilled, (state, { payload }) => {
      state.loading = HTTP_STATUS.FULFILLED
      state.done = payload.docs
    })
    builder.addCase(fetchAsynCompletedTasks.rejected, (state, action: PayloadAction<any>) => {
      if (action.payload) {
        state.error = action.payload.errorMessage
      } else {
      }
      state.loading = HTTP_STATUS.REJECTED
    })
    builder.addCase(moveAsyncTasks.pending, state => {
      state.loading = HTTP_STATUS.PENDING
    })
    builder.addCase(moveAsyncTasks.fulfilled, state => {
      state.loading = HTTP_STATUS.FULFILLED
    })
    builder.addCase(moveAsyncTasks.rejected, (state, action: PayloadAction<any>) => {
      if (action.payload) {
        state.error = action.payload.errorMessage
      } else {
      }
    })

    builder.addCase(requestAsyncTask.pending, state => {
      state.loading = HTTP_STATUS.PENDING
    })
    builder.addCase(requestAsyncTask.fulfilled, state => {
      state.loading = HTTP_STATUS.FULFILLED
    })
    builder.addCase(requestAsyncTask.rejected, (state, action: PayloadAction<any>) => {
      if (action.payload) {
        state.error = action.payload.errorMessage
      } else {
      }
      state.loading = HTTP_STATUS.REJECTED
    })

    builder.addCase(postAsyncTask.pending, state => {
      state.loading = HTTP_STATUS.PENDING
    })
    builder.addCase(postAsyncTask.fulfilled, state => {
      state.loading = HTTP_STATUS.FULFILLED
    })
    builder.addCase(postAsyncTask.rejected, (state, action: PayloadAction<any>) => {
      if (action.payload) {
        state.error = action.payload.errorMessage
      } else {
      }
      state.loading = HTTP_STATUS.REJECTED
    })
  }
})

export const getTaskLoading = (state: RootState) => state.tasks?.loading
export const getTaskData = (state: RootState) => state.tasks?.data
export const getOngoingTaskData = (state: RootState) => state.tasks?.ongoing
export const getCompletedTaskData = (state: RootState) => state.tasks?.done
export const getPausedTaskData = (state: RootState) => state.tasks?.paused
export const getRejectedTaskData = (state: RootState) => state.tasks?.rejected
export default TaskSlice.reducer
