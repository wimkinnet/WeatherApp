import React from "react";
import { useState } from "react";

export default function Cities() {

const [city, setCity] = useState("")

const handleCityChange = (e) => {
    setCity(e.target.value)
}

return (
    <input type="search" value={city} onChange={handleCityChange} placeholder="Enter a city name" />
)
}