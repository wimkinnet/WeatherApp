import { configureStore } from "@reduxjs/toolkit";

import citiesReducer from "../features/cities/CitiesSlice"

export default configureStore({
  reducer: {
    cities: citiesReducer,
  }
});