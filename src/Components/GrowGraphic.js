import React from 'react' 
import Grow from './Grow'

const GrowGraphic = props => {

    return (
        <div className="grow-graphic">
            {props.growingPlantsFeatures.map(pl => <Grow key = {pl.id} plantF={pl}/>)}
        </div>
    )
}

export default GrowGraphic