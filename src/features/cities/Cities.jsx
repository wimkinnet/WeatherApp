import React from "react";
import { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCity, citiesList } from "./CitiesSlice";
import './Cities.css'

export default function Cities() {

    const [city, setCity] = useState("")
    const [results, setResults] = useState([])
    const dispatch = useDispatch()
    const cities = useSelector(citiesList)

    useEffect (() => {
        const endpoint = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=5&format=json`;
        fetch(endpoint).then(response => response.json()).then(data => data.results).then(data => data ? setResults(data.filter(city => city.population > 1000)): setResults(data))
    }, [city])

    const cityItems = Object.values(cities).map(city => <li id={city.id}>{city.name} | {city.country}</li>)
    
    const handleCityChange = (e) => {
        setCity(e.target.value)
    }

    const handleCityResultsClick = (e) => {
        
        const selectedId = e.target.getAttribute('id')
        const selectedCity = results.findIndex((city) => city.id == selectedId)

        dispatch(addCity({
            id: results[selectedCity].id,
            name: results[selectedCity].name,
            country: results[selectedCity].country,
            longitude: results[selectedCity].longitude,
            latitude: results[selectedCity].latitude,
            elevation: results[selectedCity].elevation,
            population: results[selectedCity].population
        }))
       
        setCity("")
    }

    const listItems = results ? results.map(city => <li id={city.id} onClick={handleCityResultsClick}>{city.name} | {city.country}</li>) : null

    return (
        <>
            <div className="search-city">
                <input type="search" value={city} onChange={handleCityChange} placeholder="Enter a city name" />
            </div>
            {results && <h3>Click a city to add to the list</h3>}
            <ul>{listItems}</ul>
            {cityItems.length > 0 && <h3>Click a city to see details</h3>}
            <ul>{cityItems}</ul>
        </>
    )
}
