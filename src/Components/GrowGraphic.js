import React from 'react' 
import Grow from './Grow'

const GrowGraphic = props => {

    return (
        <div className="grow-graphic">
            {props.growlist.map(g => <Grow plant={g.plant}/>)}
        </div>
    )
}

export default GrowGraphic