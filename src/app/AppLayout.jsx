import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import ROUTES from "./routes";
import './AppLayout.css'
import Cities from "../features/cities/Cities";

export default function AppLayout() {
    return (
        <>
            <div className="container">
                <div className="weather-container">weather details</div>
                <div className="city-container">
                    <Cities />
                </div>
            </div>
            <Outlet/>
        </>
    );
}