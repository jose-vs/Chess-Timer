import { configureStore } from '@reduxjs/toolkit'
import themeReducer from '../app-slice/themeSlice'
import timeReducer from '../app-slice/timeSlice'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    time: timeReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch