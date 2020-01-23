import React from 'react' 
import Grow from './Grow'
import MapKey from './MapKey'
import Help from './Help'

const GrowGraphic = props => {

    
    console.log(props.growingPlantsFeatures)
    if (props.growingPlantsFeatures.length < 1) {
        return <div className="grow-graphic">
            <Help/>
            </div>
    } else {
        return <div className="grow-graphic">
            {props.growingPlantsFeatures.map((pl, index) => <Grow 
            startTime={props.user.start_time[index]} 
            user={props.user} 
            deleteFromGrowlist={props.deleteFromGrowlist} 
            key={index} 
            plantF={pl}/>)}
            <MapKey />
        </div>
    }
}


export default GrowGraphic