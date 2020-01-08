import React from 'react' 
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'

const Home = props => {


    return (
        <div className="home">
            <div className="home-box">
                <h1 className="title">Tropic</h1>
                <h3 className="slogan">The brighter side of fruit and veg</h3>
                <div className="home-options">
                    <div className="card1">
                        <NavLink to="/search">look around</NavLink>
                    </div>
                    <div className="card2">
                        <NavLink to="/login">login</NavLink>
                    </div>
                    <div className="card3">
                        <NavLink to="/contact-us">contact us</NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home