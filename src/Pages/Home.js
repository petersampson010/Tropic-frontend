import React from 'react' 
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'


const Home = props => {


    return (
        <div className="home">
            <div className="home-box">
                <h1 className="title">Tropic</h1>
                <h3 className="slogan">The brighter side of fruit and veg</h3>
                <div className="home-options">
                    <NavLink to="/search">
                        <div className="card1">
                            <p className="card1t">explore</p>
                        </div>
                    </NavLink>
                    <NavLink to="authforms">
                        <div className="card2">
                            {props.user ? <p className="card2t" onClick={props.logout}>logout</p>
                            : <p className="card2t">login</p>}
                        </div>
                    </NavLink>
                    <NavLink to="/contact-us">
                        <div className="card3">
                            <p className="card3t">contact-us</p>
                        </div>
                    </NavLink>
                    
                </div>
            </div>
        </div>
    )
}

export default Home