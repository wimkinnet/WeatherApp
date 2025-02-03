import React from "react";
import { useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import { addCity } from "./CitiesSlice";

export default function Cities() {

    const [city, setCity] = useState("")
    const [results, setResults] = useState([])
    const dispatch = useDispatch()

    useEffect (() => {
        const endpoint = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=5&format=json`;
        fetch(endpoint).then(response => response.json()).then(data => data.results).then(data => data ? setResults(data.filter(city => city.population > 1000)): setResults(data))
    }, [city])

    const handleCityChange = (e) => {
        setCity(e.target.value)
    }

    const handleCityClick = (e) => {
        
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

    const listItems = results ? results.map(city => <li id={city.id} onClick={handleCityClick}>{city.name} | {city.country}</li>) : null

    return (
        <>
            <input type="search" value={city} onChange={handleCityChange} placeholder="Enter a city name" />
            {results && <h3>Click a city to add to the list</h3>}
            <ul>{listItems}</ul>
        </>
    )
}
