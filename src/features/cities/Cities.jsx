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
        const endpoint = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=7&format=json`;
        fetch(endpoint).then(response => response.json()).then(data => data.results).then(data => data ? setResults(data.filter(city => city.population > 10)): setResults(data))
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

     const listItems = results ? results.map(city => 
        <tr>
            <td>{city.name}</td>
            <td>{city.country}</td>
            <td>{city.population.toLocaleString(undefined, { minimumFractionDigits: 0 })}</td>
            <td><button className="add-button" id={city.id} onClick={handleCityResultsClick}>Add</button></td>
        </tr>
        ) : null

    const cityItems = Object.values(cities).map(city => 
        <>
            <button className="city-button" id={city.id} onClick={handleCityListClick}>{city.name}<span>X</span></button>
        </>
    )

    return (
        <>
            <div className="search-city">
                <input type="search" value={city} onChange={handleCityChange} placeholder="Enter city name ..." />
            </div>
            <div className="search-list">
                {results && 
                <>
                    <table>
                        <tr>
                            <th>City</th>
                            <th>Country</th>
                            <th>Population</th>
                            <th></th>
                        </tr>
                        {listItems}
                    </table>
                </>
                }
            </div>
            <div className="cities-container">
                {cityItems.length > 0 && 
                <>
                    {cityItems}
                </>
                }
            </div>
            <div className="city-details">
                {!selectedCityIsEmpty && 
                <>
                    <iframe 
                        width="600" height="450" loading="lazy"
                        src={`https://www.google.com/maps/embed/v1/view?zoom=12&center=${cities[selectedCity].latitude},${cities[selectedCity].longitude}&key=AIzaSyBs5w1O83Q27xh73xvHX6_QDQMXG-MshJE`}>
                    </iframe>
                    <ul className="details">
                        <li>Name: {cities[selectedCity].name}</li>
                        <li>Country: {cities[selectedCity].country}</li>
                        <li>Longitude: {cities[selectedCity].longitude}</li>
                        <li>Latitude: {cities[selectedCity].latitude}</li>
                        <li>Elevation: {cities[selectedCity].elevation}</li>
                        <li>Population: {cities[selectedCity].population.toLocaleString(undefined, { minimumFractionDigits: 0 })}</li>
                    </ul>
                </>
                }
            </div>
        </>
    )
}
