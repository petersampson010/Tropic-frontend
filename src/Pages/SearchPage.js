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
                    <FontAwesomeIcon icon={faSun} size="4x" onClick={(e) => props.updateSearchSelection(e, "climate")}/>
                    <p>Climate</p>
                </div>
                <div>
                    <FontAwesomeIcon icon={faFont} size="4x" onClick={(e) => props.updateSearchSelection(e, "name")}/>
                    <p>Name</p>
                </div>
            </div>
            <div className="select-search">{props.searchSelection === null ? "Select a category to search by" : `Currently searching by ${props.searchSelection}`}</div>
            <div>
                <SearchBar 
                searchSelection={props.searchSelection}
                searchFV={props.searchFV}
                nextPage={props.nextPage}
                prevPage={props.prevPage}/>
            </div>
            <div className="search-results">
                <SearchResults user={props.user} addToWishlist={props.addToWishlist} shownPlants={props.shownPlants}/>
            </div>
            <Footer/>
        </div>
    )
}

export default SearchPage 
