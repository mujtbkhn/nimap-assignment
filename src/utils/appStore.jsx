
import moviesReducer from "./moviesSlice"
import { configureStore } from "@reduxjs/toolkit"

const appStore = configureStore(
    {
        reducer: {
          movies: moviesReducer,
        },
    }
)

export default appStore