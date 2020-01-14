import React from 'react' 

const GrowItem = props => {
    return (
        <div className="grow-item">
            {props.plant.name}
        </div>
    )
}

export default GrowItem 