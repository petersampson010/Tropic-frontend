import React from 'react' 
import Grow from './Grow'
import MapKey from './MapKey'

const GrowGraphic = props => {

    const getDiff = () => {
        props.growingPlantsFeatures.map(gpf => {

        })
    }

    return (
        <div className="grow-graphic">
            {props.growingPlantsFeatures.map(pl => <Grow user={props.user} deleteFromGrowlist={props.deleteFromGrowlist} key={pl.id} plantF={pl}/>)}
            <MapKey />
        </div>
    )
}

export default GrowGraphic