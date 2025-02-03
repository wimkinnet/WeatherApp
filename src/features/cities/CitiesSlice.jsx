import { createSlice } from "@reduxjs/toolkit"

const citiesSlice = createSlice({
    name: 'Cities',
    initialState: {
        cities: {}
    },
    reducers: {
        addCity: (store, action) => {
            const city = {
                id: action.payload.id,
                name: action.payload.name,
                country: action.payload.country,
                latitude: action.payload.latitude,
                longitude: action.payload.longitude,
                elevation: action.payload.elevation,
                population: action.payload.population
            }
            store.cities[action.payload.id] = city
        }
    }
})

export const citiesList = (state) => state.cities.cities
export const {addCity} = citiesSlice.actions
export default citiesSlice.reducer