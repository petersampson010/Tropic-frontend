import React from 'react' 
import NavBar from '../Components/NavBar'
import SearchResults from '../Components/SearchResults'
import SearchBar from '../Components/SearchBar'
import Footer from '../Components/Footer'

import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeartbeat } from '@fortawesome/free-solid-svg-icons'
import { faSeedling } from '@fortawesome/free-solid-svg-icons'
import {faPepperHot } from '@fortawesome/free-solid-svg-icons'
import { faSun } from '@fortawesome/free-solid-svg-icons'
import { faFont } from '@fortawesome/free-solid-svg-icons'


const SearchPage = props => {

    return (
        <div className="search-page">
            <NavBar logout={props.logout} user={props.user}/>
            <div className="search-items">
                <div>
                    <FontAwesomeIcon className="search-icon" icon={faHeartbeat} size="4x" onClick={(e) => props.updateSearchSelection(e, "health")}/>
                    <p>Health</p>
                </div>
                <div>
                    <FontAwesomeIcon className="search-icon" icon={faSeedling} size="4x" onClick={(e) => props.updateSearchSelection(e, "soil")}/>
                    <p>Soil</p>
                </div>
                <div>
                    <FontAwesomeIcon className="search-icon" icon={faPepperHot} size="4x" onClick={(e) => props.updateSearchSelection(e, "uses")}/>
                    <p>Uses</p>
                </div>
                <div>
                    <FontAwesomeIcon className="search-icon" icon={faSun} size="4x" onClick={(e) => props.updateSearchSelection(e, "climate")}/>
                    <p>Climate</p>
                </div>
                <div>
                    <FontAwesomeIcon className="search-icon" icon={faFont} size="4x" onClick={(e) => props.updateSearchSelection(e, "name")}/>
                    <p>Name</p>
                </div>
            </div>
            <div className="search-by">
                <div className="select-search">{props.searchSelection === null ? "Select a category to search by ↟" : `Currently searching by ${props.searchSelection}`}</div>
                or
                <div className="search-all" onClick={props.searchAll}>Search all Plants</div>
            </div>
            <div>
                <SearchBar 
                searchedPlants={props.searchedPlants}
                num={props.num}
                searchSelection={props.searchSelection}
                searchFV={props.searchFV}
                nextPage={props.nextPage}
                prevPage={props.prevPage}/>
            </div>
            <div className="search-results">
                <SearchResults user={props.user} addToWishlist={props.addToWishlist} shownPlants={props.shownPlants}/>
            </div>
        </div>
    )
}

export default SearchPage 
