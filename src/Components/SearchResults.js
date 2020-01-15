import React from 'react' 
import Plant from './Plant'

const SearchResults = props => {


    return (
        <div className="items-list">
            {props.searchedPlants.map(p => <Plant user={props.user} addToWishlist={props.addToWishlist} plant={p}/>)}
        </div>
    )
}

export default SearchResults 