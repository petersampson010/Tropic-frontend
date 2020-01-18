import React from 'react'

const Checkpoint = props => {

    let key = Object.keys(props.stage)[0]
    let value = Object.values(props.stage)[0]
    console.log(value)

    return (
        <div className="checkpoint" style={{left: `${value}`}}>{key}</div>
    )
}

export default Checkpoint 