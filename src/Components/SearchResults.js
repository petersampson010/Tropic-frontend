import React from 'react' 
import Plant from './Plant'

const SearchResults = props => {

    console.log(props)

    return (
        <div className="items-list">
            {props.searchedPlants.map(p => <Plant plant={p}/>)}
        </div>
    )
}

export default SearchResults 