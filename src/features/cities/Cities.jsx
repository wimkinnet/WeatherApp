import React from "react";
import { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCity, citiesList } from "./CitiesSlice";
import './Cities.css'

export default function Cities() {

    const [city, setCity] = useState("")
    const [results, setResults] = useState([])
    const [selectedCity, setSelectedCity] = useState(null)
    const [selectedCityIsEmpty, setSelectedCityIsEmpty] = useState(true)
    const dispatch = useDispatch()
    const cities = useSelector(citiesList)

    useEffect (() => {
        const endpoint = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=5&format=json`;
        fetch(endpoint).then(response => response.json()).then(data => data.results).then(data => data ? setResults(data.filter(city => city.population > 1000)): setResults(data))
    }, [city])
    
    const handleCityChange = (e) => {
        setCity(e.target.value)
    }
    
    const handleCityResultsClick = (e) => {
        
        const Id = e.target.getAttribute('id')
        const City = results.findIndex((city) => city.id == Id)

        dispatch(addCity({
            id: results[City].id,
            name: results[City].name,
            country: results[City].country,
            longitude: results[City].longitude,
            latitude: results[City].latitude,
            elevation: results[City].elevation,
            population: results[City].population
        }))
       
        setCity("")
    }

    const handleCityListClick = (e) => {
        
        const id = e.target.getAttribute('id')
        setSelectedCity(id)
        cities[selectedCity] ? setSelectedCityIsEmpty(false) : setSelectedCityIsEmpty(true)
    }

    const listItems = results ? results.map(city => <li id={city.id} onClick={handleCityResultsClick}>{city.name} | {city.country}</li>) : null

    const cityItems = Object.values(cities).map(city => <li id={city.id} onClick={handleCityListClick}>{city.name} | {city.country}</li>)

    return (
        <>
            <div className="search-city">
                <input type="search" value={city} onChange={handleCityChange} placeholder="Enter a city name" />
            </div>
            {results && <h3>Click a city to add to the list</h3>}
            <ul>{listItems}</ul>
            {cityItems.length > 0 && <h3>Click a city to see details</h3>}
            <ul>{cityItems}</ul>
            {!selectedCityIsEmpty && (
                <ul>
                    <li>name: {cities[selectedCity].name}</li>
                    <li>country: {cities[selectedCity].country}</li>
                    <li>longitude: {cities[selectedCity].longitude}</li>
                </ul>
            )}
        </>
    )
}
