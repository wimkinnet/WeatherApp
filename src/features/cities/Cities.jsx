import React from "react";
import { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCity, deleteCity, changeSelectedCity, citiesList, selectedCity, selectedCityIsEmpty } from "./CitiesSlice";
import './Cities.css'

export default function Cities() {
    
    const [city, setCity] = useState("")
    const [image, setImage] = useState("")
    const [results, setResults] = useState([])
    const dispatch = useDispatch()
    const cities = useSelector(citiesList)
    const selected = useSelector(selectedCity)
    const selectedIsEmpty = useSelector(selectedCityIsEmpty)


    useEffect (() => {
        const endpoint = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=7&format=json`;
        fetch(endpoint).then(response => response.json()).then(data => data.results).then(data => data ? setResults(data.filter(city => city.population > 10)): setResults(data))
    }, [city])

    useEffect (() => {
        if (selected) {
            const image = `https://www.google.com/maps/embed/v1/view?zoom=12&center=${cities[selected].latitude},${cities[selected].longitude}&key=AIzaSyBs5w1O83Q27xh73xvHX6_QDQMXG-MshJE`;
            setImage(image)
        }
    })
    
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

    const handleCityDeleteClick = (e) => {
        const id = e.target.getAttribute('id');
        dispatch(deleteCity({id: id}));
    }

    const handleCityListClick = (e) => {
        const id = e.target.getAttribute('id')
        dispatch(changeSelectedCity({id: id}))
    }

     const listItems = results ? results.map(city => 
        <tr>
            <td>{city.name}</td>
            <td>{city.country}</td>
            <td>{city.population.toLocaleString(undefined, { minimumFractionDigits: 0 })}</td>
            <td><button className="add-button" id={city.id} onClick={handleCityResultsClick}>Add</button></td>
        </tr>
        ) : null

    const cityItems = Object.values(cities).map(city => {
        if (city.id == selected) {
            return <button className="sel-city-button" id={city.id} onClick={handleCityListClick}>{city.name}<sup className="close" id={city.id} onClick={handleCityDeleteClick}>x</sup></button>
        } else {
            return <button className="city-button" id={city.id} onClick={handleCityListClick}>{city.name}<sup className="close" id={city.id} onClick={handleCityDeleteClick}>x</sup></button>
        }
    })

    return (
        <>
            <div className="search-city">
                <input type="search" value={city} onChange={handleCityChange} placeholder="Enter city name ..." />
            </div>
            {results && 
                <>
                    <div className="search-list">
                        <table>
                            <tr>
                                <th>City</th>
                                <th>Country</th>
                                <th>Population</th>
                                <th></th>
                            </tr>
                            {listItems}
                        </table>
                    </div>
                </>
            }
            {!results && 
                <>
                    <div className="empty-search-list">
                    </div>
                </>
            }
            <div className="cities-container">
                {cityItems.length > 0 && 
                <>
                    {cityItems}
                </>
                }
            </div>
            <div className="city-details">
                {!selectedIsEmpty && 
                <>
                    <iframe 
                        width="600" height="450"
                        src={image}>
                    </iframe>
                    <ul className="details">
                        <li>Name: {cities[selected].name}</li>
                        <li>Country: {cities[selected].country}</li>
                        <li>Longitude: {cities[selected].longitude}</li>
                        <li>Latitude: {cities[selected].latitude}</li>
                        <li>Elevation: {cities[selected].elevation}</li>
                        <li>Population: {cities[selected].population.toLocaleString(undefined, { minimumFractionDigits: 0 })}</li>
                    </ul>
                </>
                }
            </div>
        </>
    )
}
