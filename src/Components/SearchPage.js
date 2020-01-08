import React from 'react' 
import NavBar from './NavBar'
import SearchResults from './SearchResults'

import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeartbeat } from '@fortawesome/free-solid-svg-icons'
import { faSeedling } from '@fortawesome/free-solid-svg-icons'
import { faChartLine } from '@fortawesome/free-solid-svg-icons'
import { faBalanceScaleRight } from '@fortawesome/free-solid-svg-icons'
import { faBatteryHalf } from '@fortawesome/free-solid-svg-icons'
import { faSun } from '@fortawesome/free-solid-svg-icons'

const SearchPage = props => {

    return (
        <div className="search-page">
            <NavBar/>
            <div className="search-items">
                <div>
                    <FontAwesomeIcon icon={faHeartbeat} size="4x" onClick={() => props.updateSearchSelection("health")}/>
                    <p>Health</p>
                </div>
                <div>
                    <FontAwesomeIcon icon={faSeedling} size="4x" onClick={() => props.updateSearchSelection("soil")}/>
                    <p>Soil</p>
                </div>
                <div>
                    <FontAwesomeIcon icon={faChartLine} size="4x" onClick={() => props.updateSearchSelection("growth-rate")}/>
                    <p>Growth Rate</p>
                </div>
                <div>
                    <FontAwesomeIcon icon={faBalanceScaleRight} size="4x" onClick={() => props.updateSearchSelection("size")}/>
                    <p>Size</p>
                </div>
                <div>
                    <FontAwesomeIcon icon={faBatteryHalf} size="4x" onClick={() => props.updateSearchSelection("life-expectancy")}/>
                    <p>Life Expectancy </p>
                </div>
                <div>
                    <FontAwesomeIcon icon={faSun} size="4x" onClick={() => props.updateSearchSelection("climate")}/>
                    <p>Climate</p>
                </div>
            </div>
            <div className="search-box">
                <form 
                onChange={e => props.updateSearchTerm(e)}
                onSubmit={e => props.searchFV(e)}>
                    <input className="search-form" placeholder="change this! depend searchSelection" value={props.searchTerm}/>
                    <input type="submit" value="Search"/>
                </form>
            </div>
            <div className="search-results">
                <SearchResults searchedPlants={props.searchedPlants}/>
            </div>
        </div>
    )
}

export default SearchPage 
