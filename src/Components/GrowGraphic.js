import React from 'react' 
import Grow from './Grow'

const GrowGraphic = props => {

    return (
        <div className="grow-graphic">
            <div className="start-line"></div>
            {props.growingPlantsFeatures.map(pl => <Grow plantF={pl}/>)}
        </div>
    )
}

export default GrowGraphic