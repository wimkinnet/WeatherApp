import { createSlice } from "@reduxjs/toolkit"

const citiesSlice = createSlice({
    name: 'Cities',
    initialState: {
        cities: {},
        selectedCity: 0,
        selectedCityIsEmpty: true
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
        },
        deleteCity: (store, action) => {
            const id = action.payload.id
            console.log(id)
            console.log(store.selectedCity)
            if (store.selectedCity == id) {
                store.selectedCity = 0
                store.selectedCityIsEmpty = true
            }
            delete store.cities[id]
        },
        changeSelectedCity: (store, action) => {
            const id = action.payload.id
            const index = Object.keys(store.cities).findIndex(element => element == id)
            if (index > -1) {
                store.selectedCity = id
                store.selectedCityIsEmpty = false
            }
        }
    }
})

export const citiesList = (state) => state.cities.cities
export const selectedCity = (state) => state.cities.selectedCity
export const selectedCityIsEmpty = (state) => state.cities.selectedCityIsEmpty
export const {addCity, deleteCity, changeSelectedCity} = citiesSlice.actions
export default citiesSlice.reducer