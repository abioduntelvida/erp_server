// ** Toolkit imports
import { combineReducers, configureStore } from '@reduxjs/toolkit'

// ** Reducers
import chatReducer from 'src/store/apps/chat'
import usersReducer from 'src/store/apps/users'
import emailReducer from 'src/store/apps/email'
import invoiceReducer from 'src/store/apps/invoice'
import calendarReducer from 'src/store/apps/calendar'
import permissionReducer from 'src/store/apps/permission'
import ticketsReducer from 'src/store/apps/tickets'
import helpDeskReducer from 'src/store/apps/help-desk'
import permissionsReducer from 'src/store/apps/permissions'
import supportReducer from 'src/store/apps/support-ticket'
import rolesReducer from 'src/store/apps/roles'
import userReducer from 'src/store/apps/user'
import projectReducer from 'src/store/apps/project'
import projectTicketReducer from 'src/store/apps/project-ticket'
import tasksReducer from 'src/store/apps/tasks'

const rootReducer = combineReducers({
  users: usersReducer,
  user: userReducer,
  chat: chatReducer,
  email: emailReducer,
  invoice: invoiceReducer,
  calendar: calendarReducer,
  permission: permissionReducer,
  permissions: permissionsReducer,
  tickets: ticketsReducer,
  helpdesk: helpDeskReducer,
  support: supportReducer,
  roles: rolesReducer,
  project: projectReducer,
  projectTicket: projectTicketReducer,
  tasks: tasksReducer
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
