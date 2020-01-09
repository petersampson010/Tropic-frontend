import React from 'react' 
import NavBar from './NavBar'
import SearchResults from './SearchResults'
import SearchBar from './SearchBar'

import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeartbeat } from '@fortawesome/free-solid-svg-icons'
import { faSeedling } from '@fortawesome/free-solid-svg-icons'
import {faPepperHot } from '@fortawesome/free-solid-svg-icons'
import { faSun } from '@fortawesome/free-solid-svg-icons'
import { faTractor } from '@fortawesome/free-solid-svg-icons'

const SearchPage = props => {

    return (
        <div className="search-page">
            <NavBar/>
            <div className="search-items">
                <div>
                    <FontAwesomeIcon icon={faHeartbeat} size="4x" onClick={(e) => props.updateSearchSelection(e, "health")}/>
                    <p>Health</p>
                </div>
                <div>
                    <FontAwesomeIcon icon={faSeedling} size="4x" onClick={(e) => props.updateSearchSelection(e, "soil")}/>
                    <p>Soil</p>
                </div>
                <div>
                    <FontAwesomeIcon icon={faPepperHot} size="4x" onClick={(e) => props.updateSearchSelection(e, "uses")}/>
                    <p>Uses</p>
                </div>
                <div>
                    <FontAwesomeIcon icon={faTractor} size="4x" onClick={(e) => props.updateSearchSelection(e, "propagation")}/>
                    <p>Propagation</p>
                </div>
                <div>
                    <FontAwesomeIcon icon={faSun} size="4x" onClick={(e) => props.updateSearchSelection(e, "climate")}/>
                    <p>Climate</p>
                </div>
            </div>
            <div className="search-box">
                <SearchBar searchFV={props.searchFV}/>
            </div>
            <div className="search-results">
                <SearchResults searchedPlants={props.searchedPlants}/>
            </div>
        </div>
    )
}

export default SearchPage 
