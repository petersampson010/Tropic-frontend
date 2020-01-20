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
                        <NavLink to="/search" className="card1t">explore</NavLink>
                    </div>
                    <div className="card2">
                        {props.user ? <p className="card2t" onClick={props.logout}>logout</p>
                        : <NavLink to="authforms" className="card2t">login</NavLink>}
                    </div>
                    <div className="card3">
                        <NavLink to="/contact-us" className="card3t">contact us</NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home