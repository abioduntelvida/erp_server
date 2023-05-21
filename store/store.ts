import { ThunkAction } from '@reduxjs/toolkit'
import { createWrapper, MakeStore } from 'next-redux-wrapper'
import { Action, combineReducers, createStore } from 'redux'

// Store setup
const reducers = {}

const reducer = combineReducers(reducers)
const makeConfiguredStore = reducer => createStore(reducer, undefined)

const makeStore: MakeStore<any> = () => {
  const isServer = typeof window === 'undefined'

  if (isServer) {
    return makeConfiguredStore(reducer)
  } else {
    return makeConfiguredStore(reducer)

    // we need it only on client side
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { persistStore, persistReducer } = require('redux-persist')
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const storage = require('redux-persist/lib/storage').default

    const persistConfig = {
      key: 'nextjs',
      whitelist: ['fromClient'], // make sure it does not clash with server keys
      storage
    }

    const persistedReducer = persistReducer(persistConfig, reducer)
    const store = makeConfiguredStore(persistedReducer)

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    store.__persistor = persistStore(store) // Nasty hack

    return store
  }
}

type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true })
